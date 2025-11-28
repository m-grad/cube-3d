'use client';

import { useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Grid, Environment } from '@react-three/drei';
import CubeModel from './CubeModel';
import InteractivePoint from './InteractivePoint';
import TooltipOverlay, { TooltipData } from './TooltipOverlay';

const points = [
  { 
    position: [0, 4, 3.85] as [number, number, number], 
    label: "Lobby - Recepcja", 
    description: "Główna recepcja, strefa przyjęć gości",
    color: "#3b82f6" 
  },
  { 
    position: [3.85, 4, 0] as [number, number, number], 
    label: "Biuro Wschodnie", 
    description: "Prawe skrzydło - stanowiska pracy",
    color: "#3b82f6" 
  },
  { 
    position: [-3.85, 4, 0] as [number, number, number], 
    label: "Biuro Zachodnie", 
    description: "Lewe skrzydło - open space",
    color: "#3b82f6" 
  },
  { 
    position: [0, 4, -3.85] as [number, number, number], 
    label: "Strefa Socjalna", 
    description: "Kuchnia i przestrzeń wypoczynkowa",
    color: "#3b82f6" 
  },
  { 
    position: [2, 4, 2] as [number, number, number], 
    label: "Meeting Room 1", 
    description: "Mała sala spotkań - prawy narożnik",
    color: "#3b82f6" 
  },
  { 
    position: [0, 7.85, 0] as [number, number, number], 
    label: "Sala Konferencyjna", 
    description: "Główna sala spotkań - górne piętro",
    color: "#3b82f6" 
  },
  { 
    position: [-2, 6, -2] as [number, number, number], 
    label: "Gabinet Dyrektora", 
    description: "Piętro 2 - lewy tylny narożnik",
    color: "#3b82f6" 
  },
  { 
    position: [2, 6, 2] as [number, number, number], 
    label: "Sala Szkoleniowa", 
    description: "Piętro 2 - prawy przedni narożnik",
    color: "#3b82f6" 
  },
  { 
    position: [0, 0.15, 0] as [number, number, number], 
    label: "Serwerownia", 
    description: "Parter/piwnica - centrum techniczne",
    color: "#3b82f6" 
  },
  { 
    position: [-2.5, 2, 2.5] as [number, number, number], 
    label: "Archiwum", 
    description: "Niższe piętro - dokumentacja",
    color: "#3b82f6" 
  },
];

export default function Scene3D() {
  const [tooltips, setTooltips] = useState<Map<string, TooltipData>>(new Map());
  const [closedTooltips, setClosedTooltips] = useState<Set<string>>(new Set());

  const handlePointClick = (label: string, position: [number, number, number]) => {
    console.log(`Kliknięto punkt: ${label}`, position);
    setClosedTooltips((prev) => {
      const newSet = new Set(prev);
      newSet.delete(label);
      return newSet;
    });
  };

  const handlePointHover = (label: string, isHovered: boolean) => {
    if (isHovered) {
      console.log(`Hover nad punktem: ${label}`);
    }
  };

  const handleTooltipClose = (label: string) => {
    console.log(`Zamknięto tooltip: ${label}`);
    setClosedTooltips((prev) => new Set(prev).add(label));
    setTooltips((prev) => {
      const newTooltips = new Map(prev);
      newTooltips.delete(label);
      return newTooltips;
    });
  };

  const handleTooltipUpdate = useCallback((data: {
    label: string;
    x: number;
    y: number;
    visible: boolean;
    description?: string;
    color?: string;
    position: [number, number, number];
    clicked: boolean;
  }) => {
    setTooltips((prev) => {
      const newTooltips = new Map(prev);
      
      const children = (
        <div className="space-y-1">
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">Pozycja:</span>
            <span className="text-gray-300 font-mono">
              [{data.position[0].toFixed(1)}, {data.position[1].toFixed(1)}, {data.position[2].toFixed(1)}]
            </span>
          </div>
          <div className="text-xs text-gray-500 italic">
            💡 Informacje o punkcie
          </div>
        </div>
      );
      
      newTooltips.set(data.label, {
        x: data.x,
        y: data.y,
        visible: data.visible,
        label: data.label,
        description: data.description,
        color: data.color,
        children,
        pinned: data.clicked,
      });
      
      return newTooltips;
    });
  }, []);

  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{
          position: [10, 12, 12],
          fov: 60,
          near: 0.1,
          far: 1000,
        }}
        className="bg-gradient-to-b from-gray-900 to-black"
      >
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight
          position={[-10, -10, -5]}
          intensity={0.3}
        />

        <Grid
          args={[20, 20]}
          cellSize={1}
          cellThickness={0.5}
          cellColor="#6b7280"
          sectionSize={5}
          sectionThickness={1}
          sectionColor="#9ca3af"
          fadeDistance={30}
          fadeStrength={1}
          followCamera={false}
          infiniteGrid={false}
        />

        <Environment preset="city" />

        <CubeModel size={8} position={[0, 4, 0]} autoRotate={false} />

        {points.map((point) => (
          <InteractivePoint
            key={point.label}
            position={point.position}
            label={point.label}
            description={point.description}
            color={point.color}
            size={0.1}
            showTooltipOnHover={true}
            showTooltipOnClick={false}
            shouldUnpin={closedTooltips.has(point.label)}
            onPointClick={handlePointClick}
            onPointHover={handlePointHover}
            onTooltipUpdate={handleTooltipUpdate}
          />
        ))}

        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          rotateSpeed={0.5}
          minDistance={1}
          maxDistance={20}
          target={[0, 4, 0]}
          // Brak maxPolarAngle - pełna swoboda patrzenia w górę i dół
        />
      </Canvas>

      <TooltipOverlay tooltips={tooltips} onClose={handleTooltipClose} />
    </div>
  );
}

