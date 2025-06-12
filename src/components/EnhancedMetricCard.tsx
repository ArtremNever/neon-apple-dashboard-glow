
import { LucideIcon } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useState } from 'react';

interface EnhancedMetricCardProps {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  trend: 'up' | 'down';
  delay?: number;
  gradient?: string;
}

export const EnhancedMetricCard = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  trend, 
  delay = 0,
  gradient = 'from-neon-green/20 to-transparent'
}: EnhancedMetricCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative group perspective-1000"
      style={{ animationDelay: `${delay}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow effect */}
      <div className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-xl blur-sm opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse-glow`}></div>
      
      <Card 
        className={`
          relative glass-card p-6 border-border/50 overflow-hidden
          transform-gpu transition-all duration-500 ease-out
          hover:scale-[1.02] hover:-translate-y-2
          ${isHovered ? 'rotate-x-2 rotate-y-5' : ''}
          animate-fade-in-up
        `}
        style={{
          background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
          backdropFilter: 'blur(20px)',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-neon-green/30 via-transparent to-transparent animate-pulse"></div>
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-neon-green to-transparent animate-shimmer"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 flex items-center justify-between">
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground/80 tracking-wide uppercase font-medium">
              {title}
            </p>
            <p className="text-3xl font-bold text-foreground tracking-tight">
              {value}
            </p>
            <div className={`
              flex items-center gap-2 text-sm font-medium
              ${trend === 'up' ? 'text-neon-green' : 'text-red-400'}
            `}>
              <span className={`
                inline-block w-0 h-0 transition-transform duration-300
                ${trend === 'up' 
                  ? 'border-l-[6px] border-r-[6px] border-b-[8px] border-l-transparent border-r-transparent border-b-neon-green' 
                  : 'border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-red-400'
                }
                ${isHovered ? 'scale-110' : ''}
              `}></span>
              <span className="font-semibold">{change}</span>
            </div>
          </div>
          
          <div className={`
            relative p-4 rounded-2xl transition-all duration-500
            ${trend === 'up' 
              ? 'bg-neon-green/10 text-neon-green shadow-lg shadow-neon-green/20' 
              : 'bg-red-400/10 text-red-400 shadow-lg shadow-red-400/20'
            }
            ${isHovered ? 'scale-110 rotate-12' : ''}
          `}>
            <Icon className="w-8 h-8" />
            {/* Icon glow effect */}
            <div className={`
              absolute inset-0 rounded-2xl blur-md -z-10
              ${trend === 'up' ? 'bg-neon-green/20' : 'bg-red-400/20'}
              ${isHovered ? 'scale-150' : 'scale-100'}
              transition-transform duration-500
            `}></div>
          </div>
        </div>

        {/* Interactive ripple effect */}
        {isHovered && (
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 w-4 h-4 -translate-x-1/2 -translate-y-1/2 bg-neon-green/30 rounded-full animate-ping"></div>
            <div className="absolute top-1/2 left-1/2 w-8 h-8 -translate-x-1/2 -translate-y-1/2 bg-neon-green/20 rounded-full animate-ping animation-delay-75"></div>
            <div className="absolute top-1/2 left-1/2 w-12 h-12 -translate-x-1/2 -translate-y-1/2 bg-neon-green/10 rounded-full animate-ping animation-delay-150"></div>
          </div>
        )}
      </Card>
    </div>
  );
};
