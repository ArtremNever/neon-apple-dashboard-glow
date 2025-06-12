
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
    <div className="w-16 h-screen bg-card border-r border-border flex flex-col items-center py-6">
      {/* Logo */}
      <div className="mb-8">
        <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
          <Zap className="w-4 h-4 text-primary-foreground" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col space-y-2">
        {navItems.map((item) => (
          <Button
            key={item.label}
            variant={item.active ? "default" : "ghost"}
            size="icon"
            className={`
              w-10 h-10 rounded-lg
              ${item.active 
                ? 'bg-primary text-primary-foreground' 
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
              }
            `}
          >
            <item.icon className="w-4 h-4" />
          </Button>
        ))}
      </nav>

      {/* Profile */}
      <div className="mt-auto">
        <div className="w-8 h-8 rounded-lg bg-muted"></div>
      </div>
    </div>
  );
};
