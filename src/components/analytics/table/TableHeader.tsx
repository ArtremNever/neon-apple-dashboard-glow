
import { CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Search, 
  Settings, 
  Download,
  Table,
  LayoutGrid,
  BarChart3,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface TableHeaderProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  viewMode: 'table' | 'card' | 'chart';
  onViewModeChange: (mode: 'table' | 'card' | 'chart') => void;
  groupBy: string;
  onGroupByChange: (value: string) => void;
  activeFilters: Array<{ label: string; value: string }>;
  onRemoveFilter: (filterValue: string) => void;
  onClearAllFilters: () => void;
  onSettingsClick: () => void;
}

export const TableHeader = ({
  searchTerm,
  onSearchChange,
  viewMode,
  onViewModeChange,
  groupBy,
  onGroupByChange,
  activeFilters,
  onRemoveFilter,
  onClearAllFilters,
  onSettingsClick
}: TableHeaderProps) => {
  return (
    <CardHeader className="pb-4 border-b border-slate-700/30">
      <div className="flex items-center justify-between">
        {/* Left Section */}
        <div className="flex items-center gap-6">
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Performance Data</h2>
            
            {/* Active Filters */}
            {activeFilters.length > 0 && (
              <div className="flex items-center gap-2 flex-wrap">
                {activeFilters.map((filter) => (
                  <div
                    key={filter.value}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-500/10 text-blue-300 border border-blue-500/20 rounded-full text-xs"
                  >
                    <span>{filter.label}</span>
                    <button
                      onClick={() => onRemoveFilter(filter.value)}
                      className="hover:text-blue-200 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={onClearAllFilters}
                  className="text-xs text-slate-400 hover:text-slate-300 transition-colors"
                >
                  Clear all
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* View Toggle */}
          <div className="flex items-center bg-slate-800/50 rounded-lg p-1">
            <button
              onClick={() => onViewModeChange('table')}
              className={cn(
                "p-2 rounded transition-colors",
                viewMode === 'table' 
                  ? "bg-blue-600 text-white" 
                  : "text-slate-400 hover:text-slate-300"
              )}
              title="Table view"
            >
              <Table className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('card')}
              className={cn(
                "p-2 rounded transition-colors",
                viewMode === 'card' 
                  ? "bg-blue-600 text-white" 
                  : "text-slate-400 hover:text-slate-300"
              )}
              title="Card view"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewModeChange('chart')}
              className={cn(
                "p-2 rounded transition-colors",
                viewMode === 'chart' 
                  ? "bg-blue-600 text-white" 
                  : "text-slate-400 hover:text-slate-300"
              )}
              title="Chart view"
            >
              <BarChart3 className="w-4 h-4" />
            </button>
          </div>

          {/* Group By Selector */}
          <div className="flex items-center gap-2">
            <span className="text-slate-400 text-sm">Group by</span>
            <select 
              value={groupBy}
              onChange={(e) => onGroupByChange(e.target.value)}
              className="bg-slate-800/50 border border-slate-600 rounded-md px-3 py-1.5 text-sm text-slate-200 focus:ring-2 focus:ring-blue-500/50"
            >
              <option value="media-source">Media Source</option>
              <option value="campaign">Campaign</option>
              <option value="ad-set">Ad Set</option>
            </select>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 bg-slate-800/50 border-slate-600 text-slate-200 w-64"
            />
          </div>
          
          {/* Table Actions */}
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              className="border-slate-600 text-slate-300 hover:bg-slate-800"
              title="Export data"
            >
              <Download className="w-4 h-4" />
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={onSettingsClick}
              className="border-slate-600 text-slate-300 hover:bg-slate-800"
              title="Table settings"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </CardHeader>
  );
};
