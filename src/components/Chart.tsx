
import { Card } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart } from 'recharts';

const data = [
  { name: 'Jan', value: 4000, revenue: 2400 },
  { name: 'Feb', value: 3000, revenue: 1398 },
  { name: 'Mar', value: 2000, revenue: 9800 },
  { name: 'Apr', value: 2780, revenue: 3908 },
  { name: 'May', value: 1890, revenue: 4800 },
  { name: 'Jun', value: 2390, revenue: 3800 },
  { name: 'Jul', value: 3490, revenue: 4300 },
];

export const Chart = () => {
  return (
    <Card className="glass-card p-6 animate-fade-in-up animate-delay-300 border-border/50">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Revenue Overview</h3>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-neon-green"></div>
            <span className="text-sm text-muted-foreground">Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-400"></div>
            <span className="text-sm text-muted-foreground">Users</span>
          </div>
        </div>
      </div>
      
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="neonGreen" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(142 76% 36%)" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="hsl(142 76% 36%)" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="blue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#60A5FA" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }}
            />
            <Area
              type="monotone"
              dataKey="revenue"
              stroke="hsl(142 76% 36%)"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#neonGreen)"
            />
            <Area
              type="monotone"
              dataKey="value"
              stroke="#60A5FA"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#blue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
