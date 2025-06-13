
import React, { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Trash2, Target, Smartphone, Globe, Megaphone, Users, Palette } from 'lucide-react';
import { BuilderBlock } from '@/types/campaign';

export interface HierarchyNodeData {
  block: BuilderBlock;
  onSelect: (block: BuilderBlock) => void;
  onDelete: (blockId: string) => void;
  isSelected: boolean;
}

const getBlockConfig = (type: BuilderBlock['type']) => {
  const configs = {
    client: {
      icon: Target,
      label: 'CLIENT',
      gradient: 'from-blue-500/90 to-blue-700/90',
      glowColor: 'shadow-blue-500/40',
      borderColor: 'border-blue-400/50',
      textColor: 'text-blue-100',
      bgPattern: 'bg-gradient-to-br from-blue-600/20 to-blue-800/20'
    },
    application: {
      icon: Smartphone,
      label: 'APPLICATION',
      gradient: 'from-purple-500/90 to-purple-700/90',
      glowColor: 'shadow-purple-500/40',
      borderColor: 'border-purple-400/50',
      textColor: 'text-purple-100',
      bgPattern: 'bg-gradient-to-br from-purple-600/20 to-purple-800/20'
    },
    platform: {
      icon: Globe,
      label: 'SOURCE',
      gradient: 'from-cyan-500/90 to-cyan-700/90',
      glowColor: 'shadow-cyan-500/40',
      borderColor: 'border-cyan-400/50',
      textColor: 'text-cyan-100',
      bgPattern: 'bg-gradient-to-br from-cyan-600/20 to-cyan-800/20'
    },
    campaign: {
      icon: Megaphone,
      label: 'CAMPAIGN',
      gradient: 'from-orange-500/90 to-orange-700/90',
      glowColor: 'shadow-orange-500/40',
      borderColor: 'border-orange-400/50',
      textColor: 'text-orange-100',
      bgPattern: 'bg-gradient-to-br from-orange-600/20 to-orange-800/20'
    },
    adset: {
      icon: Users,
      label: 'ADSET',
      gradient: 'from-amber-500/90 to-amber-700/90',
      glowColor: 'shadow-amber-500/40',
      borderColor: 'border-amber-400/50',
      textColor: 'text-amber-100',
      bgPattern: 'bg-gradient-to-br from-amber-600/20 to-amber-800/20'
    },
    creative: {
      icon: Palette,
      label: 'CREATIVE',
      gradient: 'from-emerald-500/90 to-emerald-700/90',
      glowColor: 'shadow-emerald-500/40',
      borderColor: 'border-emerald-400/50',
      textColor: 'text-emerald-100',
      bgPattern: 'bg-gradient-to-br from-emerald-600/20 to-emerald-800/20'
    }
  };
  
  return configs[type];
};

