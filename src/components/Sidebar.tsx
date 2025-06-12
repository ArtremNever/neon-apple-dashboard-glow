
import { Home, BarChart3, Users, Settings, Zap, TrendingUp, Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navItems = [
  { icon: Home, label: 'Dashboard', active: true },
  { icon: BarChart3, label: 'Analytics' },
  { icon: TrendingUp, label: 'Revenue' },
  { icon: Users, label: 'Users' },
  { icon: Activity, label: 'Activity' },
  { icon: Settings, label: 'Settings' },
];

export const Sidebar = () => {
  return (
    <div className="w-20 h-screen glass-card border-r border-border/50 flex flex-col items-center py-6 animate-slide-in-right">
      {/* Logo */}
      <div className="mb-8">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-green to-neon-green-dark flex items-center justify-center neon-glow">
          <Zap className="w-6 h-6 text-black" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col space-y-4">
        {navItems.map((item, index) => (
          <Button
            key={item.label}
            variant={item.active ? "default" : "ghost"}
            size="icon"
            className={`
              w-12 h-12 rounded-xl transition-all duration-300 hover:scale-110
              ${item.active 
                ? 'bg-neon-green text-black shadow-lg shadow-neon-green/30 animate-pulse-glow' 
                : 'hover:bg-secondary/50 text-muted-foreground hover:text-foreground'
              }
            `}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <item.icon className="w-5 h-5" />
          </Button>
        ))}
      </nav>

      {/* Profile */}
      <div className="mt-auto">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 border-2 border-neon-green/30">
        </div>
      </div>
    </div>
  );
};
