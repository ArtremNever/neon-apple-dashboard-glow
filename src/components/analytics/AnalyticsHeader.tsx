
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DateRangePicker } from '@/components/DateRangePicker';
import { FilterPanel } from './FilterPanel';
import { ExportDropdown } from './ExportDropdown';
import { 
  BarChart3
} from 'lucide-react';

interface AnalyticsHeaderProps {
  dateRange: { from: Date; to: Date };
  onDateRangeChange: (range: { from: Date; to: Date }) => void;
  activeFiltersCount?: number;
  onFiltersClick: () => void;
  onExportClick: () => void;
}

export const AnalyticsHeader = ({
  dateRange,
  onDateRangeChange,
  activeFiltersCount = 0,
  onFiltersClick,
  onExportClick
}: AnalyticsHeaderProps) => {
  const handleFiltersChange = (filters: any) => {
    console.log('Filters changed:', filters);
    onFiltersClick();
  };

  const handleExport = (type: string) => {
    console.log('Export type:', type);
    onExportClick();
  };

  return (
    <div className="flex items-center justify-between mb-8">
      {/* Title Section */}
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/20 backdrop-blur-sm">
          <BarChart3 className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white mb-1 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
            Analytics
          </h1>
          <p className="text-slate-400 text-sm">Comprehensive campaign performance insights and metrics</p>
        </div>
      </div>
      
      {/* Header Controls */}
      <div className="flex items-center gap-3">
        <DateRangePicker 
          dateRange={dateRange} 
          onDateRangeChange={onDateRangeChange} 
        />
        
        <FilterPanel
          activeFiltersCount={activeFiltersCount}
          onFiltersChange={handleFiltersChange}
        />
        
        <ExportDropdown
          onExport={handleExport}
        />
      </div>
    </div>
  );
};
