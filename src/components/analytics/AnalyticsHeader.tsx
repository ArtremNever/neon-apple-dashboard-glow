
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DateRangePicker } from '@/components/DateRangePicker';
import { 
  BarChart3, 
  Filter, 
  Download,
  Calendar
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
  return (
    <div className="flex items-center justify-between mb-8">
      {/* Title Section */}
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/20">
          <BarChart3 className="w-6 h-6 text-blue-400" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-white mb-1">Analytics</h1>
          <p className="text-slate-400 text-sm">Comprehensive campaign performance insights and metrics</p>
        </div>
      </div>
      
      {/* Header Controls */}
      <div className="flex items-center gap-3">
        <DateRangePicker 
          dateRange={dateRange} 
          onDateRangeChange={onDateRangeChange} 
        />
        
        <Button 
          variant="outline" 
          onClick={onFiltersClick}
          className="border-slate-600 text-slate-300 hover:bg-slate-800 relative"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge className="ml-2 bg-blue-600 text-white text-xs px-1.5 py-0.5 h-5">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
        
        <Button 
          variant="outline" 
          onClick={onExportClick}
          className="border-slate-600 text-slate-300 hover:bg-slate-800"
        >
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>
    </div>
  );
};
