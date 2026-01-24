import { createContext, useContext, useMemo, useRef, useState } from "react";
import type { Dispatch, SetStateAction, MutableRefObject } from "react";

export type QualityLevel = "low" | "medium" | "high";
export type FrameRateLimit = 0 | 30 | 60 | 120; // 0 = unlimited

/**
 * Debug visibility toggles for different object types
 * Useful for identifying objects in the scene and measuring performance impact
 */
export type VisibilitySettings = {
  buildings: boolean;
  megaBuildings: boolean;
  ads: boolean;
  smoke: boolean;
  spotlights: boolean;
  toppers: boolean;
  trafficCars: boolean;
  playerCar: boolean;
  ground: boolean;
  storefronts: boolean;
  cityLights: boolean;
};

export type GameSettings = {
  mode: string;
  worldSeed: number;
  music: boolean;
  soundFx: boolean;
  windshieldShader: string;
  renderScaling: number;
  visualPreset: string;
  qualityLevel: QualityLevel;
  frameRateLimit: FrameRateLimit;
  visibility: VisibilitySettings;
};

type GameStore = {
  settings: GameSettings;
  setSettings: Dispatch<SetStateAction<GameSettings>>;
  launchReady: boolean;
  setLaunchReady: Dispatch<SetStateAction<boolean>>;
  showBlocker: boolean;
  setShowBlocker: Dispatch<SetStateAction<boolean>>;
  showCrash: boolean;
  setShowCrash: Dispatch<SetStateAction<boolean>>;
  gameRef: MutableRefObject<any>;
  terminalRef: MutableRefObject<any>;
};

const GameContext = createContext<GameStore | null>(null);

const defaultSettings: GameSettings = {
  mode: "drive",
  worldSeed: 9746,
  music: true,
  soundFx: true,
  windshieldShader: "simple",
  renderScaling: 1.0,
  visualPreset: "Default",
  qualityLevel: "low",
  frameRateLimit: 60,
  visibility: {
    buildings: true,
    megaBuildings: true,
    ads: true,
    smoke: true,
    spotlights: true,
    toppers: true,
    trafficCars: true,
    playerCar: true,
    ground: true,
    storefronts: true,
    cityLights: true,
  },
};

export function GameProvider({ children }) {
  const [settings, setSettings] = useState(defaultSettings);
  const [launchReady, setLaunchReady] = useState(false);
  const [showBlocker, setShowBlocker] = useState(true);
  const [showCrash, setShowCrash] = useState(false);
  const gameRef = useRef(null);
  const terminalRef = useRef(null);

  const value = useMemo(
    () => ({
      settings,
      setSettings,
      launchReady,
      setLaunchReady,
      showBlocker,
      setShowBlocker,
      showCrash,
      setShowCrash,
      gameRef,
      terminalRef,
    }),
    [settings, launchReady, showBlocker, showCrash],
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGameStore() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGameStore must be used within GameProvider");
  }
  return context;
}
