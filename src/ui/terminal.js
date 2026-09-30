// Boot terminal, settings form and loading readout shown before launch.

import { userSettings, curatedWorldSeeds } from '../settings.js';

const version = '1.0.6';
const threeVersion = '0.159.0';

const controlsText = {
  drive: [
    'use mouse to look around/steer',
    'use mouse wheel to zoom',
    'press <space> to toggle autopilot',
    'hold <w> to boost, <s> to brake',
    'use <+> and <-> to adjust volume',
    'press <]> to skip current song',
    'press <p> to pause current song',
    'press <esc> to open terminal',
  ],
  freeroam: [
    'use <w,a,s,d> to move camera',
    'use mouse wheel to zoom',
    'use <r> and <f> to adjust height',
    'hold <shift> to increase speed',
    'use <+> and <-> to adjust volume',
    'press <]> to skip current song',
    'press <p> to pause current song',
    'press <esc> to open terminal',
  ],
};

const $ = (id) => document.getElementById(id);
const show = (id) => ($(id).style.display = '');
const hide = (id) => ($(id).style.display = 'none');
const checkedValue = (name) => document.querySelector(`input[name=${name}]:checked`).value;
const onChange = (name, fn) =>
  document.querySelectorAll(`input[name=${name}]`).forEach((el) => el.addEventListener('change', fn));

const terminal = $('terminal');
const resourcesTerminal = $('resources');
const controlsTerminal = $('controls');
const cursor = $('cursor');

let controlsInterval = null;
let colorClass = 'c1';

let bootDate = new Date().toISOString();
bootDate = '1982' + bootDate.substring(4, bootDate.length - 4);

// c1, c2, c3...
export function setColor(c) {
  colorClass = c;
}

export function write(s, speed, delay, callback) {
  let i = 0;
  const interval = setInterval(function () {
    const newNode = document.createElement('span');
    newNode.className = colorClass;
    newNode.appendChild(document.createTextNode(s.charAt(i) == ' ' ? '\u00A0' : s.charAt(i)));
    terminal.insertBefore(newNode, cursor);
    i++;
    if (i == s.length) {
      clearInterval(interval);
      setTimeout(callback, delay);
    }
  }, speed);
}

// promise form of write(); resolves after the trailing delay
const type = (s, speed = 0, delay = 0) => new Promise((resolve) => write(s, speed, delay, resolve));

export function newLine() {
  terminal.insertBefore(document.createElement('br'), cursor);
  terminal.scrollTop = terminal.scrollHeight;
}

function updateControls(arr) {
  controlsTerminal.innerHTML = '';
  clearInterval(controlsInterval);
  // only the first six lines fit in the panel
  const lines = arr.slice(0, 6);
  const next = (i) => {
    if (i < lines.length) writeControls(lines[i], () => next(i + 1));
  };
  next(0);
}

function writeControls(s, callback) {
  let i = 0;
  controlsTerminal.insertBefore(document.createElement('br'), controlsTerminal.lastChild);
  controlsInterval = setInterval(function () {
    const newNode = document.createElement('span');
    newNode.className = 'c1';
    newNode.appendChild(document.createTextNode(s.charAt(i)));
    controlsTerminal.insertBefore(newNode, controlsTerminal.lastChild);
    i++;
    if (i == s.length) {
      clearInterval(controlsInterval);
      if (callback) callback();
    }
  }, 0);
}

export function writeAsset(url, itemsLoaded, itemsTotal) {
  const exts = ['.cfg', '.dll', '.bio', '.tek', '.bin', '.syn', '.dna', '.xlc'];
  const coolName = makeId() + exts[Math.floor(Math.random() * exts.length)];
  const percent = ((itemsLoaded / itemsTotal) * 100).toFixed(2);

  resourcesTerminal.insertBefore(document.createElement('br'), resourcesTerminal.firstChild);
  const newNode = document.createElement('span');
  newNode.appendChild(document.createTextNode('>> [' + percent + '%] ' + coolName));
  resourcesTerminal.insertBefore(newNode, resourcesTerminal.firstChild);
}

