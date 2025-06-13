
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  XCircle, 
  RefreshCw, 
  Plus, 
  Settings,
  ChevronDown,
  ChevronUp,
  Clock
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface TimelineEvent {
  id: string;
  timestamp: string;
  type: 'sync' | 'error' | 'connection' | 'update' | 'new';
  source: string;
  event: string;
  details?: string;
  stats?: string;
  severity?: 'low' | 'medium' | 'high';
}

interface ActivityTimelineProps {
  events: TimelineEvent[];
  className?: string;
}

export const ActivityTimeline = ({ events, className }: ActivityTimelineProps) => {
  const [expandedEvents, setExpandedEvents] = useState<Set<string>>(new Set());

  const toggleExpanded = (eventId: string) => {
    const newExpanded = new Set(expandedEvents);
    if (newExpanded.has(eventId)) {
      newExpanded.delete(eventId);
    } else {
      newExpanded.add(eventId);
    }
    setExpandedEvents(newExpanded);
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'sync':
        return <CheckCircle className="w-4 h-4 text-green-400" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-400" />;
      case 'connection':
        return <RefreshCw className="w-4 h-4 text-blue-400" />;
      case 'new':
        return <Plus className="w-4 h-4 text-purple-400" />;
      case 'update':
        return <Settings className="w-4 h-4 text-yellow-400" />;
      default:
        return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  const getEventStyles = (type: string, severity?: string) => {
    switch (type) {
      case 'sync':
        return {
          border: 'border-green-500/30',
          bg: 'bg-green-500/10',
          dot: 'bg-green-400'
        };
      case 'error':
        const errorIntensity = severity === 'high' ? '50' : severity === 'medium' ? '30' : '20';
        return {
          border: `border-red-500/${errorIntensity}`,
          bg: `bg-red-500/10`,
          dot: 'bg-red-400'
        };
      case 'connection':
        return {
          border: 'border-blue-500/30',
          bg: 'bg-blue-500/10',
          dot: 'bg-blue-400'
        };
      case 'new':
        return {
          border: 'border-purple-500/30',
          bg: 'bg-purple-500/10',
          dot: 'bg-purple-400'
        };
      case 'update':
        return {
          border: 'border-yellow-500/30',
          bg: 'bg-yellow-500/10',
          dot: 'bg-yellow-400'
        };
      default:
        return {
          border: 'border-slate-600/30',
          bg: 'bg-slate-800/10',
          dot: 'bg-slate-400'
        };
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const now = new Date();
    const eventTime = new Date(timestamp);
    const diffMs = now.getTime() - eventTime.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} min ago`;
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    return eventTime.toLocaleDateString();
  };

  return (
    <Card className={cn("bg-slate-900/50 backdrop-blur-xl border-slate-700/50", className)}>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Clock className="w-5 h-5 text-blue-400" />
          Activity Timeline
        </h3>
        
        <div className="space-y-4">
          {events.map((event, index) => {
            const styles = getEventStyles(event.type, event.severity);
            const isExpanded = expandedEvents.has(event.id);
            
            return (
              <div key={event.id} className="relative">
                {/* Timeline line */}
                {index < events.length - 1 &&  (
                  <div className="absolute left-3 top-8 w-px h-full bg-slate-700/50" />
                )}
                
                <div className={cn(
                  "relative flex items-start gap-4 p-4 rounded-lg border transition-all duration-200 hover:bg-slate-800/30",
                  styles.border,
                  styles.bg
                )}>
                  {/* Timeline dot */}
                  <div className="relative flex-shrink-0">
                    <div className={cn("w-6 h-6 rounded-full flex items-center justify-center", styles.bg)}>
                      {getEventIcon(event.type)}
                    </div>
                    <div className={cn("absolute inset-0 w-6 h-6 rounded-full animate-ping opacity-20", styles.dot)} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-white">{event.event}</span>
                          <Badge variant="outline" className="text-xs text-slate-400 border-slate-600">
                            {event.source}
                          </Badge>
                        </div>
                        
                        <div className="text-xs text-slate-400">
                          {formatTimestamp(event.timestamp)}
                        </div>
                        
                        {event.stats && (
                          <div className="text-xs text-slate-300 bg-slate-800/50 px-2 py-1 rounded">
                            {event.stats}
                          </div>
                        )}
                      </div>
                      
                      {event.details && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleExpanded(event.id)}
                          className="text-slate-400 hover:text-white"
                        >
                          {isExpanded ? 
                            <ChevronUp className="w-4 h-4" /> : 
                            <ChevronDown className="w-4 h-4" />
                          }
                        </Button>
                      )}
                    </div>
                    
                    {/* Expanded details */}
                    {isExpanded && event.details && (
                      <div className="mt-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700/50 animate-fade-in">
                        <div className="text-sm text-slate-300">
                          {event.details}
                        </div>
                        
                        {event.type === 'error' && (
                          <div className="mt-2 flex gap-2">
                            <Button size="sm" variant="outline" className="text-xs border-slate-600 text-slate-300">
                              Retry
                            </Button>
                            <Button size="sm" variant="outline" className="text-xs border-slate-600 text-slate-300">
                              View Logs
                            </Button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};
