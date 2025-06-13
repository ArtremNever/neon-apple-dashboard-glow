
import { Layout } from '@/components/Layout';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { DateRangePicker } from '@/components/DateRangePicker';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  PieChart, 
  BarChart3,
  Target,
  Calculator,
  Filter,
  Download
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell } from 'recharts';

const Revenue = () => {
  const [dateRange, setDateRange] = useState({ 
    from: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), 
    to: new Date() 
  });

  // Mock revenue data
  const revenueData = [
    { date: '2024-01-01', revenue: 12500, spend: 8200, profit: 4300, roi: 152 },
    { date: '2024-01-02', revenue: 13200, spend: 8800, profit: 4400, roi: 150 },
    { date: '2024-01-03', revenue: 11800, spend: 7900, profit: 3900, roi: 149 },
    { date: '2024-01-04', revenue: 14100, spend: 9200, profit: 4900, roi: 153 },
    { date: '2024-01-05', revenue: 13600, spend: 8600, profit: 5000, roi: 158 },
    { date: '2024-01-06', revenue: 15200, spend: 9800, profit: 5400, roi: 155 },
    { date: '2024-01-07', revenue: 16800, spend: 10200, profit: 6600, roi: 165 },
  ];

  const revenueBySource = [
    { name: 'Facebook Ads', value: 45, color: '#1877F2', revenue: 35400 },
    { name: 'Google Ads', value: 35, color: '#4285F4', revenue: 27500 },
    { name: 'TikTok Ads', value: 20, color: '#000000', revenue: 15700 },
  ];

  const monthlyRevenue = [
    { month: 'Jan', revenue: 78950, spend: 45280, profit: 33670 },
    { month: 'Feb', revenue: 82400, spend: 47200, profit: 35200 },
    { month: 'Mar', revenue: 89100, spend: 51800, profit: 37300 },
    { month: 'Apr', revenue: 91200, spend: 52400, profit: 38800 },
    { month: 'May', revenue: 95600, spend: 54200, profit: 41400 },
    { month: 'Jun', revenue: 102400, spend: 58100, profit: 44300 },
  ];

  const metrics = [
    { 
      title: 'Total Revenue', 
      value: '$539.6K', 
      change: '+22.4%', 
      icon: DollarSign, 
      trend: 'up' as const,
      color: 'text-green-400'
    },
    { 
      title: 'Total Profit', 
      value: '$230.6K', 
      change: '+18.7%', 
      icon: TrendingUp, 
      trend: 'up' as const,
      color: 'text-blue-400'
    },
    { 
      title: 'Average ROI', 
      value: '174%', 
      change: '+3.2%', 
      icon: Target, 
      trend: 'up' as const,
      color: 'text-purple-400'
    },
    { 
      title: 'Profit Margin', 
      value: '42.7%', 
      change: '+1.8%', 
      icon: Calculator, 
      trend: 'up' as const,
      color: 'text-yellow-400'
    },
  ];

  return (
    <Layout>
      <div className="p-6 space-y-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Revenue</h1>
            <p className="text-slate-400">Track revenue, profit, and financial performance metrics</p>
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
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <Card key={metric.title} className="bg-slate-900/50 border-slate-700 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm mb-1">{metric.title}</p>
                    <p className="text-2xl font-bold text-white">{metric.value}</p>
                    <div className="flex items-center mt-2">
                      {metric.trend === 'up' ? 
                        <TrendingUp className="w-4 h-4 text-green-400 mr-1" /> : 
                        <TrendingDown className="w-4 h-4 text-red-400 mr-1" />
                      }
                      <span className={`text-sm ${metric.trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
                        {metric.change}
                      </span>
                    </div>
                  </div>
                  <div className={`p-3 rounded-lg bg-slate-800/50`}>
                    <metric.icon className={`w-6 h-6 ${metric.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Revenue Analysis */}
        <Tabs defaultValue="trends" className="space-y-6">
          <TabsList className="bg-slate-800/50 border-slate-600">
            <TabsTrigger value="trends" className="data-[state=active]:bg-slate-700">Revenue Trends</TabsTrigger>
            <TabsTrigger value="sources" className="data-[state=active]:bg-slate-700">Revenue by Source</TabsTrigger>
            <TabsTrigger value="monthly" className="data-[state=active]:bg-slate-700">Monthly Overview</TabsTrigger>
          </TabsList>

          <TabsContent value="trends" className="space-y-6">
            <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Revenue vs Spend vs Profit
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="date" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '0.5rem'
                        }} 
                      />
                      <Line type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={3} name="Revenue" />
                      <Line type="monotone" dataKey="spend" stroke="#EF4444" strokeWidth={2} name="Spend" />
                      <Line type="monotone" dataKey="profit" stroke="#3B82F6" strokeWidth={2} name="Profit" />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sources" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    Revenue Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <RechartsPieChart data={revenueBySource} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                          {revenueBySource.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </RechartsPieChart>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-white">Revenue by Source</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {revenueBySource.map((source) => (
                    <div key={source.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: source.color }}
                        />
                        <span className="text-slate-200">{source.name}</span>
                      </div>
                      <div className="text-right">
                        <div className="text-white font-semibold">${source.revenue.toLocaleString()}</div>
                        <div className="text-slate-400 text-sm">{source.value}%</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="monthly" className="space-y-6">
            <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white">Monthly Revenue Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyRevenue}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                      <XAxis dataKey="month" stroke="#9CA3AF" />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#1F2937', 
                          border: '1px solid #374151',
                          borderRadius: '0.5rem'
                        }} 
                      />
                      <Bar dataKey="revenue" fill="#10B981" name="Revenue" />
                      <Bar dataKey="spend" fill="#EF4444" name="Spend" />
                      <Bar dataKey="profit" fill="#3B82F6" name="Profit" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Revenue;
