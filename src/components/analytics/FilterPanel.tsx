
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { 
  Filter, 
  Search, 
  Calendar,
  X
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface FilterPanelProps {
  activeFiltersCount: number;
  onFiltersChange: (filters: any) => void;
}

export const FilterPanel = ({ activeFiltersCount, onFiltersChange }: FilterPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const mediaSources = [
    { id: 'mintegral_int', name: 'mintegral_int', count: 4854, checked: true },
    { id: 'facebook_int', name: 'facebook_int', count: 3421, checked: true },
    { id: 'google_int', name: 'google_int', count: 2156, checked: true },
  ];

  const quickDates = [
    { label: 'Today', value: 'today' },
    { label: 'Yesterday', value: 'yesterday' },
    { label: 'Last 7 days', value: '7d' },
    { label: 'Last 30 days', value: '30d' },
  ];

  const toggleFilters = () => setIsOpen(!isOpen);

  const clearAllFilters = () => {
    // Reset all filters
    onFiltersChange({});
  };

  const applyFilters = () => {
    // Apply current filter state
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={toggleFilters}
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

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Filter Dropdown */}
          <div className="absolute top-full right-0 mt-2 w-80 bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-700/50">
              <h3 className="font-semibold text-white">Filters</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="h-6 w-6 p-0 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            <div className="max-h-96 overflow-y-auto scrollbar-hide">
              {/* Date Range Section */}
              <div className="p-4 border-b border-slate-700/30">
                <h4 className="text-sm font-medium text-slate-300 mb-3">Date Range</h4>
                
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex-1 relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      placeholder="Jun 7, 2025"
                      className="pl-10 bg-slate-800/50 border-slate-600 text-slate-200 text-sm"
                    />
                  </div>
                  <Separator className="w-2 bg-slate-600" />
                  <div className="flex-1 relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <Input
                      placeholder="Jun 14, 2025"
                      className="pl-10 bg-slate-800/50 border-slate-600 text-slate-200 text-sm"
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {quickDates.map((date) => (
                    <Button
                      key={date.value}
                      variant="ghost"
                      size="sm"
                      className="h-7 px-3 text-xs text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
                    >
                      {date.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Media Sources Section */}
              <div className="p-4 border-b border-slate-700/30">
                <h4 className="text-sm font-medium text-slate-300 mb-3">Media Sources</h4>
                
                <div className="relative mb-3">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input
                    placeholder="Search sources..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-slate-800/50 border-slate-600 text-slate-200 text-sm"
                  />
                </div>

                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {mediaSources.map((source) => (
                    <div key={source.id} className="flex items-center justify-between py-2 px-2 rounded-lg hover:bg-slate-800/30 transition-colors">
                      <div className="flex items-center gap-3">
                        <Checkbox 
                          checked={source.checked} 
                          className="border-slate-600"
                        />
                        <div className="w-6 h-6 rounded bg-slate-700 flex items-center justify-center">
                          <span className="text-xs font-medium text-slate-300">
                            {source.name.slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                        <span className="text-sm text-slate-300">{source.name}</span>
                      </div>
                      <span className="text-xs text-slate-500">({source.count.toLocaleString()})</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Campaigns Section */}
              <div className="p-4">
                <h4 className="text-sm font-medium text-slate-300 mb-3">Campaigns</h4>
                <Input
                  placeholder="Select campaigns..."
                  className="bg-slate-800/50 border-slate-600 text-slate-200 text-sm"
                />
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex items-center justify-between p-4 border-t border-slate-700/50 bg-slate-800/30">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-slate-400 hover:text-slate-200"
              >
                Clear All
              </Button>
              <Button
                size="sm"
                onClick={applyFilters}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
