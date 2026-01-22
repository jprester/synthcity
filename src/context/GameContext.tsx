import { createContext, useContext, useMemo, useRef, useState } from 'react';
import type { Dispatch, SetStateAction, MutableRefObject } from 'react';

export type GameSettings = {
  mode: string;
  worldSeed: number;
  music: boolean;
  soundFx: boolean;
  windshieldShader: string;
  renderScaling: number;
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
  mode: 'drive',
  worldSeed: 9746,
  music: true,
  soundFx: true,
  windshieldShader: 'simple',
  renderScaling: 1.0
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
      terminalRef
    }),
    [settings, launchReady, showBlocker, showCrash]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
}

export function useGameStore() {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGameStore must be used within GameProvider');
  }
  return context;
}
