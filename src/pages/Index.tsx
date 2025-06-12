
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
        <main className="flex-1 p-8 space-y-8">
          {/* Simple Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-light text-foreground mb-2">
              Dashboard
            </h1>
            <p className="text-muted-foreground">
              Overview of your performance
            </p>
          </div>

          {/* Clean Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <MetricCard
              title="Revenue"
              value="$124,500"
              change="+12.5%"
              icon={DollarSign}
              trend="up"
              delay={0}
            />
            <MetricCard
              title="Users"
              value="8,549"
              change="+5.2%"
              icon={Users}
              trend="up"
              delay={0.1}
            />
            <MetricCard
              title="Growth"
              value="23.1%"
              change="+8.1%"
              icon={TrendingUp}
              trend="up"
              delay={0.2}
            />
            <MetricCard
              title="Performance"
              value="94.2%"
              change="-2.1%"
              icon={Zap}
              trend="down"
              delay={0.3}
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Chart />
            </div>
            <div>
              <ActivityFeed />
            </div>
          </div>

          {/* Additional Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4 text-foreground">
                Quick Stats
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground text-sm">Conversion Rate</span>
                  <span className="text-foreground font-medium">4.2%</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground text-sm">Bounce Rate</span>
                  <span className="text-foreground font-medium">32.1%</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground text-sm">Session Time</span>
                  <span className="text-foreground font-medium">4m 32s</span>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-medium mb-4 text-foreground">
                System Status
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground text-sm">API Status</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-foreground">Online</span>
                  </div>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground text-sm">Database</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-foreground">Healthy</span>
                  </div>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-muted-foreground text-sm">CDN</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-foreground">Warning</span>
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
