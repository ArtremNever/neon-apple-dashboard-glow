
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export interface TableData {
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

export const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-500/10 text-green-400 border-green-500/20';
    case 'paused': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
    case '**': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
    default: return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  }
};

export const getTrendIcon = (trend: number) => {
  if (trend > 0) return <TrendingUp className="w-3 h-3 text-green-400" />;
  if (trend < 0) return <TrendingDown className="w-3 h-3 text-red-400" />;
  return <Minus className="w-3 h-3 text-slate-400" />;
};

export const renderMiniSparkline = (data: number[]) => {
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
