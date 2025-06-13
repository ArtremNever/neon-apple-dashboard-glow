
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

  const blockTypes: Array<{ type: BuilderBlock['type']; label: string; icon: string; color: string }> = [
    { type: 'client', label: 'Client', icon: '👤', color: 'text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 border-blue-500/30 hover:border-blue-400/50' },
    { type: 'application', label: 'App', icon: '📱', color: 'text-purple-400 bg-purple-500/10 hover:bg-purple-500/20 border-purple-500/30 hover:border-purple-400/50' },
    { type: 'platform', label: 'Source', icon: '🌐', color: 'text-cyan-400 bg-cyan-500/10 hover:bg-cyan-500/20 border-cyan-500/30 hover:border-cyan-400/50' },
    { type: 'campaign', label: 'Campaign', icon: '🎯', color: 'text-red-400 bg-red-500/10 hover:bg-red-500/20 border-red-500/30 hover:border-red-400/50' },
    { type: 'adset', label: 'Adset', icon: '📊', color: 'text-orange-400 bg-orange-500/10 hover:bg-orange-500/20 border-orange-500/30 hover:border-orange-400/50' },
    { type: 'creative', label: 'Creative', icon: '🎨', color: 'text-pink-400 bg-pink-500/10 hover:bg-pink-500/20 border-pink-500/30 hover:border-pink-400/50' },
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
        {/* Compact Block Type Buttons */}
        <div className="flex items-center gap-2">
          {blockTypes.map(({ type, label, icon, color }) => (
            <button
              key={type}
              onClick={() => onAddBlock(type)}
              className={`
                group relative px-3 py-2 rounded-lg text-sm font-medium 
                transition-all duration-200 ease-out
                ${color}
                border backdrop-blur-sm
                hover:scale-105 hover:shadow-lg
                active:scale-95
                flex items-center gap-2 min-w-0
                focus:outline-none focus:ring-2 focus:ring-current/30
              `}
            >
              <span className="text-base flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                {icon}
              </span>
              <span className="text-xs font-medium whitespace-nowrap">
                {label}
              </span>
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
