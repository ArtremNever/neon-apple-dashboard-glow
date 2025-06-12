
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { EnhancedMetricCard } from '@/components/EnhancedMetricCard';
import { Chart } from '@/components/Chart';
import { ActivityFeed } from '@/components/ActivityFeed';
import { ParticleBackground } from '@/components/ParticleBackground';
import { WaveAnimation } from '@/components/WaveAnimation';
import { DollarSign, Users, TrendingUp, Zap, Sparkles, Rocket } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-background flex relative overflow-hidden">
      {/* Animated particle background */}
      <ParticleBackground />
      
      {/* Wave animation at bottom */}
      <WaveAnimation />
      
      {/* Sidebar */}
      <Sidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col relative z-10">
        {/* Header */}
        <Header />
        
        {/* Dashboard Content */}
        <main className="flex-1 p-6 space-y-8 relative">
          {/* Hero Section with floating elements */}
          <div className="relative mb-8">
            <div className="text-center space-y-4 py-8">
              <div className="relative inline-block">
                <h1 className="text-4xl font-bold neon-text animate-fade-in-up">
                  Инновационная Панель
                </h1>
                <div className="absolute -top-6 -right-6">
                  <Sparkles className="w-8 h-8 text-neon-green animate-spin-slow" />
                </div>
                <div className="absolute -bottom-4 -left-8">
                  <Rocket className="w-6 h-6 text-neon-green/70 animate-bounce" />
                </div>
              </div>
              <p className="text-lg text-muted-foreground animate-fade-in-up animation-delay-200">
                Будущее аналитики уже здесь
              </p>
            </div>
          </div>

          {/* Enhanced Metrics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <EnhancedMetricCard
              title="Общий доход"
              value="$124,500"
              change="+12.5%"
              icon={DollarSign}
              trend="up"
              delay={0.1}
              gradient="from-green-500/20 via-emerald-500/10 to-transparent"
            />
            <EnhancedMetricCard
              title="Активные пользователи"
              value="8,549"
              change="+5.2%"
              icon={Users}
              trend="up"
              delay={0.2}
              gradient="from-blue-500/20 via-cyan-500/10 to-transparent"
            />
            <EnhancedMetricCard
              title="Рост"
              value="23.1%"
              change="+8.1%"
              icon={TrendingUp}
              trend="up"
              delay={0.3}
              gradient="from-purple-500/20 via-violet-500/10 to-transparent"
            />
            <EnhancedMetricCard
              title="Производительность"
              value="94.2%"
              change="-2.1%"
              icon={Zap}
              trend="down"
              delay={0.4}
              gradient="from-red-500/20 via-rose-500/10 to-transparent"
            />
          </div>

          {/* Charts and Activity with enhanced styling */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-neon-green/20 to-blue-500/20 rounded-xl blur-sm opacity-75 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative">
                <Chart />
              </div>
            </div>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur-sm opacity-75 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative">
                <ActivityFeed />
              </div>
            </div>
          </div>

          {/* Enhanced Additional Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-neon-green/10 to-transparent rounded-xl blur-sm opacity-75 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative glass-card p-8 animate-fade-in-up animate-delay-500 border-border/50 hover:scale-[1.02] transition-transform duration-300">
                <h3 className="text-xl font-semibold mb-6 text-foreground flex items-center gap-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-neon-green to-neon-green-dark rounded-full"></div>
                  Быстрая статистика
                </h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/20 hover:bg-secondary/30 transition-colors">
                    <span className="text-muted-foreground">Конверсия</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="w-1/3 h-full bg-neon-green rounded-full animate-pulse"></div>
                      </div>
                      <span className="text-neon-green font-medium">4.2%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/20 hover:bg-secondary/30 transition-colors">
                    <span className="text-muted-foreground">Отказы</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="w-1/2 h-full bg-yellow-400 rounded-full animate-pulse"></div>
                      </div>
                      <span className="text-foreground font-medium">32.1%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/20 hover:bg-secondary/30 transition-colors">
                    <span className="text-muted-foreground">Время сессии</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                        <div className="w-3/4 h-full bg-blue-400 rounded-full animate-pulse"></div>
                      </div>
                      <span className="text-foreground font-medium">4m 32s</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-sm opacity-75 group-hover:opacity-100 transition duration-1000"></div>
              <div className="relative glass-card p-8 animate-fade-in-up animate-delay-600 border-border/50 hover:scale-[1.02] transition-transform duration-300">
                <h3 className="text-xl font-semibold mb-6 text-foreground flex items-center gap-3">
                  <div className="w-2 h-8 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"></div>
                  Статус системы
                </h3>
                <div className="space-y-6">
                  <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/20 hover:bg-secondary/30 transition-colors">
                    <span className="text-muted-foreground">API статус</span>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse"></div>
                        <div className="absolute inset-0 w-3 h-3 bg-neon-green rounded-full animate-ping opacity-75"></div>
                      </div>
                      <span className="text-neon-green text-sm font-medium">Онлайн</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/20 hover:bg-secondary/30 transition-colors">
                    <span className="text-muted-foreground">База данных</span>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-3 h-3 bg-neon-green rounded-full animate-pulse"></div>
                        <div className="absolute inset-0 w-3 h-3 bg-neon-green rounded-full animate-ping opacity-75"></div>
                      </div>
                      <span className="text-neon-green text-sm font-medium">Исправна</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 rounded-lg bg-secondary/20 hover:bg-secondary/30 transition-colors">
                    <span className="text-muted-foreground">CDN</span>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
                        <div className="absolute inset-0 w-3 h-3 bg-yellow-400 rounded-full animate-ping opacity-75"></div>
                      </div>
                      <span className="text-yellow-400 text-sm font-medium">Предупреждение</span>
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
