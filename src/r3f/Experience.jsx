import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { EffectComposer, Bloom, FXAA, ToneMapping } from '@react-three/postprocessing';
import { ToneMappingMode } from 'postprocessing';
import { Fog, NoToneMapping, SRGBColorSpace, PointLight } from 'three';
import { useEffect, useState, useRef } from 'react';
import { Game } from '../index.js';
import { useGameStore } from '../game/GameContext.jsx';
import { Generator } from '../classes/Generator.js';
import { GeneratorItem_CityBlock } from '../classes/GeneratorItem_CityBlock.js';
import { GeneratorItem_CityLight } from '../classes/GeneratorItem_CityLight.js';
import { GeneratorItem_Traffic } from '../classes/GeneratorItem_Traffic.js';

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
  const [cityBlockItems, setCityBlockItems] = useState([]);
  const [trafficItems, setTrafficItems] = useState([]);
  const [cityLights, setCityLights] = useState([]);
  const cityBlockVersionRef = useRef(-1);
  const trafficVersionRef = useRef(-1);
  const cityLightVersionRef = useRef(-1);
  const generatorsRef = useRef({
    cityBlock: null,
    cityLights: null,
    traffic: null
  });

  useFrame(() => {
    const game = gameRef.current;
    if (!game || !game.isRunning) {
      return;
    }
    if (!game.initialized) {
      return;
    }

    if (!game.generatorsInitialized) {
      initializeGenerators(game);
    }

    if (!game.generatorsInitialized) {
      return;
    }

    const { cityBlock, cityLights, traffic } = generatorsRef.current;
    if (cityBlock) cityBlock.update();
    if (cityLights) cityLights.update();
    if (traffic) traffic.update();

    if (cityBlock) {
      const version = cityBlock.version ?? 0;
      if (version !== cityBlockVersionRef.current) {
        cityBlockVersionRef.current = version;
        setCityBlockItems(cityBlock.getItems());
      }
    }

    if (traffic) {
      const version = traffic.version ?? 0;
      if (version !== trafficVersionRef.current) {
        trafficVersionRef.current = version;
        setTrafficItems(traffic.getItems());
      }
    }

    if (game.cityLightMeshes && game.cityLightMeshes.length > 0) {
      if (cityLightVersionRef.current !== game.cityLightMeshes.length) {
        cityLightVersionRef.current = game.cityLightMeshes.length;
        setCityLights([...game.cityLightMeshes]);
      }
    }
  }, 2);

  function initializeGenerators(game) {
    game.cityBlockNoise = new Perlin(game.settings.worldSeed);
    game.cityBlockNoise.noiseDetail(8, 0.5);
    game.cityBlockNoiseFactor = 0.0017;

    const cityBlock = new Generator({
      camera: game.player.camera,
      cell_size: game.cityBlockSize + game.roadWidth,
      cell_count: 40,
      spawn_obj: GeneratorItem_CityBlock,
      spawn_context: game
    });

    let cityLights = null;
    game.cityLights = [];
    game.cityLightMeshes = [];
    if (game.environment.cityLights) {
      for (let i = 0; i < 10; i++) {
        const light = new PointLight(0x000000, 100, 2000);
        light.decay = 1;
        game.cityLights.push({ light, free: true });
        game.cityLightMeshes.push(light);
      }

      cityLights = new Generator({
        camera: game.player.camera,
        cell_size: (game.cityBlockSize + game.roadWidth) * 4,
        cell_count: 8,
        spawn_obj: GeneratorItem_CityLight,
        spawn_context: game
      });
    }

    const traffic = new Generator({
      camera: game.player.camera,
      cell_size: game.cityBlockSize + game.roadWidth,
      cell_count: 12,
      debug: false,
      spawn_obj: GeneratorItem_Traffic,
      spawn_context: game
    });

    generatorsRef.current = {
      cityBlock,
      cityLights,
      traffic
    };

    game.generatorCityBlock = cityBlock;
    game.generatorCityLights = cityLights;
    game.generatorTraffic = traffic;
    game.generatorsInitialized = true;

    setCityLights([...game.cityLightMeshes]);
  }

  return (
    <>
      <group>
        {cityBlockItems.map((item) => (
          <group key={item.__genId}>
            {(item.meshes || []).map((mesh, index) => (
              <primitive key={`m-${index}`} object={mesh} />
            ))}
            {(item.meshesCollid || []).map((mesh, index) => (
              <primitive key={`c-${index}`} object={mesh} />
            ))}
            {(item.updateables || [])
              .filter((updateable) => updateable?.isVisual && updateable.mesh)
              .map((updateable) => (
                <primitive key={`u-${updateable.mesh.uuid}`} object={updateable.mesh} />
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
      <group>
        {cityLights.map((light) => (
          <primitive key={light.uuid} object={light} />
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
