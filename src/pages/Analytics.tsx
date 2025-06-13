
import { Layout } from '@/components/Layout';
import { useState } from 'react';
import { EnhancedSourceMetricCard } from '@/components/EnhancedSourceMetricCard';
import { AnalyticsHeader } from '@/components/analytics/AnalyticsHeader';
import { AnalyticsTabs } from '@/components/analytics/AnalyticsTabs';
import { PerformanceChart } from '@/components/analytics/PerformanceChart';
import { AnalyticsTable } from '@/components/analytics/AnalyticsTable';
import { 
  Eye, 
  MousePointer, 
  Target, 
  DollarSign,
  TrendingUp
} from 'lucide-react';

const Analytics = () => {
  const [dateRange, setDateRange] = useState({ 
    from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), 
    to: new Date() 
  });
  const [activeTab, setActiveTab] = useState('overview');
  const [activeFilters, setActiveFilters] = useState(0);

  // Mock data for performance chart
  const performanceData = [
    { date: '2024-01-01', impressions: 125000, clicks: 2400, conversions: 156, revenue: 3200 },
    { date: '2024-01-02', impressions: 135000, clicks: 2600, conversions: 168, revenue: 3400 },
    { date: '2024-01-03', impressions: 128000, clicks: 2300, conversions: 142, revenue: 3100 },
    { date: '2024-01-04', impressions: 142000, clicks: 2800, conversions: 184, revenue: 3600 },
    { date: '2024-01-05', impressions: 138000, clicks: 2700, conversions: 176, revenue: 3500 },
    { date: '2024-01-06', impressions: 145000, clicks: 2900, conversions: 192, revenue: 3700 },
    { date: '2024-01-07', impressions: 152000, clicks: 3100, conversions: 208, revenue: 3900 },
  ];

  // Mock data for analytics table
  const tableData = [
    {
      id: '1',
      mediaSource: 'mintegral_int',
      total: 4854,
      installs: 2400,
      revenue: 15600,
      ctr: 1.92,
      status: 'active' as const,
      campaigns: [
        { id: '1-1', name: 'Summer Sale Campaign', installs: 1200, revenue: 8900, ctr: 2.1 },
        { id: '1-2', name: 'Mobile App Install Q4', installs: 1200, revenue: 6700, ctr: 1.8 }
      ]
    },
    {
      id: '2',
      mediaSource: 'facebook_int',
      total: 3421,
      installs: 1890,
      revenue: 12340,
      ctr: 2.12,
      status: '**' as const,
      campaigns: [
        { id: '2-1', name: 'Brand Awareness Campaign', installs: 890, revenue: 6200, ctr: 2.3 }
      ]
    },
    {
      id: '3',
      mediaSource: 'google_int',
      total: 2156,
      installs: 1456,
      revenue: 8900,
      ctr: 1.87,
      status: 'active' as const
    }
  ];

  // KPI metrics data
  const metrics = [
    { 
      title: 'Total Impressions', 
      value: '1.2M', 
      icon: Eye, 
      status: 'success' as const,
      subText: '+15.3% vs last period',
      trend: '+15.3%',
      miniChartData: [
        { value: 125 }, { value: 135 }, { value: 128 }, { value: 142 }, 
        { value: 138 }, { value: 145 }, { value: 152 }
      ]
    },
    { 
      title: 'Total Clicks', 
      value: '18.4K', 
      icon: MousePointer, 
      status: 'success' as const,
      subText: '+12.8% vs last period',
      trend: '+12.8%',
      miniChartData: [
        { value: 24 }, { value: 26 }, { value: 23 }, { value: 28 }, 
        { value: 27 }, { value: 29 }, { value: 31 }
      ]
    },
    { 
      title: 'Conversions', 
      value: '1,203', 
      icon: Target, 
      status: 'success' as const,
      subText: '+18.7% vs last period',
      trend: '+18.7%',
      miniChartData: [
        { value: 156 }, { value: 168 }, { value: 142 }, { value: 184 }, 
        { value: 176 }, { value: 192 }, { value: 208 }
      ]
    },
    { 
      title: 'Total Revenue', 
      value: '$24.8K', 
      icon: DollarSign, 
      status: 'warning' as const,
      subText: '+8.2% vs last period',
      trend: '+8.2%',
      miniChartData: [
        { value: 32 }, { value: 34 }, { value: 31 }, { value: 36 }, 
        { value: 35 }, { value: 37 }, { value: 39 }
      ]
    }
  ];

  const handleFiltersClick = () => {
    console.log('Filters clicked');
    // TODO: Implement filter panel
  };

  const handleExportClick = () => {
    console.log('Export clicked');
    // TODO: Implement export functionality
  };

  const handleTableSettingsClick = () => {
    console.log('Table settings clicked');
    // TODO: Implement table settings modal
  };

  return (
    <Layout>
      <div className="p-6 space-y-8 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen">
        {/* Header */}
        <AnalyticsHeader
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          activeFiltersCount={activeFilters}
          onFiltersClick={handleFiltersClick}
          onExportClick={handleExportClick}
        />

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => (
            <EnhancedSourceMetricCard
              key={metric.title}
              title={metric.title}
              value={metric.value}
              icon={metric.icon}
              status={metric.status}
              subText={metric.subText}
              trend={metric.trend}
              miniChartData={metric.miniChartData}
              delay={index * 100}
            />
          ))}
        </div>

        {/* Navigation Tabs */}
        <AnalyticsTabs 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />

        {/* Main Content Area */}
        <div className="space-y-8">
          {/* Performance Chart */}
          <PerformanceChart data={performanceData} />
          
          {/* Analytics Table */}
          <AnalyticsTable 
            data={tableData} 
            onSettingsClick={handleTableSettingsClick}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Analytics;
