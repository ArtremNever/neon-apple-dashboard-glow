
import { Card } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { TrendingUp, Users, DollarSign } from 'lucide-react';

const data = [
  { name: 'Jan', value: 4000, revenue: 2400, growth: 12 },
  { name: 'Feb', value: 3000, revenue: 1398, growth: 8 },
  { name: 'Mar', value: 2000, revenue: 9800, growth: 25 },
  { name: 'Apr', value: 2780, revenue: 3908, growth: 18 },
  { name: 'May', value: 1890, revenue: 4800, growth: 22 },
  { name: 'Jun', value: 2390, revenue: 3800, growth: 15 },
  { name: 'Jul', value: 3490, revenue: 4300, growth: 28 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card/95 backdrop-blur-xl border border-green-500/10 rounded-xl p-4 shadow-2xl">
        <p className="text-foreground font-semibold mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 mb-1">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground text-sm">{entry.name}:</span>
            <span className="text-foreground font-medium">{entry.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const EnhancedChart = () => {
  return (
    <div className="relative group">
      {/* Subtle glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-green-500/10 via-emerald-500/8 to-green-500/6 rounded-2xl blur-sm opacity-50 group-hover:opacity-75 transition duration-1000"></div>
      
      <Card className="relative bg-card/60 backdrop-blur-xl border border-green-500/10 hover:border-green-500/20 transition-all duration-500">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/10 rounded-xl border border-green-500/20">
                <TrendingUp className="w-6 h-6 text-green-300" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-foreground">Revenue Analytics</h3>
                <p className="text-muted-foreground mt-1">Performance overview for the last 7 months</p>
              </div>
            </div>
            
            {/* Legend with enhanced styling */}
            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-green-400 shadow-lg shadow-green-500/30"></div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-300" />
                  <span className="text-sm font-medium text-green-300">Revenue</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-blue-400 shadow-lg shadow-blue-500/30"></div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-blue-300" />
                  <span className="text-sm font-medium text-blue-300">Users</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Chart */}
          <div className="h-80 relative">
            {/* Background grid effect */}
            <div className="absolute inset-0 opacity-3">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-transparent to-blue-500/20"></div>
            </div>
            
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
                <defs>
                  <linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#34d399" stopOpacity={0.2}/>
                    <stop offset="50%" stopColor="#34d399" stopOpacity={0.08}/>
                    <stop offset="95%" stopColor="#34d399" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="users" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#60a5fa" stopOpacity={0.2}/>
                    <stop offset="50%" stopColor="#60a5fa" stopOpacity={0.08}/>
                    <stop offset="95%" stopColor="#60a5fa" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  stroke="hsl(var(--border))" 
                  strokeOpacity={0.2}
                />
                
                <XAxis 
                  dataKey="name" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  className="text-muted-foreground"
                />
                
                <YAxis 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
                  className="text-muted-foreground"
                />
                
                <Tooltip content={<CustomTooltip />} />
                
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#34d399"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#revenue)"
                  dot={{ fill: '#34d399', strokeWidth: 2, r: 3 }}
                  activeDot={{ 
                    r: 5, 
                    fill: '#34d399',
                    stroke: '#ffffff',
                    strokeWidth: 2,
                    style: { filter: 'drop-shadow(0 0 4px #34d399)' }
                  }}
                />
                
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#60a5fa"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#users)"
                  dot={{ fill: '#60a5fa', strokeWidth: 2, r: 3 }}
                  activeDot={{ 
                    r: 5, 
                    fill: '#60a5fa',
                    stroke: '#ffffff',
                    strokeWidth: 2,
                    style: { filter: 'drop-shadow(0 0 4px #60a5fa)' }
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          
          {/* Bottom stats */}
          <div className="grid grid-cols-3 gap-6 mt-8 pt-6 border-t border-border/30">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-300">$28.4K</div>
              <div className="text-sm text-muted-foreground/80">Avg. Revenue</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-300">2.8K</div>
              <div className="text-sm text-muted-foreground/80">Avg. Users</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-300">18.2%</div>
              <div className="text-sm text-muted-foreground/80">Avg. Growth</div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
