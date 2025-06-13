
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  RefreshCw, 
  Download, 
  Grid3X3, 
  List, 
  Activity,
  Settings,
  Search
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface QuickActionsBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  viewMode: 'cards' | 'table' | 'timeline';
  onViewModeChange: (mode: 'cards' | 'table' | 'timeline') => void;
  onAddSource: () => void;
  onSyncAll: () => void;
  onExportConfig: () => void;
}

export const QuickActionsBar = ({
  searchTerm,
  onSearchChange,
  viewMode,
  onViewModeChange,
  onAddSource,
  onSyncAll,
  onExportConfig
}: QuickActionsBarProps) => {
  return (
    <div className="flex items-center justify-between gap-4 p-4 bg-slate-900/30 backdrop-blur-xl rounded-xl border border-slate-700/50">
      {/* Search */}
      <div className="relative flex-1 max-w-md">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
        <Input
          placeholder="Search sources..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-slate-800/50 border-slate-600 text-slate-200 placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/50"
        />
      </div>

      {/* Quick Actions */}
      <div className="flex items-center gap-3">
        <Button 
          onClick={onAddSource}
          className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-blue-500/25 transition-all duration-200"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Source
        </Button>
        
        <Button 
          variant="outline" 
          onClick={onSyncAll}
          className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white transition-all duration-200"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Sync All
        </Button>
        
        <Button 
          variant="outline" 
          onClick={onExportConfig}
          className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white transition-all duration-200"
        >
          <Download className="w-4 h-4 mr-2" />
          Export Config
        </Button>
        
        {/* Divider */}
        <div className="w-px h-6 bg-slate-600" />
        
        {/* View Toggle */}
        <div className="flex items-center bg-slate-800/50 rounded-lg p-1 border border-slate-600/50">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewModeChange('cards')}
            className={cn(
              "transition-all duration-200",
              viewMode === 'cards' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
            )}
          >
            <Grid3X3 className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewModeChange('table')}
            className={cn(
              "transition-all duration-200",
              viewMode === 'table' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
            )}
          >
            <List className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewModeChange('timeline')}
            className={cn(
              "transition-all duration-200",
              viewMode === 'timeline' 
                ? 'bg-blue-600 text-white shadow-md' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
            )}
          >
            <Activity className="w-4 h-4" />
          </Button>
        </div>
        
        <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
          <Settings className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
