#!/usr/bin/env python3
"""Pack the ad and neon-sign artwork into the game's two ad atlases.

Source art lives outside this repo (the user's generated images):
  <src>/signs/catalog.json   entries with rect = [u, v, w, h] in UV space
                             (origin bottom-left) in one of the sign atlases
  <src>/signs/*.webp         those atlases
  <src>/ads-v2/*.png         designed ads, one per file
  <src>/signs-src/ads/*vertical_digital_billboard*.png
                             tall picture ads for skyscraper screens (generated
                             with the "vertical digital billboard" prompt; names
                             in signs-src/exclude.txt are skipped)

Output:
  public/assets/textures/ads_neon.webp     kind 'neon' catalog entries
  public/assets/textures/ads_posters.webp  kind 'ad' catalog entries + ads-v2
  public/assets/textures/ads_screens.webp  the tall picture ads, at high resolution
  src/assets/adAtlases.json                 per atlas: entries with id, kind,
                                            aspect (w/h), uv [u0, v0, u1, v1],
                                            gain (brightness evening-out factor)
                                            and edge (border brightness)

Every entry keeps its aspect ratio; the long side is the largest that lets all
entries of an atlas fit (shelf packing with black gutters; black is invisible
under the additive ad material).

  python3 scripts/assets/build_ad_atlases.py <src>
"""

import json
import sys
from pathlib import Path

import numpy as np
from PIL import Image

SIZE = 4096
GUTTER = 8
REPO = Path(__file__).resolve().parents[2]


def load_entries(src: Path):
    catalog = json.loads((src / 'signs' / 'catalog.json').read_text())
    sheets = {}
    groups = {'neon': [], 'posters': [], 'screens': []}
    for e in catalog['entries']:
        sheet = sheets.get(e['atlas'])
        if sheet is None:
            sheet = sheets[e['atlas']] = Image.open(src / 'signs' / f"{e['atlas']}.webp").convert('RGB')
        u, v, w, h = e['rect']
        W, H = sheet.size
        box = (round(u * W), round((1 - v - h) * H), round((u + w) * W), round((1 - v) * H))
        groups['neon' if e['kind'] == 'neon' else 'posters'].append((e['id'], e['kind'], sheet.crop(box)))
    for f in sorted((src / 'ads-v2').glob('*.png')):
        groups['posters'].append((f.stem, 'design', Image.open(f).convert('RGB')))
    exclude_file = src / 'signs-src' / 'exclude.txt'
    excluded = set()
    if exclude_file.exists():
        for line in exclude_file.read_text().splitlines():
            name = line.split('#')[0].strip()
            if name:
                excluded.add(name)
    for f in sorted((src / 'signs-src' / 'ads').glob('*vertical_digital_billboard*.png')):
        if f.name not in excluded:
            groups['screens'].append((f.stem, 'picture', Image.open(f).convert('RGB')))
    return groups


def pack(images, long_side):
    """Shelf-pack images scaled to long_side; placements by index, or None if they don't fit."""
    sized = []
    for i, (_, _, im) in enumerate(images):
        a = im.width / im.height
        w, h = (round(long_side * a), long_side) if a < 1 else (long_side, round(long_side / a))
        sized.append((i, max(w, 1), max(h, 1)))
    sized.sort(key=lambda s: -s[2])
    x = y = GUTTER
    shelf_h = 0
    places = {}
    for i, w, h in sized:
        if x + w + GUTTER > SIZE:
            y += shelf_h + GUTTER
            x, shelf_h = GUTTER, 0
        if y + h + GUTTER > SIZE:
            return None
        places[i] = (x, y, w, h)
        x += w + GUTTER
        shelf_h = max(shelf_h, h)
    return places


