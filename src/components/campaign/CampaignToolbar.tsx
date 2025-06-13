
import { Play, Plus, ZoomIn, ZoomOut, Eye, EyeOff, Target, Smartphone, Globe, Megaphone, Users, Palette, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { BuilderBlock } from '@/types/campaign';

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

const workflowColors = {
  client: {
    gradient: 'from-blue-500/20 via-blue-600/30 to-blue-700/20',
    border: 'border-blue-500/30',
    shadow: 'shadow-blue-500/20',
    hoverShadow: 'hover:shadow-blue-500/40',
    text: 'text-blue-200',
    hoverText: 'hover:text-blue-100',
    bg: 'hover:bg-blue-500/10'
  },
  application: {
    gradient: 'from-purple-500/20 via-purple-600/30 to-purple-700/20',
    border: 'border-purple-500/30',
    shadow: 'shadow-purple-500/20',
    hoverShadow: 'hover:shadow-purple-500/40',
    text: 'text-purple-200',
    hoverText: 'hover:text-purple-100',
    bg: 'hover:bg-purple-500/10'
  },
  platform: {
    gradient: 'from-cyan-500/20 via-cyan-600/30 to-cyan-700/20',
    border: 'border-cyan-500/30',
    shadow: 'shadow-cyan-500/20',
    hoverShadow: 'hover:shadow-cyan-500/40',
    text: 'text-cyan-200',
    hoverText: 'hover:text-cyan-100',
    bg: 'hover:bg-cyan-500/10'
  },
  campaign: {
    gradient: 'from-orange-500/20 via-orange-600/30 to-orange-700/20',
    border: 'border-orange-500/30',
    shadow: 'shadow-orange-500/20',
    hoverShadow: 'hover:shadow-orange-500/40',
    text: 'text-orange-200',
    hoverText: 'hover:text-orange-100',
    bg: 'hover:bg-orange-500/10'
  },
  adset: {
    gradient: 'from-amber-500/20 via-amber-600/30 to-amber-700/20',
    border: 'border-amber-500/30',
    shadow: 'shadow-amber-500/20',
    hoverShadow: 'hover:shadow-amber-500/40',
    text: 'text-amber-200',
    hoverText: 'hover:text-amber-100',
    bg: 'hover:bg-amber-500/10'
  },
  creative: {
    gradient: 'from-emerald-500/20 via-emerald-600/30 to-emerald-700/20',
    border: 'border-emerald-500/30',
    shadow: 'shadow-emerald-500/20',
    hoverShadow: 'hover:shadow-emerald-500/40',
    text: 'text-emerald-200',
    hoverText: 'hover:text-emerald-100',
    bg: 'hover:bg-emerald-500/10'
  }
};

const blockTypes = [
  { type: 'client' as const, label: 'CLIENT', icon: Target },
  { type: 'application' as const, label: 'APP', icon: Smartphone },
  { type: 'platform' as const, label: 'SOURCE', icon: Globe },
  { type: 'campaign' as const, label: 'CAMPAIGN', icon: Megaphone },
  { type: 'adset' as const, label: 'ADSET', icon: Users },
  { type: 'creative' as const, label: 'CREATIVE', icon: Palette },
];

export const CampaignToolbar = ({
  onAddBlock,
  onRunPlan,
  isValid,
  isLoading,
  zoom,
  onZoomChange,
  blocksVisible,
  onToggleBlocksVisibility,
}: CampaignToolbarProps) => {
  return (
    <div className="h-20 bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-xl border-b border-slate-700/50 flex items-center justify-between px-8 shadow-2xl relative">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 pointer-events-none"></div>
      
      {/* Left Section - Block Type Buttons */}
      <div className="flex items-center gap-3 relative z-10">
        {blockTypes.map(({ type, label, icon: Icon }) => {
          const colors = workflowColors[type];
          return (
            <button
              key={type}
              onClick={() => onAddBlock(type)}
              className={`
                group relative px-6 py-3.5 rounded-2xl font-bold text-xs backdrop-blur-sm
                bg-gradient-to-br ${colors.gradient} ${colors.border} ${colors.text} ${colors.hoverText}
                transition-all duration-300 hover:scale-105 active:scale-95 overflow-hidden
                shadow-lg ${colors.shadow} ${colors.hoverShadow} hover:shadow-xl
                ${colors.bg} hover:-translate-y-0.5
                before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/0 before:via-white/5 before:to-white/0 
                before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700
              `}
            >
              <div className="flex items-center gap-2.5 relative z-10">
                <Icon className="w-4 h-4 drop-shadow-sm group-hover:drop-shadow-md transition-all duration-200" />
                <span className="font-black tracking-wider drop-shadow-sm group-hover:drop-shadow-md">
                  {label}
                </span>
              </div>
              
              {/* Glow effect on hover */}
              <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-md bg-gradient-to-br ${colors.gradient.replace('/20', '/40').replace('/30', '/60')}`}></div>
            </button>
          );
        })}
      </div>

      {/* Right Section - Controls */}
      <div className="flex items-center gap-6 relative z-10">
        {/* Zoom Controls */}
        <div className="flex items-center gap-2 glass-medium rounded-2xl p-2.5 border border-slate-600/40 backdrop-blur-xl shadow-lg">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onZoomChange(Math.max(25, zoom - 25))}
            className="h-9 w-9 p-0 text-slate-300 hover:text-white hover:bg-slate-700/60 rounded-xl transition-all duration-200 hover:scale-105"
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          
          <div className="px-4 py-2 text-sm font-bold text-slate-200 min-w-16 text-center glass-light rounded-lg border border-slate-600/30">
            {zoom}%
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onZoomChange(Math.min(200, zoom + 25))}
            className="h-9 w-9 p-0 text-slate-300 hover:text-white hover:bg-slate-700/60 rounded-xl transition-all duration-200 hover:scale-105"
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-8 bg-slate-600/40" />

        {/* Visibility Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleBlocksVisibility}
          className={`
            h-11 px-5 rounded-2xl transition-all duration-300 border font-semibold backdrop-blur-sm
            ${blocksVisible 
              ? 'text-blue-200 hover:text-blue-100 glass-medium border-blue-500/40 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:bg-blue-500/10' 
              : 'text-slate-300 hover:text-white glass-light border-slate-600/40 hover:bg-slate-700/30'
            }
            hover:scale-105 hover:-translate-y-0.5
          `}
        >
          {blocksVisible ? <Eye className="w-4 h-4 mr-2" /> : <EyeOff className="w-4 h-4 mr-2" />}
          <span className="text-sm">
            {blocksVisible ? 'Hide Blocks' : 'Show Blocks'}
          </span>
        </Button>

        <Separator orientation="vertical" className="h-8 bg-slate-600/40" />

        {/* Run Plan Button */}
        <Button
          onClick={onRunPlan}
          disabled={!isValid || isLoading}
          className={`
            h-12 px-8 rounded-2xl font-bold text-sm transition-all duration-300 overflow-hidden relative
            ${isValid 
              ? 'bg-gradient-to-r from-blue-500/80 via-blue-600/90 to-purple-600/80 hover:from-blue-400/90 hover:via-blue-500/95 hover:to-purple-500/90 text-white shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 border border-white/20 backdrop-blur-sm' 
              : 'glass-light text-slate-400 cursor-not-allowed border border-slate-600/30'
            }
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
            before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/0 before:via-white/20 before:to-white/0 
            before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700
          `}
        >
          {isLoading ? (
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span className="tracking-wide">Running...</span>
            </div>
          ) : (
            <div className="flex items-center gap-3 relative z-10">
              <Play className="w-5 h-5 fill-current drop-shadow-sm" />
              <span className="tracking-wide">Run Plan</span>
            </div>
          )}
        </Button>
      </div>
    </div>
  );
};
