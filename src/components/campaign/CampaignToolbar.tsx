
import { Button } from '@/components/ui/button';
import { Plus, Undo, Redo, ZoomIn, ZoomOut, Play, Sparkles } from 'lucide-react';
import { BuilderBlock } from '@/pages/CampaignManagement';
import { useState } from 'react';

interface CampaignToolbarProps {
  onAddBlock: (type: BuilderBlock['type']) => void;
  onRunPlan: () => void;
  isValid: boolean;
  isLoading: boolean;
}

export const CampaignToolbar = ({ 
  onAddBlock, 
  onRunPlan, 
  isValid, 
  isLoading 
}: CampaignToolbarProps) => {
  const [zoom, setZoom] = useState(100);
  const [history, setHistory] = useState<any[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const blockTypes: Array<{ type: BuilderBlock['type']; label: string; icon: string; gradient: string }> = [
    { type: 'client', label: 'Client', icon: '👤', gradient: 'bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500' },
    { type: 'application', label: 'App', icon: '📱', gradient: 'bg-gradient-to-r from-purple-600 via-purple-500 to-pink-500' },
    { type: 'platform', label: 'Source', icon: '🌐', gradient: 'bg-gradient-to-r from-cyan-500 via-blue-500 to-green-500' },
    { type: 'campaign', label: 'Campaign', icon: '🎯', gradient: 'bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400' },
    { type: 'adset', label: 'Adset', icon: '📊', gradient: 'bg-gradient-to-r from-orange-500 via-yellow-500 to-yellow-400' },
    { type: 'creative', label: 'Creative', icon: '🎨', gradient: 'bg-gradient-to-r from-pink-600 via-purple-500 to-red-500' },
  ];

  const handleZoomIn = () => {
    const newZoom = Math.min(zoom + 25, 200);
    setZoom(newZoom);
    console.log('Zoom in to:', newZoom + '%');
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(zoom - 25, 25);
    setZoom(newZoom);
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
    <div className="h-16 bg-slate-900/95 backdrop-blur-xl border-b border-green-500/20 flex items-center justify-between px-6 relative overflow-hidden">
      {/* Left Side - Block Tools */}
      <div className="flex items-center gap-3 relative z-10">
        {/* Beautiful Gradient Block Type Buttons */}
        <div className="flex items-center gap-3">
          {blockTypes.map(({ type, label, icon, gradient }) => (
            <button
              key={type}
              onClick={() => onAddBlock(type)}
              className={`
                group relative px-4 py-2.5 rounded-full text-sm font-bold text-white
                transition-all duration-300 ease-out
                ${gradient}
                hover:scale-105 hover:shadow-lg hover:shadow-current/25
                active:scale-95
                flex items-center gap-2.5 min-w-0
                focus:outline-none focus:ring-2 focus:ring-white/30
                shadow-lg
              `}
            >
              <span className="text-base flex-shrink-0 group-hover:scale-110 transition-transform duration-200 drop-shadow-sm">
                {icon}
              </span>
              <span className="text-xs font-bold whitespace-nowrap uppercase tracking-wide drop-shadow-sm">
                {label}
              </span>
              <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          ))}
        </div>
        
        {/* Separator */}
        <div className="h-6 w-px bg-green-500/30 mx-2" />
        
        {/* Action Tools - Undo/Redo */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleUndo}
            disabled={!canUndo}
            className={`
              group relative w-9 h-9 rounded-lg transition-all duration-200 flex items-center justify-center
              ${canUndo 
                ? 'bg-slate-800/80 border border-slate-600/50 hover:border-green-500/60 hover:bg-slate-700/80 text-slate-300 hover:text-green-400' 
                : 'bg-slate-800/40 border border-slate-700/30 text-slate-600 cursor-not-allowed'
              }
            `}
            title="Отменить действие"
          >
            <Undo className="w-4 h-4 transition-colors" />
          </button>
          
          <button
            onClick={handleRedo}
            disabled={!canRedo}
            className={`
              group relative w-9 h-9 rounded-lg transition-all duration-200 flex items-center justify-center
              ${canRedo 
                ? 'bg-slate-800/80 border border-slate-600/50 hover:border-green-500/60 hover:bg-slate-700/80 text-slate-300 hover:text-green-400' 
                : 'bg-slate-800/40 border border-slate-700/30 text-slate-600 cursor-not-allowed'
              }
            `}
            title="Повторить действие"
          >
            <Redo className="w-4 h-4 transition-colors" />
          </button>
        </div>
        
        {/* Separator */}
        <div className="h-6 w-px bg-green-500/30 mx-2" />
        
        {/* Zoom Controls */}
        <div className="flex items-center gap-1 px-2 py-1.5 rounded-lg bg-slate-800/60 border border-slate-600/40">
          <button 
            onClick={handleZoomOut}
            className="w-7 h-7 rounded-md hover:bg-slate-700/60 transition-all duration-200 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={zoom <= 25}
            title="Уменьшить масштаб"
          >
            <ZoomOut className="w-3 h-3 text-slate-400 hover:text-green-400" />
          </button>
          
          <div className="px-2 py-1 text-xs text-green-400 font-medium min-w-[45px] text-center">
            {zoom}%
          </div>
          
          <button 
            onClick={handleZoomIn}
            className="w-7 h-7 rounded-md hover:bg-slate-700/60 transition-all duration-200 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={zoom >= 200}
            title="Увеличить масштаб"
          >
            <ZoomIn className="w-3 h-3 text-slate-400 hover:text-green-400" />
          </button>
        </div>
      </div>

      {/* Right Side - Run Plan */}
      <div className="relative z-10 flex-shrink-0">
        <button
          onClick={onRunPlan}
          disabled={!isValid || isLoading}
          className={`
            group relative px-6 py-2.5 rounded-lg font-bold text-sm
            transition-all duration-300 transform-gpu overflow-hidden
            ${isValid && !isLoading 
              ? 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 hover:scale-105 hover:shadow-lg text-white' 
              : 'bg-slate-800/60 border border-slate-600/60 text-slate-500 cursor-not-allowed'
            }
          `}
        >
          <div className="relative flex items-center gap-2">
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                <span>Running...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 fill-current" />
                <span>RUN PLAN</span>
                {isValid && <Sparkles className="w-3 h-3 opacity-70" />}
              </>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};
