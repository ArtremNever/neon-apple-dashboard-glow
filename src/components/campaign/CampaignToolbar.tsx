
import { Button } from '@/components/ui/button';
import { Plus, Undo, Redo, ZoomIn, ZoomOut, Play } from 'lucide-react';
import { BuilderBlock } from '@/pages/CampaignManagement';

interface CampaignToolbarProps {
  onAddBlock: (type: BuilderBlock['type']) => void;
  onRunPlan: () => void;
  isValid: boolean;
  isLoading: boolean;
}

export const CampaignToolbar = ({ 
  onAddBlock, 
  onRunPlan, 
  isValid, 
  isLoading 
}: CampaignToolbarProps) => {
  const blockTypes: Array<{ type: BuilderBlock['type']; label: string; icon: string }> = [
    { type: 'client', label: 'Client', icon: '👤' },
    { type: 'application', label: 'App', icon: '📱' },
    { type: 'platform', label: 'Source', icon: '🌐' },
    { type: 'campaign', label: 'Campaign', icon: '🎯' },
    { type: 'adset', label: 'Adset', icon: '📊' },
    { type: 'creative', label: 'Creative', icon: '🎨' },
  ];

  return (
    <div className="h-14 bg-card border-b border-border flex items-center justify-between px-6">
      {/* Left Side - Block Tools */}
      <div className="flex items-center gap-2">
        {blockTypes.map(({ type, label, icon }) => (
          <Button
            key={type}
            variant="outline"
            size="sm"
            onClick={() => onAddBlock(type)}
            className="gap-1 hover:bg-accent"
          >
            <span className="text-sm">{icon}</span>
            {label}
          </Button>
        ))}
        
        <div className="h-6 w-px bg-border mx-2" />
        
        <Button variant="ghost" size="sm">
          <Undo className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm">
          <Redo className="w-4 h-4" />
        </Button>
        
        <div className="h-6 w-px bg-border mx-2" />
        
        <Button variant="ghost" size="sm">
          <ZoomOut className="w-4 h-4" />
        </Button>
        <span className="text-sm text-muted-foreground px-2">100%</span>
        <Button variant="ghost" size="sm">
          <ZoomIn className="w-4 h-4" />
        </Button>
      </div>

      {/* Right Side - Run Plan */}
      <Button
        onClick={onRunPlan}
        disabled={!isValid || isLoading}
        className="gap-2 bg-primary hover:bg-primary/90"
      >
        <Play className="w-4 h-4" />
        {isLoading ? 'Running...' : 'RUN PLAN'}
      </Button>
    </div>
  );
};
