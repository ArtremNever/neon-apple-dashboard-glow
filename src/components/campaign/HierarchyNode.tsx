
import { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { BuilderBlock } from '@/types/campaign';
import { X, Settings, Zap } from 'lucide-react';

export interface HierarchyNodeData extends Record<string, unknown> {
  block: BuilderBlock;
  onSelect: (block: BuilderBlock) => void;
  onDelete: (blockId: string) => void;
  isSelected: boolean;
}

export const HierarchyNode = memo(({ data }: NodeProps) => {
  const { block, onSelect, onDelete, isSelected } = data as HierarchyNodeData;

  const getBlockIcon = (type: BuilderBlock['type']) => {
    const icons = {
      client: '👤',
      application: '📱',
      platform: '🌐',
      campaign: '🎯',
      adset: '📊',
      creative: '🎨',
    };
    return icons[type] || '📦';
  };

  const getBlockTypeLabel = (type: BuilderBlock['type']) => {
    const labels = {
      client: 'Client',
      application: 'Application',
      platform: 'Platform',
      campaign: 'Campaign',
      adset: 'Ad Set',
      creative: 'Creative',
    };
    return labels[type] || type;
  };

  const getBlockGradient = (type: BuilderBlock['type']) => {
    const gradients = {
      client: 'from-blue-500/20 to-blue-600/30',
      application: 'from-green-500/20 to-green-600/30',
      platform: 'from-purple-500/20 to-purple-600/30',
      campaign: 'from-orange-500/20 to-orange-600/30',
      adset: 'from-pink-500/20 to-pink-600/30',
      creative: 'from-cyan-500/20 to-cyan-600/30',
    };
    return gradients[type] || 'from-slate-500/20 to-slate-600/30';
  };

  const getBorderGradient = (type: BuilderBlock['type']) => {
    const gradients = {
      client: 'from-blue-400/40 to-blue-600/60',
      application: 'from-green-400/40 to-green-600/60',
      platform: 'from-purple-400/40 to-purple-600/60',
      campaign: 'from-orange-400/40 to-orange-600/60',
      adset: 'from-pink-400/40 to-pink-600/60',
      creative: 'from-cyan-400/40 to-cyan-600/60',
    };
    return gradients[type] || 'from-slate-400/40 to-slate-600/60';
  };

  const getRequiredFields = (type: BuilderBlock['type']) => {
    switch (type) {
      case 'client':
        return ['name', 'company'];
      case 'application':
        return ['name', 'platform'];
      case 'platform':
        return ['platform', 'account'];
      case 'campaign':
        return ['name', 'objective'];
      case 'adset':
        return ['name', 'budget'];
      case 'creative':
        return ['name', 'format'];
      default:
        return [];
    }
  };

  const requiredFields = getRequiredFields(block.type);

  const getFieldValidationStatus = (field: string) => {
    const value = block.props[field];
    return !!(value && value.toString().trim());
  };

  const handleSelect = () => {
    onSelect(block);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(block.id);
  };

  const completedFields = requiredFields.filter(field => getFieldValidationStatus(field)).length;
  const progressPercentage = requiredFields.length > 0 ? (completedFields / requiredFields.length) * 100 : 100;

  return (
    <div
      className={`
        group relative backdrop-blur-xl border-2 rounded-2xl shadow-2xl transition-all duration-300 cursor-pointer
        bg-gradient-to-br ${getBlockGradient(block.type)}
        hover:scale-105 hover:-translate-y-1 hover:rotate-1
        ${isSelected 
          ? `border-gradient-to-r ${getBorderGradient(block.type)} shadow-2xl shadow-${block.type === 'client' ? 'blue' : block.type === 'application' ? 'green' : block.type === 'platform' ? 'purple' : block.type === 'campaign' ? 'orange' : block.type === 'adset' ? 'pink' : 'cyan'}-400/25 animate-pulse-glow` 
          : 'border-slate-600/30 hover:border-slate-500/50'
        }
      `}
      onClick={handleSelect}
    >
      {/* Glassmorphism overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      {/* Progress ring */}
      {requiredFields.length > 0 && (
        <div className="absolute -top-2 -right-2 w-6 h-6">
          <svg className="w-6 h-6 transform -rotate-90" viewBox="0 0 24 24">
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="rgba(148, 163, 184, 0.3)"
              strokeWidth="2"
              fill="none"
            />
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke={block.isValid ? "#10b981" : "#f59e0b"}
              strokeWidth="2"
              fill="none"
              strokeDasharray={`${progressPercentage * 0.628} 62.8`}
              className="transition-all duration-500"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className={`w-2 h-2 rounded-full ${block.isValid ? 'bg-green-400' : 'bg-orange-400'} animate-pulse`} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 p-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className={`
              w-10 h-10 rounded-xl flex items-center justify-center border backdrop-blur-sm transition-all duration-300 group-hover:scale-110
              bg-gradient-to-br ${getBlockGradient(block.type)}
              border-gradient-to-br ${getBorderGradient(block.type)}
            `}>
              <span className="text-xl animate-float">{getBlockIcon(block.type)}</span>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-white font-semibold text-sm truncate mb-1">
                {getBlockTypeLabel(block.type)}
              </h3>
              <p className="text-slate-400 text-xs font-mono">
                #{block.id.slice(-6)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={handleSelect}
              className="p-1.5 hover:bg-white/10 rounded-lg transition-all duration-200 hover:scale-110"
              title="Настроить"
            >
              <Settings className="w-3.5 h-3.5 text-slate-300 hover:text-white" />
            </button>
            <button
              onClick={handleDelete}
              className="p-1.5 hover:bg-red-500/20 rounded-lg transition-all duration-200 hover:scale-110"
              title="Удалить"
            >
              <X className="w-3.5 h-3.5 text-slate-300 hover:text-red-400" />
            </button>
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex items-center justify-between mb-3">
          <div className={`
            px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm transition-all duration-300
            ${block.isValid 
              ? 'bg-green-500/20 text-green-300 border border-green-500/30' 
              : 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
            }
          `}>
            <div className="flex items-center gap-2">
              {block.isValid ? (
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
              ) : (
                <Zap className="w-3 h-3" />
              )}
              <span>{block.isValid ? 'Готово' : 'Настройка'}</span>
            </div>
          </div>
          <span className="text-xs text-slate-500">
            {completedFields}/{requiredFields.length}
          </span>
        </div>

        {/* Validation Fields */}
        {requiredFields.length > 0 && (
          <div className="space-y-2">
            <div className="grid grid-cols-2 gap-2">
              {requiredFields.slice(0, 4).map((field) => {
                const isValid = getFieldValidationStatus(field);
                const fieldLabel = {
                  name: 'Name',
                  company: 'Company',
                  platform: 'Platform',
                  account: 'Account',
                  objective: 'Goal',
                  budget: 'Budget',
                  format: 'Format',
                }[field] || field;

                return (
                  <div
                    key={field}
                    className={`
                      px-2 py-1 rounded-lg text-xs font-medium border backdrop-blur-sm transition-all duration-200
                      ${isValid
                        ? 'bg-green-500/10 border-green-500/30 text-green-300'
                        : 'bg-slate-500/10 border-slate-500/30 text-slate-400'
                      }
                    `}
                  >
                    <div className="flex items-center gap-1.5">
                      <div className={`w-1.5 h-1.5 rounded-full ${isValid ? 'bg-green-400' : 'bg-slate-500'}`} />
                      <span className="truncate">{fieldLabel}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            {requiredFields.length > 4 && (
              <div className="text-center">
                <span className="text-xs text-slate-500">
                  +{requiredFields.length - 4} more fields
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Enhanced Connection Handles */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-4 h-4 !bg-gradient-to-br from-blue-400 to-blue-600 !border-2 !border-blue-300 rounded-full shadow-lg shadow-blue-400/30 transition-all duration-200 hover:scale-125 hover:shadow-blue-400/50"
        style={{ top: -8 }}
      />
      <Handle
        type="target"
        position={Position.Left}
        className="w-4 h-4 !bg-gradient-to-br from-blue-400 to-blue-600 !border-2 !border-blue-300 rounded-full shadow-lg shadow-blue-400/30 transition-all duration-200 hover:scale-125 hover:shadow-blue-400/50"
        style={{ left: -8 }}
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-4 h-4 !bg-gradient-to-br from-green-400 to-green-600 !border-2 !border-green-300 rounded-full shadow-lg shadow-green-400/30 transition-all duration-200 hover:scale-125 hover:shadow-green-400/50"
        style={{ right: -8 }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-4 h-4 !bg-gradient-to-br from-green-400 to-green-600 !border-2 !border-green-300 rounded-full shadow-lg shadow-green-400/30 transition-all duration-200 hover:scale-125 hover:shadow-green-400/50"
        style={{ bottom: -8 }}
      />
    </div>
  );
});

HierarchyNode.displayName = 'HierarchyNode';
