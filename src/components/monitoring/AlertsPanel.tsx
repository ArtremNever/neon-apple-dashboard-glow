
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  AlertTriangle, 
  AlertCircle, 
  Info, 
  ChevronDown, 
  ChevronRight,
  Eye,
  Check,
  VolumeX,
  ArrowRight,
  CheckCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Alert {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  title: string;
  description: string;
  timestamp: string;
  isNew?: boolean;
  resolved?: boolean;
  service?: string;
}

interface AlertsPanelProps {
  alerts: Alert[];
  newAlertsCount?: number;
}

export const AlertsPanel = ({ alerts, newAlertsCount = 0 }: AlertsPanelProps) => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [expandedAlerts, setExpandedAlerts] = useState<Set<string>>(new Set());

  const filters = ['All', 'Critical', 'Warning', 'Info'];

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return <AlertCircle className="w-4 h-4" />;
      case 'warning': return <AlertTriangle className="w-4 h-4" />;
      case 'info': return <Info className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-500/10 border-red-500/20';
      case 'warning': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      case 'info': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500/20 text-red-300 border-red-500/30';
      case 'warning': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'info': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  const toggleExpanded = (alertId: string) => {
    const newExpanded = new Set(expandedAlerts);
    if (newExpanded.has(alertId)) {
      newExpanded.delete(alertId);
    } else {
      newExpanded.add(alertId);
    }
    setExpandedAlerts(newExpanded);
  };

  const formatTimestamp = (timestamp: string) => {
    const now = new Date();
    const alertTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now.getTime() - alertTime.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hr ago`;
    return `${Math.floor(diffInMinutes / 1440)} days ago`;
  };

  const filteredAlerts = alerts.filter(alert => 
    activeFilter === 'All' || alert.severity === activeFilter.toLowerCase()
  );

  return (
    <Card className="bg-slate-900/50 border-slate-700/50 backdrop-blur-xl shadow-xl">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-3">
            <div className="p-2 rounded-lg bg-slate-800/50">
              <AlertTriangle className={cn(
                "w-5 h-5 text-red-400",
                newAlertsCount > 0 && "animate-pulse"
              )} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                Recent Alerts
                {newAlertsCount > 0 && (
                  <Badge className="bg-red-500/20 text-red-300 border-red-500/30 text-xs px-2 py-1 animate-pulse">
                    {newAlertsCount}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-slate-400 font-normal mt-1">
                System notifications and alerts
              </p>
            </div>
          </CardTitle>
        </div>
        
        <div className="flex gap-2 mt-4">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200",
                activeFilter === filter
                  ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                  : "bg-slate-800/50 text-slate-400 hover:text-slate-300 hover:bg-slate-800/80 border border-transparent"
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredAlerts.map(alert => (
            <div
              key={alert.id}
              className={cn(
                "p-4 rounded-xl border transition-all duration-200 hover:scale-[1.02]",
                getSeverityColor(alert.severity),
                alert.isNew && "ring-1 ring-blue-500/50 animate-fade-in"
              )}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      {getSeverityIcon(alert.severity)}
                      <Badge className={cn("text-xs border", getSeverityBadge(alert.severity))}>
                        {alert.severity.toUpperCase()}
                      </Badge>
                    </div>
                    {alert.isNew && (
                      <Badge className="bg-blue-500/20 text-blue-300 border-blue-500/30 text-xs animate-pulse">
                        NEW
                      </Badge>
                    )}
                    {alert.resolved && (
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-xs">
                        RESOLVED
                      </Badge>
                    )}
                    <span className="text-xs text-slate-500 ml-auto">
                      {formatTimestamp(alert.timestamp)}
                    </span>
                  </div>
                  
                  <h4 className="font-semibold text-white mb-2 text-sm">{alert.title}</h4>
                  <p className="text-xs text-slate-300 mb-3 leading-relaxed">{alert.description}</p>
                  
                  {alert.service && (
                    <div className="text-xs text-slate-400 mb-3 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                      Service: <span className="text-slate-300">{alert.service}</span>
                    </div>
                  )}
                  
                  {expandedAlerts.has(alert.id) && (
                    <div className="mt-4 pt-3 border-t border-slate-700/50 space-y-2 animate-fade-in">
                      <div className="text-xs space-y-2">
                        <div className="flex justify-between py-1">
                          <span className="text-slate-500">Alert ID:</span>
                          <span className="text-slate-300 font-mono text-xs">{alert.id}</span>
                        </div>
                        <div className="flex justify-between py-1">
                          <span className="text-slate-500">First Seen:</span>
                          <span className="text-slate-300 text-xs">{new Date(alert.timestamp).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-1 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 text-slate-400 hover:text-blue-400 hover:bg-blue-500/10"
                    title="Investigate"
                  >
                    <Eye className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 text-slate-400 hover:text-green-400 hover:bg-green-500/10"
                    title="Acknowledge"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 text-slate-400 hover:text-yellow-400 hover:bg-yellow-500/10"
                    title="Silence"
                  >
                    <VolumeX className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpanded(alert.id)}
                    className="h-7 w-7 p-0 text-slate-400 hover:text-white hover:bg-slate-700/50"
                  >
                    {expandedAlerts.has(alert.id) ? 
                      <ChevronDown className="w-3.5 h-3.5" /> : 
                      <ChevronRight className="w-3.5 h-3.5" />
                    }
                  </Button>
                </div>
              </div>
            </div>
          ))}
          
          {filteredAlerts.length === 0 && (
            <div className="text-center py-8 bg-slate-800/30 rounded-xl border border-slate-700/50">
              <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
              <p className="text-slate-400">No {activeFilter.toLowerCase()} alerts</p>
              <p className="text-xs text-slate-500 mt-1">All systems are running smoothly</p>
            </div>
          )}
        </div>
        
        <div className="mt-6 pt-4 border-t border-slate-700/50">
          <Button
            variant="ghost"
            className="w-full text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 transition-all duration-200"
          >
            View Alert History
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
