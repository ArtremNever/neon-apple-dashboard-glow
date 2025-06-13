
import { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { BuilderBlock } from '@/types/campaign';
import { X, Settings } from 'lucide-react';

interface HierarchyNodeData {
  block: BuilderBlock;
  onSelect: (block: BuilderBlock) => void;
  onDelete: (blockId: string) => void;
  isSelected: boolean;
}

export const HierarchyNode = memo(({ data }: NodeProps<HierarchyNodeData>) => {
  const { block, onSelect, onDelete, isSelected } = data;

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
          ? 'border-green-500 shadow-green-500/25' 
          : 'border-green-500/30 hover:border-green-500/50 hover:shadow-green-500/15'
        }
      `}
      onClick={handleSelect}
    >
      {/* Main Content */}
      <div className="p-3">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center border border-green-500/40">
              <span className="text-lg">{getBlockIcon(block.type)}</span>
            </div>
            <div>
              <h3 className="text-green-400 font-medium text-sm">
                {getBlockTypeLabel(block.type)}
              </h3>
              <p className="text-green-400/60 text-xs">
                {block.id.slice(-4)}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleSelect}
              className="p-1 hover:bg-green-500/20 rounded transition-colors"
              title="Настроить"
            >
              <Settings className="w-3 h-3 text-green-400/70" />
            </button>
            <button
              onClick={handleDelete}
              className="p-1 hover:bg-red-500/20 rounded transition-colors"
              title="Удалить"
            >
              <X className="w-3 h-3 text-green-400/70 hover:text-red-400" />
            </button>
          </div>
        </div>

        {/* Status and Date */}
        <div className="flex items-center justify-between text-xs text-green-400/60 mb-3">
          <span className={block.isValid ? 'text-green-400' : 'text-red-400'}>
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
                      ? 'bg-green-500/20 border-green-500/50 text-green-300'
                      : 'bg-red-500/20 border-red-500/50 text-red-300'
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

      {/* Connection Handles */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-green-500/60 border-2 border-green-400 rounded-full"
      />
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-green-500/60 border-2 border-green-400 rounded-full"
      />
    </div>
  );
});

HierarchyNode.displayName = 'HierarchyNode';
