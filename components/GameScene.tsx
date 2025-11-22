import React, { useRef } from 'react';
import { Canvas, ThreeEvent } from '@react-three/fiber';
import { OrbitControls, GridHelper, Environment, ContactShadows, Sky } from '@react-three/drei';
import * as THREE from 'three';
import Block from './Block';
import { BlockData, ToolMode } from '../types';
import { GRID_SIZE } from '../constants';

interface GameSceneProps {
  blocks: BlockData[];
  toolMode: ToolMode;
  activeColor: string;
  onAddBlock: (position: { x: number, y: number, z: number }) => void;
  onRemoveBlock: (id: string) => void;
  onPaintBlock: (id: string) => void;
}

const GameScene: React.FC<GameSceneProps> = ({ 
  blocks, 
  toolMode, 
  activeColor, 
  onAddBlock, 
  onRemoveBlock, 
  onPaintBlock 
}) => {
  
  const handleBlockClick = (e: ThreeEvent<MouseEvent>, id: string, pos: { x: number, y: number, z: number }) => {
    e.stopPropagation();

    if (toolMode === ToolMode.DELETE) {
      onRemoveBlock(id);
    } else if (toolMode === ToolMode.PAINT) {
      onPaintBlock(id);
    } else if (toolMode === ToolMode.BUILD) {
      // Add block adjacent to the clicked face
      if (!e.face) return;
      
      const normal = e.face.normal;
      const newPos = {
        x: Math.round(pos.x + normal.x),
        y: Math.round(pos.y + normal.y),
        z: Math.round(pos.z + normal.z),
      };
      
      // Prevent building below ground
      if (newPos.y < 0) return;
      
      onAddBlock(newPos);
    }
  };

  const handleGroundClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    if (toolMode !== ToolMode.BUILD) return;

    const point = e.point;
    // Convert to grid coordinates
    // Shift by 0.5 because box center is at integer coordinates (0,0,0) implies box from -0.5 to 0.5
    const x = Math.round(point.x);
    const z = Math.round(point.z);
    const y = 0; // Ground level

    onAddBlock({ x, y, z });
  };

  return (
    <div className="w-full h-full bg-slate-900 cursor-crosshair">
      <Canvas shadows camera={{ position: [20, 20, 20], fov: 45 }}>
        {/* Lighting & Environment */}
        <Sky sunPosition={[100, 20, 100]} />
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[10, 20, 10]} 
          intensity={1.5} 
          castShadow 
          shadow-mapSize={[2048, 2048]}
        />
        <Environment preset="city" />

        {/* Controls */}
        <OrbitControls makeDefault minDistance={5} maxDistance={100} />

        {/* The Voxel World */}
        <group>
            {blocks.map((block) => (
              <Block 
                key={block.id} 
                data={block} 
                toolMode={toolMode} 
                onClick={handleBlockClick} 
              />
            ))}
        </group>

        {/* Ground Plane (Invisible click catcher) */}
        <mesh 
          rotation={[-Math.PI / 2, 0, 0]} 
          position={[0, -0.5, 0]} 
          onClick={handleGroundClick}
          receiveShadow
        >
          <planeGeometry args={[GRID_SIZE * 4, GRID_SIZE * 4]} />
          <meshStandardMaterial color="#1e293b" transparent opacity={0} />
        </mesh>

        {/* Visual Grid Helper */}
        <gridHelper 
          args={[GRID_SIZE * 4, GRID_SIZE * 4, 0x444444, 0x222222]} 
          position={[0, -0.5, 0]} 
        />
        
        {/* Ground Shadow Contact */}
        <ContactShadows position={[0, -0.49, 0]} opacity={0.4} scale={60} blur={2} far={4.5} />
      </Canvas>
    </div>
  );
};

export default GameScene;