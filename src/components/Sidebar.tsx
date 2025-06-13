
import { Home, BarChart3, Users, Settings, Zap, TrendingUp, Activity, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, useLocation } from 'react-router-dom';

const navItems = [
  { icon: Home, label: 'Dashboard', path: '/' },
  { icon: Target, label: 'Campaigns', path: '/campaigns' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: TrendingUp, label: 'Revenue', path: '/revenue' },
  { icon: Users, label: 'Users', path: '/users' },
  { icon: Activity, label: 'Activity', path: '/activity' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="w-16 h-screen bg-slate-950 border-r border-green-500/30 flex flex-col items-center py-6">
      {/* Logo */}
      <div className="mb-8">
        <div className="w-8 h-8 rounded-lg bg-green-500/20 border border-green-500/50 flex items-center justify-center shadow-lg shadow-green-500/20">
          <Zap className="w-4 h-4 text-green-400" />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Button
              key={item.label}
              variant="ghost"
              size="icon"
              className={`
                w-10 h-10 rounded-lg transition-all duration-200
                ${isActive 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/50 shadow-lg shadow-green-500/20' 
                  : 'text-green-400/60 hover:text-green-400 hover:bg-green-500/10 hover:border hover:border-green-500/30'
                }
              `}
              onClick={() => navigate(item.path)}
            >
              <item.icon className="w-4 h-4" />
            </Button>
          );
        })}
      </nav>

      {/* Profile */}
      <div className="mt-auto">
        <div className="w-8 h-8 rounded-lg bg-green-500/10 border border-green-500/30"></div>
      </div>
    </div>
  );
};
