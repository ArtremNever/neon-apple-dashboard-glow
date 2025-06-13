
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowUpDown, BarChart3 } from 'lucide-react';
import { useState } from 'react';
import { TableData } from './table/TableUtils';
import { TableHeader } from './table/TableHeader';
import { TableRow } from './table/TableRow';

interface ModernAnalyticsTableProps {
  data: TableData[];
  onSettingsClick: () => void;
}

export const ModernAnalyticsTable = ({ data, onSettingsClick }: ModernAnalyticsTableProps) => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'card' | 'chart'>('table');
  const [groupBy, setGroupBy] = useState('media-source');
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [activeFilters, setActiveFilters] = useState([
    { label: 'Last 7 days', value: 'period' },
    { label: '3 sources', value: 'sources' }
  ]);

  const toggleRowExpansion = (rowId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(rowId)) {
      newExpanded.delete(rowId);
    } else {
      newExpanded.add(rowId);
    }
    setExpandedRows(newExpanded);
  };

  const toggleRowSelection = (rowId: string) => {
    const newSelected = new Set(selectedRows);
    if (newSelected.has(rowId)) {
      newSelected.delete(rowId);
    } else {
      newSelected.add(rowId);
    }
    setSelectedRows(newSelected);
  };

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const removeFilter = (filterValue: string) => {
    setActiveFilters(filters => filters.filter(f => f.value !== filterValue));
  };

  const clearAllFilters = () => {
    setActiveFilters([]);
  };

  const filteredData = data.filter(item =>
    item.mediaSource.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="bg-slate-900/40 border-slate-700/50 backdrop-blur-xl shadow-2xl overflow-hidden">
      <TableHeader
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        groupBy={groupBy}
        onGroupByChange={setGroupBy}
        activeFilters={activeFilters}
        onRemoveFilter={removeFilter}
        onClearAllFilters={clearAllFilters}
        onSettingsClick={onSettingsClick}
      />
      
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/30 bg-slate-800/20">
                <th className="text-left py-4 px-6 text-slate-400 font-medium w-8">
                  <Checkbox
                    checked={selectedRows.size === filteredData.length}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedRows(new Set(filteredData.map(row => row.id)));
                      } else {
                        setSelectedRows(new Set());
                      }
                    }}
                    className="border-slate-500"
                  />
                </th>
                <th className="text-left py-4 px-6 text-slate-400 font-medium">
                  <button 
                    onClick={() => handleSort('mediaSource')}
                    className="flex items-center gap-2 hover:text-slate-200 transition-colors group"
                  >
                    <div className="p-1 rounded bg-slate-700/50">
                      <BarChart3 className="w-3 h-3" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wider">Media Source</span>
                    <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </th>
                <th className="text-right py-4 px-6 text-slate-400 font-medium">
                  <button 
                    onClick={() => handleSort('total')}
                    className="flex items-center gap-2 hover:text-slate-200 transition-colors ml-auto group"
                  >
                    <span className="text-xs font-semibold uppercase tracking-wider">Total</span>
                    <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </th>
                <th className="text-right py-4 px-6 text-slate-400 font-medium">
                  <button 
                    onClick={() => handleSort('installs')}
                    className="flex items-center gap-2 hover:text-slate-200 transition-colors ml-auto group"
                  >
                    <span className="text-xs font-semibold uppercase tracking-wider">Installs</span>
                    <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </th>
                <th className="text-right py-4 px-6 text-slate-400 font-medium">
                  <button 
                    onClick={() => handleSort('revenue')}
                    className="flex items-center gap-2 hover:text-slate-200 transition-colors ml-auto group"
                  >
                    <span className="text-xs font-semibold uppercase tracking-wider">Revenue</span>
                    <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                </th>
                <th className="text-right py-4 px-6 text-slate-400 font-medium">
                  <span className="text-xs font-semibold uppercase tracking-wider">CTR</span>
                </th>
                <th className="text-center py-4 px-6 text-slate-400 font-medium">
                  <span className="text-xs font-semibold uppercase tracking-wider">Status</span>
                </th>
                <th className="w-8"></th>
              </tr>
            </thead>
            <tbody>              
              {filteredData.map((row, index) => (
                <TableRow
                  key={row.id}
                  row={row}
                  index={index}
                  isExpanded={expandedRows.has(row.id)}
                  isSelected={selectedRows.has(row.id)}
                  onToggleExpansion={() => toggleRowExpansion(row.id)}
                  onToggleSelection={() => toggleRowSelection(row.id)}
                />
              ))}
              
              {filteredData.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center">
                    <div className="text-slate-400">No data found</div>
                    <div className="text-sm text-slate-500 mt-1">Try adjusting your search or filters</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
