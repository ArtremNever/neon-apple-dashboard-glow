
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { X, Grip } from 'lucide-react';
import { BuilderBlock } from '@/pages/CampaignManagement';
import { cn } from '@/lib/utils';

interface CampaignCanvasProps {
  blocks: BuilderBlock[];
  onBlockSelect: (block: BuilderBlock) => void;
  onBlockUpdate: (blockId: string, updates: Partial<BuilderBlock>) => void;
  onBlockDelete: (blockId: string) => void;
  selectedBlock: BuilderBlock | null;
}

export const CampaignCanvas = ({
  blocks,
  onBlockSelect,
  onBlockDelete,
  selectedBlock,
}: CampaignCanvasProps) => {
  const getBlockIcon = (type: BuilderBlock['type']) => {
    const icons = {
      platform: '🌐',
      budget: '💰',
      audience: '👥',
      creative: '🎨',
      adset: '📊',
      client: '👤',
    };
    return icons[type] || '📦';
  };

  const getBlockTitle = (type: BuilderBlock['type']) => {
    const titles = {
      platform: 'Platform',
      budget: 'Budget',
      audience: 'Audience',
      creative: 'Creative',
      adset: 'Adset',
      client: 'Client',
    };
    return titles[type] || 'Block';
  };

  return (
    <div className="flex-1 p-6 bg-background overflow-auto">
      {blocks.length === 0 ? (
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-muted-foreground">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-lg font-medium mb-2">Start Building Your Campaign</h3>
            <p className="text-sm">Add blocks from the toolbar to create your campaign</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-12 gap-4 min-h-full">
          {blocks.map((block) => (
            <Card
              key={block.id}
              className={cn(
                "relative p-4 cursor-pointer transition-all hover:shadow-md",
                "col-span-3 h-32", // Default size
                selectedBlock?.id === block.id && "ring-2 ring-primary",
                !block.isValid && "ring-2 ring-destructive",
                block.isValid && "ring-2 ring-green-500"
              )}
              onClick={() => onBlockSelect(block)}
            >
              {/* Delete Button */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-2 right-2 w-6 h-6 p-0 hover:bg-destructive hover:text-destructive-foreground"
                onClick={(e) => {
                  e.stopPropagation();
                  onBlockDelete(block.id);
                }}
              >
                <X className="w-3 h-3" />
              </Button>

              {/* Drag Handle */}
              <div className="absolute top-2 left-2 cursor-move text-muted-foreground">
                <Grip className="w-4 h-4" />
              </div>

              {/* Block Content */}
              <div className="flex flex-col items-center justify-center h-full pt-4">
                <div className="text-2xl mb-2">{getBlockIcon(block.type)}</div>
                <h4 className="font-medium text-sm text-center">
                  {getBlockTitle(block.type)}
                </h4>
                <div className="text-xs text-muted-foreground mt-1">
                  {block.isValid ? '✓ Valid' : '⚠ Configure'}
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
