import { Canvas } from '@react-three/fiber';

export default function R3FExperience() {
  return (
    <Canvas
      style={{ position: 'fixed', inset: 0 }}
      camera={{ fov: 45, position: [0, 2, 6], near: 0.1, far: 2000 }}
    >
      <color attach="background" args={['#040406']} />
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 10, 5]} intensity={0.8} />
    </Canvas>
  );
}
