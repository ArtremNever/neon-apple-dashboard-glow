
import { Layout } from '@/components/Layout';
import { useState } from 'react';
import { MetricCard } from '@/components/MetricCard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Filter, AlertTriangle, TrendingUp, Users, DollarSign, Target, BarChart } from 'lucide-react';
import { DateRangePicker } from '@/components/DateRangePicker';
import { AIInsightsTable } from '@/components/dashboard/AIInsightsTable';

const Dashboard = () => {
  const [dateRange, setDateRange] = useState({ from: new Date(), to: new Date() });

  // Mock data - in real app this would come from API
  const metrics = [
    { title: 'Active Clients', value: '24', change: '+12%', icon: Users, trend: 'up' as const },
    { title: 'Active Campaigns', value: '156', change: '+8%', icon: Target, trend: 'up' as const },
    { title: 'Spend', value: '$45,280', change: '+15%', icon: DollarSign, trend: 'up' as const },
    { title: 'Revenue', value: '$78,950', change: '+22%', icon: TrendingUp, trend: 'up' as const },
    { title: 'Profit', value: '$33,670', change: '+18%', icon: BarChart, trend: 'up' as const },
    { title: 'ROI', value: '174%', change: '+3%', icon: TrendingUp, trend: 'up' as const },
  ];

  return (
    <Layout>
      <div className="p-6 space-y-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-slate-400">Monitor your campaign performance and AI insights</p>
          </div>
          <div className="flex items-center gap-4">
            <DateRangePicker 
              dateRange={dateRange} 
              onDateRangeChange={setDateRange} 
            />
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          {metrics.map((metric, index) => (
            <MetricCard
              key={metric.title}
              title={metric.title}
              value={metric.value}
              change={metric.change}
              icon={metric.icon}
              trend={metric.trend}
              delay={index * 0.1}
            />
          ))}
        </div>

        {/* AI Insights Table */}
        <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-xl">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-yellow-400" />
                AI Insights & Recommendations
              </CardTitle>
              <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
                View All
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <AIInsightsTable />
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Dashboard;
