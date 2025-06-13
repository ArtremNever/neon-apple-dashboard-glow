import { Layout } from '@/components/Layout';
import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Users, Activity, Target, Zap, ArrowUp, ArrowDown } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString();

  const metrics = [
    {
      title: "Total Users",
      value: "8,549",
      change: "+5.2%",
      trend: "up",
      icon: Users,
      color: "blue"
    },
    {
      title: "Campaigns Active",
      value: "42",
      change: "+12.5%",
      trend: "up",
      icon: Target,
      color: "green"
    },
    {
      title: "Revenue",
      value: "$124,500",
      change: "+8.1%",
      trend: "up",
      icon: TrendingUp,
      color: "green"
    },
    {
      title: "Performance",
      value: "94.2%",
      change: "-2.1%",
      trend: "down",
      icon: Activity,
      color: "orange"
    }
  ];

  const recentActivity = [
    {
      user: "Alex Thompson",
      action: "completed project milestone",
      time: "2 minutes ago",
      type: "success"
    },
    {
      user: "Sarah Chen",
      action: "updated campaign settings",
      time: "5 minutes ago",
      type: "info"
    },
    {
      user: "Mike Johnson",
      action: "created new adset",
      time: "12 minutes ago",
      type: "success"
    },
    {
      user: "Emma Wilson",
      action: "paused underperforming campaign",
      time: "18 minutes ago",
      type: "warning"
    }
  ];

  return (
    <Layout>
      <div className="h-full p-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-auto">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-green-500/20 to-emerald-500/20 flex items-center justify-center border border-green-500/30">
              <BarChart3 className="w-5 h-5 text-green-400" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
              Analytics Hub
            </h1>
            <div className="ml-auto flex items-center gap-2 px-3 py-1.5 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-green-400 font-medium">Live Data</span>
            </div>
          </div>
          <p className="text-slate-400">
            Comprehensive overview of your business performance with real-time insights and actionable metrics
          </p>
        </div>

        {/* Time Card */}
        <Card className="mb-6 bg-gradient-to-r from-slate-800/50 to-slate-700/50 border-green-500/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <Zap className="w-5 h-5" />
              Current Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-mono font-bold text-green-400">{formattedTime}</p>
            <p className="text-sm text-slate-400 mt-1">Updated in real-time</p>
          </CardContent>
        </Card>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            const isPositive = metric.trend === 'up';
            
            return (
              <Card key={index} className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-green-500/20 backdrop-blur-sm hover:bg-slate-800/70 transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium text-slate-300 uppercase tracking-wide">
                      {metric.title}
                    </CardTitle>
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      metric.color === 'green' ? 'bg-green-500/20 text-green-400' :
                      metric.color === 'blue' ? 'bg-blue-500/20 text-blue-400' :
                      'bg-orange-500/20 text-orange-400'
                    }`}>
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold text-white">{metric.value}</p>
                    <div className="flex items-center gap-1">
                      {isPositive ? (
                        <ArrowUp className="w-3 h-3 text-green-400" />
                      ) : (
                        <ArrowDown className="w-3 h-3 text-red-400" />
                      )}
                      <span className={`text-xs font-medium ${
                        isPositive ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {metric.change}
                      </span>
                      <span className="text-xs text-slate-500">vs last month</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Recent Activity */}
        <Card className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border-green-500/20 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <Activity className="w-5 h-5" />
              Live Activity
              <span className="ml-auto text-xs text-slate-400">Recent team updates</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/40 border border-slate-700/50">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                    activity.type === 'success' ? 'bg-green-500/20 text-green-400' :
                    activity.type === 'warning' ? 'bg-orange-500/20 text-orange-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {activity.user.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-200">
                      <span className="font-medium text-green-400">{activity.user}</span>{' '}
                      {activity.action}
                    </p>
                    <p className="text-xs text-slate-400">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Index;
