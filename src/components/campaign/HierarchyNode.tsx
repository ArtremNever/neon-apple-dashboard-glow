
import { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { BuilderBlock } from '@/types/campaign';
import { X, Settings } from 'lucide-react';

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

  return (
    <div
      className={`
        relative bg-slate-800/90 backdrop-blur-sm border-2 rounded-xl shadow-lg transition-all duration-200 cursor-pointer
        ${isSelected 
          ? 'border-blue-400 shadow-blue-400/25' 
          : 'border-slate-600/50 hover:border-slate-500/70 hover:shadow-slate-500/15'
        }
      `}
      onClick={handleSelect}
    >
      {/* Main Content */}
      <div className="p-3">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center border border-blue-500/40 flex-shrink-0">
              <span className="text-lg">{getBlockIcon(block.type)}</span>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-slate-200 font-medium text-sm truncate">
                {getBlockTypeLabel(block.type)}
              </h3>
              <p className="text-slate-400 text-xs truncate">
                {block.id.slice(-4)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 flex-shrink-0">
            <button
              onClick={handleSelect}
              className="p-1 hover:bg-blue-500/20 rounded transition-colors"
              title="Настроить"
            >
              <Settings className="w-3 h-3 text-slate-400" />
            </button>
            <button
              onClick={handleDelete}
              className="p-1 hover:bg-red-500/20 rounded transition-colors"
              title="Удалить"
            >
              <X className="w-3 h-3 text-slate-400 hover:text-red-400" />
            </button>
          </div>
        </div>

        {/* Status and Date */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-3">
          <span className={block.isValid ? 'text-blue-400' : 'text-orange-400'}>
            {block.isValid ? 'Настроено' : 'Требует настройки'}
          </span>
          <span>{new Date().toLocaleDateString('ru-RU')}</span>
        </div>

        {/* Validation Indicators */}
        {requiredFields.length > 0 && (
          <div className="space-y-1">
            {requiredFields.map((field) => {
              const isValid = getFieldValidationStatus(field);
              const fieldLabel = {
                name: 'Название',
                company: 'Компания',
                platform: 'Платформа',
                account: 'Аккаунт',
                objective: 'Цель',
                budget: 'Бюджет',
                format: 'Формат',
              }[field] || field;

              return (
                <div
                  key={field}
                  className={`
                    px-2 py-1 rounded text-xs font-medium border transition-all duration-200
                    ${isValid
                      ? 'bg-blue-500/20 border-blue-500/50 text-blue-300'
                      : 'bg-orange-500/20 border-orange-500/50 text-orange-300'
                    }
                  `}
                >
                  {fieldLabel}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Connection Handles - One per side */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-blue-500/60 border-2 border-blue-400 rounded-full"
        style={{ top: -6 }}
      />
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-blue-500/60 border-2 border-blue-400 rounded-full"
        style={{ left: -6 }}
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-green-500/60 border-2 border-green-400 rounded-full"
        style={{ right: -6 }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-green-500/60 border-2 border-green-400 rounded-full"
        style={{ bottom: -6 }}
      />
    </div>
  );
});

HierarchyNode.displayName = 'HierarchyNode';
