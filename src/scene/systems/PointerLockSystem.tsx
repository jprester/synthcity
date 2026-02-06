import { useEffect, useCallback } from "react";
import { useGameStore } from "../../context/GameContext";

export function PointerLockSystem() {
  const { gameRef, setShowBlocker } = useGameStore();

  const syncPointerLockState = useCallback(() => {
    const game = gameRef.current;
    if (!game) {
      return;
    }

    const target = game.pointerLockElement || game.canvas || document.body;
    const isLocked = document.pointerLockElement === target;

    if (!game.initialized || !game.playerController) {
      setShowBlocker(true);
      return;
    }

    game.playerController.enabled = isLocked;
    if (isLocked) {
      setShowBlocker(false);
    } else if (game.uiOnUnfocus) {
      setShowBlocker(true);
    }
  }, [gameRef, setShowBlocker]);

  const handlePointerLockChange = useCallback(() => {
    syncPointerLockState();
  }, [syncPointerLockState]);

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

  useEffect(() => {
    syncPointerLockState();
  }, [syncPointerLockState]);

  return null;
}
