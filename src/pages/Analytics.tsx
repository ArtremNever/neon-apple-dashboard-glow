
import { Layout } from '@/components/Layout';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { DateRangePicker } from '@/components/DateRangePicker';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  Target, 
  DollarSign,
  Users,
  MousePointer,
  Eye,
  Filter,
  Download
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell } from 'recharts';

const Analytics = () => {
  const [dateRange, setDateRange] = useState({ 
    from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), 
    to: new Date() 
  });

  // Mock data for charts
  const performanceData = [
    { date: '2024-01-01', impressions: 125000, clicks: 2400, conversions: 156, spend: 3200 },
    { date: '2024-01-02', impressions: 135000, clicks: 2600, conversions: 168, spend: 3400 },
    { date: '2024-01-03', impressions: 128000, clicks: 2300, conversions: 142, spend: 3100 },
    { date: '2024-01-04', impressions: 142000, clicks: 2800, conversions: 184, spend: 3600 },
    { date: '2024-01-05', impressions: 138000, clicks: 2700, conversions: 176, spend: 3500 },
    { date: '2024-01-06', impressions: 145000, clicks: 2900, conversions: 192, spend: 3700 },
    { date: '2024-01-07', impressions: 152000, clicks: 3100, conversions: 208, spend: 3900 },
  ];

  const platformData = [
    { name: 'Facebook', value: 45, color: '#1877F2' },
    { name: 'Google', value: 35, color: '#4285F4' },
    { name: 'TikTok', value: 20, color: '#000000' },
  ];

  const campaignPerformance = [
    { name: 'Summer Sale Campaign', impressions: 125000, clicks: 2400, conversions: 156, ctr: 1.92, cpa: 20.51, status: 'active' },
    { name: 'Mobile App Install Q4', impressions: 89000, clicks: 1890, conversions: 245, ctr: 2.12, cpa: 24.90, status: 'active' },
    { name: 'Brand Awareness Campaign', impressions: 45000, clicks: 890, conversions: 34, ctr: 1.98, cpa: 35.29, status: 'paused' },
  ];

  const metrics = [
    { 
      title: 'Total Impressions', 
      value: '1.2M', 
      change: '+15.3%', 
      icon: Eye, 
      trend: 'up' as const,
      color: 'text-blue-400'
    },
    { 
      title: 'Total Clicks', 
      value: '18.4K', 
      change: '+12.8%', 
      icon: MousePointer, 
      trend: 'up' as const,
      color: 'text-green-400'
    },
    { 
      title: 'Conversions', 
      value: '1,203', 
      change: '+18.7%', 
      icon: Target, 
      trend: 'up' as const,
      color: 'text-purple-400'
    },
    { 
      title: 'Total Spend', 
      value: '$24.8K', 
      change: '+8.2%', 
      icon: DollarSign, 
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
            <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
            <p className="text-slate-400">Comprehensive campaign performance insights and metrics</p>
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

        {/* Charts Section */}
        <Tabs defaultValue="performance" className="space-y-6">
          <TabsList className="bg-slate-800/50 border-slate-600">
            <TabsTrigger value="performance" className="data-[state=active]:bg-slate-700">Performance Trends</TabsTrigger>
            <TabsTrigger value="platforms" className="data-[state=active]:bg-slate-700">Platform Distribution</TabsTrigger>
            <TabsTrigger value="campaigns" className="data-[state=active]:bg-slate-700">Campaign Comparison</TabsTrigger>
          </TabsList>

          <TabsContent value="performance" className="space-y-6">
            <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Performance Over Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
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
                      <Line type="monotone" dataKey="impressions" stroke="#3B82F6" strokeWidth={2} />
                      <Line type="monotone" dataKey="clicks" stroke="#10B981" strokeWidth={2} />
                      <Line type="monotone" dataKey="conversions" stroke="#8B5CF6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="platforms" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-xl">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <PieChart className="w-5 h-5" />
                    Platform Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <RechartsPieChart data={platformData} cx="50%" cy="50%" outerRadius={80} dataKey="value">
                          {platformData.map((entry, index) => (
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
                  <CardTitle className="text-white">Platform Performance</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {platformData.map((platform) => (
                    <div key={platform.name} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: platform.color }}
                        />
                        <span className="text-slate-200">{platform.name}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-white font-semibold">{platform.value}%</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="campaigns" className="space-y-6">
            <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white">Campaign Performance Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-slate-700">
                        <th className="text-left py-3 px-4 text-slate-400 font-medium">Campaign</th>
                        <th className="text-right py-3 px-4 text-slate-400 font-medium">Impressions</th>
                        <th className="text-right py-3 px-4 text-slate-400 font-medium">Clicks</th>
                        <th className="text-right py-3 px-4 text-slate-400 font-medium">CTR</th>
                        <th className="text-right py-3 px-4 text-slate-400 font-medium">Conversions</th>
                        <th className="text-right py-3 px-4 text-slate-400 font-medium">CPA</th>
                        <th className="text-center py-3 px-4 text-slate-400 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {campaignPerformance.map((campaign) => (
                        <tr key={campaign.name} className="border-b border-slate-800 hover:bg-slate-800/30">
                          <td className="py-4 px-4">
                            <span className="text-white font-medium">{campaign.name}</span>
                          </td>
                          <td className="py-4 px-4 text-right text-slate-300">
                            {campaign.impressions.toLocaleString()}
                          </td>
                          <td className="py-4 px-4 text-right text-slate-300">
                            {campaign.clicks.toLocaleString()}
                          </td>
                          <td className="py-4 px-4 text-right text-slate-300">
                            {campaign.ctr}%
                          </td>
                          <td className="py-4 px-4 text-right text-slate-300">
                            {campaign.conversions}
                          </td>
                          <td className="py-4 px-4 text-right text-slate-300">
                            ${campaign.cpa}
                          </td>
                          <td className="py-4 px-4 text-center">
                            <Badge 
                              variant={campaign.status === 'active' ? 'default' : 'secondary'}
                              className={campaign.status === 'active' ? 'bg-green-600' : 'bg-yellow-600'}
                            >
                              {campaign.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Analytics;
