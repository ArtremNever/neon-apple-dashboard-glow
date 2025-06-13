
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
    { type: 'client', label: 'Client', icon: '👤', color: 'text-blue-400 bg-slate-800/90 hover:bg-blue-500/10 border-slate-700/60 hover:border-blue-500/40' },
    { type: 'application', label: 'App', icon: '📱', color: 'text-purple-400 bg-slate-800/90 hover:bg-purple-500/10 border-slate-700/60 hover:border-purple-500/40' },
    { type: 'platform', label: 'Source', icon: '🌐', color: 'text-cyan-400 bg-slate-800/90 hover:bg-cyan-500/10 border-slate-700/60 hover:border-cyan-500/40' },
    { type: 'campaign', label: 'Campaign', icon: '🎯', color: 'text-red-400 bg-slate-800/90 hover:bg-red-500/10 border-slate-700/60 hover:border-red-500/40' },
    { type: 'adset', label: 'Adset', icon: '📊', color: 'text-orange-400 bg-slate-800/90 hover:bg-orange-500/10 border-slate-700/60 hover:border-orange-500/40' },
    { type: 'creative', label: 'Creative', icon: '🎨', color: 'text-pink-400 bg-slate-800/90 hover:bg-pink-500/10 border-slate-700/60 hover:border-pink-500/40' },
  ];

  const handleZoomIn = () => {
    const newZoom = Math.min(zoom + 25, 200);
    setZoom(newZoom);
    // Здесь можно добавить логику для реального масштабирования canvas
    console.log('Zoom in to:', newZoom + '%');
  };

  const handleZoomOut = () => {
    const newZoom = Math.max(zoom - 25, 25);
    setZoom(newZoom);
    // Здесь можно добавить логику для реального масштабирования canvas
    console.log('Zoom out to:', newZoom + '%');
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      console.log('Undo action');
      // Здесь должна быть логика для отмены последнего действия
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      console.log('Redo action');
      // Здесь должна быть логика для повтора действия
    }
  };

  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  return (
    <div className="h-16 bg-gradient-to-r from-slate-900/95 via-slate-900/98 to-slate-900/95 backdrop-blur-xl border-b border-green-500/20 flex items-center justify-between px-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-green-500/5 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.1)_0%,transparent_70%)] pointer-events-none" />
      
      {/* Left Side - Block Tools */}
      <div className="flex items-center gap-4 relative z-10">
        {/* Block Type Buttons */}
        <div className="flex items-center gap-2">
          {blockTypes.map(({ type, label, icon, color }) => (
            <button
              key={type}
              onClick={() => onAddBlock(type)}
              className={`
                group relative px-4 py-2.5 rounded-xl text-sm font-medium 
                transition-all duration-300 ease-out
                ${color}
                border backdrop-blur-sm
                hover:scale-[1.02] hover:shadow-lg hover:shadow-current/10
                active:scale-[0.98]
                flex items-center gap-2.5 min-w-0
                focus:outline-none focus:ring-2 focus:ring-current/30
              `}
            >
              <span className="text-lg flex-shrink-0 group-hover:scale-110 transition-transform duration-300 filter drop-shadow-sm">
                {icon}
              </span>
              <span className="text-slate-300 group-hover:text-current transition-colors duration-300 whitespace-nowrap font-medium">
                {label}
              </span>
              
              {/* Subtle inner glow */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-white/5 via-white/10 to-white/5 pointer-events-none" />
            </button>
          ))}
        </div>
        
        {/* Elegant Separator */}
        <div className="h-8 w-px bg-gradient-to-b from-transparent via-green-500/40 to-transparent mx-2" />
        
        {/* Action Tools - Undo/Redo */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleUndo}
            disabled={!canUndo}
            className={`
              group relative w-10 h-10 rounded-lg transition-all duration-200 flex items-center justify-center
              ${canUndo 
                ? 'bg-slate-800/80 border border-slate-600/50 hover:border-green-500/60 hover:bg-slate-700/80 text-slate-300 hover:text-green-400' 
                : 'bg-slate-800/40 border border-slate-700/30 text-slate-600 cursor-not-allowed'
              }
            `}
            title="Отменить действие (Ctrl+Z)"
          >
            <Undo className="w-4 h-4 transition-colors" />
            {canUndo && <div className="absolute inset-0 rounded-lg bg-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />}
          </button>
          
          <button
            onClick={handleRedo}
            disabled={!canRedo}
            className={`
              group relative w-10 h-10 rounded-lg transition-all duration-200 flex items-center justify-center
              ${canRedo 
                ? 'bg-slate-800/80 border border-slate-600/50 hover:border-green-500/60 hover:bg-slate-700/80 text-slate-300 hover:text-green-400' 
                : 'bg-slate-800/40 border border-slate-700/30 text-slate-600 cursor-not-allowed'
              }
            `}
            title="Повторить действие (Ctrl+Y)"
          >
            <Redo className="w-4 h-4 transition-colors" />
            {canRedo && <div className="absolute inset-0 rounded-lg bg-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />}
          </button>
        </div>
        
        {/* Another Separator */}
        <div className="h-8 w-px bg-gradient-to-b from-transparent via-green-500/40 to-transparent mx-2" />
        
        {/* Zoom Controls */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800/60 border border-slate-600/40 backdrop-blur-sm">
          <button 
            onClick={handleZoomOut}
            className="group w-8 h-8 rounded-md hover:bg-slate-700/60 transition-all duration-200 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={zoom <= 25}
            title="Уменьшить масштаб"
          >
            <ZoomOut className="w-4 h-4 text-slate-400 group-hover:text-green-400 transition-colors" />
          </button>
          
          <div className="px-3 py-1.5 rounded-md bg-slate-900/80 border border-slate-700/50 min-w-[60px] text-center">
            <span className="text-sm text-green-400 font-semibold">{zoom}%</span>
          </div>
          
          <button 
            onClick={handleZoomIn}
            className="group w-8 h-8 rounded-md hover:bg-slate-700/60 transition-all duration-200 flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={zoom >= 200}
            title="Увеличить масштаб"
          >
            <ZoomIn className="w-4 h-4 text-slate-400 group-hover:text-green-400 transition-colors" />
          </button>
        </div>
      </div>

      {/* Right Side - Run Plan */}
      <div className="relative z-10 flex-shrink-0">
        <button
          onClick={onRunPlan}
          disabled={!isValid || isLoading}
          className={`
            group relative px-8 py-3 rounded-xl font-bold text-sm tracking-wide
            transition-all duration-300 transform-gpu overflow-hidden
            ${isValid && !isLoading 
              ? 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 hover:scale-105 hover:shadow-xl hover:shadow-green-500/25 text-white border-0' 
              : 'bg-slate-800/60 border border-slate-600/60 text-slate-500 cursor-not-allowed'
            }
          `}
        >
          {/* Animated Background */}
          {isValid && !isLoading && (
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-green-500/20 to-green-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          )}
          
          {/* Shimmer Effect */}
          {isValid && !isLoading && (
            <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-700 ease-out" />
          )}
          
          <div className="relative flex items-center gap-3">
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                <span>Running...</span>
              </>
            ) : (
              <>
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-200 fill-current" />
                <span>RUN PLAN</span>
                {isValid && <Sparkles className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity animate-pulse" />}
              </>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};
