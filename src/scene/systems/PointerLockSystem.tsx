import { useEffect, useCallback } from "react";
import { useGameStore } from "../../context/GameContext";

export function PointerLockSystem() {
  const { gameRef, setShowBlocker } = useGameStore();

  const handlePointerLockChange = useCallback(() => {
    const game = gameRef.current;
    if (!game) {
      return;
    }

    const target = game.pointerLockElement || game.canvas || document.body;
    const isLocked = document.pointerLockElement === target;

    // If game is not initialized yet, we can't enable controls
    // but we should still track that pointer lock was requested
    if (!game.playerController) {
      // Store the pending state so it can be applied when game initializes
      game.__pendingPointerLock = isLocked;
      return;
    }

    if (isLocked) {
      game.playerController.enabled = true;
      setShowBlocker(false);
    } else {
      game.playerController.enabled = false;
      if (game.uiOnUnfocus) {
        setShowBlocker(true);
      }
    }
  }, [gameRef, setShowBlocker]);

  // Listen for pointer lock changes
  useEffect(() => {
    document.addEventListener("pointerlockchange", handlePointerLockChange);
    return () => {
      document.removeEventListener(
        "pointerlockchange",
        handlePointerLockChange,
      );
    };
  }, [handlePointerLockChange]);

  // Also check on mount and when game initializes to handle pending state
  useEffect(() => {
    const game = gameRef.current;
    if (game?.playerController && game.__pendingPointerLock) {
      const target = game.pointerLockElement || game.canvas || document.body;
      if (document.pointerLockElement === target) {
        game.playerController.enabled = true;
        setShowBlocker(false);
      }
      game.__pendingPointerLock = false;
    }
  });

  return null;
}
