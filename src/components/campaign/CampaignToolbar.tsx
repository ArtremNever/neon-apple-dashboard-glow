
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
    { type: 'client', label: 'Client', icon: '👤', color: 'from-blue-500/20 to-blue-600/20 border-blue-500/30 hover:border-blue-400/50' },
    { type: 'application', label: 'App', icon: '📱', color: 'from-purple-500/20 to-purple-600/20 border-purple-500/30 hover:border-purple-400/50' },
    { type: 'platform', label: 'Source', icon: '🌐', color: 'from-cyan-500/20 to-cyan-600/20 border-cyan-500/30 hover:border-cyan-400/50' },
    { type: 'campaign', label: 'Campaign', icon: '🎯', color: 'from-red-500/20 to-red-600/20 border-red-500/30 hover:border-red-400/50' },
    { type: 'adset', label: 'Adset', icon: '📊', color: 'from-orange-500/20 to-orange-600/20 border-orange-500/30 hover:border-orange-400/50' },
    { type: 'creative', label: 'Creative', icon: '🎨', color: 'from-pink-500/20 to-pink-600/20 border-pink-500/30 hover:border-pink-400/50' },
  ];

  return (
    <div className="h-16 bg-gradient-to-r from-slate-900/95 via-slate-900/98 to-slate-900/95 backdrop-blur-xl border-b border-green-500/20 flex items-center justify-between px-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-green-500/5 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.1)_0%,transparent_70%)] pointer-events-none" />
      
      {/* Left Side - Block Tools */}
      <div className="flex items-center gap-3 relative z-10">
        <div className="flex items-center gap-2">
          {blockTypes.map(({ type, label, icon, color }) => (
            <button
              key={type}
              onClick={() => onAddBlock(type)}
              className={`
                relative group px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300
                bg-gradient-to-br ${color}
                border backdrop-blur-sm
                hover:scale-105 hover:shadow-lg hover:shadow-green-500/10
                active:scale-95 transform-gpu
                flex items-center gap-2
              `}
            >
              <span className="text-lg group-hover:scale-110 transition-transform duration-200">
                {icon}
              </span>
              <span className="text-green-100/90 group-hover:text-green-50 transition-colors">
                {label}
              </span>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          ))}
        </div>
        
        {/* Elegant Separator */}
        <div className="h-8 w-px bg-gradient-to-b from-transparent via-green-500/40 to-transparent mx-4" />
        
        {/* Action Tools */}
        <div className="flex items-center gap-1">
          {[
            { icon: Undo, tooltip: 'Undo' },
            { icon: Redo, tooltip: 'Redo' }
          ].map(({ icon: Icon, tooltip }, index) => (
            <button
              key={index}
              className="group relative w-10 h-10 rounded-lg bg-slate-800/50 border border-slate-700/50 hover:border-green-500/50 hover:bg-slate-700/50 transition-all duration-200 flex items-center justify-center"
              title={tooltip}
            >
              <Icon className="w-4 h-4 text-slate-400 group-hover:text-green-400 transition-colors" />
              <div className="absolute inset-0 rounded-lg bg-green-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
            </button>
          ))}
        </div>
        
        {/* Another Separator */}
        <div className="h-8 w-px bg-gradient-to-b from-transparent via-green-500/40 to-transparent mx-4" />
        
        {/* Zoom Controls */}
        <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800/30 border border-slate-700/30 backdrop-blur-sm">
          <button className="group w-8 h-8 rounded-lg hover:bg-slate-700/50 transition-colors flex items-center justify-center">
            <ZoomOut className="w-4 h-4 text-slate-400 group-hover:text-green-400 transition-colors" />
          </button>
          <div className="px-3 py-1 rounded-lg bg-slate-900/50 border border-slate-700/50">
            <span className="text-sm text-green-400 font-medium">100%</span>
          </div>
          <button className="group w-8 h-8 rounded-lg hover:bg-slate-700/50 transition-colors flex items-center justify-center">
            <ZoomIn className="w-4 h-4 text-slate-400 group-hover:text-green-400 transition-colors" />
          </button>
        </div>
      </div>

      {/* Right Side - Run Plan */}
      <div className="relative z-10">
        <button
          onClick={onRunPlan}
          disabled={!isValid || isLoading}
          className={`
            group relative px-8 py-3 rounded-xl font-semibold text-sm tracking-wide
            transition-all duration-300 transform-gpu overflow-hidden
            ${isValid && !isLoading 
              ? 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/30 text-white' 
              : 'bg-slate-800/50 border border-slate-700/50 text-slate-500 cursor-not-allowed'
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
                <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                <span>RUN PLAN</span>
                {isValid && <Sparkles className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />}
              </>
            )}
          </div>
        </button>
      </div>
    </div>
  );
};
