import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

// Laptop component with glowing screen
const Laptop = ({ position }) => {
  const screenRef = useRef();
  const time = useRef(0);

  useFrame((state, delta) => {
    time.current += delta;
    if (screenRef.current) {
      screenRef.current.material.emissiveIntensity = 0.5 + Math.sin(time.current * 2) * 0.2;
    }
  });

  return (
    <group position={position}>
      {/* Laptop base */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} castShadow>
        <boxGeometry args={[1.5, 1, 0.05]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Laptop screen */}
      <mesh position={[0, 0.5, -0.45]} rotation={[-Math.PI / 8, 0, 0]} castShadow>
        <boxGeometry args={[1.5, 1, 0.05]} />
        <meshStandardMaterial color="#0a0a0a" metalness={0.9} roughness={0.1} />
      </mesh>
      
      {/* Glowing screen content */}
      <mesh ref={screenRef} position={[0, 0.5, -0.42]} rotation={[-Math.PI / 8, 0, 0]}>
        <planeGeometry args={[1.3, 0.8]} />
        <meshStandardMaterial
          color="#00F5FF"
          emissive="#00F5FF"
          emissiveIntensity={0.6}
          toneMapped={false}
        />
      </mesh>
      
      {/* Code-like rectangles on screen */}
      {[
        { x: -0.4, y: 0.2, width: 0.6, height: 0.05 },
        { x: -0.3, y: 0.1, width: 0.8, height: 0.05 },
        { x: -0.35, y: 0, width: 0.7, height: 0.05 },
        { x: -0.4, y: -0.1, width: 0.5, height: 0.05 },
      ].map((rect, i) => (
        <mesh
          key={i}
          position={[rect.x, 0.5 + rect.y, -0.41]}
          rotation={[-Math.PI / 8, 0, 0]}
        >
          <planeGeometry args={[rect.width, rect.height]} />
          <meshBasicMaterial color="#0a0a0a" opacity={0.6} transparent />
        </mesh>
      ))}
    </group>
  );
};

// Coffee mug
const CoffeeMug = ({ position }) => {
  return (
    <group position={position}>
      {/* Mug body */}
      <mesh castShadow>
        <cylinderGeometry args={[0.08, 0.06, 0.15, 32]} />
        <meshStandardMaterial color="#ffffff" metalness={0.2} roughness={0.8} />
      </mesh>
      
      {/* Handle */}
      <mesh position={[0.09, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow>
        <torusGeometry args={[0.05, 0.01, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#ffffff" />
      </mesh>
      
      {/* Coffee */}
      <mesh position={[0, 0.06, 0]}>
        <cylinderGeometry args={[0.075, 0.075, 0.02, 32]} />
        <meshStandardMaterial color="#3d2817" />
      </mesh>
    </group>
  );
};

// Desk lamp
const DeskLamp = ({ position }) => {
  return (
    <group position={position}>
      {/* Base */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.08, 0.1, 0.02, 32]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Arm */}
      <mesh position={[0, 0.15, 0]} rotation={[0, 0, Math.PI / 6]} castShadow>
        <cylinderGeometry args={[0.01, 0.01, 0.3, 16]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Lamp head */}
      <mesh position={[0.15, 0.28, 0]} rotation={[0, 0, -Math.PI / 3]} castShadow>
        <coneGeometry args={[0.08, 0.12, 32]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
      </mesh>
      
      {/* Light */}
      <pointLight
        position={[0.18, 0.25, 0]}
        intensity={0.5}
        distance={2}
        color="#9D4EDD"
      />
    </group>
  );
};

// Keyboard
const Keyboard = ({ position }) => {
  const keys = [];
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 15; col++) {
      keys.push({ x: col * 0.06 - 0.42, y: row * 0.06 - 0.12 });
    }
  }

  return (
    <group position={position}>
      {/* Keyboard base */}
      <mesh castShadow>
        <boxGeometry args={[0.9, 0.3, 0.02]} />
        <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.4} />
      </mesh>
      
      {/* Keys */}
      {keys.slice(0, 30).map((key, i) => (
        <mesh key={i} position={[key.x, key.y, 0.015]} castShadow>
          <boxGeometry args={[0.05, 0.05, 0.01]} />
          <meshStandardMaterial
            color="#2a2a2a"
            metalness={0.3}
            roughness={0.7}
          />
        </mesh>
      ))}
    </group>
  );
};

// Main desk
const Desk = ({ position }) => {
  return (
    <group position={position}>
      {/* Desk surface */}
      <mesh receiveShadow castShadow>
        <boxGeometry args={[3, 1.5, 0.1]} />
        <meshStandardMaterial
          color="#1a1515"
          metalness={0.1}
          roughness={0.8}
        />
      </mesh>
      
      {/* Desk legs */}
      {[[-1.3, -0.4, -0.6], [1.3, -0.4, -0.6], [-1.3, -0.4, 0.6], [1.3, -0.4, 0.6]].map((pos, i) => (
        <mesh key={i} position={pos} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.8, 16]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
};

const DeveloperDeskScene = () => {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      // Gentle floating animation
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <Desk position={[0, 0, 0]} />
      <Laptop position={[0, 0.12, 0]} />
      <Keyboard position={[-0.5, 0.06, 0.3]} />
      <CoffeeMug position={[0.8, 0.13, 0.3]} />
      <DeskLamp position={[-0.8, 0.05, -0.4]} />
    </group>
  );
};

export default DeveloperDeskScene;
