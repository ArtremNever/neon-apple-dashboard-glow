
import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { LineChart, Line, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface EnhancedSourceMetricCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  status?: 'success' | 'error' | 'warning' | 'neutral';
  subText?: string;
  trend?: string;
  miniChartData?: Array<{ value: number }>;
  donutData?: Array<{ name: string; value: number; color: string }>;
  showQuickAction?: boolean;
  delay?: number;
}

export const EnhancedSourceMetricCard = ({ 
  title, 
  value, 
  icon: Icon,
  status = 'neutral',
  subText,
  trend,
  miniChartData,
  donutData,
  showQuickAction,
  delay = 0
}: EnhancedSourceMetricCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'success':
        return {
          bg: 'bg-green-500/10 border-green-500/20',
          text: 'text-green-400',
          dot: 'bg-green-400',
          glow: 'shadow-green-500/20'
        };
      case 'error':
        return {
          bg: 'bg-red-500/10 border-red-500/20',
          text: 'text-red-400',
          dot: 'bg-red-400',
          glow: 'shadow-red-500/20'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-500/10 border-yellow-500/20',
          text: 'text-yellow-400',
          dot: 'bg-yellow-400',
          glow: 'shadow-yellow-500/20'
        };
      default:
        return {
          bg: 'bg-slate-800/50 border-slate-700/50',
          text: 'text-slate-300',
          dot: 'bg-slate-400',
          glow: 'shadow-slate-500/20'
        };
    }
  };

  const statusStyles = getStatusStyles(status);

  return (
    <Card 
      className={cn(
        "relative overflow-hidden transition-all duration-300 hover:scale-105 hover:-translate-y-2 animate-fade-in-up backdrop-blur-xl",
        statusStyles.bg,
        isHovered && `hover:shadow-2xl ${statusStyles.glow}`
      )}
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
      
      {/* Pulsing status indicator */}
      {status === 'success' && (
        <div className="absolute top-3 right-3">
          <div className={cn("w-2 h-2 rounded-full", statusStyles.dot)}>
            <div className={cn("w-2 h-2 rounded-full animate-ping", statusStyles.dot)} />
          </div>
        </div>
      )}

      <div className="relative p-6 space-y-4">
        {/* Header with icon */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={cn(
              "p-3 rounded-xl transition-all duration-300",
              statusStyles.bg,
              statusStyles.text,
              isHovered ? 'scale-110 rotate-6' : ''
            )}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wide">
                {title}
              </h3>
            </div>
          </div>
          
          {/* Mini Chart */}
          {miniChartData && (
            <div className="w-16 h-10">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={miniChartData}>
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke={statusStyles.text.includes('green') ? '#10b981' : '#3b82f6'}
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {/* Donut Chart */}
          {donutData && (
            <div className="w-12 h-12">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={donutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={12}
                    outerRadius={20}
                    dataKey="value"
                  >
                    {donutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Main metric */}
        <div className="space-y-2">
          <div className="text-3xl font-semibold text-white tracking-tight group-hover:scale-105 transition-transform duration-300">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </div>
          
          {/* Sub text or trend */}
          {(subText || trend) && (
            <div className="flex items-center justify-between">
              {subText && (
                <span className={cn("text-sm", statusStyles.text)}>
                  {subText}
                </span>
              )}
              {trend && (
                <span className="text-xs text-slate-400">
                  {trend}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Quick Action */}
        {showQuickAction && status === 'error' && (
          <button className="w-full mt-4 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg text-red-400 text-sm font-medium transition-all duration-200 hover:scale-105">
            Fix now →
          </button>
        )}
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className={`absolute inset-0 bg-gradient-to-r ${statusStyles.bg} via-transparent to-transparent`} />
      </div>
    </Card>
  );
};
