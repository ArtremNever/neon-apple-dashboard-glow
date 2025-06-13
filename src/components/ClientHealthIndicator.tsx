
import { cn } from '@/lib/utils';

interface ClientHealthIndicatorProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

export const ClientHealthIndicator = ({ 
  score, 
  size = 'md', 
  showLabel = true,
  className 
}: ClientHealthIndicatorProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'stroke-green-400 text-green-400';
    if (score >= 60) return 'stroke-yellow-400 text-yellow-400';
    return 'stroke-red-400 text-red-400';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Needs Attention';
  };

  const sizeClasses = {
    sm: 'w-12 h-12',
    md: 'w-16 h-16',
    lg: 'w-20 h-20'
  };

  const textSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  };

  const circumference = 2 * Math.PI * 16; // radius of 16
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className={cn('flex flex-col items-center space-y-1', className)}>
      <div className={cn('relative', sizeClasses[size])}>
        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
          {/* Background circle */}
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-slate-700"
          />
          {/* Progress circle */}
          <circle
            cx="18"
            cy="18"
            r="16"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className={cn('transition-all duration-1000 ease-out', getScoreColor(score))}
            style={{
              animation: 'dash 2s ease-out forwards'
            }}
          />
        </svg>
        
        {/* Score text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn('font-bold', textSizeClasses[size], getScoreColor(score))}>
            {score}
          </span>
        </div>
      </div>
      
      {showLabel && (
        <div className="text-center">
          <div className={cn('font-medium', textSizeClasses[size], getScoreColor(score))}>
            {getScoreLabel(score)}
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes dash {
          from {
            stroke-dashoffset: ${circumference};
          }
          to {
            stroke-dashoffset: ${strokeDashoffset};
          }
        }
      `}</style>
    </div>
  );
};
