
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
      className="border-r border-slate-700/50 bg-slate-900/95 backdrop-blur-xl"
      collapsible="icon"
    >
      <SidebarHeader className="p-6">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shadow-lg shadow-blue-500/10 flex-shrink-0">
              <Zap className="w-5 h-5 text-blue-400" />
            </div>
            {!isCollapsed && (
              <div className="flex flex-col">
                <span className="text-slate-200 font-semibold text-lg truncate">Analytics</span>
                <span className="text-xs text-slate-400 uppercase tracking-wide">Hub</span>
              </div>
            )}
          </div>
          {!isCollapsed && (
            <SidebarTrigger className="text-slate-400 hover:text-blue-400 w-8 h-8 rounded-lg hover:bg-slate-800/50 transition-all duration-250 border border-transparent hover:border-blue-500/20 flex-shrink-0" />
          )}
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          {!isCollapsed && (
            <SidebarGroupLabel className="text-slate-500 text-xs uppercase tracking-wider font-medium mb-2">
              Navigation
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navItems.map((item) => {
                const isActive = location.pathname === item.path;
                return (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton 
                      onClick={() => navigate(item.path)}
                      isActive={isActive}
                      className={`
                        group relative rounded-xl transition-all duration-250 hover:scale-[1.02]
                        ${isActive 
                          ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30 shadow-lg shadow-blue-500/10' 
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                        }
                      `}
                      tooltip={isCollapsed ? item.label : undefined}
                    >
                      <item.icon className={`w-5 h-5 transition-all duration-250 ${isActive ? 'scale-110' : 'group-hover:scale-105'}`} />
                      {!isCollapsed && <span className="font-medium">{item.label}</span>}
                      {isActive && !isCollapsed && (
                        <div className="absolute right-3 w-1.5 h-1.5 bg-blue-400 rounded-full" />
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div className="flex flex-col gap-3">
          {isCollapsed && (
            <div className="flex justify-center">
              <SidebarTrigger className="text-slate-400 hover:text-blue-400 w-10 h-10 rounded-xl hover:bg-slate-800/50 transition-all duration-250 border border-transparent hover:border-blue-500/20" />
            </div>
          )}
          <UserMenu />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
