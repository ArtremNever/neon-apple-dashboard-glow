
import React from 'react';
import { User, Shield, Bell, Building2, Users, CreditCard, Link, Key, Palette } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface NavigationItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  badge?: string | number;
  badgeType?: 'default' | 'warning' | 'success';
}

interface NavigationGroup {
  title: string;
  items: NavigationItem[];
}

interface SettingsSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const SettingsSidebar = ({ activeTab, onTabChange }: SettingsSidebarProps) => {
  const navigationGroups: NavigationGroup[] = [
    {
      title: 'Personal',
      items: [
        { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
        { id: 'security', label: 'Security', icon: <Shield className="w-4 h-4" />, badge: '2', badgeType: 'warning' },
        { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
      ]
    },
    {
      title: 'Workspace',
      items: [
        { id: 'company', label: 'Company', icon: <Building2 className="w-4 h-4" /> },
        { id: 'team', label: 'Team', icon: <Users className="w-4 h-4" /> },
        { id: 'billing', label: 'Billing', icon: <CreditCard className="w-4 h-4" /> },
      ]
    },
    {
      title: 'Platform',
      items: [
        { id: 'integrations', label: 'Integrations', icon: <Link className="w-4 h-4" />, badge: '12' },
        { id: 'api', label: 'API Keys', icon: <Key className="w-4 h-4" /> },
        { id: 'appearance', label: 'Appearance', icon: <Palette className="w-4 h-4" /> },
      ]
    }
  ];

  const getBadgeVariant = (badgeType?: 'default' | 'warning' | 'success') => {
    switch (badgeType) {
      case 'warning':
        return 'bg-orange-500/20 text-orange-400 border-orange-500/30';
      case 'success':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      default:
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
    }
  };

  return (
    <div className="w-80 bg-slate-900/30 backdrop-blur-xl border-r border-slate-700/50 flex flex-col">
      {/* Profile Section */}
      <div className="p-6 border-b border-slate-700/50">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-semibold text-lg">
              JD
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-slate-900 rounded-full"></div>
          </div>
          <div className="flex-1">
            <h3 className="text-white font-semibold">John Doe</h3>
            <p className="text-slate-400 text-sm">Administrator</p>
            <p className="text-green-400 text-xs">Active now</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 overflow-y-auto py-6">
        {navigationGroups.map((group, groupIndex) => (
          <div key={groupIndex} className="mb-8">
            <h4 className="text-slate-500 text-xs font-semibold uppercase tracking-wider px-6 mb-3">
              {group.title}
            </h4>
            <div className="space-y-1">
              {group.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`w-full flex items-center justify-between px-6 py-3 text-left transition-all duration-200 group ${
                    activeTab === item.id
                      ? 'bg-blue-500/10 border-r-2 border-blue-500 text-blue-400'
                      : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`${activeTab === item.id ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'}`}>
                      {item.icon}
                    </div>
                    <span className="font-medium">{item.label}</span>
                  </div>
                  {item.badge && (
                    <Badge className={`text-xs px-2 py-1 ${getBadgeVariant(item.badgeType)}`}>
                      {item.badge}
                    </Badge>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
