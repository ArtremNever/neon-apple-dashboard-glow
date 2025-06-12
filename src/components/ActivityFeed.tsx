
import { Card } from '@/components/ui/card';

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
    <Card className="p-6 bg-card border-border">
      <h3 className="text-lg font-medium mb-4 text-foreground">Recent Activity</h3>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div 
            key={activity.id} 
            className="flex items-start gap-3 pb-3 border-b border-border last:border-0 last:pb-0"
          >
            <div className={`w-2 h-2 rounded-full mt-2 ${
              activity.status === 'success' ? 'bg-green-500' :
              activity.status === 'warning' ? 'bg-yellow-500' :
              'bg-blue-500'
            }`}></div>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-foreground">
                <span className="font-medium">{activity.user}</span> {activity.action}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
