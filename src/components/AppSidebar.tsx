
import { Home, BarChart3, Users, Settings, Zap, TrendingUp, Activity, Target } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { UserMenu } from '@/components/UserMenu';

const navItems = [
  { icon: Home, label: 'Dashboard', path: '/' },
  { icon: Target, label: 'Campaigns', path: '/campaigns' },
  { icon: BarChart3, label: 'Analytics', path: '/analytics' },
  { icon: TrendingUp, label: 'Revenue', path: '/revenue' },
  { icon: Users, label: 'Users', path: '/users' },
  { icon: Activity, label: 'Activity', path: '/activity' },
  { icon: Settings, label: 'Settings', path: '/settings' },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  return (
    <Sidebar 
      className="border-r border-green-500/30 bg-slate-900/95 backdrop-blur-xl"
      collapsible="icon"
    >
      <SidebarHeader className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-lg bg-green-500/20 border border-green-500/50 flex items-center justify-center shadow-lg shadow-green-500/20 flex-shrink-0">
              <Zap className="w-4 h-4 text-green-400" />
            </div>
            {!isCollapsed && (
              <span className="text-white font-semibold">Dashboard</span>
            )}
          </div>
          {/* Sidebar trigger always visible when expanded */}
          {!isCollapsed && (
            <SidebarTrigger className="text-green-400 hover:text-green-300 w-6 h-6 flex-shrink-0" />
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="text-green-400/60">Navigation</SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton 
                      onClick={() => navigate(item.path)}
                      isActive={isActive}
                      className={`
                        ${isActive 
                          ? 'bg-green-500/20 text-green-400 border-r-2 border-green-500' 
                          : 'text-green-400/60 hover:text-green-400 hover:bg-green-500/10'
                        }
                      `}
                      tooltip={isCollapsed ? item.label : undefined}
                    >
                      <item.icon className="w-4 h-4" />
                      {!isCollapsed && <span>{item.label}</span>}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        {/* Show trigger when collapsed */}
        {isCollapsed && (
          <div className="mb-2">
            <SidebarTrigger className="text-green-400 hover:text-green-300 w-full justify-center" />
          </div>
        )}
        <UserMenu />
      </SidebarFooter>
    </Sidebar>
  );
}
