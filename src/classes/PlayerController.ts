export { PlayerController };

// Keyboard and mouse state, read by the players each frame. key_pressed_* and
// mb_left_released are one-frame edges cleared by update().
class PlayerController {
  enabled = false;
  mouse_move_x = 0;
  mouse_move_y = 0;
  mouse_scroll = 0;
  key_right = false;
  key_down = false;
  key_left = false;
  key_up = false;
  key_shift = false;
  key_plus = false;
  key_minus = false;
  key_f = false;
  key_r = false;
  key_pressed_f = false;
  key_pressed_r = false;
  key_pressed_right_bracket = false;
  key_pressed_left_bracket = false;
  key_pressed_p = false;
  key_pressed_space = false;
  key_pressed_1 = false;
  key_pressed_2 = false;
  key_pressed_3 = false;
  mb_right = false;
  mb_middle = false;
  mb_left = false;
  mb_left_released = false;

  constructor() {
    document.addEventListener('mousemove', (event) => this.on_mouse_move(event), false);
    document.addEventListener('mousedown', (event) => this.on_mouse_down(event), false);
    document.addEventListener('mouseup', (event) => this.on_mouse_up(event), false);
    document.addEventListener('keydown', (event) => this.on_key_down(event), false);
    document.addEventListener('keyup', (event) => this.on_key_up(event), false);
    document.addEventListener('wheel', (event) => this.on_mouse_wheel(event), false);
  }

  update(): void {
    this.mouse_move_x = 0;
    this.mouse_move_y = 0;
    this.key_pressed_f = false;
    this.key_pressed_r = false;
    this.key_pressed_right_bracket = false;
    this.key_pressed_left_bracket = false;
    this.key_pressed_p = false;
    this.key_pressed_space = false;
    this.key_pressed_1 = false;
    this.key_pressed_2 = false;
    this.key_pressed_3 = false;
    this.mb_left_released = false;
  }

  on_mouse_wheel(event: WheelEvent): void {
    // Firefox reports lines (deltaMode 1) where Chrome reports pixels; one
    // notch is ~3 lines or ~100 px
    this.mouse_scroll = event.deltaMode == 1 ? event.deltaY * 33 : event.deltaY;
  }
  get_mouse_wheel(): number {
    const v = this.mouse_scroll;
    this.mouse_scroll = 0;
    return v;
  }

  on_mouse_move(event: MouseEvent): void {
    if (this.enabled) {
      this.mouse_move_x = event.movementX || 0;
      this.mouse_move_y = event.movementY || 0;
    }
  }

  on_key_down(event: KeyboardEvent): void {
    if (this.enabled) {
      switch (event.code) {
        case 'Digit1': //1
          this.key_pressed_1 = true;
          break;
        case 'Digit2': //2
          this.key_pressed_2 = true;
          break;
        case 'Digit3': //3
          this.key_pressed_3 = true;
          break;
        case 'KeyD': //d
          this.key_right = true;
          break;
        case 'KeyS': //s
          this.key_down = true;
          break;
        case 'KeyA': //a
          this.key_left = true;
          break;
        case 'KeyW': //w
          this.key_up = true;
          break;
        case 'ShiftLeft': //shift
          this.key_shift = true;
          break;
        case 'Equal': //plus
          this.key_plus = true;
          break;
        case 'Minus': //minus
          this.key_minus = true;
          break;
        case 'BracketLeft': //left bracket
          this.key_pressed_left_bracket = true;
          break;
        case 'BracketRight': //right bracket
          this.key_pressed_right_bracket = true;
          break;
        case 'KeyP': //p
          this.key_pressed_p = true;
          break;
        case 'Space': //space
          this.key_pressed_space = true;
          break;
        case 'KeyF': //f
          this.key_f = true;
          this.key_pressed_f = true;
          break;
        case 'KeyR': //r
          this.key_r = true;
          this.key_pressed_r = true;
          break;
      }
    }
  }

  on_key_up(event: KeyboardEvent): void {
    if (this.enabled) {
      switch (event.code) {
        case 'KeyD': //d
          this.key_right = false;
          break;
        case 'KeyS': //s
          this.key_down = false;
          break;
        case 'KeyA': //a
          this.key_left = false;
          break;
        case 'KeyW': //w
          this.key_up = false;
          break;
        case 'ShiftLeft': //shift
          this.key_shift = false;
          break;
        case 'Equal': //plus
          this.key_plus = false;
          break;
        case 'Minus': //minus
          this.key_minus = false;
          break;
        case 'KeyF': //f
          this.key_f = false;
          break;
        case 'KeyR': //r
          this.key_r = false;
          break;
      }
    }
  }

  on_mouse_down(event: MouseEvent): void {
    if (this.enabled) {
      switch (event.button) {
        case 0:
          this.mb_left = true;
          break;
        case 1:
          this.mb_middle = true;
          break;
        case 2:
          this.mb_right = true;
          break;
      }
    }
  }

  on_mouse_up(event: MouseEvent): void {
    if (this.enabled) {
      switch (event.button) {
        case 0:
          this.mb_left = false;
          this.mb_left_released = true;
          break;
        case 1:
          this.mb_middle = false;
          break;
        case 2:
          this.mb_right = false;
          break;
      }
    }
  }
}
