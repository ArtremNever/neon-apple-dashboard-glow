
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  status: 'normal' | 'warning' | 'critical';
  icon: LucideIcon;
  details?: { label: string; value: string }[];
  trend?: number[];
}

export const MetricCard = ({ title, value, unit, status, icon: Icon, details, trend }: MetricCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'critical': return 'text-red-400';
      case 'warning': return 'text-yellow-400';
      default: return 'text-green-400';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-red-600 text-red-100';
      case 'warning': return 'bg-yellow-600 text-yellow-100';
      default: return 'bg-green-600 text-green-100';
    }
  };

  const getCardBorder = (status: string) => {
    switch (status) {
      case 'critical': return 'border-red-500/30 shadow-red-500/10';
      case 'warning': return 'border-yellow-500/30 shadow-yellow-500/10';
      default: return 'border-green-500/20 shadow-green-500/5';
    }
  };

  return (
    <Card className={cn(
      "bg-slate-900/50 backdrop-blur-xl transition-all duration-300 hover:scale-105",
      getCardBorder(status),
      status === 'critical' && 'animate-pulse-glow'
    )}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={cn(
              "p-3 rounded-xl bg-slate-800/50 transition-colors",
              status === 'critical' && 'animate-pulse'
            )}>
              <Icon className={cn("w-6 h-6", getStatusColor(status))} />
            </div>
            <div>
              <h3 className="text-slate-300 text-sm font-medium">{title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className={cn(
                  "w-2 h-2 rounded-full animate-pulse",
                  getStatusColor(status).replace('text-', 'bg-')
                )} />
                <span className="text-xs text-slate-500">Live</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-white">{value}</span>
            {unit && <span className="text-slate-400 text-lg">{unit}</span>}
          </div>
        </div>

        {trend && (
          <div className="mb-4 h-12 flex items-end gap-1">
            {trend.slice(-12).map((point, index) => (
              <div
                key={index}
                className={cn(
                  "flex-1 rounded-sm transition-all duration-300",
                  getStatusColor(status).replace('text-', 'bg-')
                )}
                style={{ height: `${Math.max(point * 48 / 100, 2)}px` }}
              />
            ))}
          </div>
        )}

        {details && (
          <div className="space-y-2 mb-4">
            {details.map((detail, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-slate-400">{detail.label}</span>
                <span className="text-slate-300">{detail.value}</span>
              </div>
            ))}
          </div>
        )}

        <Badge className={cn("border-none text-xs", getStatusBadgeColor(status))}>
          <div className={cn(
            "w-2 h-2 rounded-full mr-2",
            getStatusColor(status).replace('text-', 'bg-')
          )} />
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      </CardContent>
    </Card>
  );
};
