import React, { useMemo, useState } from 'react';
import { ThreeEvent } from '@react-three/fiber';
import { Edges } from '@react-three/drei';
import * as THREE from 'three';
import { BlockData, ToolMode } from '../types';

interface BlockProps {
  data: BlockData;
  toolMode: ToolMode;
  onClick: (e: ThreeEvent<MouseEvent>, id: string, position: { x: number, y: number, z: number }) => void;
}

const Block: React.FC<BlockProps> = ({ data, toolMode, onClick }) => {
  const [hovered, setHover] = useState(false);
  
  const positionVector = useMemo(() => {
    return new THREE.Vector3(data.position.x, data.position.y, data.position.z);
  }, [data.position]);

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHover(true);
  };

  const handlePointerOut = (e: ThreeEvent<PointerEvent>) => {
    setHover(false);
  };

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    // Pass event up to GameScene to calculate placement or deletion
    onClick(e, data.id, data.position);
  };

  // Visual feedback for delete mode
  const isDeleteMode = toolMode === ToolMode.DELETE;
  const materialColor = isDeleteMode && hovered ? '#ff0000' : data.color;
  const opacity = isDeleteMode && hovered ? 0.5 : 1;

  return (
    <mesh
      position={positionVector}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      castShadow
      receiveShadow
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial 
        color={materialColor} 
        transparent={opacity < 1} 
        opacity={opacity}
        roughness={0.2}
        metalness={0.1}
      />
      <Edges 
        visible={true} 
        scale={1} 
        threshold={15} 
        color="black" 
        renderOrder={1000}
      />
      {/* Nubs on top to look like LEGO */}
      <mesh position={[0, 0.55, 0]} castShadow>
         <cylinderGeometry args={[0.35, 0.35, 0.1, 16]} />
         <meshStandardMaterial color={materialColor} />
      </mesh>
    </mesh>
  );
};

export default Block;