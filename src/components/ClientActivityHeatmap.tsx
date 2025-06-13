
import { cn } from '@/lib/utils';

interface ClientActivityHeatmapProps {
  data: number[];
  className?: string;
  maxValue?: number;
}

export const ClientActivityHeatmap = ({ 
  data, 
  className,
  maxValue 
}: ClientActivityHeatmapProps) => {
  const max = maxValue || Math.max(...data, 1);
  
  const getIntensityColor = (value: number) => {
    const intensity = value / max;
    if (intensity === 0) return 'bg-slate-800';
    if (intensity <= 0.25) return 'bg-blue-900/40';
    if (intensity <= 0.5) return 'bg-blue-700/60';
    if (intensity <= 0.75) return 'bg-blue-500/80';
    return 'bg-blue-400';
  };

  const getTooltipText = (value: number, index: number) => {
    const daysAgo = data.length - index - 1;
    return `${value} activities ${daysAgo === 0 ? 'today' : `${daysAgo} days ago`}`;
  };

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs text-slate-400">Activity (last {data.length} days)</span>
        <span className="text-xs text-slate-500">
          Less <span className="inline-flex gap-1 mx-2">
            <div className="w-2 h-2 rounded-sm bg-slate-800" />
            <div className="w-2 h-2 rounded-sm bg-blue-900/40" />
            <div className="w-2 h-2 rounded-sm bg-blue-700/60" />
            <div className="w-2 h-2 rounded-sm bg-blue-500/80" />
            <div className="w-2 h-2 rounded-sm bg-blue-400" />
          </span> More
        </span>
      </div>
      
      <div className="flex gap-1 overflow-hidden">
        {data.map((value, index) => (
          <div
            key={index}
            className={cn(
              'w-3 h-3 rounded-sm transition-all duration-200 hover:scale-110 cursor-pointer',
              getIntensityColor(value)
            )}
            title={getTooltipText(value, index)}
            style={{
              animationDelay: `${index * 50}ms`
            }}
          />
        ))}
      </div>
    </div>
  );
};
