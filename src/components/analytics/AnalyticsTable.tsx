
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronDown, 
  ChevronRight, 
  Search, 
  Settings, 
  ArrowUpDown,
  MoreHorizontal 
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface TableData {
  id: string;
  mediaSource: string;
  icon?: string;
  total: number;
  installs: number;
  revenue: number;
  ctr: number;
  status: 'active' | 'paused';
  campaigns?: Array<{
    id: string;
    name: string;
    installs: number;
    revenue: number;
    ctr: number;
  }>;
}

interface AnalyticsTableProps {
  data: TableData[];
  onSettingsClick: () => void;
}

export const AnalyticsTable = ({ data, onSettingsClick }: AnalyticsTableProps) => {
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'asc' | 'desc';
  } | null>(null);
  const [groupBy, setGroupBy] = useState('media-source');

  const toggleRowExpansion = (rowId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(rowId)) {
      newExpanded.delete(rowId);
    } else {
      newExpanded.add(rowId);
    }
    setExpandedRows(newExpanded);
  };

  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const groupByOptions = [
    { value: 'media-source', label: 'Media source' },
    { value: 'campaign', label: 'Campaign' },
    { value: 'country', label: 'Country' }
  ];

  const filteredData = data.filter(item =>
    item.mediaSource.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate totals
  const totals = filteredData.reduce((acc, item) => ({
    total: acc.total + item.total,
    installs: acc.installs + item.installs,
    revenue: acc.revenue + item.revenue
  }), { total: 0, installs: 0, revenue: 0 });

  return (
    <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <CardTitle className="text-white">Performance Data</CardTitle>
            
            {/* Group By Selector */}
            <div className="flex items-center gap-2">
              <span className="text-slate-400 text-sm">Group by</span>
              <select 
                value={groupBy}
                onChange={(e) => setGroupBy(e.target.value)}
                className="bg-slate-800 border border-slate-600 rounded-md px-3 py-1 text-sm text-slate-200 focus:ring-2 focus:ring-blue-500/50"
              >
                {groupByOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Table Actions */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800/50 border-slate-600 text-slate-200 w-64"
              />
            </div>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={onSettingsClick}
              className="border-slate-600 text-slate-300 hover:bg-slate-800"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700/50">
                <th className="text-left py-4 px-6 text-slate-400 font-medium">
                  <button 
                    onClick={() => handleSort('mediaSource')}
                    className="flex items-center gap-2 hover:text-slate-200 transition-colors"
                  >
                    Media source
                    <ArrowUpDown className="w-4 h-4" />
                  </button>
                </th>
                <th className="text-right py-4 px-6 text-slate-400 font-medium">
                  <button 
                    onClick={() => handleSort('total')}
                    className="flex items-center gap-2 hover:text-slate-200 transition-colors ml-auto"
                  >
                    Total
                    <ArrowUpDown className="w-4 h-4" />
                  </button>
                </th>
                <th className="text-right py-4 px-6 text-slate-400 font-medium">
                  <button 
                    onClick={() => handleSort('installs')}
                    className="flex items-center gap-2 hover:text-slate-200 transition-colors ml-auto"
                  >
                    Installs
                    <ArrowUpDown className="w-4 h-4" />
                  </button>
                </th>
                <th className="text-right py-4 px-6 text-slate-400 font-medium">
                  <button 
                    onClick={() => handleSort('revenue')}
                    className="flex items-center gap-2 hover:text-slate-200 transition-colors ml-auto"
                  >
                    Revenue
                    <ArrowUpDown className="w-4 h-4" />
                  </button>
                </th>
                <th className="text-right py-4 px-6 text-slate-400 font-medium">CTR</th>
                <th className="text-center py-4 px-6 text-slate-400 font-medium">Status</th>
                <th className="w-8"></th>
              </tr>
            </thead>
            <tbody>
              {/* Totals Row */}
              <tr className="bg-slate-800/30 border-b border-slate-700/50">
                <td className="py-4 px-6">
                  <span className="text-white font-semibold">Totals</span>
                </td>
                <td className="py-4 px-6 text-right text-white font-semibold">
                  {totals.total.toLocaleString()}
                </td>
                <td className="py-4 px-6 text-right text-white font-semibold">
                  {totals.installs.toLocaleString()}
                </td>
                <td className="py-4 px-6 text-right text-white font-semibold">
                  ${totals.revenue.toLocaleString()}
                </td>
                <td className="py-4 px-6 text-right text-slate-300">-</td>
                <td className="py-4 px-6 text-center">-</td>
                <td className="py-4 px-6"></td>
              </tr>
              
              {/* Data Rows */}
              {filteredData.map((row, index) => (
                <>
                  <tr 
                    key={row.id}
                    className={cn(
                      "border-b border-slate-800 hover:bg-slate-800/30 transition-all duration-200 animate-fade-in-up group",
                      "hover:shadow-lg hover:shadow-blue-500/5"
                    )}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        {row.campaigns && row.campaigns.length > 0 && (
                          <button
                            onClick={() => toggleRowExpansion(row.id)}
                            className="p-1 hover:bg-slate-700 rounded transition-colors"
                          >
                            {expandedRows.has(row.id) ? (
                              <ChevronDown className="w-4 h-4 text-slate-400" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-slate-400" />
                            )}
                          </button>
                        )}
                        
                        <div className="w-8 h-8 rounded-lg bg-slate-700 flex items-center justify-center">
                          <span className="text-xs font-medium text-slate-300">
                            {row.mediaSource.slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                        
                        <span className="text-white font-medium">{row.mediaSource}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-right text-slate-300">
                      {row.total.toLocaleString()}
                    </td>
                    <td className="py-4 px-6 text-right text-slate-300">
                      {row.installs.toLocaleString()}
                    </td>
                    <td className="py-4 px-6 text-right text-slate-300">
                      ${row.revenue.toLocaleString()}
                    </td>
                    <td className="py-4 px-6 text-right text-slate-300">
                      {row.ctr.toFixed(2)}%
                    </td>
                    <td className="py-4 px-6 text-center">
                      <Badge 
                        variant={row.status === 'active' ? 'default' : 'secondary'}
                        className={cn(
                          row.status === 'active' 
                            ? 'bg-green-600 hover:bg-green-700' 
                            : 'bg-yellow-600 hover:bg-yellow-700'
                        )}
                      >
                        {row.status}
                      </Badge>
                    </td>
                    <td className="py-4 px-6">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                  
                  {/* Expanded Campaign Rows */}
                  {expandedRows.has(row.id) && row.campaigns && row.campaigns.map((campaign) => (
                    <tr 
                      key={campaign.id}
                      className="bg-slate-800/20 border-b border-slate-800 hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="py-3 px-6 pl-16">
                        <span className="text-slate-300 text-sm">{campaign.name}</span>
                      </td>
                      <td className="py-3 px-6 text-right text-slate-400 text-sm">-</td>
                      <td className="py-3 px-6 text-right text-slate-400 text-sm">
                        {campaign.installs.toLocaleString()}
                      </td>
                      <td className="py-3 px-6 text-right text-slate-400 text-sm">
                        ${campaign.revenue.toLocaleString()}
                      </td>
                      <td className="py-3 px-6 text-right text-slate-400 text-sm">
                        {campaign.ctr.toFixed(2)}%
                      </td>
                      <td className="py-3 px-6 text-center">-</td>
                      <td className="py-3 px-6"></td>
                    </tr>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
