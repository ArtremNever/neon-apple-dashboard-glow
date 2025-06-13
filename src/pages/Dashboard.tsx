
import { Layout } from '@/components/Layout';
import { useState } from 'react';
import { ModernMetricCard } from '@/components/ModernMetricCard';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Filter, AlertTriangle, TrendingUp, Users, DollarSign, Target, BarChart, Sparkles, ArrowUpRight } from 'lucide-react';
import { DateRangePicker } from '@/components/DateRangePicker';
import { AIInsightsTable } from '@/components/dashboard/AIInsightsTable';

const Dashboard = () => {
  const [dateRange, setDateRange] = useState({ from: new Date(), to: new Date() });

  // Enhanced sparkline data generator
  const generateSparklineData = (trend: 'up' | 'down', volatility: number = 5) => {
    const baseValues = Array.from({ length: 12 }, (_, i) => {
      const base = trend === 'up' ? 45 + i * 2 : 70 - i * 1.5;
      const noise = (Math.random() - 0.5) * volatility;
      return { value: Math.max(0, base + noise) };
    });
    return baseValues;
  };

  // Enhanced metrics with sparkline data
  const metrics = [
    { 
      title: 'Active Clients', 
      value: '24', 
      change: '+12%', 
      icon: Users, 
      trend: 'up' as const,
      sparklineData: generateSparklineData('up', 3)
    },
    { 
      title: 'Active Campaigns', 
      value: '156', 
      change: '+8%', 
      icon: Target, 
      trend: 'up' as const,
      sparklineData: generateSparklineData('up', 4)
    },
    { 
      title: 'Spend', 
      value: '$45,280', 
      change: '+15%', 
      icon: DollarSign, 
      trend: 'up' as const,
      sparklineData: generateSparklineData('up', 6)
    },
    { 
      title: 'Revenue', 
      value: '$78,950', 
      change: '+22%', 
      icon: TrendingUp, 
      trend: 'up' as const,
      sparklineData: generateSparklineData('up', 8)
    },
    { 
      title: 'Profit', 
      value: '$33,670', 
      change: '+18%', 
      icon: BarChart, 
      trend: 'up' as const,
      sparklineData: generateSparklineData('up', 5)
    },
    { 
      title: 'ROI', 
      value: '174%', 
      change: '+3%', 
      icon: TrendingUp, 
      trend: 'up' as const,
      sparklineData: generateSparklineData('up', 2)
    },
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900/95 to-slate-950 overflow-auto">
        {/* Animated background elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/3 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-purple-500/2 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-3/4 w-64 h-64 bg-emerald-500/2 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        </div>

        {/* Main content */}
        <div className="relative z-10 p-8 space-y-8">
          {/* Enhanced header with glassmorphism */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-2xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center backdrop-blur-sm shadow-lg shadow-primary-500/10 animate-pulse-glow">
                    <Sparkles className="w-8 h-8 text-primary-400" />
                  </div>
                  <div>
                    <h1 className="text-5xl font-semibold text-white tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent animate-fade-in">
                      Dashboard
                    </h1>
                    <p className="text-slate-400 text-xl font-normal mt-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                      Мониторинг производительности кампаний и AI-инсайтов
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Enhanced action buttons */}
              <div className="flex items-center gap-4 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                <DateRangePicker 
                  dateRange={dateRange} 
                  onDateRangeChange={setDateRange} 
                />
                <Button 
                  variant="outline" 
                  className="bg-white/[0.08] border-white/[0.12] text-slate-300 hover:bg-white/[0.12] hover:border-primary-500/30 hover:text-primary-400 backdrop-blur-md transition-all duration-250 hover:scale-105 hover:shadow-lg hover:shadow-primary-500/20"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Фильтры
                </Button>
              </div>
            </div>
          </div>

          {/* Enhanced metrics grid with staggered animations */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
            {metrics.map((metric, index) => (
              <ModernMetricCard
                key={metric.title}
                title={metric.title}
                value={metric.value}
                change={metric.change}
                icon={metric.icon}
                trend={metric.trend}
                sparklineData={metric.sparklineData}
                delay={index * 100}
              />
            ))}
          </div>

          {/* Enhanced AI Insights section */}
          <Card className="group relative overflow-hidden border-0 bg-white/[0.08] backdrop-blur-md hover:bg-white/[0.12] transition-all duration-250 animate-fade-in-up">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-250" />
            
            <CardHeader className="relative z-10">
              <div className="flex items-center justify-between">
                <CardTitle className="text-white flex items-center gap-3">
                  <div className="p-3 bg-yellow-500/10 rounded-xl border border-yellow-500/20 shadow-lg shadow-yellow-500/10">
                    <AlertTriangle className="w-6 h-6 text-yellow-400" />
                  </div>
                  <div>
                    <span className="text-2xl font-semibold">AI Инсайты и Рекомендации</span>
                    <p className="text-sm text-slate-400 font-normal mt-1">Автоматический анализ и предложения по оптимизации</p>
                  </div>
                </CardTitle>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="bg-white/[0.08] border-white/[0.12] text-slate-300 hover:bg-white/[0.12] hover:border-primary-500/30 hover:text-primary-400 backdrop-blur-md transition-all duration-250 hover:scale-105 group"
                >
                  Показать все
                  <ArrowUpRight className="w-4 h-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-250" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <AIInsightsTable />
            </CardContent>
            
            {/* Hover glow effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-250 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-transparent to-transparent" />
            </div>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
