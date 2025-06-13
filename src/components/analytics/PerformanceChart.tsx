
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, BarChart3, Activity } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface PerformanceChartProps {
  data: Array<{
    date: string;
    impressions: number;
    clicks: number;
    conversions: number;
    revenue: number;
  }>;
}

export const PerformanceChart = ({ data }: PerformanceChartProps) => {
  const [selectedMetric, setSelectedMetric] = useState('impressions');
  const [chartType, setChartType] = useState<'line' | 'area'>('line');
  const [timeFrame, setTimeFrame] = useState('daily');

  const metrics = [
    { key: 'impressions', label: 'Impressions', color: '#3b82f6' },
    { key: 'clicks', label: 'Clicks', color: '#10b981' },
    { key: 'conversions', label: 'Conversions', color: '#8b5cf6' },
    { key: 'revenue', label: 'Revenue', color: '#f59e0b' }
  ];

  const timeFrames = [
    { key: 'daily', label: 'Daily' },
    { key: 'weekly', label: 'Weekly' },
    { key: 'monthly', label: 'Monthly' }
  ];

  const chartTypes = [
    { key: 'line', icon: TrendingUp, label: 'Line' },
    { key: 'area', icon: Activity, label: 'Area' }
  ];

  return (
    <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Performance Over Time
          </CardTitle>
          
          <div className="flex items-center gap-4">
            {/* Metric Selector */}
            <div className="flex items-center gap-2">
              {metrics.map((metric) => (
                <Button
                  key={metric.key}
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedMetric(metric.key)}
                  className={cn(
                    "text-xs transition-all duration-200",
                    selectedMetric === metric.key
                      ? "bg-slate-800 text-white"
                      : "text-slate-400 hover:text-slate-200"
                  )}
                >
                  <div 
                    className="w-2 h-2 rounded-full mr-2" 
                    style={{ backgroundColor: metric.color }}
                  />
                  {metric.label}
                </Button>
              ))}
            </div>
            
            {/* Time Frame Toggle */}
            <div className="flex items-center bg-slate-800/50 rounded-lg p-1">
              {timeFrames.map((frame) => (
                <Button
                  key={frame.key}
                  variant="ghost"
                  size="sm"
                  onClick={() => setTimeFrame(frame.key)}
                  className={cn(
                    "text-xs transition-all duration-200",
                    timeFrame === frame.key
                      ? "bg-blue-600 text-white"
                      : "text-slate-400 hover:text-slate-200"
                  )}
                >
                  {frame.label}
                </Button>
              ))}
            </div>
            
            {/* Chart Type Toggle */}
            <div className="flex items-center bg-slate-800/50 rounded-lg p-1">
              {chartTypes.map((type) => (
                <Button
                  key={type.key}
                  variant="ghost"
                  size="sm"
                  onClick={() => setChartType(type.key as 'line' | 'area')}
                  className={cn(
                    "transition-all duration-200",
                    chartType === type.key
                      ? "bg-blue-600 text-white"
                      : "text-slate-400 hover:text-slate-200"
                  )}
                >
                  <type.icon className="w-4 h-4" />
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'line' ? (
              <LineChart data={data}>
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={metrics.find(m => m.key === selectedMetric)?.color} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={metrics.find(m => m.key === selectedMetric)?.color} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="date" 
                  stroke="#9CA3AF" 
                  fontSize={12}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  stroke="#9CA3AF" 
                  fontSize={12}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.9)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    backdropFilter: 'blur(10px)'
                  }} 
                />
                <Line
                  type="monotone"
                  dataKey={selectedMetric}
                  stroke={metrics.find(m => m.key === selectedMetric)?.color}
                  strokeWidth={3}
                  dot={{ fill: metrics.find(m => m.key === selectedMetric)?.color, strokeWidth: 2, r: 4 }}
                  activeDot={{ 
                    r: 6, 
                    stroke: metrics.find(m => m.key === selectedMetric)?.color,
                    strokeWidth: 2,
                    fill: '#fff'
                  }}
                />
              </LineChart>
            ) : (
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={metrics.find(m => m.key === selectedMetric)?.color} stopOpacity={0.3}/>
                    <stop offset="95%" stopColor={metrics.find(m => m.key === selectedMetric)?.color} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis 
                  dataKey="date" 
                  stroke="#9CA3AF" 
                  fontSize={12}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis 
                  stroke="#9CA3AF" 
                  fontSize={12}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.9)', 
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '8px',
                    backdropFilter: 'blur(10px)'
                  }} 
                />
                <Area
                  type="monotone"
                  dataKey={selectedMetric}
                  stroke={metrics.find(m => m.key === selectedMetric)?.color}
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorGradient)"
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
        
        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-slate-700/50">
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: metrics.find(m => m.key === selectedMetric)?.color }}
            />
            <span className="text-slate-300 text-sm">
              {metrics.find(m => m.key === selectedMetric)?.label}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
