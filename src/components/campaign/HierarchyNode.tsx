
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
    case 'landing': return Globe;
    case 'creative': return Palette;
    case 'audience': return Users;
    default: return Megaphone;
  }
};

const getBlockColor = (type: string) => {
  switch (type) {
    case 'campaign': return 'bg-blue-500';
    case 'adset': return 'bg-green-500';
    case 'landing': return 'bg-purple-500';
    case 'creative': return 'bg-orange-500';
    case 'audience': return 'bg-pink-500';
    default: return 'bg-gray-500';
  }
};

const HierarchyNode = memo<NodeProps<HierarchyNodeData>>(({ data }) => {
  const { block, onSelect, onDelete, isSelected } = data;
  const Icon = getBlockIcon(block.type);
  const colorClass = getBlockColor(block.type);

  return (
    <Card 
      className={`
        min-w-[200px] cursor-pointer transition-all duration-200 
        ${isSelected ? 'ring-2 ring-blue-500 shadow-lg' : 'hover:shadow-md'}
        bg-white border border-gray-200
      `}
      onClick={() => onSelect(block)}
    >
      <Handle type="target" position={Position.Top} />
      
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className={`p-2 rounded ${colorClass} text-white`}>
              <Icon size={16} />
            </div>
            <span className="font-medium text-gray-900">{block.name}</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(block.id);
            }}
            className="text-gray-400 hover:text-red-500 transition-colors"
          >
            <Trash2 size={14} />
          </button>
        </div>
        
        <div className="text-sm text-gray-600 capitalize">
          {block.type}
        </div>
      </CardContent>
      
      <Handle type="source" position={Position.Bottom} />
    </Card>
  );
});

HierarchyNode.displayName = 'HierarchyNode';

export default HierarchyNode;
