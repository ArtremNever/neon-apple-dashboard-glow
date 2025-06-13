
import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { LineChart, Line, ResponsiveContainer } from 'recharts';
import { useState } from 'react';

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
  const [isHovered, setIsHovered] = useState(false);
  const isPositive = trend === 'up';
  const changeValue = parseFloat(change.replace('%', '').replace('+', ''));

  return (
    <Card 
      className="group relative overflow-hidden border-0 bg-white/[0.08] backdrop-blur-md hover:bg-white/[0.12] transition-all duration-300 animate-fade-in-up hover:scale-[1.02] hover:-translate-y-1"
      style={{ animationDelay: `${delay}ms` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.12] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
      
      {/* Subtle border animation */}
      <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className={`absolute inset-0 rounded-lg border-2 ${isPositive ? 'border-primary-500/20' : 'border-red-500/20'} animate-pulse`} />
      </div>
      
      {/* Content */}
      <div className="relative p-6 space-y-4">
        {/* Header with enhanced icon animation */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`
              p-3 rounded-xl transition-all duration-300 shadow-lg
              ${isPositive 
                ? 'bg-primary-500/10 text-primary-400 group-hover:bg-primary-500/20 shadow-primary-500/20' 
                : 'bg-red-500/10 text-red-400 group-hover:bg-red-500/20 shadow-red-500/20'
              }
              ${isHovered ? 'scale-110 rotate-6' : ''}
            `}>
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-slate-400 uppercase tracking-wide">
                {title}
              </h3>
            </div>
          </div>
          
          {/* Enhanced sparkline with hover effect */}
          <div className={`w-20 h-10 opacity-70 group-hover:opacity-100 transition-all duration-300 ${isHovered ? 'scale-110' : ''}`}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={sparklineData}>
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke={isPositive ? '#0ea5e9' : '#ef4444'}
                  strokeWidth={2}
                  dot={false}
                  activeDot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Enhanced main metric with number animation effect */}
        <div className="space-y-3">
          <div className="text-3xl font-semibold text-white tracking-tight group-hover:scale-105 transition-transform duration-300">
            {typeof value === 'number' ? value.toLocaleString() : value}
          </div>
          
          {/* Enhanced trend indicator */}
          <div className="flex items-center space-x-2">
            <div className={`
              flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-300
              ${isPositive 
                ? 'bg-success-500/10 text-success-400 border-success-500/20 group-hover:bg-success-500/20 group-hover:border-success-500/30' 
                : 'bg-red-500/10 text-red-400 border-red-500/20 group-hover:bg-red-500/20 group-hover:border-red-500/30'
              }
              ${isHovered ? 'scale-105 shadow-lg' : ''}
            `}>
              <div className={`
                w-0 h-0 transition-all duration-300
                ${isPositive 
                  ? 'border-l-[4px] border-r-[4px] border-b-[6px] border-l-transparent border-r-transparent border-b-success-400' 
                  : 'border-l-[4px] border-r-[4px] border-t-[6px] border-l-transparent border-r-transparent border-t-red-400'
                }
                ${isHovered ? 'scale-125' : ''}
              `} />
              <span className="font-semibold">{Math.abs(changeValue)}%</span>
            </div>
            <span className="text-xs text-slate-500 group-hover:text-slate-400 transition-colors duration-300">vs последний месяц</span>
          </div>
        </div>
      </div>

      {/* Enhanced hover glow effect */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className={`absolute inset-0 bg-gradient-to-r ${isPositive ? 'from-primary-500/10' : 'from-red-500/10'} via-transparent to-transparent`} />
        <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${isPositive ? 'from-primary-500' : 'from-red-500'} to-transparent opacity-50`} />
      </div>

      {/* Floating particles effect on hover */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className={`absolute top-4 right-4 w-1 h-1 ${isPositive ? 'bg-primary-400' : 'bg-red-400'} rounded-full animate-ping`} />
          <div className={`absolute top-8 right-8 w-1 h-1 ${isPositive ? 'bg-primary-400' : 'bg-red-400'} rounded-full animate-ping`} style={{ animationDelay: '0.2s' }} />
        </div>
      )}
    </Card>
  );
};
