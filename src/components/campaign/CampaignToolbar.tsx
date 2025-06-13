
import { Button } from '@/components/ui/button';
import { Plus, Undo, Redo, ZoomIn, ZoomOut, Play, Sparkles, Eye, EyeOff } from 'lucide-react';
import { BuilderBlock } from '@/types/campaign';
import { useState } from 'react';

interface CampaignToolbarProps {
  onAddBlock: (type: BuilderBlock['type']) => void;
  onRunPlan: () => void;
  isValid: boolean;
  isLoading: boolean;
  zoom: number;
  onZoomChange: (zoom: number) => void;
  blocksVisible: boolean;
  onToggleBlocksVisibility: () => void;
}

export const CampaignToolbar = ({ 
  onAddBlock, 
  onRunPlan, 
  isValid, 
  isLoading,
  zoom,
  onZoomChange,
  blocksVisible,
  onToggleBlocksVisibility
}: CampaignToolbarProps) => {
  const [history, setHistory] = useState<any[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const blockTypes: Array<{ type: BuilderBlock['type']; label: string; icon: string }> = [
    { type: 'client', label: 'CLIENT', icon: '👤' },
    { type: 'application', label: 'APP', icon: '📱' },
    { type: 'platform', label: 'SOURCE', icon: '🌐' },
    { type: 'campaign', label: 'CAMPAIGN', icon: '🎯' },
    { type: 'adset', label: 'ADSET', icon: '📊' },
    { type: 'creative', label: 'CREATIVE', icon: '🎨' },
  ];

  const handleZoomIn = () => {
    const newZoom = Math.min(zoom + 25, 200);
    onZoomChange(newZoom);
    console.log('Zoom in to:', newZoom + '%');
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(zoom - 25, 25);
    onZoomChange(newZoom);
    console.log('Zoom out to:', newZoom + '%');
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      console.log('Undo action');
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      console.log('Redo action');
    }
  };

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  return (
    <div className="h-12 bg-slate-900/95 backdrop-blur-xl border-b border-green-500/20 flex items-center justify-between px-4 relative overflow-hidden">
      {/* Left Side - Block Tools */}
      <div className="flex items-center gap-2 relative z-10">
        {/* Glass Effect Block Type Buttons */}
        <div className="flex items-center gap-2">
          {blockTypes.map(({ type, label, icon }) => (
            <button
              key={type}
              onClick={() => onAddBlock(type)}
              className="
                group relative px-3 py-1.5 rounded-full text-xs font-bold text-white
                bg-gradient-to-r from-slate-600/40 via-slate-500/40 to-slate-400/40
                backdrop-blur-sm border border-slate-400/20
                hover:from-slate-500/50 hover:via-slate-400/50 hover:to-slate-300/50
                hover:border-slate-300/30 hover:shadow-md
                transition-all duration-200 ease-out
                flex items-center gap-1.5 min-w-0
                focus:outline-none focus:ring-1 focus:ring-white/20
              "
            >
              <span className="text-sm flex-shrink-0 group-hover:scale-105 transition-transform duration-200">
                {icon}
              </span>
              <span className="text-xs font-bold whitespace-nowrap uppercase tracking-wide">
                {label}
              </span>
              <div className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </button>
          ))}
        </div>
        
        {/* Separator */}
        <div className="h-4 w-px bg-green-500/30 mx-1" />
        
        {/* Action Tools - Undo/Redo */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleUndo}
            disabled={!canUndo}
            className={`
              group relative w-7 h-7 rounded-md transition-all duration-200 flex items-center justify-center
              ${canUndo 
                ? 'bg-slate-600/40 backdrop-blur-sm border border-slate-400/20 hover:bg-slate-500/50 hover:border-slate-300/30 text-slate-300 hover:text-green-400' 
                : 'bg-slate-700/20 border border-slate-700/20 text-slate-600 cursor-not-allowed'
              }
            `}
            title="Отменить действие"
          >
            <Undo className="w-3 h-3 transition-colors" />
          </button>
          
          <button
            onClick={handleRedo}
            disabled={!canRedo}
            className={`
              group relative w-7 h-7 rounded-md transition-all duration-200 flex items-center justify-center
              ${canRedo 
                ? 'bg-slate-600/40 backdrop-blur-sm border border-slate-400/20 hover:bg-slate-500/50 hover:border-slate-300/30 text-slate-300 hover:text-green-400' 
                : 'bg-slate-700/20 border border-slate-700/20 text-slate-600 cursor-not-allowed'
              }
            `}
            title="Повторить действие"
          >
            <Redo className="w-3 h-3 transition-colors" />
          </button>
        </div>
        
        {/* Separator */}
        <div className="h-4 w-px bg-green-500/30 mx-1" />
        
        {/* Blocks Visibility Toggle */}
        <button
          onClick={onToggleBlocksVisibility}
          className={`
            group relative w-7 h-7 rounded-md transition-all duration-200 flex items-center justify-center
            bg-slate-600/40 backdrop-blur-sm border border-slate-400/20 
            hover:bg-slate-500/50 hover:border-slate-300/30 
            ${blocksVisible ? 'text-green-400' : 'text-slate-400'}
            hover:text-green-400
          `}
          title={blocksVisible ? 'Скрыть блоки' : 'Показать блоки'}
        >
          {blocksVisible ? (
            <Eye className="w-3 h-3 transition-colors" />
          ) : (
            <EyeOff className="w-3 h-3 transition-colors" />
          )}
        </button>
        
        {/* Separator */}
        <div className="h-4 w-px bg-green-500/30 mx-1" />
        
        {/* Zoom Controls */}
        <div className="flex items-center gap-0 px-1.5 py-1 rounded-md bg-slate-600/40 backdrop-blur-sm border border-slate-400/20">
          <button 
            onClick={handleZoomOut}
            className="w-6 h-6 rounded-sm hover:bg-slate-500/40 transition-all duration-200 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={zoom <= 25}
            title="Уменьшить масштаб"
          >
            <ZoomOut className="w-3 h-3 text-slate-300 hover:text-green-400" />
          </button>
          
          <div className="px-2 py-0.5 text-xs text-green-400 font-medium min-w-[40px] text-center">
            {zoom}%
          </div>
          
          <button 
            onClick={handleZoomIn}
            className="w-6 h-6 rounded-sm hover:bg-slate-500/40 transition-all duration-200 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={zoom >= 200}
            title="Увеличить масштаб"
          >
            <ZoomIn className="w-3 h-3 text-slate-300 hover:text-green-400" />
          </button>
        </div>
      </div>

      {/* Right Side - Run Plan */}
      <div className="relative z-10 flex-shrink-0">
        <button
          onClick={onRunPlan}
          disabled={!isValid || isLoading}
          className={`
            group relative px-6 py-2 rounded-lg font-bold text-sm
            transition-all duration-300 transform-gpu overflow-hidden
            ${isValid && !isLoading 
              ? 'bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 border-2 border-green-500/50 hover:border-green-400/60 text-white shadow-xl hover:shadow-green-500/30 hover:scale-105' 
              : 'bg-slate-700/50 border-2 border-slate-600/30 text-slate-500 cursor-not-allowed'
            }
          `}
        >
          <div className="relative flex items-center gap-2">
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                <span>ВЫПОЛНЯЕТСЯ...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>ЗАПУСТИТЬ ПЛАН</span>
                {isValid && <Sparkles className="w-3 h-3 opacity-80" />}
              </>
            )}
          </div>
          {/* Animated background for active state */}
          {isValid && !isLoading && (
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-400/20 to-green-500/0 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          )}
        </button>
      </div>
    </div>
  );
};
