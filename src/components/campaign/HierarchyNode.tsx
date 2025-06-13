
import React, { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, Target, Smartphone, Globe, Megaphone, Users, Palette } from 'lucide-react';
import { BuilderBlock } from '@/types/campaign';

export interface HierarchyNodeData {
  block: BuilderBlock;
  onSelect: (block: BuilderBlock) => void;
  onDelete: (blockId: string) => void;
  isSelected: boolean;
}

const getBlockIcon = (type: string) => {
  switch (type) {
    case 'campaign': return Target;
    case 'adset': return Smartphone;
    case 'platform': return Globe;
    case 'creative': return Palette;
    case 'client': return Users;
    case 'application': return Megaphone;
    default: return Megaphone;
  }
};

const getBlockGradient = (type: string) => {
  switch (type) {
    case 'client': return 'from-blue-500/20 via-blue-600/30 to-blue-700/20';
    case 'application': return 'from-purple-500/20 via-purple-600/30 to-purple-700/20';
    case 'platform': return 'from-cyan-500/20 via-cyan-600/30 to-cyan-700/20';
    case 'campaign': return 'from-orange-500/20 via-orange-600/30 to-orange-700/20';
    case 'adset': return 'from-amber-500/20 via-amber-600/30 to-amber-700/20';
    case 'creative': return 'from-emerald-500/20 via-emerald-600/30 to-emerald-700/20';
    default: return 'from-gray-500/20 via-gray-600/30 to-gray-700/20';
  }
};

const getBlockBorder = (type: string) => {
  switch (type) {
    case 'client': return 'border-blue-500/30';
    case 'application': return 'border-purple-500/30';
    case 'platform': return 'border-cyan-500/30';
    case 'campaign': return 'border-orange-500/30';
    case 'adset': return 'border-amber-500/30';
    case 'creative': return 'border-emerald-500/30';
    default: return 'border-gray-500/30';
  }
};

const getValidationColor = (isValid: boolean, hasErrors: number) => {
  if (hasErrors > 0) return 'border-red-500/50 shadow-red-500/20';
  if (isValid) return 'border-green-500/50 shadow-green-500/20';
  return 'border-yellow-500/50 shadow-yellow-500/20';
};

const HierarchyNode = memo<NodeProps<HierarchyNodeData>>(({ data }) => {
  const { block, onSelect, onDelete, isSelected } = data;
  const Icon = getBlockIcon(block.type);
  const gradientClass = getBlockGradient(block.type);
  const borderClass = getBlockBorder(block.type);
  
  // Mock validation data - replace with real validation logic
  const mockErrors = Math.floor(Math.random() * 3);
  const validationColorClass = getValidationColor(block.isValid, mockErrors);

  return (
    <div className="relative">
      {/* 4-sided handles for connections */}
      <Handle 
        type="target" 
        position={Position.Top} 
        id="top"
        className="w-3 h-3 !bg-slate-300 !border-2 !border-slate-500 hover:!bg-blue-400 hover:!border-blue-500 transition-colors"
      />
      <Handle 
        type="target" 
        position={Position.Left} 
        id="left"
        className="w-3 h-3 !bg-slate-300 !border-2 !border-slate-500 hover:!bg-blue-400 hover:!border-blue-500 transition-colors"
      />
      <Handle 
        type="source" 
        position={Position.Right} 
        id="right"
        className="w-3 h-3 !bg-slate-300 !border-2 !border-slate-500 hover:!bg-blue-400 hover:!border-blue-500 transition-colors"
      />
      <Handle 
        type="source" 
        position={Position.Bottom} 
        id="bottom"
        className="w-3 h-3 !bg-slate-300 !border-2 !border-slate-500 hover:!bg-blue-400 hover:!border-blue-500 transition-colors"
      />

      <Card 
        className={`
          min-w-[200px] cursor-pointer transition-all duration-300 
          ${isSelected ? 'ring-2 ring-blue-500 shadow-xl scale-105' : 'hover:shadow-lg hover:scale-102'}
          bg-gradient-to-br ${gradientClass} backdrop-blur-xl
          border-2 ${borderClass} ${validationColorClass}
          hover:border-opacity-60 relative overflow-visible
        `}
        onClick={() => onSelect(block)}
      >
        {/* Validation error count badge */}
        {mockErrors > 0 && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg animate-pulse">
            {mockErrors}
          </div>
        )}

        {/* Success indicator */}
        {block.isValid && mockErrors === 0 && (
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-xs shadow-lg">
            ✓
          </div>
        )}

        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl bg-gradient-to-br ${gradientClass} border ${borderClass} shadow-lg`}>
                <Icon size={18} className="text-white drop-shadow-sm" />
              </div>
              <div>
                <span className="font-semibold text-white text-sm">{block.name}</span>
                <div className="text-xs text-slate-300 capitalize opacity-80">
                  {block.type}
                </div>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(block.id);
              }}
              className="text-slate-400 hover:text-red-400 transition-colors p-1 rounded hover:bg-red-500/10"
            >
              <Trash2 size={14} />
            </button>
          </div>
          
          {/* Validation progress bar */}
          <div className="mt-3">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-slate-300">Configuration</span>
              <span className="text-xs text-slate-300">{mockErrors === 0 ? '100%' : '60%'}</span>
            </div>
            <div className="w-full bg-slate-700/50 rounded-full h-1.5">
              <div 
                className={`h-1.5 rounded-full transition-all duration-500 ${mockErrors === 0 ? 'bg-green-500' : 'bg-yellow-500'}`}
                style={{ width: mockErrors === 0 ? '100%' : '60%' }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
});

HierarchyNode.displayName = 'HierarchyNode';

export default HierarchyNode;
