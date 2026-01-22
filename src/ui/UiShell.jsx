import { useEffect, useRef, useState } from 'react';
import { startGame } from '../index.js';
import { initTerminal } from './initTerminal.js';

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
  const terminalRef = useRef(null);
  const resourcesRef = useRef(null);
  const controlsRef = useRef(null);
  const cursorRef = useRef(null);

  const [showSettings, setShowSettings] = useState(false);
  const [settingsLocked, setSettingsLocked] = useState(false);
  const [mode, setMode] = useState('drive');
  const [worldSeedMode, setWorldSeedMode] = useState('curated');
  const [worldSeedValue, setWorldSeedValue] = useState(randomCuratedSeed);
  const [renderScaling, setRenderScaling] = useState('1');
  const [windshieldShader, setWindshieldShader] = useState('simple');

  useEffect(() => {
    window.userSettings = window.userSettings || {};
    window.userSettings.worldSeed = worldSeedValue;
    window.userSettings.mode = mode;
    window.userSettings.renderScaling = parseFloat(renderScaling);
    window.userSettings.windshieldShader = windshieldShader;

    const game = startGame();
    const cleanup = initTerminal({
      terminalEl: terminalRef.current,
      resourcesEl: resourcesRef.current,
      controlsEl: controlsRef.current,
      cursorEl: cursorRef.current,
      onShowSettings: () => {
        setShowSettings(true);
        if (window.updateControls) {
          window.updateControls(controlsText[mode]);
        }
      },
      onStartLoad: () => {
        if (game && game.load) {
          game.load();
        }
      }
    });

    return cleanup;
  }, []);

  useEffect(() => {
    window.userSettings = window.userSettings || {};
    window.userSettings.mode = mode;
    if (window.updateControls) {
      window.updateControls(controlsText[mode]);
    }
  }, [mode]);

  useEffect(() => {
    window.userSettings = window.userSettings || {};
    window.userSettings.worldSeed = worldSeedValue;
  }, [worldSeedValue]);

  useEffect(() => {
    window.userSettings = window.userSettings || {};
    window.userSettings.renderScaling = parseFloat(renderScaling);
  }, [renderScaling]);

  useEffect(() => {
    window.userSettings = window.userSettings || {};
    window.userSettings.windshieldShader = windshieldShader;
  }, [windshieldShader]);

  function handleModeChange(event) {
    setMode(event.target.value);
  }

  function handleWorldSeedModeChange(event) {
    const value = event.target.value;
    setWorldSeedMode(value);

    if (value === 'curated') {
      setWorldSeedValue(randomCuratedSeed());
    } else if (value === 'random') {
      setWorldSeedValue(Math.round(Math.random() * 999999));
    }
  }

  function handleWorldSeedValueChange(event) {
    setWorldSeedValue(Number(event.target.value));
  }

  function handleRenderScalingChange(event) {
    setRenderScaling(event.target.value);
  }

  function handleWindshieldShaderChange(event) {
    setWindshieldShader(event.target.value);
  }

  function handleEnterClick() {
    setSettingsLocked(true);
  }

  return (
    <>
      <div id="blocker">
        <div id="container">
          <div className="tCol leftCol">
            <div className="tRow" style={{ height: '100%' }}>
              <div className="tHeader">&gt;Terminal</div>
              <div id="terminal" ref={terminalRef}>
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
              </div>
            </div>
            <div className="tRow" style={{ height: '25%' }}>
              <div className="tHeader">#Controls</div>
              <div id="controls" ref={controlsRef}>
                &gt;&gt; No program loaded
              </div>
            </div>
            <div className="tRow" style={{ height: '32px' }}>
              <button id="enterBtn" style={{ display: 'none' }} onClick={handleEnterClick}>
                &gt;&gt;Launch&lt;&lt;
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="crashMessage" style={{ display: 'none' }}>
        <div className="g1">[ You crashed ]</div>
      </div>

      <canvas id="canvas" style={{ opacity: 0 }}></canvas>
    </>
  );
}
