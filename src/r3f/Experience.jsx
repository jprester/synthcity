import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, FXAA, ToneMapping } from '@react-three/postprocessing';
import { ToneMappingMode } from 'postprocessing';
import { Fog, NoToneMapping, SRGBColorSpace } from 'three';
import { useEffect, useState, useRef } from 'react';
import { Game } from '../index.js';
import { useGameStore } from '../game/GameContext.jsx';

function GameBridge() {
  const { gl, scene, camera, set } = useThree();
  const { settings, gameRef, terminalRef } = useGameStore();
  const [environment, setEnvironment] = useState(null);

  useEffect(() => {
    if (gameRef.current) {
      return;
    }

    const game = new Game({
      renderer: gl,
      scene,
      camera,
      canvas: gl.domElement,
      manageRendererSize: false,
      useComposer: false,
      externalRender: true,
      setupEnvironment: false,
      externalGenerators: true,
      settings,
      terminal: terminalRef.current
    });
    gameRef.current = game;
    setEnvironment(game.environment);

    gl.toneMapping = NoToneMapping;
    gl.toneMappingExposure = 1.0;
    gl.outputColorSpace = SRGBColorSpace;
  }, [gl, scene, camera, settings, gameRef, terminalRef]);

  useEffect(() => {
    if (gameRef.current) {
      gameRef.current.setSettings(settings);
    }
  }, [settings, gameRef]);

  useEffect(() => {
    if (!environment || !gameRef.current) {
      return;
    }

    const game = gameRef.current;
    scene.fog = new Fog(environment.fog.color, environment.fog.start, environment.fog.end);

    const intervalId = setInterval(() => {
      if (game.assets) {
        scene.background = game.assets.getTexture(environment.sky);
        clearInterval(intervalId);
      }
    }, 100);

    return () => {
      clearInterval(intervalId);
    };
  }, [environment, scene]);

  useFrame((state, delta) => {
    const game = gameRef.current;
    if (!game || !game.isRunning) {
      return;
    }

    game.update(delta);

    if (game.player?.camera && state.camera !== game.player.camera) {
      set({ camera: game.player.camera });
    }
  }, 1);

  useFrame(() => {
    const game = gameRef.current;
    if (!game || !game.isRunning) {
      return;
    }
  }, 1);

  return (
    <>
      {environment && (
        <>
          <ambientLight intensity={environment.ambient.intensity} color={environment.ambient.color} />
          <directionalLight
            castShadow={false}
            intensity={environment.sun.intensity}
            color={environment.sun.color}
            position={[environment.sun.x, environment.sun.y, environment.sun.z]}
          />
        </>
      )}
      <EffectComposer>
        <FXAA />
        <Bloom
          intensity={environment?.name === 'day' ? 0.35 : 7.0}
          luminanceThreshold={0.0}
          luminanceSmoothing={0.0}
        />
        <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      </EffectComposer>
    </>
  );
}

function GeneratorSystem() {
  const { gameRef } = useGameStore();
  const groupRef = useRef(null);
  const [cityBlockItems, setCityBlockItems] = useState([]);
  const [trafficItems, setTrafficItems] = useState([]);
  const cityBlockVersionRef = useRef(-1);
  const trafficVersionRef = useRef(-1);

  useEffect(() => {
    if (gameRef.current && groupRef.current) {
      gameRef.current.setGeneratorRoot(groupRef.current);
    }
  }, [gameRef]);

  useFrame(() => {
    const game = gameRef.current;
    if (!game || !game.isRunning) {
      return;
    }

    if (game.initialized && !game.generatorsInitialized) {
      game.createGenerators();
    }

    game.updateGenerators();

    if (game.generatorCityBlock) {
      const version = game.generatorCityBlock.version ?? 0;
      if (version !== cityBlockVersionRef.current) {
        cityBlockVersionRef.current = version;
        setCityBlockItems(game.generatorCityBlock.getItems());
      }
    }

    if (game.generatorTraffic) {
      const version = game.generatorTraffic.version ?? 0;
      if (version !== trafficVersionRef.current) {
        trafficVersionRef.current = version;
        setTrafficItems(game.generatorTraffic.getItems());
      }
    }
  }, 2);

  return (
    <>
      <group ref={groupRef} />
      <group>
        {cityBlockItems.map((item) => (
          <group key={item.__genId}>
            {(item.meshes || []).map((mesh, index) => (
              <primitive key={`m-${index}`} object={mesh} />
            ))}
            {(item.meshesCollid || []).map((mesh, index) => (
              <primitive key={`c-${index}`} object={mesh} />
            ))}
          </group>
        ))}
      </group>
      <group>
        {trafficItems.map((item) => (
          <group key={item.__genId}>
            {(item.cars || []).map((car, index) =>
              car.mesh ? <primitive key={`t-${index}`} object={car.mesh} /> : null
            )}
          </group>
        ))}
      </group>
    </>
  );
}

export default function R3FExperience() {
  return (
    <Canvas style={{ position: 'fixed', inset: 0, zIndex: 0 }}>
      <GameBridge />
      <GeneratorSystem />
    </Canvas>
  );
}
