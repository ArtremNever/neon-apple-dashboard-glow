
import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { LineChart, Line, ResponsiveContainer } from 'recharts';

interface ModernMetricCardProps {
  title: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down';
  icon: LucideIcon;
  sparklineData: Array<{ value: number }>;
  delay?: number;
}

export const ModernMetricCard = ({ 
  title, 
  value, 
  change, 
  trend, 
  icon: Icon,
  sparklineData,
  delay = 0
}: ModernMetricCardProps) => {
  const isPositive = trend === 'up';
  const changeValue = parseFloat(change.replace('%', '').replace('+', ''));

  return (
    <Card 
      className="group relative overflow-hidden border-0 bg-white/[0.08] backdrop-blur-md hover:bg-white/[0.12] transition-all duration-250 animate-fade-in-up"
      style={{ animationDelay: `${delay}ms` }}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-250" />
      
      {/* Content */}
      <div className="relative p-6 space-y-4">
        {/* Header with icon */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`
              p-2.5 rounded-xl transition-all duration-250 group-hover:scale-110
              ${isPositive 
                ? 'bg-primary-500/10 text-primary-400 group-hover:bg-primary-500/20' 
                : 'bg-red-500/10 text-red-400 group-hover:bg-red-500/20'
              }
            `}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide letter-spacing-[0.025em]">
                {title}
              </h3>
            </div>
          </div>
          
          {/* Mini sparkline chart */}
          <div className="w-16 h-8">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={isPositive ? '#0ea5e9' : '#ef4444'}
                  strokeWidth={1.5}
                  dot={false}
                  activeDot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Main metric */}
        <div className="space-y-2">
          <div className="text-3xl font-semibold text-white tracking-tight">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </div>
          
          {/* Trend indicator */}
          <div className="flex items-center space-x-2">
            <div className={`
              flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium
              ${isPositive 
                ? 'bg-success-500/10 text-success-400 border border-success-500/20' 
                : 'bg-red-500/10 text-red-400 border border-red-500/20'
              }
            `}>
              <div className={`
                w-0 h-0 transition-transform duration-250
                ${isPositive 
                  ? 'border-l-[4px] border-r-[4px] border-b-[6px] border-l-transparent border-r-transparent border-b-success-400' 
                  : 'border-l-[4px] border-r-[4px] border-t-[6px] border-l-transparent border-r-transparent border-t-red-400'
                }
              `} />
              <span>{Math.abs(changeValue)}%</span>
            </div>
            <span className="text-xs text-gray-500">vs last month</span>
          </div>
        </div>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-250 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-transparent to-transparent" />
      </div>
    </Card>
  );
};
