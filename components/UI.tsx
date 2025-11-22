import React, { useState } from 'react';
import { ToolMode } from '../types';
import { LEGO_COLORS } from '../constants';
import { Trash2, PaintBucket, Box, Sparkles, Loader2 } from 'lucide-react';

interface UIProps {
  toolMode: ToolMode;
  setToolMode: (mode: ToolMode) => void;
  activeColor: string;
  setActiveColor: (color: string) => void;
  onGenerateBlueprint: (prompt: string) => Promise<void>;
  onGetChallenge: () => Promise<string>;
  blockCount: number;
  onClear: () => void;
}

const UI: React.FC<UIProps> = ({
  toolMode,
  setToolMode,
  activeColor,
  setActiveColor,
  onGenerateBlueprint,
  onGetChallenge,
  blockCount,
  onClear
}) => {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [challenge, setChallenge] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    try {
      await onGenerateBlueprint(prompt);
      setPrompt('');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleChallenge = async () => {
    setIsGenerating(true);
    try {
      const text = await onGetChallenge();
      setChallenge(text);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="absolute inset-0 pointer-events-none flex flex-col justify-between p-4">
      
      {/* Top Bar: Header & AI Tools */}
      <div className="pointer-events-auto flex flex-col md:flex-row gap-4 items-start justify-between bg-black/50 p-4 rounded-xl backdrop-blur-md border border-white/10 shadow-xl">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Box className="text-yellow-400" fill="currentColor" />
            Constructor Bloques
          </h1>
          <p className="text-gray-400 text-sm">Bloques: {blockCount}</p>
        </div>

        <div className="flex flex-col gap-2 w-full md:w-auto">
          <div className="flex gap-2">
             <input 
              type="text" 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ej: una casa pequeña..."
              className="bg-gray-800 text-white px-3 py-2 rounded-lg text-sm border border-gray-700 focus:border-blue-500 outline-none w-full md:w-64"
            />
            <button 
              onClick={handleGenerate}
              disabled={isGenerating || !prompt}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
            >
              {isGenerating ? <Loader2 className="animate-spin w-4 h-4"/> : <Sparkles className="w-4 h-4" />}
              Generar
            </button>
          </div>
          
          <button 
            onClick={handleChallenge}
            disabled={isGenerating}
            className="text-xs text-indigo-300 hover:text-indigo-200 flex items-center gap-1 justify-end md:justify-start"
          >
            ¿Sin ideas? Pide un reto
          </button>
          
          {challenge && (
            <div className="bg-indigo-900/80 p-2 rounded text-xs text-indigo-100 border border-indigo-500/30 animate-in fade-in slide-in-from-top-2">
              Reto: {challenge}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Bar: Tools & Colors */}
      <div className="pointer-events-auto flex flex-col gap-4 items-center">
        
        {/* Tools */}
        <div className="flex gap-2 bg-black/80 p-2 rounded-full border border-white/10 backdrop-blur-lg shadow-2xl">
           <button
            onClick={() => setToolMode(ToolMode.BUILD)}
            className={`p-3 rounded-full transition-all ${toolMode === ToolMode.BUILD ? 'bg-blue-600 text-white scale-110 shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
            title="Construir"
          >
            <Box className="w-6 h-6" />
          </button>
          <button
            onClick={() => setToolMode(ToolMode.PAINT)}
            className={`p-3 rounded-full transition-all ${toolMode === ToolMode.PAINT ? 'bg-purple-600 text-white scale-110 shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
            title="Pintar"
          >
            <PaintBucket className="w-6 h-6" />
          </button>
          <button
            onClick={() => setToolMode(ToolMode.DELETE)}
            className={`p-3 rounded-full transition-all ${toolMode === ToolMode.DELETE ? 'bg-red-600 text-white scale-110 shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
            title="Borrar"
          >
            <Trash2 className="w-6 h-6" />
          </button>
        </div>

        {/* Color Palette */}
        <div className="flex gap-2 overflow-x-auto max-w-full bg-black/80 p-3 rounded-2xl border border-white/10 backdrop-blur-lg shadow-2xl mb-4">
          {LEGO_COLORS.map((c) => (
            <button
              key={c.hex}
              onClick={() => setActiveColor(c.hex)}
              className={`w-8 h-8 rounded-full border-2 shadow-sm transition-transform ${activeColor === c.hex ? 'border-white scale-125' : 'border-transparent hover:scale-110'}`}
              style={{ backgroundColor: c.hex }}
              title={c.name}
            />
          ))}
          <div className="w-px h-8 bg-white/20 mx-2"></div>
          <button 
             onClick={onClear}
             className="px-3 py-1 text-xs text-red-400 hover:text-red-300 font-bold uppercase tracking-wider border border-red-900/50 hover:border-red-500/50 rounded bg-red-950/30"
          >
            Limpiar
          </button>
        </div>
      </div>
    </div>
  );
};

export default UI;