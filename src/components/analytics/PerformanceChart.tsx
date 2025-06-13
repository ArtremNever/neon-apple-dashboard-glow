
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, BarChart3, Activity, Eye } from 'lucide-react';
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
  const [chartType, setChartType] = useState<'line' | 'area'>('area');
  const [timeFrame, setTimeFrame] = useState('daily');

  const metrics = [
    { key: 'impressions', label: 'Impressions', color: '#3b82f6', icon: Eye },
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

  const currentMetric = metrics.find(m => m.key === selectedMetric);

  return (
    <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-xl overflow-hidden">
      <CardHeader className="border-b border-slate-700/30">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-400" />
            Performance Over Time
          </CardTitle>
          
          <div className="flex items-center gap-4">
            {/* Metric Selector */}
            <div className="flex items-center gap-1 bg-slate-800/50 rounded-lg p-1">
              {metrics.map((metric) => (
                <Button
                  key={metric.key}
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedMetric(metric.key)}
                  className={cn(
                    "text-xs transition-all duration-200 h-8 px-3",
                    selectedMetric === metric.key
                      ? "bg-slate-700 text-white shadow-lg"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
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
                    "text-xs transition-all duration-200 h-8 px-3",
                    timeFrame === frame.key
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
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
                    "transition-all duration-200 h-8 w-8 p-0",
                    chartType === type.key
                      ? "bg-blue-600 text-white shadow-lg"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
                  )}
                >
                  <type.icon className="w-4 h-4" />
                </Button>
              ))}
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6">
        <div className="h-80 relative">
          {/* Background grid effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-lg" />
          
          <ResponsiveContainer width="100%" height="100%">
            {chartType === 'line' ? (
              <LineChart data={data}>
                <defs>
                  <linearGradient id="lineGlow" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={currentMetric?.color} stopOpacity={0.8}/>
                    <stop offset="100%" stopColor={currentMetric?.color} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="rgba(255,255,255,0.05)" 
                  strokeWidth={1}
                />
                <XAxis 
                  dataKey="date" 
                  stroke="#64748B" 
                  fontSize={11}
                  axisLine={false}
                  tickLine={false}
                  dy={10}
                />
                <YAxis 
                  stroke="#64748B" 
                  fontSize={11}
                  axisLine={false}
                  tickLine={false}
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                    border: '1px solid rgba(71, 85, 105, 0.5)',
                    borderRadius: '12px',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                  }}
                  labelStyle={{ color: '#e2e8f0', fontSize: '12px' }}
                />
                <Line
                  type="monotone"
                  dataKey={selectedMetric}
                  stroke={currentMetric?.color}
                  strokeWidth={3}
                  filter="drop-shadow(0 0 6px rgba(59, 130, 246, 0.6))"
                  dot={{ 
                    fill: currentMetric?.color, 
                    strokeWidth: 2, 
                    stroke: '#1e293b',
                    r: 5 
                  }}
                  activeDot={{ 
                    r: 7, 
                    stroke: currentMetric?.color,
                    strokeWidth: 3,
                    fill: '#fff',
                    filter: 'drop-shadow(0 0 8px rgba(59, 130, 246, 0.8))'
                  }}
                />
              </LineChart>
            ) : (
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={currentMetric?.color} stopOpacity={0.4}/>
                    <stop offset="95%" stopColor={currentMetric?.color} stopOpacity={0.05}/>
                  </linearGradient>
                </defs>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="rgba(255,255,255,0.05)" 
                  strokeWidth={1}
                />
                <XAxis 
                  dataKey="date" 
                  stroke="#64748B" 
                  fontSize={11}
                  axisLine={false}
                  tickLine={false}
                  dy={10}
                />
                <YAxis 
                  stroke="#64748B" 
                  fontSize={11}
                  axisLine={false}
                  tickLine={false}
                  dx={-10}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(15, 23, 42, 0.95)', 
                    border: '1px solid rgba(71, 85, 105, 0.5)',
                    borderRadius: '12px',
                    backdropFilter: 'blur(20px)',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                  }}
                  labelStyle={{ color: '#e2e8f0', fontSize: '12px' }}
                />
                <Area
                  type="monotone"
                  dataKey={selectedMetric}
                  stroke={currentMetric?.color}
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#areaGradient)"
                  filter="drop-shadow(0 0 8px rgba(59, 130, 246, 0.3))"
                />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </div>
        
        {/* Enhanced Legend */}
        <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full shadow-lg" 
                style={{ 
                  backgroundColor: currentMetric?.color,
                  boxShadow: `0 0 10px ${currentMetric?.color}40`
                }}
              />
              <span className="text-slate-300 text-sm font-medium">
                {currentMetric?.label}
              </span>
            </div>
            <div className="text-xs text-slate-500">
              {chartType === 'line' ? 'Line Chart' : 'Area Chart'} • {timeFrame}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
