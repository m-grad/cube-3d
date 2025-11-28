'use client';

import { useRef, useState, useEffect } from 'react';
import { Mesh, Vector3 } from 'three';
import { useFrame, useThree } from '@react-three/fiber';

export interface InteractivePointProps {
  position: [number, number, number];
  label: string;
  description?: string;
  color?: string;
  size?: number;
  showTooltipOnHover?: boolean;
  showTooltipOnClick?: boolean;
  shouldUnpin?: boolean;
  onPointClick?: (label: string, position: [number, number, number]) => void;
  onPointHover?: (label: string, isHovered: boolean) => void;
  onTooltipUpdate?: (data: {
    label: string;
    x: number;
    y: number;
    visible: boolean;
    description?: string;
    color?: string;
    position: [number, number, number];
    clicked: boolean;
  }) => void;
}

export default function InteractivePoint({
  position,
  label,
  description,
  color = "#3b82f6",
  size = 0.1,
  showTooltipOnHover = true,
  showTooltipOnClick = true,
  shouldUnpin = false,
  onPointClick,
  onPointHover,
  onTooltipUpdate,
}: InteractivePointProps) {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const { camera, size: canvasSize } = useThree();

  // Handle external unpin request
  useEffect(() => {
    if (shouldUnpin && pinned) {
      setPinned(false);
    }
  }, [shouldUnpin, pinned]);

  useFrame((state) => {
    if (meshRef.current) {

      const vector = new Vector3(...position);
      vector.project(camera);
      
      const isVisible = vector.z < 1;
      const x = (vector.x * 0.5 + 0.5) * canvasSize.width;
      const y = (-vector.y * 0.5 + 0.5) * canvasSize.height;
      
      const shouldShow = isVisible && (pinned || (showTooltipOnHover && hovered));
      
      if (onTooltipUpdate) {
        onTooltipUpdate({
          label,
          x,
          y,
          visible: shouldShow,
          description,
          color,
          position,
          clicked: pinned,
        });
      }
    }
  });

  const handlePointerOver = (e: any) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = 'pointer';
    onPointHover?.(label, true);
  };

  const handlePointerOut = (e: any) => {
    e.stopPropagation();
    setHovered(false);
    document.body.style.cursor = 'default';
    onPointHover?.(label, false);
  };

  const handleClick = (e: any) => {
    e.stopPropagation();
    setPinned(true);
    onPointClick?.(label, position);
  };

  return (
    <group position={position}>
        <mesh
          ref={meshRef}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <sphereGeometry args={[size, 32, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={hovered ? color : "#000000"}
            emissiveIntensity={hovered ? 0.5 : 0}
            metalness={0.3}
            roughness={0.2}
          />
        </mesh>
      </group>
  );
}
