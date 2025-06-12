
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const activities = [
  {
    id: 1,
    user: 'Alex Thompson',
    action: 'completed project milestone',
    time: '2 minutes ago',
    status: 'success'
  },
  {
    id: 2,
    user: 'Sarah Chen',
    action: 'uploaded new design files',
    time: '15 minutes ago',
    status: 'info'
  },
  {
    id: 3,
    user: 'Mike Johnson',
    action: 'reviewed code changes',
    time: '1 hour ago',
    status: 'warning'
  },
  {
    id: 4,
    user: 'Emma Wilson',
    action: 'deployed to production',
    time: '2 hours ago',
    status: 'success'
  },
];

export const ActivityFeed = () => {
  return (
    <Card className="glass-card p-6 animate-fade-in-up animate-delay-400 border-border/50">
      <h3 className="text-lg font-semibold mb-4 text-foreground">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity, index) => (
          <div 
            key={activity.id} 
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary/30 transition-colors duration-200"
            style={{ animationDelay: `${0.5 + index * 0.1}s` }}
          >
            <div className={`w-2 h-2 rounded-full ${
              activity.status === 'success' ? 'bg-neon-green' :
              activity.status === 'warning' ? 'bg-yellow-400' :
              'bg-blue-400'
            }`}></div>
            <div className="flex-1">
              <p className="text-sm text-foreground">
                <span className="font-medium">{activity.user}</span> {activity.action}
              </p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
            <Badge 
              variant="secondary" 
              className={`text-xs ${
                activity.status === 'success' ? 'bg-neon-green/10 text-neon-green border-neon-green/20' :
                activity.status === 'warning' ? 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20' :
                'bg-blue-400/10 text-blue-400 border-blue-400/20'
              }`}
            >
              {activity.status}
            </Badge>
          </div>
        ))}
      </div>
    </Card>
  );
};
