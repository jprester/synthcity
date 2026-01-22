import { useEffect, useMemo } from 'react';

export function usePlayerController() {
  const controller = useMemo(
    () => ({
      enabled: false,
      mouse_move_x: 0,
      mouse_move_y: 0,
      mouse_scroll: 0,
      key_right: false,
      key_down: false,
      key_left: false,
      key_up: false,
      key_shift: false,
      key_plus: false,
      key_minus: false,
      key_f: false,
      key_r: false,
      key_pressed_f: false,
      key_pressed_r: false,
      key_pressed_right_bracket: false,
      key_pressed_left_bracket: false,
      key_pressed_p: false,
      key_pressed_space: false,
      key_pressed_1: false,
      key_pressed_2: false,
      key_pressed_3: false,
      mb_right: false,
      mb_middle: false,
      mb_left: false,
      mb_left_released: false,
      update() {
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
      },
      on_mouse_wheel(event) {
        this.mouse_scroll = event.deltaY;
      },
      get_mouse_wheel() {
        const v = this.mouse_scroll;
        this.mouse_scroll = 0;
        return v;
      },
      on_mouse_move(event) {
        if (this.enabled) {
          this.mouse_move_x =
            event.movementX || event.mozMovementX || event.webkitMovementX || 0;
          this.mouse_move_y =
            event.movementY || event.mozMovementY || event.webkitMovementY || 0;
        }
      },
      on_key_down(event) {
        if (this.enabled) {
          switch (event.code) {
            case 'Digit1':
              this.key_pressed_1 = true;
              break;
            case 'Digit2':
              this.key_pressed_2 = true;
              break;
            case 'Digit3':
              this.key_pressed_3 = true;
              break;
            case 'KeyD':
              this.key_right = true;
              break;
            case 'KeyS':
              this.key_down = true;
              break;
            case 'KeyA':
              this.key_left = true;
              break;
            case 'KeyW':
              this.key_up = true;
              break;
            case 'ShiftLeft':
              this.key_shift = true;
              break;
            case 'Equal':
              this.key_plus = true;
              break;
            case 'Minus':
              this.key_minus = true;
              break;
            case 'BracketLeft':
              this.key_pressed_left_bracket = true;
              break;
            case 'BracketRight':
              this.key_pressed_right_bracket = true;
              break;
            case 'KeyP':
              this.key_pressed_p = true;
              break;
            case 'Space':
              this.key_pressed_space = true;
              break;
            case 'KeyF':
              this.key_f = true;
              this.key_pressed_f = true;
              break;
            case 'KeyR':
              this.key_r = true;
              this.key_pressed_r = true;
              break;
            default:
              break;
          }
        }
      },
      on_key_up(event) {
        if (this.enabled) {
          switch (event.code) {
            case 'KeyD':
              this.key_right = false;
              break;
            case 'KeyS':
              this.key_down = false;
              break;
            case 'KeyA':
              this.key_left = false;
              break;
            case 'KeyW':
              this.key_up = false;
              break;
            case 'ShiftLeft':
              this.key_shift = false;
              break;
            case 'Equal':
              this.key_plus = false;
              break;
            case 'Minus':
              this.key_minus = false;
              break;
            case 'KeyF':
              this.key_f = false;
              break;
            case 'KeyR':
              this.key_r = false;
              break;
            default:
              break;
          }
        }
      },
      on_mouse_down(event) {
        if (this.enabled) {
          switch (event.which) {
            case 1:
              this.mb_left = true;
              break;
            case 2:
              this.mb_middle = true;
              break;
            case 3:
              this.mb_right = true;
              break;
            default:
              break;
          }
        }
      },
      on_mouse_up(event) {
        if (this.enabled) {
          switch (event.which) {
            case 1:
              this.mb_left = false;
              this.mb_left_released = true;
              break;
            case 2:
              this.mb_middle = false;
              break;
            case 3:
              this.mb_right = false;
              break;
            default:
              break;
          }
        }
      }
    }),
    []
  );

  useEffect(() => {
    const onMouseMove = (event) => controller.on_mouse_move(event);
    const onMouseDown = (event) => controller.on_mouse_down(event);
    const onMouseUp = (event) => controller.on_mouse_up(event);
    const onKeyDown = (event) => controller.on_key_down(event);
    const onKeyUp = (event) => controller.on_key_up(event);
    const onMouseWheel = (event) => controller.on_mouse_wheel(event);

    document.addEventListener('mousemove', onMouseMove, false);
    document.addEventListener('mousedown', onMouseDown, false);
    document.addEventListener('mouseup', onMouseUp, false);
    document.addEventListener('keydown', onKeyDown, false);
    document.addEventListener('keyup', onKeyUp, false);
    document.addEventListener('mousewheel', onMouseWheel, false);

    return () => {
      document.removeEventListener('mousemove', onMouseMove, false);
      document.removeEventListener('mousedown', onMouseDown, false);
      document.removeEventListener('mouseup', onMouseUp, false);
      document.removeEventListener('keydown', onKeyDown, false);
      document.removeEventListener('keyup', onKeyUp, false);
      document.removeEventListener('mousewheel', onMouseWheel, false);
    };
  }, [controller]);

  return controller;
}
