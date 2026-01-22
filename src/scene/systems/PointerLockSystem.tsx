import { useEffect } from "react";
import { useGameStore } from "../../context/GameContext";

export function PointerLockSystem() {
  const { gameRef, setShowBlocker } = useGameStore();

  useEffect(() => {
    function handlePointerLockChange() {
      const game = gameRef.current;
      if (!game || !game.playerController) {
        return;
      }

      const target = game.pointerLockElement || game.canvas || document.body;
      if (document.pointerLockElement === target) {
        game.playerController.enabled = true;
        setShowBlocker(false);
      } else {
        game.playerController.enabled = false;
        if (game.uiOnUnfocus) {
          setShowBlocker(true);
        }
      }
    }

    document.addEventListener("pointerlockchange", handlePointerLockChange);
    return () => {
      document.removeEventListener(
        "pointerlockchange",
        handlePointerLockChange,
      );
    };
  }, [gameRef, setShowBlocker]);

  return null;
}
