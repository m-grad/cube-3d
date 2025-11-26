'use client';

import { useRef, useState } from 'react';
import { Mesh, BoxGeometry, LineSegments } from 'three';
import { useFrame } from '@react-three/fiber';

interface CubeModelProps {
  size?: number;
  position?: [number, number, number];
  autoRotate?: boolean;
}

export default function CubeModel({ 
  size = 8, 
  position = [0, 4, 0],
  autoRotate = false 
}: CubeModelProps) {
  const meshRef = useRef<Mesh>(null);
  const edgesRef = useRef<LineSegments>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state, delta) => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y += delta * 0.3;
      meshRef.current.rotation.x += delta * 0.1;
    }
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[size, size, size]} />
        <meshPhysicalMaterial
          color={hovered ? "#60a5fa" : "#3b82f6"}
          transparent
          opacity={0.15}
          roughness={0.05}
          metalness={0.05}
          clearcoat={1.0}
          clearcoatRoughness={0.05}
          transmission={0.95}
          thickness={1.0}
          ior={1.5}
          envMapIntensity={1.5}
        />
      </mesh>

      <lineSegments ref={edgesRef}>
        <edgesGeometry args={[new BoxGeometry(size, size, size)]} />
        <lineBasicMaterial 
          color={hovered ? "#60a5fa" : "#93c5fd"} 
          linewidth={2}
          transparent
          opacity={0.6}
        />
      </lineSegments>

      <mesh>
        <boxGeometry args={[size + 0.04, size + 0.04, size + 0.04]} />
        <meshBasicMaterial
          color="#1e3a8a"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>
    </group>
  );
}

