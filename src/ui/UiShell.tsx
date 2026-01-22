import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent } from 'react';
import { useGameStore } from '../context/GameContext';
import { initTerminal } from './initTerminal';
import { PRESET_NAMES } from '../scene/effects';

const curatedWorldSeeds = [9746, 6362, 4217, 5794];

const controlsText = {
  drive: [
    'use mouse to look around/steer',
    'use mouse wheel to zoom',
    'press <space> to toggle autopilot',
    'hold <w> to boost, <s> to brake',
    'use <+> and <-> to adjust volume',
    'press <]> to skip current song',
    'press <p> to pause current song',
    'press <esc> to open terminal'
  ],
  freeroam: [
    'use <w,a,s,d> to move camera',
    'use mouse wheel to zoom',
    'use <r> and <f> to adjust height',
    'hold <shift> to increase speed',
    'use <+> and <-> to adjust volume',
    'press <]> to skip current song',
    'press <p> to pause current song',
    'press <esc> to open terminal'
  ]
};

function randomCuratedSeed() {
  return curatedWorldSeeds[Math.floor(Math.random() * curatedWorldSeeds.length)];
}

export default function UiShell() {
  const {
    settings,
    setSettings,
    gameRef,
    terminalRef,
    launchReady,
    showBlocker,
    setShowBlocker,
    showCrash
  } = useGameStore();
  const terminalRefLocal = useRef<HTMLDivElement | null>(null);
  const resourcesRef = useRef<HTMLDivElement | null>(null);
  const controlsRef = useRef<HTMLDivElement | null>(null);
  const cursorRef = useRef<HTMLSpanElement | null>(null);

  const [showSettings, setShowSettings] = useState(false);
  const [settingsLocked, setSettingsLocked] = useState(false);
  const [mode, setMode] = useState(settings.mode ?? 'drive');
  const [worldSeedMode, setWorldSeedMode] = useState('curated');
  const [worldSeedValue, setWorldSeedValue] = useState(settings.worldSeed ?? randomCuratedSeed());
  const [renderScaling, setRenderScaling] = useState(String(settings.renderScaling ?? 1));
  const [windshieldShader, setWindshieldShader] = useState(settings.windshieldShader ?? 'simple');
  const [visualPreset, setVisualPreset] = useState(settings.visualPreset ?? 'Default');

  useEffect(() => {
    const { api, cleanup } = initTerminal({
      terminalEl: terminalRefLocal.current,
      resourcesEl: resourcesRef.current,
      controlsEl: controlsRef.current,
      cursorEl: cursorRef.current,
      onShowSettings: () => {
        setShowSettings(true);
        if (api?.updateControls) {
          api.updateControls(controlsText[mode]);
        }
      },
      onStartLoad: () => {
        if (gameRef.current && gameRef.current.load) {
          gameRef.current.load();
        }
      }
    });

    terminalRef.current = api || null;
    if (gameRef.current && gameRef.current.setTerminal) {
      gameRef.current.setTerminal(api || null);
    }

    return cleanup;
  }, []);

  useEffect(() => {
    setSettings((prev) => ({ ...prev, mode }));
    if (terminalRef.current?.updateControls) {
      terminalRef.current.updateControls(controlsText[mode]);
    }
  }, [mode]);

  useEffect(() => {
    setSettings((prev) => ({ ...prev, worldSeed: worldSeedValue }));
  }, [worldSeedValue]);

  useEffect(() => {
    setSettings((prev) => ({ ...prev, renderScaling: parseFloat(renderScaling) }));
  }, [renderScaling]);

  useEffect(() => {
    setSettings((prev) => ({ ...prev, windshieldShader }));
  }, [windshieldShader]);

  useEffect(() => {
    setSettings((prev) => ({ ...prev, visualPreset }));
  }, [visualPreset]);

  function handleModeChange(event: ChangeEvent<HTMLInputElement>) {
    setMode(event.target.value);
  }

  function handleWorldSeedModeChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setWorldSeedMode(value);

    if (value === 'curated') {
      setWorldSeedValue(randomCuratedSeed());
    } else if (value === 'random') {
      setWorldSeedValue(Math.round(Math.random() * 999999));
    }
  }

  function handleWorldSeedValueChange(event: ChangeEvent<HTMLInputElement>) {
    setWorldSeedValue(Number(event.target.value));
  }

  function handleRenderScalingChange(event: ChangeEvent<HTMLInputElement>) {
    setRenderScaling(event.target.value);
  }

  function handleWindshieldShaderChange(event: ChangeEvent<HTMLInputElement>) {
    setWindshieldShader(event.target.value);
  }

  function handleVisualPresetChange(event: ChangeEvent<HTMLInputElement>) {
    setVisualPreset(event.target.value);
  }

  function handleEnterClick() {
    setSettingsLocked(true);
    const game = gameRef.current;
    if (game) {
      game.onEnterClick();
      if (!game.initialized) {
        return;
      }
      setShowBlocker(false);
      const target = game.canvas || document.body;
      if (target && target.requestPointerLock) {
        target.requestPointerLock();
      }
    }
  }

  return (
    <>
      <div id="blocker" className={showBlocker ? '' : 'hide'}>
        <div id="container">
          <div className="tCol leftCol">
            <div className="tRow" style={{ height: '100%' }}>
              <div className="tHeader">&gt;Terminal</div>
              <div id="terminal" ref={terminalRefLocal}>
                <span id="cursor" ref={cursorRef}>
                  &#9619;
                </span>
              </div>
            </div>
          </div>
          <div className="tCol rightCol" style={{ width: 'calc(100% - 540px)' }}>
            <div className="tRow" style={{ height: '25%' }}>
              <div className="tHeader">#Resources</div>
              <div id="resources" ref={resourcesRef}>
                &gt;&gt; No resources queued
              </div>
            </div>
            <div className="tRow" style={{ height: '25%' }}>
              <div className="tHeader">#Settings</div>
              <div
                id="settings"
                className={settingsLocked ? 'locked' : ''}
                style={{ display: showSettings ? 'block' : 'none' }}
              >
                <div
                  id="settingsLockMessage"
                  className="g1"
                  style={{ display: settingsLocked ? 'block' : 'none', marginBottom: '10px' }}
                >
                  &gt;&gt; Settings locked: refresh page to unlock
                </div>
                <div style={{ marginBottom: '5px' }}>
                  <span>Mode:</span>
                  <label className="formCheckContainer">
                    <input
                      type="radio"
                      name="settingsMode"
                      value="drive"
                      checked={mode === 'drive'}
                      onChange={handleModeChange}
                    />
                    <span className="checkmark">[Drive]</span>
                  </label>
                  <label className="formCheckContainer">
                    <input
                      type="radio"
                      name="settingsMode"
                      value="freeroam"
                      checked={mode === 'freeroam'}
                      onChange={handleModeChange}
                    />
                    <span className="checkmark">[Freeroam]</span>
                  </label>
                </div>
                <div style={{ marginBottom: '5px' }}>
                  <span>World Seed:</span>
                  <label className="formCheckContainer">
                    <input
                      type="radio"
                      name="settingsWorldSeed"
                      value="curated"
                      checked={worldSeedMode === 'curated'}
                      onChange={handleWorldSeedModeChange}
                    />
                    <span className="checkmark">[Curated]</span>
                  </label>
                  <label className="formCheckContainer">
                    <input
                      type="radio"
                      name="settingsWorldSeed"
                      value="random"
                      checked={worldSeedMode === 'random'}
                      onChange={handleWorldSeedModeChange}
                    />
                    <span className="checkmark">[Random]</span>
                  </label>
                  <label className="formCheckContainer">
                    <input
                      type="radio"
                      name="settingsWorldSeed"
                      value="custom"
                      checked={worldSeedMode === 'custom'}
                      onChange={handleWorldSeedModeChange}
                    />
                    <span className="checkmark">[Custom]</span>
                  </label>
                </div>
                <div
                  id="settingsWorldSeedValueContainer"
                  style={{ display: worldSeedMode === 'custom' ? 'block' : 'none', marginBottom: '5px' }}
                >
                  <span>Seed:</span>
                  <input
                    type="number"
                    id="settingsWorldSeedValue"
                    name="settingsWorldSeedValue"
                    value={Number.isNaN(worldSeedValue) ? 0 : worldSeedValue}
                    onChange={handleWorldSeedValueChange}
                  />
                </div>
                <div style={{ marginBottom: '5px' }}>
                  <span>Render Scaling:</span>
                  <label className="formCheckContainer">
                    <input
                      type="radio"
                      name="settingsRenderScaling"
                      value="1"
                      checked={renderScaling === '1'}
                      onChange={handleRenderScalingChange}
                    />
                    <span className="checkmark">[1.0x]</span>
                  </label>
                  <label className="formCheckContainer">
                    <input
                      type="radio"
                      name="settingsRenderScaling"
                      value="1.5"
                      checked={renderScaling === '1.5'}
                      onChange={handleRenderScalingChange}
                    />
                    <span className="checkmark">[1.5x]</span>
                  </label>
                  <label className="formCheckContainer">
                    <input
                      type="radio"
                      name="settingsRenderScaling"
                      value="2"
                      checked={renderScaling === '2'}
                      onChange={handleRenderScalingChange}
                    />
                    <span className="checkmark">[2.0x]</span>
                  </label>
                </div>
                <div
                  id="settingsWindshieldShaderContainer"
                  style={{ marginBottom: '5px', display: mode === 'drive' ? 'block' : 'none' }}
                >
                  <span>Windshield FX:</span>
                  <label className="formCheckContainer">
                    <input
                      type="radio"
                      name="settingsWindshieldShader"
                      value="simple"
                      checked={windshieldShader === 'simple'}
                      onChange={handleWindshieldShaderChange}
                    />
                    <span className="checkmark">[Simple]</span>
                  </label>
                  <label className="formCheckContainer">
                    <input
                      type="radio"
                      name="settingsWindshieldShader"
                      value="advanced"
                      checked={windshieldShader === 'advanced'}
                      onChange={handleWindshieldShaderChange}
                    />
                    <span className="checkmark">[Advanced]</span>
                  </label>
                </div>
                <div style={{ marginBottom: '5px' }}>
                  <span>Visual FX:</span>
                  {PRESET_NAMES.map((presetName) => (
                    <label key={presetName} className="formCheckContainer">
                      <input
                        type="radio"
                        name="settingsVisualPreset"
                        value={presetName}
                        checked={visualPreset === presetName}
                        onChange={handleVisualPresetChange}
                      />
                      <span className="checkmark">[{presetName}]</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className="tRow" style={{ height: '25%' }}>
              <div className="tHeader">#Controls</div>
              <div id="controls" ref={controlsRef}>
                &gt;&gt; No program loaded
              </div>
            </div>
            <div className="tRow" style={{ height: '32px' }}>
              <button id="enterBtn" style={{ display: launchReady ? 'block' : 'none' }} onClick={handleEnterClick}>
                &gt;&gt;Launch&lt;&lt;
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="crashMessage" style={{ display: showCrash ? 'flex' : 'none' }}>
        <div className="g1">[ You crashed ]</div>
      </div>

    </>
  );
}