const logo = [
  ['g1', '                      __  .__           .__  __        '],
  ['g1', '  _________.__. _____/  |_|  |__   ____ |__|/  |_ ___.__.'],
  ['g2', ' /  ___<   |  |/    \\   __\\  |  \\_/ ___\\|  \\   __<   |  |'],
  ['g3', ' \\___ \\ \\___  |   |  \\  | |   Y  \\  \\___|  ||  |  \\___  |'],
  ['g4', '/____  >/ ____|___|  /__| |___|  /\\___  >__||__|  / ____|'],
  ['g5', '     \\/ \\/         \\/          \\/     \\/          \\/     '],
];

async function bootSequence(onReady) {
  setColor('c1');
  await type('synthcity --run', 80, 500);
  newLine();

  if (isMobile()) {
    newLine();
    setColor('g1');
    await type('>> Error: Mobile devices not supported');
    return;
  }

  for (const [color, line] of logo) {
    setColor(color);
    await type(line);
    newLine();
  }
  newLine();
  setColor('g1');
  await type('   an interactive audiovisual experience by jeff beene');
  newLine();
  newLine();
  await type('▚▚▚▚▚▚▚▚▚▚▚▚▚▚▚▚▚▚▚▚▚▚▚▚▚▚▚▚▚▚▚▚▚', 0, 800);
  newLine();
  newLine();
  setColor('c3');
  await type('>> initiating boot sequence...', 0, 500);

  $('settings').style.display = 'block';
  updateControls(userSettings.mode == 'freeroam' ? controlsText.freeroam : controlsText.drive);

  newLine();
  newLine();
  setColor('c4');
  const info = [
    'build version: ' + version,
    'system manufacturer: jeff beene [www.jeff-beene.com]',
    'system boot time: ' + bootDate,
    'os name: three.js',
    'os version: ' + threeVersion,
    'audio driver: uppbeat.io',
  ];
  for (let i = 0; i < info.length; i++) {
    if (i > 0) newLine();
    await type(info[i], 0, 50);
  }
  newLine();
  newLine();
  setColor('c3');
  await type('>> loading resources...', 0, 50);
  onReady();
}

const credits = [
  '<3d graphics library> three.js [threejs.org]',
  '<bladerunner car> quaz30 [sketchfab.com/quaz30]',
  '<sound fx> freesound [freesound.org]',
  null,
  '# Music from #Uppbeat (free for Creators!)',
  null,
  '<prigida> [uppbeat.io/browse/artist/prigida]',
  '<pecan-pie> [uppbeat.io/browse/artist/pecan-pie]',
  '<mountaineer> [uppbeat.io/browse/artist/mountaineer]',
  '<d0d> [uppbeat.io/browse/artist/d0d]',
  '<fass> [uppbeat.io/browse/artist/fass]',
  '<tatami> [uppbeat.io/browse/artist/tatami]',
  '<kaleidoscope> [uppbeat.io/browse/artist/kaleidoscope]',
  '<noise-cake> [uppbeat.io/browse/artist/noise-cake]',
  '<mood-maze> [uppbeat.io/browse/artist/mood-maze]',
  '<bosnow> [uppbeat.io/browse/artist/bosnow]',
  '<tecnosine> [uppbeat.io/browse/artist/tecnosine]',
];

export function showCredits() {
  setTimeout(async function () {
    newLine();
    newLine();
    setColor('c1');
    await type('synthcity --credits', 80, 800);
    newLine();
    newLine();
    setColor('c4');
    for (const line of credits) {
      if (line === null) {
        newLine();
        continue;
      }
      await type(line, 0, 50);
      newLine();
    }
  }, 2500);
}

// Reflect settings (possibly set from query params) in the form.
function syncForm() {
  const check = (name, value) => {
    const el = document.querySelector(`input[name=${name}][value="${value}"]`);
    if (el) el.checked = true;
  };
  if (userSettings.mode) check('settingsMode', userSettings.mode);
  if (userSettings.mode == 'freeroam') hide('settingsWindshieldShaderContainer');
  if (userSettings.renderScaling) check('settingsRenderScaling', userSettings.renderScaling);
  if (userSettings.windshieldShader) check('settingsWindshieldShader', userSettings.windshieldShader);
  if (!curatedWorldSeeds.includes(Number(userSettings.worldSeed))) {
    check('settingsWorldSeed', 'custom');
    $('settingsWorldSeedValue').value = userSettings.worldSeed;
    show('settingsWorldSeedValueContainer');
  }
}

