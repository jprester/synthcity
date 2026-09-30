// In-game overlays shown over the canvas.

export function setCrashMessage(visible: boolean): void {
  document.getElementById('crashMessage')!.style.display = visible ? 'flex' : 'none';
}
