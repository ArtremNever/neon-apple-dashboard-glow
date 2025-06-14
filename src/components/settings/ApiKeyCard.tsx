
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { RefreshCw, Eye, EyeOff, Copy } from 'lucide-react';

interface ApiKeyCardProps {
  name: string;
  keyPreview: string;
  status: 'active' | 'inactive';
  lastUsed: string;
  onRefresh?: () => void;
  onToggleVisibility?: () => void;
  onCopy?: () => void;
  isVisible?: boolean;
}

export const ApiKeyCard = ({ 
  name, 
  keyPreview, 
  status, 
  lastUsed,
  onRefresh,
  onToggleVisibility,
  onCopy,
  isVisible = false
}: ApiKeyCardProps) => {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-800/30 rounded-xl border border-slate-700/50 hover:border-slate-600/50 transition-colors">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <h4 className="text-slate-200 font-medium">{name}</h4>
          <Badge 
            className={status === 'active' 
              ? 'bg-green-500/20 text-green-400 border-green-500/30' 
              : 'bg-gray-500/20 text-gray-400 border-gray-500/30'}
          >
            {status}
          </Badge>
        </div>
        <div className="space-y-1">
          <p className="text-slate-400 text-sm font-mono">
            Key: {isVisible ? keyPreview : keyPreview.replace(/./g, '•')}
          </p>
          <p className="text-slate-500 text-xs">Last used: {lastUsed}</p>
        </div>
      </div>
      <div className="flex items-center gap-2 ml-4">
        {onToggleVisibility && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onToggleVisibility}
            className="text-slate-400 hover:text-white h-8 w-8 p-0"
          >
            {isVisible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
        )}
        {onCopy && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onCopy}
            className="text-slate-400 hover:text-white h-8 w-8 p-0"
          >
            <Copy className="w-4 h-4" />
          </Button>
        )}
        {onRefresh && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={onRefresh}
            className="text-slate-400 hover:text-white h-8 w-8 p-0"
          >
            <RefreshCw className="w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