function bindForm() {
  $('enterBtn').addEventListener('click', () => {
    $('settings').classList.add('locked');
    show('settingsLockMessage');
  });

  onChange('settingsMode', () => {
    const val = checkedValue('settingsMode');
    userSettings.mode = val;
    if (val == 'drive') {
      updateControls(controlsText.drive);
      show('settingsWindshieldShaderContainer');
    } else if (val == 'freeroam') {
      updateControls(controlsText.freeroam);
      hide('settingsWindshieldShaderContainer');
    }
  });

  onChange('settingsWorldSeed', () => {
    const val = checkedValue('settingsWorldSeed');
    if (val == 'curated') {
      hide('settingsWorldSeedValueContainer');
      userSettings.worldSeed = curatedWorldSeeds[Math.floor(Math.random() * curatedWorldSeeds.length)];
    } else if (val == 'random') {
      hide('settingsWorldSeedValueContainer');
      userSettings.worldSeed = Math.round(Math.random() * 999999);
    } else if (val == 'custom') {
      $('settingsWorldSeedValue').value = userSettings.worldSeed;
      show('settingsWorldSeedValueContainer');
      userSettings.worldSeed = $('settingsWorldSeedValue').value;
    }
  });
  $('settingsWorldSeedValue').addEventListener('input', (e) => {
    userSettings.worldSeed = e.target.value;
  });

  onChange('settingsRenderScaling', () => {
    userSettings.renderScaling = checkedValue('settingsRenderScaling');
  });
  onChange('settingsWindshieldShader', () => {
    userSettings.windshieldShader = checkedValue('settingsWindshieldShader');
  });
}

// Wire up the form and start typing; onReady fires when assets should load.
export function startTerminal(onReady) {
  const start = () => {
    bindForm();
    syncForm();
    if (userSettings.skip) {
      // ?skip=1: no boot animation, load right away (the game launches itself)
      setColor('c3');
      write('>> boot skipped, loading resources...', 0, 0, null);
      onReady();
    } else {
      setTimeout(() => bootSequence(onReady), 800);
    }
  };
  if (document.readyState === 'complete') start();
  else window.addEventListener('load', start);

  // cursor blink
  let cursorVisible = true;
  setInterval(() => {
    cursorVisible = !cursorVisible;
    cursor.style.visibility = cursorVisible ? 'visible' : 'hidden';
  }, 400);
}

function isMobile() {
  const a = navigator.userAgent || navigator.vendor || window.opera;
  return (
    /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
      a,
    ) ||
    /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw-(n|u)|c55\/|capi|ccwa|cdm-|cell|chtm|cldc|cmd-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc-s|devi|dica|dmob|do(c|p)o|ds(12|-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(-|_)|g1 u|g560|gene|gf-5|g-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd-(m|p|t)|hei-|hi(pt|ta)|hp( i|ip)|hs-c|ht(c(-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i-(20|go|ma)|i230|iac( |-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|-[a-w])|libw|lynx|m1-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|-([1-8]|c))|phil|pire|pl(ay|uc)|pn-2|po(ck|rt|se)|prox|psio|pt-g|qa-a|qc(07|12|21|32|60|-[2-7]|i-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h-|oo|p-)|sdk\/|se(c(-|0|1)|47|mc|nd|ri)|sgh-|shar|sie(-|m)|sk-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h-|v-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl-|tdg-|tel(i|m)|tim-|t-mo|to(pl|sh)|ts(70|m-|m3|m5)|tx-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas-|your|zeto|zte-/i.test(
      a.substr(0, 4),
    )
  );
}

function makeId() {
  const length = 16 + Math.random() * 28;
  const characters = '$%@~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-';
  let result = '';
  for (let counter = 0; counter < length; counter++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
