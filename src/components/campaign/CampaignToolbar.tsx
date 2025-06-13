
import { Button } from '@/components/ui/button';
import { Plus, Undo, Redo, ZoomIn, ZoomOut, Play, Sparkles } from 'lucide-react';
import { BuilderBlock } from '@/pages/CampaignManagement';

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
  const blockTypes: Array<{ type: BuilderBlock['type']; label: string; icon: string; color: string }> = [
    { type: 'client', label: 'Client', icon: '👤', color: 'bg-slate-800/80 hover:bg-blue-500/20 border-slate-600/50 hover:border-blue-500/60 text-blue-400' },
    { type: 'application', label: 'App', icon: '📱', color: 'bg-slate-800/80 hover:bg-purple-500/20 border-slate-600/50 hover:border-purple-500/60 text-purple-400' },
    { type: 'platform', label: 'Source', icon: '🌐', color: 'bg-slate-800/80 hover:bg-cyan-500/20 border-slate-600/50 hover:border-cyan-500/60 text-cyan-400' },
    { type: 'campaign', label: 'Campaign', icon: '🎯', color: 'bg-slate-800/80 hover:bg-red-500/20 border-slate-600/50 hover:border-red-500/60 text-red-400' },
    { type: 'adset', label: 'Adset', icon: '📊', color: 'bg-slate-800/80 hover:bg-orange-500/20 border-slate-600/50 hover:border-orange-500/60 text-orange-400' },
    { type: 'creative', label: 'Creative', icon: '🎨', color: 'bg-slate-800/80 hover:bg-pink-500/20 border-slate-600/50 hover:border-pink-500/60 text-pink-400' },
  ];

  return (
    <div className="h-16 bg-gradient-to-r from-slate-900/95 via-slate-900/98 to-slate-900/95 backdrop-blur-xl border-b border-green-500/20 flex items-center justify-between px-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-green-500/5 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.1)_0%,transparent_70%)] pointer-events-none" />
      
      {/* Left Side - Block Tools */}
      <div className="flex items-center gap-3 relative z-10">
        <div className="flex items-center gap-1.5">
          {blockTypes.map(({ type, label, icon, color }) => (
            <button
              key={type}
              onClick={() => onAddBlock(type)}
              className={`
                group relative px-3 py-2 rounded-lg text-sm font-medium 
                transition-all duration-200 ease-out
                ${color}
                border backdrop-blur-sm
                hover:scale-[1.02] hover:shadow-lg
                active:scale-[0.98]
                flex items-center gap-2 min-w-0
              `}
            >
              <span className="text-base flex-shrink-0 group-hover:scale-110 transition-transform duration-200">
                {icon}
              </span>
              <span className="text-slate-300 group-hover:text-current transition-colors whitespace-nowrap">
                {label}
              </span>
              
              {/* Subtle glow effect on hover */}
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gradient-to-r from-white/5 to-white/10 pointer-events-none" />
            </button>
          ))}
        </div>
        
        {/* Elegant Separator */}
        <div className="h-8 w-px bg-gradient-to-b from-transparent via-green-500/30 to-transparent mx-3" />
        
        {/* Action Tools */}
        <div className="flex items-center gap-1">
          {[
            { icon: Undo, tooltip: 'Undo' },
            { icon: Redo, tooltip: 'Redo' }
          ].map(({ icon: Icon, tooltip }, index) => (
            <button
              key={index}
              className="group relative w-9 h-9 rounded-lg bg-slate-800/60 border border-slate-600/40 hover:border-green-500/50 hover:bg-slate-700/60 transition-all duration-200 flex items-center justify-center"
              title={tooltip}
            >
              <Icon className="w-4 h-4 text-slate-400 group-hover:text-green-400 transition-colors" />
              <div className="absolute inset-0 rounded-lg bg-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </button>
          ))}
        </div>
        
        {/* Another Separator */}
        <div className="h-8 w-px bg-gradient-to-b from-transparent via-green-500/30 to-transparent mx-3" />
        
        {/* Zoom Controls */}
        <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-800/40 border border-slate-600/30 backdrop-blur-sm">
          <button className="group w-7 h-7 rounded-md hover:bg-slate-700/50 transition-colors flex items-center justify-center">
            <ZoomOut className="w-3.5 h-3.5 text-slate-400 group-hover:text-green-400 transition-colors" />
          </button>
          <div className="px-2.5 py-1 rounded-md bg-slate-900/60 border border-slate-700/40">
            <span className="text-xs text-green-400 font-medium">100%</span>
          </div>
          <button className="group w-7 h-7 rounded-md hover:bg-slate-700/50 transition-colors flex items-center justify-center">
            <ZoomIn className="w-3.5 h-3.5 text-slate-400 group-hover:text-green-400 transition-colors" />
          </button>
        </div>
      </div>

      {/* Right Side - Run Plan */}
      <div className="relative z-10">
        <button
          onClick={onRunPlan}
          disabled={!isValid || isLoading}
          className={`
            group relative px-6 py-2.5 rounded-lg font-semibold text-sm tracking-wide
            transition-all duration-300 transform-gpu overflow-hidden
            ${isValid && !isLoading 
              ? 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 hover:scale-105 hover:shadow-xl hover:shadow-green-500/25 text-white' 
              : 'bg-slate-800/50 border border-slate-600/50 text-slate-500 cursor-not-allowed'
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
          
          <div className="relative flex items-center gap-2.5">
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-400 border-t-transparent rounded-full animate-spin" />
                <span>Running...</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                <span>RUN PLAN</span>
                {isValid && <Sparkles className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100 transition-opacity" />}
              </>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};
