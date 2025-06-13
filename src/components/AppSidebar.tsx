
import { Home, BarChart3, Users, Settings, Zap, TrendingUp, Activity, Target, Building2, Database, Monitor, MessageSquare } from 'lucide-react';
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

// TODO: Replace with actual user role from auth context
const userRole = 'admin'; // This should come from your auth context

const navItems = [
  { icon: Home, label: 'Dashboard', path: '/', roles: ['admin', 'manager', 'analyst', 'viewer'] },
  { icon: BarChart3, label: 'Campaigns List', path: '/campaigns-list', roles: ['admin', 'manager', 'analyst'] },
  { icon: Target, label: 'Campaign Builder', path: '/campaigns', roles: ['admin', 'manager'] },
  { icon: TrendingUp, label: 'Analytics', path: '/analytics', roles: ['admin', 'manager', 'analyst'] },
  { icon: Activity, label: 'Revenue', path: '/revenue', roles: ['admin', 'manager'] },
  { icon: Building2, label: 'Clients', path: '/clients', roles: ['admin', 'manager'] },
  { icon: Database, label: 'Sources', path: '/sources', roles: ['admin', 'manager'] },
  { icon: Users, label: 'Users', path: '/users', roles: ['admin'] },
  { icon: Monitor, label: 'Monitoring', path: '/monitoring', roles: ['admin'] },
  { icon: MessageSquare, label: 'AI Chat', path: '/ai-chat', roles: ['admin', 'manager', 'analyst'] },
  { icon: Settings, label: 'Settings', path: '/settings', roles: ['admin', 'manager', 'analyst', 'viewer'] },
];

export function AppSidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = useSidebar();
  const isCollapsed = state === 'collapsed';

  // Filter navigation items based on user role
  const filteredNavItems = navItems.filter(item => item.roles.includes(userRole));

  return (
    <Sidebar 
      className="border-r border-slate-700/50 bg-slate-900/95 backdrop-blur-xl"
      collapsible="icon"
    >
      <SidebarHeader className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shadow-lg shadow-blue-500/10">
              <Zap className="w-5 h-5 text-blue-400" />
            </div>
            {!isCollapsed && (
              <>
                <div className="flex flex-col">
                  <span className="text-slate-200 font-semibold text-lg">Analytics</span>
                  <span className="text-xs text-slate-400 uppercase tracking-wide">Hub</span>
                </div>
                <div className="ml-auto">
                  <SidebarTrigger className="text-slate-400 hover:text-blue-400 w-8 h-8 rounded-lg hover:bg-slate-800/50 transition-all duration-250 border border-transparent hover:border-blue-500/20" />
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Expand trigger for collapsed state - positioned under logo */}
        {isCollapsed && (
          <div className="mt-4 flex justify-center">
            <SidebarTrigger className="text-slate-400 hover:text-blue-400 w-10 h-10 rounded-xl hover:bg-slate-800/50 transition-all duration-250 border border-transparent hover:border-blue-500/20" />
          </div>
        )}
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
              {filteredNavItems.map((item) => {
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
        <UserMenu />
      </SidebarFooter>
    </Sidebar>
  );
}
