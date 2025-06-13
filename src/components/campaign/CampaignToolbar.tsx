
import { Play, Plus, ZoomIn, ZoomOut, Eye, EyeOff, Target, Smartphone, Globe, Megaphone, Users, Palette } from 'lucide-react';
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
  { type: 'client' as const, label: 'CLIENT', icon: Target, color: 'from-blue-500 to-blue-600' },
  { type: 'application' as const, label: 'APP', icon: Smartphone, color: 'from-indigo-500 to-indigo-600' },
  { type: 'platform' as const, label: 'SOURCE', icon: Globe, color: 'from-cyan-500 to-cyan-600' },
  { type: 'campaign' as const, label: 'CAMPAIGN', icon: Megaphone, color: 'from-purple-500 to-purple-600' },
  { type: 'adset' as const, label: 'ADSET', icon: Users, color: 'from-amber-500 to-amber-600' },
  { type: 'creative' as const, label: 'CREATIVE', icon: Palette, color: 'from-emerald-500 to-emerald-600' },
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
    <div className="h-16 bg-slate-900/95 backdrop-blur-sm border-b border-slate-700/50 flex items-center justify-between px-6 shadow-lg">
      {/* Block Type Buttons */}
      <div className="flex items-center gap-3">
        {blockTypes.map(({ type, label, icon: Icon, color }) => (
          <button
            key={type}
            onClick={() => onAddBlock(type)}
            className={`
              group relative px-4 py-2 rounded-xl font-medium text-sm text-white 
              bg-gradient-to-r ${color} hover:shadow-lg hover:shadow-current/20
              transition-all duration-250 hover:scale-105 active:scale-95
              border border-white/10 backdrop-blur-sm
            `}
          >
            <div className="flex items-center gap-2">
              <Icon className="w-4 h-4" />
              <span className="font-semibold tracking-wide">{label}</span>
            </div>
            
            {/* Subtle glow effect */}
            <div className={`
              absolute inset-0 rounded-xl opacity-0 group-hover:opacity-20 
              transition-opacity duration-250 bg-gradient-to-r ${color} blur-md -z-10
            `} />
          </button>
        ))}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Zoom Controls */}
        <div className="flex items-center gap-1 bg-slate-800/60 rounded-lg p-1 border border-slate-600/30">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onZoomChange(Math.max(25, zoom - 25))}
            className="h-8 w-8 p-0 text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
          >
            <ZoomOut className="w-4 h-4" />
          </Button>
          
          <div className="px-3 py-1 text-xs font-medium text-slate-400 min-w-12 text-center">
            {zoom}%
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onZoomChange(Math.min(200, zoom + 25))}
            className="h-8 w-8 p-0 text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
          >
            <ZoomIn className="w-4 h-4" />
          </Button>
        </div>

        <Separator orientation="vertical" className="h-6 bg-slate-600/50" />

        {/* Visibility Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleBlocksVisibility}
          className={`
            h-9 px-3 rounded-lg transition-all duration-250
            ${blocksVisible 
              ? 'text-blue-400 hover:text-blue-300 bg-blue-500/10 hover:bg-blue-500/20' 
              : 'text-slate-400 hover:text-slate-300 hover:bg-slate-700/50'
            }
          `}
        >
          {blocksVisible ? <Eye className="w-4 h-4 mr-2" /> : <EyeOff className="w-4 h-4 mr-2" />}
          <span className="text-sm font-medium">
            {blocksVisible ? 'Hide' : 'Show'}
          </span>
        </Button>

        <Separator orientation="vertical" className="h-6 bg-slate-600/50" />

        {/* Run Plan Button */}
        <Button
          onClick={onRunPlan}
          disabled={!isValid || isLoading}
          className={`
            h-10 px-6 rounded-xl font-semibold text-sm transition-all duration-250
            ${isValid 
              ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30 hover:scale-105' 
              : 'bg-slate-700 text-slate-400 cursor-not-allowed'
            }
            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
            border border-white/10
          `}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Running...</span>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Play className="w-4 h-4 fill-current" />
              <span>Run Plan</span>
            </div>
          )}
        </Button>
      </div>
    </div>
  );
};
