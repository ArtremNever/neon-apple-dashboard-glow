
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { MetricCard } from '@/components/MetricCard';
import { Chart } from '@/components/Chart';
import { ActivityFeed } from '@/components/ActivityFeed';
import { DollarSign, Users, TrendingUp, Zap } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />
        
        {/* Dashboard Content */}
        <main className="flex-1 p-6 space-y-6">
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Total Revenue"
              value="$124,500"
              change="+12.5%"
              icon={DollarSign}
              trend="up"
              delay={0.1}
            />
            <MetricCard
              title="Active Users"
              value="8,549"
              change="+5.2%"
              icon={Users}
              trend="up"
              delay={0.2}
            />
            <MetricCard
              title="Growth Rate"
              value="23.1%"
              change="+8.1%"
              icon={TrendingUp}
              trend="up"
              delay={0.3}
            />
            <MetricCard
              title="Performance"
              value="94.2%"
              change="-2.1%"
              icon={Zap}
              trend="down"
              delay={0.4}
            />
          </div>

          {/* Charts and Activity */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Chart />
            </div>
            <div>
              <ActivityFeed />
            </div>
          </div>

          {/* Additional Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-card p-6 animate-fade-in-up animate-delay-500 border-border/50">
              <h3 className="text-lg font-semibold mb-4 text-foreground">Quick Stats</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Conversion Rate</span>
                  <span className="text-neon-green font-medium">4.2%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Bounce Rate</span>
                  <span className="text-foreground font-medium">32.1%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Session Duration</span>
                  <span className="text-foreground font-medium">4m 32s</span>
                </div>
              </div>
            </div>

            <div className="glass-card p-6 animate-fade-in-up animate-delay-600 border-border/50">
              <h3 className="text-lg font-semibold mb-4 text-foreground">System Status</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">API Status</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                    <span className="text-neon-green text-sm">Online</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Database</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                    <span className="text-neon-green text-sm">Healthy</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">CDN</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                    <span className="text-yellow-400 text-sm">Warning</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Index;
