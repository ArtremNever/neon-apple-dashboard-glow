
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { EnhancedMetricCard } from '@/components/EnhancedMetricCard';
import { EnhancedChart } from '@/components/EnhancedChart';
import { EnhancedActivityFeed } from '@/components/EnhancedActivityFeed';
import { DollarSign, Users, TrendingUp, Zap, BarChart3, Activity } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <Header />
        
        {/* Dashboard Content */}
        <main className="flex-1 p-8 space-y-8 overflow-y-auto">
          {/* Hero Section */}
          <div className="relative mb-12">
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-emerald-500/10 to-green-500/5 rounded-3xl blur-3xl"></div>
            
            <div className="relative bg-gradient-to-br from-card via-card/95 to-card/90 backdrop-blur-xl border border-green-500/20 rounded-3xl p-8 shadow-2xl shadow-green-500/10">
              <div className="flex items-center justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500/20 rounded-xl border border-green-500/30">
                      <BarChart3 className="w-6 h-6 text-green-400" />
                    </div>
                    <h1 className="text-4xl font-light text-foreground">
                      Analytics Hub
                    </h1>
                  </div>
                  <p className="text-xl text-muted-foreground/80 max-w-2xl">
                    Comprehensive overview of your business performance with real-time insights and actionable metrics
                  </p>
                  <div className="flex items-center gap-6 pt-4">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-green-400 font-medium">Live Data</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-muted-foreground">Updated 2 min ago</span>
                    </div>
                  </div>
                </div>
                
                {/* Floating metrics preview */}
                <div className="hidden lg:flex flex-col gap-4">
                  <div className="bg-green-500/10 border border-green-500/30 rounded-2xl p-4 backdrop-blur-sm">
                    <div className="text-2xl font-bold text-green-400">+12.5%</div>
                    <div className="text-sm text-muted-foreground">Growth</div>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-2xl p-4 backdrop-blur-sm">
                    <div className="text-2xl font-bold text-blue-400">8.5K</div>
                    <div className="text-sm text-muted-foreground">Users</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <EnhancedMetricCard
              title="Revenue"
              value="$124,500"
              change="+12.5%"
              icon={DollarSign}
              trend="up"
              delay={0}
              gradient="from-green-500/20 via-emerald-500/15 to-green-400/10"
            />
            <EnhancedMetricCard
              title="Users"
              value="8,549"
              change="+5.2%"
              icon={Users}
              trend="up"
              delay={0.1}
              gradient="from-blue-500/20 via-cyan-500/15 to-blue-400/10"
            />
            <EnhancedMetricCard
              title="Growth"
              value="23.1%"
              change="+8.1%"
              icon={TrendingUp}
              trend="up"
              delay={0.2}
              gradient="from-purple-500/20 via-violet-500/15 to-purple-400/10"
            />
            <EnhancedMetricCard
              title="Performance"
              value="94.2%"
              change="-2.1%"
              icon={Zap}
              trend="down"
              delay={0.3}
              gradient="from-orange-500/20 via-amber-500/15 to-yellow-400/10"
            />
          </div>

          {/* Charts and Activity Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <EnhancedChart />
            </div>
            <div>
              <EnhancedActivityFeed />
            </div>
          </div>

          {/* Bottom Stats with Glass Effect */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-2xl blur-sm opacity-75 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative bg-card/80 backdrop-blur-xl border border-green-500/20 rounded-2xl p-8 hover:border-green-500/40 transition-all duration-500">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <BarChart3 className="w-5 h-5 text-green-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Performance Metrics</h3>
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between items-center py-3 border-b border-border/50">
                    <span className="text-muted-foreground">Conversion Rate</span>
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-2 bg-green-500/20 rounded-full overflow-hidden">
                        <div className="w-3/5 h-full bg-green-500 rounded-full"></div>
                      </div>
                      <span className="text-foreground font-semibold min-w-[3rem]">4.2%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border/50">
                    <span className="text-muted-foreground">Bounce Rate</span>
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-2 bg-orange-500/20 rounded-full overflow-hidden">
                        <div className="w-1/3 h-full bg-orange-500 rounded-full"></div>
                      </div>
                      <span className="text-foreground font-semibold min-w-[3rem]">32.1%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-muted-foreground">Session Time</span>
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-2 bg-blue-500/20 rounded-full overflow-hidden">
                        <div className="w-4/5 h-full bg-blue-500 rounded-full"></div>
                      </div>
                      <span className="text-foreground font-semibold min-w-[3rem]">4m 32s</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl blur-sm opacity-75 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative bg-card/80 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-8 hover:border-blue-500/40 transition-all duration-500">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-500/20 rounded-lg">
                    <Activity className="w-5 h-5 text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">System Health</h3>
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between items-center py-3 border-b border-border/50">
                    <span className="text-muted-foreground">API Status</span>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-50"></div>
                      </div>
                      <span className="text-sm text-green-400 font-medium">Online</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-border/50">
                    <span className="text-muted-foreground">Database</span>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div className="absolute inset-0 w-3 h-3 bg-green-500 rounded-full animate-ping opacity-50"></div>
                      </div>
                      <span className="text-sm text-green-400 font-medium">Healthy</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-3">
                    <span className="text-muted-foreground">CDN</span>
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-yellow-400 font-medium">Warning</span>
                    </div>
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
