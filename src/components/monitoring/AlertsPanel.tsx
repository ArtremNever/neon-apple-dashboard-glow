
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
  ArrowRight
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
      case 'critical': return <AlertCircle className="w-4 h-4 text-red-400" />;
      case 'warning': return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      case 'info': return <Info className="w-4 h-4 text-blue-400" />;
      default: return <Info className="w-4 h-4 text-gray-400" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-600 text-red-100';
      case 'warning': return 'bg-yellow-600 text-yellow-100';
      case 'info': return 'bg-blue-600 text-blue-100';
      default: return 'bg-gray-600 text-gray-100';
    }
  };

  const getAlertBorder = (severity: string) => {
    switch (severity) {
      case 'critical': return 'border-l-red-500 bg-red-500/5';
      case 'warning': return 'border-l-yellow-500 bg-yellow-500/5';
      case 'info': return 'border-l-blue-500 bg-blue-500/5';
      default: return 'border-l-gray-500 bg-gray-500/5';
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
    <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <AlertTriangle className={cn(
              "w-5 h-5",
              newAlertsCount > 0 && "animate-pulse text-red-400"
            )} />
            Recent Alerts
            {newAlertsCount > 0 && (
              <Badge className="bg-red-600 text-red-100 text-xs px-2 py-1 animate-pulse">
                {newAlertsCount}
              </Badge>
            )}
          </CardTitle>
        </div>
        
        <div className="flex gap-2 mt-4">
          {filters.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-3 py-1 rounded-full text-xs font-medium transition-colors",
                activeFilter === filter
                  ? "bg-blue-600 text-blue-100"
                  : "bg-slate-800 text-slate-400 hover:text-slate-300"
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </CardHeader>

      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {filteredAlerts.map(alert => (
            <div
              key={alert.id}
              className={cn(
                "p-4 rounded-lg border-l-4 transition-all duration-200",
                getAlertBorder(alert.severity),
                alert.isNew && "ring-2 ring-blue-500/50 animate-fade-in"
              )}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-2">
                    {getSeverityIcon(alert.severity)}
                    <Badge className={cn("text-xs border-none", getSeverityBadge(alert.severity))}>
                      {alert.severity.toUpperCase()}
                    </Badge>
                    {alert.isNew && (
                      <Badge className="bg-blue-600 text-blue-100 text-xs animate-pulse">
                        NEW
                      </Badge>
                    )}
                    {alert.resolved && (
                      <Badge className="bg-green-600 text-green-100 text-xs">
                        RESOLVED
                      </Badge>
                    )}
                    <span className="text-xs text-slate-500">
                      {formatTimestamp(alert.timestamp)}
                    </span>
                  </div>
                  
                  <h4 className="font-medium text-white mb-1">{alert.title}</h4>
                  <p className="text-sm text-slate-300 mb-2">{alert.description}</p>
                  
                  {alert.service && (
                    <div className="text-xs text-slate-400">
                      Service: <span className="text-slate-300">{alert.service}</span>
                    </div>
                  )}
                  
                  {expandedAlerts.has(alert.id) && (
                    <div className="mt-3 pt-3 border-t border-slate-700/50 space-y-2 animate-fade-in">
                      <div className="text-xs space-y-1">
                        <div className="flex justify-between">
                          <span className="text-slate-500">Alert ID:</span>
                          <span className="text-slate-300 font-mono">{alert.id}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-500">First Seen:</span>
                          <span className="text-slate-300">{new Date(alert.timestamp).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center gap-2 ml-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 text-slate-400 hover:text-blue-400"
                    title="Investigate"
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 text-slate-400 hover:text-green-400"
                    title="Acknowledge"
                  >
                    <Check className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-7 w-7 p-0 text-slate-400 hover:text-yellow-400"
                    title="Silence"
                  >
                    <VolumeX className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpanded(alert.id)}
                    className="h-7 w-7 p-0 text-slate-400 hover:text-white"
                  >
                    {expandedAlerts.has(alert.id) ? 
                      <ChevronDown className="w-4 h-4" /> : 
                      <ChevronRight className="w-4 h-4" />
                    }
                  </Button>
                </div>
              </div>
            </div>
          ))}
          
          {filteredAlerts.length === 0 && (
            <div className="text-center py-8">
              <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-3" />
              <p className="text-slate-400">No {activeFilter.toLowerCase()} alerts</p>
            </div>
          )}
        </div>
        
        <div className="mt-6 pt-4 border-t border-slate-700/50">
          <Button
            variant="ghost"
            className="w-full text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
          >
            View Alert History
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
