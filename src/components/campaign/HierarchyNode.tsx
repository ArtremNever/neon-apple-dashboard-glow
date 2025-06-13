
import { Handle, Position } from '@xyflow/react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Github, CheckCircle, XCircle } from 'lucide-react';
import { BuilderBlock } from '@/pages/CampaignManagement';
import { cn } from '@/lib/utils';

interface HierarchyNodeProps {
  data: {
    block: BuilderBlock;
    onSelect: (block: BuilderBlock) => void;
    onDelete: (blockId: string) => void;
    isSelected: boolean;
  };
}

export const HierarchyNode = ({ data }: HierarchyNodeProps) => {
  const { block, onSelect, onDelete, isSelected } = data;

  const getBlockConfig = (type: BuilderBlock['type']) => {
    const configs = {
      client: { 
        icon: '👤', 
        title: 'Client', 
        color: 'from-blue-500 to-blue-600',
        bgColor: 'bg-slate-800',
        borderColor: 'border-blue-500/50'
      },
      application: { 
        icon: '📱', 
        title: 'Application', 
        color: 'from-purple-500 to-purple-600',
        bgColor: 'bg-slate-800',
        borderColor: 'border-purple-500/50'
      },
      platform: { 
        icon: '🌐', 
        title: 'Source', 
        color: 'from-green-500 to-green-600',
        bgColor: 'bg-slate-800',
        borderColor: 'border-green-500/50'
      },
      campaign: { 
        icon: '🎯', 
        title: 'Campaign', 
        color: 'from-orange-500 to-orange-600',
        bgColor: 'bg-slate-800',
        borderColor: 'border-orange-500/50'
      },
      adset: { 
        icon: '📊', 
        title: 'Adset', 
        color: 'from-pink-500 to-pink-600',
        bgColor: 'bg-slate-800',
        borderColor: 'border-pink-500/50'
      },
      creative: { 
        icon: '🎨', 
        title: 'Creative', 
        color: 'from-cyan-500 to-cyan-600',
        bgColor: 'bg-slate-800',
        borderColor: 'border-cyan-500/50'
      },
    };
    return configs[type];
  };

  const config = getBlockConfig(block.type);

  const getStatusInfo = () => {
    if (block.isValid) {
      return {
        icon: <CheckCircle className="w-4 h-4 text-green-400" />,
        text: "Ready",
        textColor: "text-green-400"
      };
    }
    return {
      icon: <XCircle className="w-4 h-4 text-red-400" />,
      text: "Configure",
      textColor: "text-red-400"
    };
  };

  const status = getStatusInfo();

  return (
    <>
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-slate-600 border-2 border-slate-400"
      />
      
      <Card 
        className={cn(
          "relative p-4 cursor-pointer transition-all hover:shadow-lg",
          "w-64 h-32 border-2",
          config.bgColor,
          config.borderColor,
          isSelected && "ring-2 ring-primary shadow-lg shadow-primary/20",
          "text-white border-slate-600 hover:border-slate-500"
        )}
        onClick={() => onSelect(block)}
      >
        {/* Delete Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-2 right-2 w-6 h-6 p-0 hover:bg-red-500/20 hover:text-red-400 text-slate-400"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(block.id);
          }}
        >
          <X className="w-3 h-3" />
        </Button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center">
            <Github className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <h4 className="font-medium text-white text-sm">
              {block.props.name || config.title}
            </h4>
            <p className="text-xs text-slate-400 truncate">
              {block.props.description || `${config.title.toLowerCase()}-${block.id.slice(-4)}`}
            </p>
          </div>
        </div>

        {/* Status */}
        <div className="flex items-center gap-2 mt-2">
          {status.icon}
          <span className={cn("text-xs", status.textColor)}>
            {status.text}
          </span>
          <span className="text-xs text-slate-500 ml-auto">
            {new Date().toLocaleDateString()}
          </span>
        </div>

        {/* Type indicator */}
        <div className="absolute bottom-2 left-4">
          <span className="text-xs text-slate-500 bg-slate-700 px-2 py-1 rounded">
            {config.title}
          </span>
        </div>
      </Card>

      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-slate-600 border-2 border-slate-400"
      />
    </>
  );
};
