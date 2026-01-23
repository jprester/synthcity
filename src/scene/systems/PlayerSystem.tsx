import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { useGameStore } from "../../context/GameContext";
import { PlayerCarVisuals } from "../visuals/PlayerCarVisuals";

export function PlayerSystem() {
  const { gameRef, settings } = useGameStore();
  const playerRef = useRef<any>(null);
  const [player, setPlayer] = useState<any>(null);

  useFrame((state, delta) => {
    const game = gameRef.current;
    if (!game || !game.isRunning) {
      return;
    }

    if (game.player && game.player !== playerRef.current) {
      playerRef.current = game.player;
      setPlayer(game.player);
    }

    game.updatePlayer(delta);

    if (!game.collider.enabled) {
      game.collider.enabled = true;
    }
  }, 1);

  const game = gameRef.current;
  const shouldRenderCar = Boolean(
    player?.carPose && game?.assets && settings.visibility.playerCar
  );

  return shouldRenderCar ? (
    <PlayerCarVisuals
      player={player}
      game={game}
      windshieldShader={settings.windshieldShader}
    />
  ) : null;
}
