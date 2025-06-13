
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  ChevronDown, 
  ChevronRight, 
  Search, 
  Settings, 
  ArrowUpDown,
  MoreHorizontal,
  Download,
  Table,
  LayoutGrid,
  BarChart3,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Minus,
  X
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
  status: 'active' | 'paused' | '**';
  campaigns?: Array<{
    id: string;
    name: string;
    installs: number;
    revenue: number;
    ctr: number;
    badges?: string[];
  }>;
  meta?: {
    campaignCount: number;
    adSetCount: number;
    lastSync: string;
  };
  historical?: number[];
  trend?: number;
  revenueGoal?: number;
}

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'paused': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case '**': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <TrendingUp className="w-3 h-3 text-green-400" />;
    if (trend < 0) return <TrendingDown className="w-3 h-3 text-red-400" />;
    return <Minus className="w-3 h-3 text-slate-400" />;
  };

  const renderMiniSparkline = (data: number[]) => {
    if (!data || data.length === 0) return null;
    
    const max = Math.max(...data);
    const min = Math.min(...data);
    const range = max - min || 1;
    
    return (
      <div className="flex items-end gap-0.5 h-5 w-16 absolute bottom-1 left-6 opacity-30">
        {data.slice(-12).map((point, index) => (
          <div
            key={index}
            className="flex-1 bg-blue-400 rounded-sm min-h-[2px]"
            style={{ height: `${((point - min) / range) * 100}%` }}
          />
        ))}
      </div>
    );
  };

  const filteredData = data.filter(item =>
    item.mediaSource.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Card className="bg-slate-900/40 border-slate-700/50 backdrop-blur-xl shadow-2xl overflow-hidden">
      {/* Table Header */}
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
                        onClick={() => removeFilter(filter.value)}
                        className="hover:text-blue-200 transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  <button
                    onClick={clearAllFilters}
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
                onClick={() => setViewMode('table')}
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
                onClick={() => setViewMode('card')}
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
                onClick={() => setViewMode('chart')}
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
                onChange={(e) => setGroupBy(e.target.value)}
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
                onChange={(e) => setSearchTerm(e.target.value)}
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
              {/* Data Rows */}
              {filteredData.map((row, index) => (
                <>
                  <tr 
                    key={row.id}
                    className={cn(
                      "group border-b border-slate-800/50 hover:bg-blue-500/5 transition-all duration-200",
                      "hover:shadow-lg hover:shadow-blue-500/5 hover:scale-[1.001]",
                      selectedRows.has(row.id) && "bg-blue-500/10"
                    )}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <td className="py-4 px-6">
                      <Checkbox
                        checked={selectedRows.has(row.id)}
                        onCheckedChange={() => toggleRowSelection(row.id)}
                        className="border-slate-500"
                      />
                    </td>
                    
                    {/* Media Source Cell */}
                    <td className="py-4 px-6 w-80">
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
                        
                        <div className="w-10 h-10 rounded-xl bg-slate-700/50 border border-slate-600/50 flex items-center justify-center p-2">
                          <span className="text-xs font-bold text-slate-300">
                            {row.mediaSource.slice(0, 2).toUpperCase()}
                          </span>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="font-semibold text-white">{row.mediaSource}</div>
                          {row.meta && (
                            <div className="text-xs text-slate-500 mt-1">
                              {row.meta.campaignCount} campaigns • {row.meta.adSetCount} ad sets
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10"
                            title="Sync now"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-slate-400 hover:text-purple-400 hover:bg-purple-500/10"
                            title="View details"
                          >
                            <BarChart3 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </div>
                    </td>
                    
                    {/* Total Cell */}
                    <td className="py-4 px-6 text-right relative">
                      <div className="text-slate-300 font-mono text-lg font-semibold">
                        {row.total.toLocaleString()}
                      </div>
                      {row.historical && renderMiniSparkline(row.historical)}
                      {row.trend !== undefined && (
                        <div className="flex items-center justify-end gap-1 mt-1">
                          {getTrendIcon(row.trend)}
                          <span className={cn(
                            "text-xs font-medium",
                            row.trend > 0 ? "text-green-400" : row.trend < 0 ? "text-red-400" : "text-slate-400"
                          )}>
                            {row.trend > 0 ? '+' : ''}{row.trend.toFixed(1)}%
                          </span>
                        </div>
                      )}
                    </td>
                    
                    {/* Installs Cell */}
                    <td className="py-4 px-6 text-right">
                      <div className="text-slate-300 font-mono text-lg font-semibold">
                        {row.installs.toLocaleString()}
                      </div>
                    </td>
                    
                    {/* Revenue Cell */}
                    <td className="py-4 px-6 text-right">
                      <div className="text-slate-300 font-mono text-lg font-semibold">
                        ${row.revenue.toLocaleString()}
                      </div>
                      {row.revenueGoal && (
                        <div className="mt-2">
                          <div className="w-full bg-slate-700/50 rounded-full h-1.5">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-purple-500 h-1.5 rounded-full transition-all duration-300"
                              style={{ width: `${Math.min((row.revenue / row.revenueGoal) * 100, 100)}%` }}
                            />
                          </div>
                          <div className="text-xs text-slate-500 mt-1">
                            Goal: ${row.revenueGoal.toLocaleString()}
                          </div>
                        </div>
                      )}
                    </td>
                    
                    {/* CTR Cell */}
                    <td className="py-4 px-6 text-right">
                      <div className={cn(
                        "text-lg font-semibold font-mono",
                        row.ctr > 2 ? "text-green-400" : row.ctr > 1.5 ? "text-yellow-400" : "text-slate-300"
                      )}>
                        {row.ctr.toFixed(2)}%
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        Industry avg: 1.5%
                      </div>
                      <div className={cn(
                        "w-2 h-2 rounded-full mt-1 mx-auto",
                        row.ctr > 2 ? "bg-green-500" : row.ctr > 1.5 ? "bg-yellow-500" : "bg-slate-500"
                      )} />
                    </td>
                    
                    {/* Status Cell */}
                    <td className="py-4 px-6 text-center">
                      <div className="space-y-2">
                        <Badge className={cn("border text-xs font-medium", getStatusColor(row.status))}>
                          <div className={cn(
                            "w-1.5 h-1.5 rounded-full mr-2",
                            row.status === 'active' && "bg-green-400 animate-pulse"
                          )} />
                          {row.status === '**' ? 'Pending' : row.status.charAt(0).toUpperCase() + row.status.slice(1)}
                        </Badge>
                        {row.meta?.lastSync && (
                          <div className="text-xs text-slate-500">
                            Synced {row.meta.lastSync}
                          </div>
                        )}
                      </div>
                    </td>
                    
                    {/* Actions */}
                    <td className="py-4 px-6">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8 p-0"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                  
                  {/* Expanded Campaign Rows */}
                  {expandedRows.has(row.id) && row.campaigns && row.campaigns.map((campaign) => (
                    <tr 
                      key={campaign.id}
                      className="bg-slate-800/20 border-b border-slate-800/30 hover:bg-slate-800/40 transition-colors animate-fade-in"
                    >
                      <td className="py-3 px-6"></td>
                      <td className="py-3 px-6 pl-16">
                        <div className="flex items-center gap-3">
                          <div className="w-6 h-6 rounded bg-slate-600/50 flex items-center justify-center">
                            <BarChart3 className="w-3 h-3 text-slate-400" />
                          </div>
                          <div>
                            <div className="text-slate-300 text-sm font-medium">{campaign.name}</div>
                            {campaign.badges && (
                              <div className="flex gap-1 mt-1">
                                {campaign.badges.map((badge, idx) => (
                                  <Badge key={idx} className="text-xs bg-slate-700 text-slate-300 border-slate-600">
                                    {badge}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-6 text-right text-slate-400 text-sm">-</td>
                      <td className="py-3 px-6 text-right text-slate-400 text-sm font-mono">
                        {campaign.installs.toLocaleString()}
                      </td>
                      <td className="py-3 px-6 text-right text-slate-400 text-sm font-mono">
                        ${campaign.revenue.toLocaleString()}
                      </td>
                      <td className="py-3 px-6 text-right text-slate-400 text-sm font-mono">
                        {campaign.ctr.toFixed(2)}%
                      </td>
                      <td className="py-3 px-6 text-center">-</td>
                      <td className="py-3 px-6"></td>
                    </tr>
                  ))}
                </>
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
