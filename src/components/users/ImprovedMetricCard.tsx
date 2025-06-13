
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  gradient: 'blue' | 'green' | 'yellow' | 'red';
  trend?: {
    value: string;
    direction: 'up' | 'down';
  };
  interactive?: boolean;
  children?: React.ReactNode;
}

export const ImprovedMetricCard = ({ 
  title, 
  value, 
  icon, 
  gradient, 
  trend, 
  interactive = false,
  children 
}: MetricCardProps) => {
  const gradientClasses = {
    blue: 'from-blue-600/20 to-blue-800/20 border-blue-500/20',
    green: 'from-green-600/20 to-green-800/20 border-green-500/20',
    yellow: 'from-yellow-600/20 to-yellow-800/20 border-yellow-500/20',
    red: 'from-red-600/20 to-red-800/20 border-red-500/20'
  };

  const iconColors = {
    blue: 'text-blue-400',
    green: 'text-green-400',
    yellow: 'text-yellow-400',
    red: 'text-red-400'
  };

  return (
    <Card className={`
      relative overflow-hidden bg-gradient-to-br ${gradientClasses[gradient]} 
      backdrop-blur-xl border transition-all duration-300 hover:scale-[1.02] 
      ${interactive ? 'cursor-pointer hover:shadow-2xl' : ''}
    `}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={`text-2xl ${iconColors[gradient]}`}>
              {icon}
            </div>
            <div>
              <p className="text-slate-400 text-sm">{title}</p>
              {trend && (
                <div className="flex items-center gap-1 mt-1">
                  {trend.direction === 'up' ? (
                    <TrendingUp className="w-3 h-3 text-green-400" />
                  ) : (
                    <TrendingDown className="w-3 h-3 text-red-400" />
                  )}
                  <span className={`text-xs ${
                    trend.direction === 'up' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {trend.value}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="mb-4">
          <p className="text-3xl font-bold text-white">{value}</p>
        </div>

        {children}
      </CardContent>
    </Card>
  );
};

interface ActiveUsersProps {
  users: Array<{ id: string; name: string; avatar?: string }>;
  totalCount: number;
}

export const ActiveUsersList = ({ users, totalCount }: ActiveUsersProps) => {
  const displayUsers = users.slice(0, 3);
  const remaining = totalCount - displayUsers.length;

  return (
    <div className="flex items-center gap-2 mt-3">
      {displayUsers.map((user) => (
        <div key={user.id} className="relative">
          <Avatar className="w-8 h-8 border-2 border-green-500">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="bg-slate-700 text-slate-200 text-xs">
              {user.name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-slate-900"></div>
        </div>
      ))}
      {remaining > 0 && (
        <div className="w-8 h-8 bg-slate-700 rounded-full flex items-center justify-center border-2 border-slate-600">
          <span className="text-slate-300 text-xs">+{remaining}</span>
        </div>
      )}
    </div>
  );
};

interface PendingInviteProps {
  email: string;
  expiresIn: string;
}

export const PendingInviteItem = ({ email, expiresIn }: PendingInviteProps) => {
  return (
    <div className="mt-3 p-3 bg-slate-800/30 rounded-lg">
      <div className="text-slate-300 text-sm font-medium">{email}</div>
      <div className="text-slate-500 text-xs mt-1">{expiresIn}</div>
    </div>
  );
};

export const ActionButton = ({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) => {
  return (
    <Button 
      variant="outline" 
      size="sm" 
      className="mt-3 w-full border-slate-600 text-slate-300 hover:bg-slate-700"
      onClick={onClick}
    >
      {children}
    </Button>
  );
};
