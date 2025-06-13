
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  CheckCircle, 
  AlertTriangle, 
  Circle,
  ExternalLink,
  MoreVertical
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ServiceCardProps {
  name: string;
  endpoint?: string;
  status: 'healthy' | 'degraded' | 'unhealthy';
  uptime: string;
  responseTime: string;
  version?: string;
  lastDeployed?: string;
}

export const ServiceCard = ({ 
  name, 
  endpoint, 
  status, 
  uptime, 
  responseTime, 
  version,
  lastDeployed 
}: ServiceCardProps) => {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'healthy': return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'degraded': return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'unhealthy': return <Circle className="w-5 h-5 text-red-400" />;
      default: return <Circle className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'healthy': return 'border-green-500/30 shadow-green-500/10';
      case 'degraded': return 'border-yellow-500/30 shadow-yellow-500/10';
      case 'unhealthy': return 'border-red-500/30 shadow-red-500/10';
      default: return 'border-slate-700 shadow-slate-500/5';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy': return 'bg-green-600 text-green-100';
      case 'degraded': return 'bg-yellow-600 text-yellow-100';
      case 'unhealthy': return 'bg-red-600 text-red-100';
      default: return 'bg-gray-600 text-gray-100';
    }
  };

  const getHealthPercentage = (status: string) => {
    switch (status) {
      case 'healthy': return 100;
      case 'degraded': return 75;
      case 'unhealthy': return 25;
      default: return 0;
    }
  };

  return (
    <Card className={cn(
      "bg-slate-900/50 backdrop-blur-xl border transition-all duration-300 hover:scale-105",
      getStatusColor(status),
      status === 'unhealthy' && 'animate-pulse-glow'
    )}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={cn(
              "relative",
              status === 'degraded' && 'animate-pulse'
            )}>
              {getStatusIcon(status)}
              {status === 'healthy' && (
                <div className="absolute -inset-1 bg-green-400/20 rounded-full animate-ping" />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-white">{name}</h3>
              {endpoint && (
                <p className="text-sm text-slate-400 flex items-center gap-1">
                  {endpoint}
                  <ExternalLink className="w-3 h-3" />
                </p>
              )}
            </div>
          </div>
          
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-slate-400">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-slate-500 mb-1">Uptime</p>
            <p className="text-sm font-medium text-white">{uptime}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-1">Response Time</p>
            <p className="text-sm font-medium text-white">{responseTime}</p>
          </div>
        </div>

        {(version || lastDeployed) && (
          <div className="grid grid-cols-2 gap-4 mb-4 text-xs">
            {version && (
              <div>
                <p className="text-slate-500 mb-1">Version</p>
                <p className="text-slate-300">{version}</p>
              </div>
            )}
            {lastDeployed && (
              <div>
                <p className="text-slate-500 mb-1">Last Deploy</p>
                <p className="text-slate-300">{lastDeployed}</p>
              </div>
            )}
          </div>
        )}

        <div className="mb-4">
          <div className="flex justify-between text-xs mb-2">
            <span className="text-slate-500">Health Score</span>
            <span className="text-slate-300">{getHealthPercentage(status)}%</span>
          </div>
          <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
            <div 
              className={cn(
                "h-full transition-all duration-1000 ease-out",
                status === 'healthy' && 'bg-green-500',
                status === 'degraded' && 'bg-yellow-500',
                status === 'unhealthy' && 'bg-red-500'
              )}
              style={{ width: `${getHealthPercentage(status)}%` }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Badge className={cn("border-none text-xs", getStatusBadge(status))}>
            <div className={cn(
              "w-2 h-2 rounded-full mr-2",
              status === 'healthy' && 'bg-green-400',
              status === 'degraded' && 'bg-yellow-400',
              status === 'unhealthy' && 'bg-red-400'
            )} />
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
          
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-blue-400 hover:text-blue-300">
              Logs
            </Button>
            <Button variant="ghost" size="sm" className="h-7 px-2 text-xs text-blue-400 hover:text-blue-300">
              Metrics
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