def brightness(image):
    """How bright a piece of art reads under the bloom: the geometric mean of its
    mean and 95th-percentile linear luminance. A neon sign on black (low mean,
    bright strokes) and a full-colour poster (high mean) land on one scale."""
    srgb = np.asarray(image, dtype=np.float32) / 255
    linear = np.where(srgb <= 0.04045, srgb / 12.92, ((srgb + 0.055) / 1.055) ** 2.4)
    lum = linear @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
    return float(np.sqrt(max(lum.mean(), 1e-6) * max(np.percentile(lum, 95), 1e-6)))


GAIN_RANGE = (0.35, 2.0)  # how far a piece may be dimmed or boosted


def edge(image):
    """How bright the art's border is: the 90th-percentile linear luminance of
    its outer 8%. Art on a dark background (low edge) works as a hologram, where
    black is see-through; a full-bleed picture would float as a lit rectangle."""
    srgb = np.asarray(image, dtype=np.float32) / 255
    linear = np.where(srgb <= 0.04045, srgb / 12.92, ((srgb + 0.055) / 1.055) ** 2.4)
    lum = linear @ np.array([0.2126, 0.7152, 0.0722], dtype=np.float32)
    h, w = lum.shape
    bh, bw = max(1, h * 8 // 100), max(1, w * 8 // 100)
    ring = np.concatenate([lum[:bh].ravel(), lum[-bh:].ravel(), lum[:, :bw].ravel(), lum[:, -bw:].ravel()])
    return float(np.percentile(ring, 90))


def build(name, images, out_json):
    # never upscale past the sources
    lo, hi = 64, min(2048, max(max(im.size) for _, _, im in images))
    while lo < hi:  # the largest long side that fits
        mid = (lo + hi + 1) // 2
        if pack(images, mid):
            lo = mid
        else:
            hi = mid - 1
    places = pack(images, lo)
    atlas = Image.new('RGB', (SIZE, SIZE), (0, 0, 0))
    entries = []
    for i, (entry_id, kind, im) in enumerate(images):
        x, y, w, h = places[i]
        resized = im.resize((w, h), Image.LANCZOS)
        atlas.paste(resized, (x, y))
        # UVs with a half-texel inset; v runs up (TextureLoader flips Y)
        entries.append({
            'id': entry_id,
            'kind': kind,
            'aspect': round(w / h, 4),
            'brightness': round(brightness(resized), 5),
            'edge': round(edge(resized), 5),
            'uv': [
                round((x + 0.5) / SIZE, 6),
                round(1 - (y + h - 0.5) / SIZE, 6),
                round((x + w - 0.5) / SIZE, 6),
                round(1 - (y + 0.5) / SIZE, 6),
            ],
        })
    file = f'textures/ads_{name}.webp'
    atlas.save(REPO / 'public' / 'assets' / file, 'WEBP', quality=88, method=6)
    out_json[name] = {'file': file, 'size': SIZE, 'longSide': lo, 'entries': entries}
    print(f'{name}: {len(entries)} entries, long side {lo}px -> public/assets/{file}')


def main():
    src = Path(sys.argv[1]).expanduser()
    groups = load_entries(src)
    out = {}
    for name in ('neon', 'posters', 'screens'):
        build(name, groups[name], out)
    # even out brightness: scale every piece towards the median of all art
    all_entries = [e for atlas in out.values() for e in atlas['entries']]
    target = float(np.median([e['brightness'] for e in all_entries]))
    for e in all_entries:
        e['gain'] = round(min(max(target / e['brightness'], GAIN_RANGE[0]), GAIN_RANGE[1]), 4)
    gains = sorted(e['gain'] for e in all_entries)
    print(f'gain: min {gains[0]}, median {gains[len(gains) // 2]}, max {gains[-1]} (target brightness {target:.4f})')
    path = REPO / 'src' / 'assets' / 'adAtlases.json'
    path.write_text(json.dumps(out, indent=1) + '\n')
    print(f'-> {path.relative_to(REPO)} (run Prettier on it)')


if __name__ == '__main__':
    main()
