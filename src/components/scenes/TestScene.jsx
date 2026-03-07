import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const TestScene = () => {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="#00F5FF" emissive="#00F5FF" emissiveIntensity={0.5} />
    </mesh>
  );
};

export default TestScene;
