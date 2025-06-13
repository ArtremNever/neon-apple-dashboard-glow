
import { Layout } from '@/components/Layout';
import { useState, useEffect } from 'react';
import { TrendingUp, Users, Activity, Target, Zap, ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ModernMetricCard } from '@/components/ModernMetricCard';

const Index = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  // Sample sparkline data
  const generateSparklineData = (trend: 'up' | 'down') => {
    const baseValues = [45, 52, 48, 55, 51, 58, 62, 59, 65, 61, 68, 72];
    if (trend === 'down') {
      return baseValues.map((value, index) => ({ value: 80 - value + index * 2 }));
    }
    return baseValues.map(value => ({ value }));
  };

  const metrics = [
    {
      title: "Active Users",
      value: "8,549",
      change: "+5.2%",
      trend: "up" as const,
      icon: Users,
      sparklineData: generateSparklineData('up'),
    },
    {
      title: "Live Campaigns",
      value: 42,
      change: "+12.5%",
      trend: "up" as const,
      icon: Target,
      sparklineData: generateSparklineData('up'),
    },
    {
      title: "Monthly Revenue",
      value: "$124.5K",
      change: "+8.1%",
      trend: "up" as const,
      icon: TrendingUp,
      sparklineData: generateSparklineData('up'),
    },
    {
      title: "Performance Score",
      value: "94.2%",
      change: "-2.1%",
      trend: "down" as const,
      icon: Activity,
      sparklineData: generateSparklineData('down'),
    }
  ];

  const recentActivity = [
    {
      user: "Alex Thompson",
      action: "completed project milestone",
      time: "2 minutes ago",
      type: "success" as const
    },
    {
      user: "Sarah Chen",
      action: "updated campaign settings",
      time: "5 minutes ago",
      type: "info" as const
    },
    {
      user: "Mike Johnson",
      action: "created new adset",
      time: "12 minutes ago",
      type: "success" as const
    },
    {
      user: "Emma Wilson",
      action: "paused underperforming campaign",
      time: "18 minutes ago",
      type: "warning" as const
    }
  ];

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900/95 to-gray-950 overflow-auto">
        {/* Main content with proper spacing */}
        <div className="p-8 space-y-8">
          {/* Header Section - Modern typography */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center backdrop-blur-sm">
                    <Target className="w-6 h-6 text-primary-400" />
                  </div>
                  <div>
                    <h1 className="text-4xl font-semibold text-white tracking-tight">
                      Analytics Hub
                    </h1>
                    <p className="text-gray-400 text-lg font-normal">
                      Real-time insights and performance metrics
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Live indicator */}
              <div className="flex items-center space-x-3 px-4 py-2 bg-white/[0.08] rounded-xl border border-white/[0.12] backdrop-blur-md">
                <div className="relative">
                  <div className="w-2 h-2 bg-success-400 rounded-full animate-pulse" />
                  <div className="absolute inset-0 w-2 h-2 bg-success-400 rounded-full animate-ping opacity-75" />
                </div>
                <span className="text-sm font-medium text-gray-300">Live Data</span>
              </div>
            </div>
          </div>

          {/* Time Card - Glassmorphism */}
          <Card className="bg-white/[0.08] border-0 backdrop-blur-md hover:bg-white/[0.12] transition-all duration-250">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-3 text-primary-400">
                <div className="p-2 bg-primary-500/10 rounded-lg">
                  <Zap className="w-5 h-5" />
                </div>
                <span className="text-lg font-medium">Current Time</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p className="text-4xl font-semibold text-white font-mono tracking-wider">
                  {formattedTime}
                </p>
                <p className="text-sm text-gray-400">
                  Updated in real-time • {currentTime.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Metrics Grid - 8pt grid system */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, index) => (
              <ModernMetricCard
                key={metric.title}
                {...metric}
                delay={index * 100}
              />
            ))}
          </div>

          {/* Recent Activity - Modern card design */}
          <Card className="bg-white/[0.08] border-0 backdrop-blur-md hover:bg-white/[0.12] transition-all duration-250">
            <CardHeader className="pb-6">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-3 text-primary-400">
                  <div className="p-2 bg-primary-500/10 rounded-lg">
                    <Activity className="w-5 h-5" />
                  </div>
                  <span className="text-xl font-medium">Live Activity</span>
                </CardTitle>
                <button className="flex items-center space-x-2 text-sm text-gray-400 hover:text-primary-400 transition-colors duration-250 group">
                  <span>View all</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-250" />
                </button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div 
                    key={index} 
                    className="flex items-center space-x-4 p-4 bg-white/[0.04] rounded-xl border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.12] transition-all duration-250 group animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className={`
                      w-10 h-10 rounded-xl flex items-center justify-center text-sm font-semibold transition-all duration-250 group-hover:scale-110
                      ${activity.type === 'success' ? 'bg-success-500/10 text-success-400 border border-success-500/20' :
                        activity.type === 'warning' ? 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20' :
                        'bg-primary-500/10 text-primary-400 border border-primary-500/20'
                      }
                    `}>
                      {activity.user.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium">
                        <span className="text-primary-400">{activity.user}</span>{' '}
                        <span className="font-normal">{activity.action}</span>
                      </p>
                      <p className="text-sm text-gray-400">{activity.time}</p>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-250">
                      <ArrowUpRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
