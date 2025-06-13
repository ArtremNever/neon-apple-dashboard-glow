
import { Card } from '@/components/ui/card';
import { CheckCircle, Upload, Eye, Rocket, Clock, User } from 'lucide-react';

const activities = [
  {
    id: 1,
    user: 'Alex Thompson',
    avatar: 'AT',
    action: 'completed project milestone',
    description: 'Backend API integration finished',
    time: '2 minutes ago',
    status: 'success',
    icon: CheckCircle
  },
  {
    id: 2,
    user: 'Sarah Chen',
    avatar: 'SC',
    action: 'uploaded new design files',
    description: 'Updated UI components library',
    time: '15 minutes ago',
    status: 'info',
    icon: Upload
  },
  {
    id: 3,
    user: 'Mike Johnson',
    avatar: 'MJ',
    action: 'reviewed code changes',
    description: 'Security patches applied',
    time: '1 hour ago',
    status: 'warning',
    icon: Eye
  },
  {
    id: 4,
    user: 'Emma Wilson',
    avatar: 'EW',
    action: 'deployed to production',
    description: 'Version 2.1.0 successfully released',
    time: '2 hours ago',
    status: 'success',
    icon: Rocket
  },
];

const statusConfig = {
  success: {
    color: 'text-green-300',
    bgColor: 'bg-green-500/10',
    borderColor: 'border-green-500/20',
    dotColor: 'bg-green-400'
  },
  info: {
    color: 'text-blue-300',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    dotColor: 'bg-blue-400'
  },
  warning: {
    color: 'text-yellow-300',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/20',
    dotColor: 'bg-yellow-400'
  }
};

export const EnhancedActivityFeed = () => {
  return (
    <div className="relative group">
      {/* Subtle glow effect */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 via-purple-500/8 to-blue-500/6 rounded-2xl blur-sm opacity-50 group-hover:opacity-75 transition duration-1000"></div>
      
      <Card className="relative bg-card/60 backdrop-blur-xl border border-blue-500/10 hover:border-blue-500/20 transition-all duration-500 h-full">
        <div className="p-8">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
              <Clock className="w-6 h-6 text-blue-300" />
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-foreground">Live Activity</h3>
              <p className="text-muted-foreground mt-1">Recent team updates</p>
            </div>
          </div>
          
          {/* Activity List */}
          <div className="space-y-6">
            {activities.map((activity, index) => {
              const config = statusConfig[activity.status as keyof typeof statusConfig];
              const Icon = activity.icon;
              
              return (
                <div 
                  key={activity.id} 
                  className="group/item relative flex items-start gap-4 p-4 rounded-xl hover:bg-card/30 transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Timeline line */}
                  {index < activities.length - 1 && (
                    <div className="absolute left-8 top-16 w-0.5 h-16 bg-gradient-to-b from-border/50 to-transparent"></div>
                  )}
                  
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className={`w-12 h-12 rounded-xl ${config.bgColor} ${config.borderColor} border flex items-center justify-center`}>
                      <span className={`text-sm font-semibold ${config.color}`}>
                        {activity.avatar}
                      </span>
                    </div>
                    {/* Status indicator */}
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${config.dotColor} rounded-full border-2 border-card shadow-lg`}>
                      <Icon className="w-2 h-2 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm text-foreground leading-relaxed">
                        <span className="font-semibold">{activity.user}</span>{' '}
                        <span className="text-muted-foreground">{activity.action}</span>
                      </p>
                    </div>
                    
                    {activity.description && (
                      <p className="text-xs text-muted-foreground/70 bg-muted/20 rounded-lg px-3 py-2">
                        {activity.description}
                      </p>
                    )}
                    
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3 text-muted-foreground/50" />
                      <span className="text-xs text-muted-foreground/70">{activity.time}</span>
                    </div>
                  </div>
                  
                  {/* Hover effect */}
                  <div className="absolute inset-0 rounded-xl border border-transparent group-hover/item:border-border/20 transition-colors duration-300"></div>
                </div>
              );
            })}
          </div>
          
          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-border/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-muted-foreground/70" />
                <span className="text-sm text-muted-foreground/80">4 team members active</span>
              </div>
              <button className="text-sm text-primary/80 hover:text-primary font-medium transition-colors">
                View All →
              </button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
