
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

const blockTypes = [
  { type: 'client' as const, label: 'CLIENT', icon: Target, color: 'from-blue-500 to-blue-600', hoverColor: 'hover:shadow-blue-500/30' },
  { type: 'application' as const, label: 'APP', icon: Smartphone, color: 'from-indigo-500 to-indigo-600', hoverColor: 'hover:shadow-indigo-500/30' },
  { type: 'platform' as const, label: 'SOURCE', icon: Globe, color: 'from-cyan-500 to-cyan-600', hoverColor: 'hover:shadow-cyan-500/30' },
  { type: 'campaign' as const, label: 'CAMPAIGN', icon: Megaphone, color: 'from-purple-500 to-purple-600', hoverColor: 'hover:shadow-purple-500/30' },
  { type: 'adset' as const, label: 'ADSET', icon: Users, color: 'from-amber-500 to-amber-600', hoverColor: 'hover:shadow-amber-500/30' },
  { type: 'creative' as const, label: 'CREATIVE', icon: Palette, color: 'from-emerald-500 to-emerald-600', hoverColor: 'hover:shadow-emerald-500/30' },
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
    <div className="h-20 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-slate-700/30 flex items-center justify-between px-8 shadow-2xl backdrop-blur-xl">
      {/* Left Section - Block Type Buttons */}
      <div className="flex items-center gap-2">
        {blockTypes.map(({ type, label, icon: Icon, color, hoverColor }) => (
          <button
            key={type}
            onClick={() => onAddBlock(type)}
            className={`
              group relative px-5 py-3 rounded-2xl font-bold text-xs text-white 
              bg-gradient-to-br ${color} ${hoverColor} hover:shadow-xl
              transition-all duration-300 hover:scale-110 active:scale-95
              border border-white/20 backdrop-blur-sm overflow-hidden
              before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/0 before:via-white/10 before:to-white/0 
              before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700
            `}
          >
            <div className="flex items-center gap-2.5 relative z-10">
              <Icon className="w-4 h-4 drop-shadow-sm" />
              <span className="font-black tracking-wider drop-shadow-sm">{label}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Right Section - Controls */}
      <div className="flex items-center gap-6">
        {/* Zoom Controls */}
        <div className="flex items-center gap-2 bg-slate-800/80 rounded-2xl p-2 border border-slate-600/40 backdrop-blur-sm shadow-lg">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onZoomChange(Math.max(25, zoom - 25))}
            className="h-9 w-9 p-0 text-slate-300 hover:text-white hover:bg-slate-700/60 rounded-xl transition-all duration-200"
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          
          <div className="px-4 py-2 text-sm font-bold text-slate-200 min-w-16 text-center bg-slate-700/50 rounded-lg border border-slate-600/30">
            {zoom}%
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onZoomChange(Math.min(200, zoom + 25))}
            className="h-9 w-9 p-0 text-slate-300 hover:text-white hover:bg-slate-700/60 rounded-xl transition-all duration-200"
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
            h-11 px-5 rounded-2xl transition-all duration-300 border font-semibold
            ${blocksVisible 
              ? 'text-blue-300 hover:text-blue-200 bg-blue-500/20 hover:bg-blue-500/30 border-blue-500/40 shadow-lg shadow-blue-500/20' 
              : 'text-slate-300 hover:text-white hover:bg-slate-700/60 border-slate-600/40'
            }
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
            h-12 px-8 rounded-2xl font-bold text-sm transition-all duration-300 overflow-hidden
            ${isValid 
              ? 'bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 hover:from-blue-400 hover:via-blue-500 hover:to-purple-500 text-white shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105 border border-white/20' 
              : 'bg-slate-700/50 text-slate-400 cursor-not-allowed border border-slate-600/30'
            }
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
            before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/0 before:via-white/20 before:to-white/0 
            before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700
            relative
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
