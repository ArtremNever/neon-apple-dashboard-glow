
import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  trend: 'up' | 'down';
  delay?: number;
}

export const MetricCard = ({ title, value, change, icon: Icon, trend, delay = 0 }: MetricCardProps) => {
  return (
    <Card 
      className="glass-card p-6 hover:scale-105 transition-all duration-300 animate-fade-in-up border-border/50"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-bold text-foreground">{value}</p>
          <p className={`text-sm flex items-center gap-1 mt-2 ${
            trend === 'up' ? 'text-neon-green' : 'text-red-400'
          }`}>
            <span className={`${trend === 'up' ? '↗' : '↘'}`}></span>
            {change}
          </p>
        </div>
        <div className={`p-3 rounded-xl ${
          trend === 'up' 
            ? 'bg-neon-green/10 text-neon-green' 
            : 'bg-red-400/10 text-red-400'
        }`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </Card>
  );
};