export const HierarchyNode = memo(({ data }: NodeProps<HierarchyNodeData>) => {
  const { block, onSelect, onDelete, isSelected } = data;
  const config = getBlockConfig(block.type);
  const Icon = config.icon;

  return (
    <div className="relative group">
      {/* Connection Handles - All four sides */}
      {/* Top Handle */}
      <Handle
        type="target"
        position={Position.Top}
        id="top-target"
        className="!w-3 !h-3 !bg-gradient-to-br !from-slate-300 !to-slate-500 !border-2 !border-white/50 !rounded-full hover:!scale-125 !transition-all !duration-200 hover:!shadow-lg hover:!shadow-blue-400/60"
        style={{ top: '-6px', left: '50%', transform: 'translateX(-50%)' }}
      />
      <Handle
        type="source"
        position={Position.Top}
        id="top-source"
        className="!w-3 !h-3 !bg-gradient-to-br !from-blue-400 !to-blue-600 !border-2 !border-white/50 !rounded-full hover:!scale-125 !transition-all !duration-200 hover:!shadow-lg hover:!shadow-blue-400/60"
        style={{ top: '-6px', left: '60%', transform: 'translateX(-50%)' }}
      />

      {/* Right Handle */}
      <Handle
        type="target"
        position={Position.Right}
        id="right-target"
        className="!w-3 !h-3 !bg-gradient-to-br !from-slate-300 !to-slate-500 !border-2 !border-white/50 !rounded-full hover:!scale-125 !transition-all !duration-200 hover:!shadow-lg hover:!shadow-blue-400/60"
        style={{ right: '-6px', top: '40%', transform: 'translateY(-50%)' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right-source"
        className="!w-3 !h-3 !bg-gradient-to-br !from-blue-400 !to-blue-600 !border-2 !border-white/50 !rounded-full hover:!scale-125 !transition-all !duration-200 hover:!shadow-lg hover:!shadow-blue-400/60"
        style={{ right: '-6px', top: '60%', transform: 'translateY(-50%)' }}
      />

      {/* Bottom Handle */}
      <Handle
        type="target"
        position={Position.Bottom}
        id="bottom-target"
        className="!w-3 !h-3 !bg-gradient-to-br !from-slate-300 !to-slate-500 !border-2 !border-white/50 !rounded-full hover:!scale-125 !transition-all !duration-200 hover:!shadow-lg hover:!shadow-blue-400/60"
        style={{ bottom: '-6px', left: '40%', transform: 'translateX(-50%)' }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="bottom-source"
        className="!w-3 !h-3 !bg-gradient-to-br !from-blue-400 !to-blue-600 !border-2 !border-white/50 !rounded-full hover:!scale-125 !transition-all !duration-200 hover:!shadow-lg hover:!shadow-blue-400/60"
        style={{ bottom: '-6px', left: '60%', transform: 'translateX(-50%)' }}
      />

      {/* Left Handle */}
      <Handle
        type="target"
        position={Position.Left}
        id="left-target"
        className="!w-3 !h-3 !bg-gradient-to-br !from-slate-300 !to-slate-500 !border-2 !border-white/50 !rounded-full hover:!scale-125 !transition-all !duration-200 hover:!shadow-lg hover:!shadow-blue-400/60"
        style={{ left: '-6px', top: '40%', transform: 'translateY(-50%)' }}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="left-source"
        className="!w-3 !h-3 !bg-gradient-to-br !from-blue-400 !to-blue-600 !border-2 !border-white/50 !rounded-full hover:!scale-125 !transition-all !duration-200 hover:!shadow-lg hover:!shadow-blue-400/60"
        style={{ left: '-6px', top: '60%', transform: 'translateY(-50%)' }}
      />

      {/* Main Node Content */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          onSelect(block);
        }}
        className={`
          relative h-full w-full rounded-3xl p-6 cursor-pointer transition-all duration-300 overflow-hidden
          glass-medium backdrop-blur-xl ${config.borderColor} border-2
          ${isSelected 
            ? `ring-4 ring-white/30 ${config.glowColor} shadow-2xl scale-105` 
            : `${config.glowColor} shadow-lg hover:shadow-xl hover:scale-102`
          }
          group-hover:-translate-y-1 group-hover:rotate-1
        `}
      >
        {/* Background Pattern */}
        <div className={`absolute inset-0 ${config.bgPattern} opacity-30 rounded-3xl`}></div>
        
        {/* Gradient Overlay */}
        <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-80 rounded-3xl`}></div>
        
        {/* Animated Border Glow */}
        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${config.gradient} opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-sm`}></div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          <div className={`p-3 rounded-2xl ${config.bgPattern} border ${config.borderColor} mb-4 group-hover:scale-110 transition-transform duration-300`}>
            <Icon className={`w-8 h-8 ${config.textColor} drop-shadow-lg`} />
          </div>
          
          <h3 className={`font-black text-lg tracking-wider ${config.textColor} drop-shadow-lg mb-2`}>
            {config.label}
          </h3>
          
          <div className={`text-xs ${config.textColor} opacity-80 font-medium tracking-wide bg-black/20 px-3 py-1 rounded-full border border-white/20`}>
            ID: {block.id.slice(-4)}
          </div>
        </div>
        
        {/* Delete Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete(block.id);
          }}
          className="absolute top-3 right-3 p-2 rounded-xl bg-red-500/20 hover:bg-red-500/40 border border-red-400/30 hover:border-red-300/50 text-red-200 hover:text-red-100 transition-all duration-200 opacity-0 group-hover:opacity-100 hover:scale-110 backdrop-blur-sm"
        >
          <Trash2 className="w-4 h-4 drop-shadow-sm" />
        </button>

        {/* Floating Particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
          <div className={`absolute top-1/4 left-1/4 w-2 h-2 ${config.bgPattern} rounded-full opacity-40 animate-float`}></div>
          <div className={`absolute top-3/4 right-1/4 w-1.5 h-1.5 ${config.bgPattern} rounded-full opacity-30 animate-float`} style={{ animationDelay: '1s' }}></div>
          <div className={`absolute top-1/2 right-1/3 w-1 h-1 ${config.bgPattern} rounded-full opacity-20 animate-float`} style={{ animationDelay: '2s' }}></div>
        </div>
      </div>
    </div>
  );
});

HierarchyNode.displayName = 'HierarchyNode';
