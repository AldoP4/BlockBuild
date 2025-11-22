import React, { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid'; // Note: In a real env without npm, implement a simple random ID generator
import GameScene from './components/GameScene';
import UI from './components/UI';
import { BlockData, ToolMode } from './types';
import { DEFAULT_BLOCKS, LEGO_COLORS } from './constants';
import { generateBlueprint, generateChallenge } from './services/geminiService';

// Simple ID generator if uuid isn't available in browser env (for safety)
const generateId = () => Math.random().toString(36).substring(2, 15);

const App: React.FC = () => {
  const [blocks, setBlocks] = useState<BlockData[]>(DEFAULT_BLOCKS);
  const [toolMode, setToolMode] = useState<ToolMode>(ToolMode.BUILD);
  const [activeColor, setActiveColor] = useState<string>(LEGO_COLORS[0].hex);

  // Add Block
  const handleAddBlock = useCallback((position: { x: number, y: number, z: number }) => {
    // Check if block already exists at this position
    const exists = blocks.some(b => b.position.x === position.x && b.position.y === position.y && b.position.z === position.z);
    if (exists) return;

    const newBlock: BlockData = {
      id: generateId(),
      position,
      color: activeColor
    };
    setBlocks(prev => [...prev, newBlock]);
  }, [blocks, activeColor]);

  // Remove Block
  const handleRemoveBlock = useCallback((id: string) => {
    setBlocks(prev => prev.filter(b => b.id !== id));
  }, []);

  // Paint Block
  const handlePaintBlock = useCallback((id: string) => {
    setBlocks(prev => prev.map(b => b.id === id ? { ...b, color: activeColor } : b));
  }, [activeColor]);

  // Handle Gemini Generation
  const handleGenerateBlueprint = async (prompt: string) => {
    try {
      const blueprint = await generateBlueprint(prompt);
      
      if (blueprint && blueprint.blocks && Array.isArray(blueprint.blocks)) {
        // Map blueprint blocks to internal structure
        const newBlocks: BlockData[] = blueprint.blocks.map((b: any) => ({
           id: generateId(),
           position: { x: b.x, y: b.y, z: b.z },
           color: b.color || '#9ca3af'
        }));

        // Replace or Append? Let's Append but clear overlapping
        setBlocks(newBlocks);
      }
    } catch (e) {
      alert("No se pudo generar el plano. Intenta una descripción más simple.");
    }
  };

  const handleClear = () => {
    if(window.confirm("¿Borrar todo el mundo?")) {
      setBlocks([]);
    }
  };

  return (
    <div className="w-full h-screen relative bg-slate-900 text-slate-100 font-sans select-none">
      <GameScene 
        blocks={blocks}
        toolMode={toolMode}
        activeColor={activeColor}
        onAddBlock={handleAddBlock}
        onRemoveBlock={handleRemoveBlock}
        onPaintBlock={handlePaintBlock}
      />
      <UI 
        toolMode={toolMode}
        setToolMode={setToolMode}
        activeColor={activeColor}
        setActiveColor={setActiveColor}
        onGenerateBlueprint={handleGenerateBlueprint}
        onGetChallenge={generateChallenge}
        blockCount={blocks.length}
        onClear={handleClear}
      />
    </div>
  );
};

export default App;