
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  ChevronDown, 
  ChevronRight, 
  MoreHorizontal,
  RefreshCw,
  BarChart3
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { TableData, getStatusColor, getTrendIcon, renderMiniSparkline } from './TableUtils';
import { CampaignRow } from './CampaignRow';

interface TableRowProps {
  row: TableData;
  index: number;
  isExpanded: boolean;
  isSelected: boolean;
  onToggleExpansion: () => void;
  onToggleSelection: () => void;
}

export const TableRow = ({
  row,
  index,
  isExpanded,
  isSelected,
  onToggleExpansion,
  onToggleSelection
}: TableRowProps) => {
  return (
    <>
      <tr 
        className={cn(
          "group border-b border-slate-800/50 hover:bg-blue-500/5 transition-all duration-200",
          "hover:shadow-lg hover:shadow-blue-500/5 hover:scale-[1.001]",
          isSelected && "bg-blue-500/10"
        )}
        style={{ animationDelay: `${index * 0.05}s` }}
      >
        <td className="py-4 px-6">
          <Checkbox
            checked={isSelected}
            onCheckedChange={onToggleSelection}
            className="border-slate-500"
          />
        </td>
        
        {/* Media Source Cell */}
        <td className="py-4 px-6 w-80">
          <div className="flex items-center gap-3">
            {row.campaigns && row.campaigns.length > 0 && (
              <button
                onClick={onToggleExpansion}
                className="p-1 hover:bg-slate-700 rounded transition-colors"
              >
                {isExpanded ? (
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
      {isExpanded && row.campaigns && row.campaigns.map((campaign) => (
        <CampaignRow key={campaign.id} campaign={campaign} />
      ))}
    </>
  );
};
