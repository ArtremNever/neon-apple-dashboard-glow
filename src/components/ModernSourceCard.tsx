
import { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Database, 
  Zap, 
  Shield, 
  ChevronDown, 
  ChevronUp, 
  Globe, 
  Key, 
  Copy, 
  Eye, 
  Settings,
  RefreshCw,
  Activity
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { LineChart, Line, ResponsiveContainer, AreaChart, Area } from 'recharts';

interface Source {
  id: string;
  name: string;
  platform: string;
  status: 'connected' | 'disconnected' | 'error';
  logo?: string;
  apiEndpoint: string;
  lastSync: string;
  campaigns: number;
  dailySpend: string;
  impressions: string;
  credentials: {
    apiKey?: string;
    secretKey?: string;
    accessToken?: string;
  };
  healthScore: number;
  trendData: Array<{ value: number }>;
}

interface ModernSourceCardProps {
  source: Source;
  onExpand: (id: string) => void;
  isExpanded: boolean;
}

export const ModernSourceCard = ({ source, onExpand, isExpanded }: ModernSourceCardProps) => {
  const [showCredentials, setShowCredentials] = useState(false);

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'connected':
        return {
          bg: 'bg-green-500/10 border-green-500/30',
          ring: 'ring-green-500/20',
          text: 'text-green-400',
          dot: 'bg-green-400 shadow-green-400/50',
          badge: 'bg-green-600 text-green-100'
        };
      case 'error':
        return {
          bg: 'bg-red-500/10 border-red-500/30',
          ring: 'ring-red-500/20',
          text: 'text-red-400',
          dot: 'bg-red-400 shadow-red-400/50',
          badge: 'bg-red-600 text-red-100'
        };
      default:
        return {
          bg: 'bg-slate-700/30 border-slate-600/30',
          ring: 'ring-slate-500/20',
          text: 'text-slate-400',
          dot: 'bg-slate-400 shadow-slate-400/50',
          badge: 'bg-slate-600 text-slate-100'
        };
    }
  };

  const statusStyles = getStatusStyles(source.status);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Card className={cn(
      "bg-slate-900/50 backdrop-blur-xl hover:bg-slate-800/50 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 border",
      statusStyles.bg
    )}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Logo with status ring */}
            <div className="relative">
              <div className={cn(
                "w-12 h-12 rounded-xl bg-slate-700 flex items-center justify-center border-2 transition-all duration-300",
                statusStyles.ring
              )}>
                <Database className="w-6 h-6 text-slate-300" />
              </div>
              {/* Animated status dot */}
              <div className={cn(
                "absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-900",
                statusStyles.dot
              )}>
                {source.status === 'connected' && (
                  <div className={cn("w-full h-full rounded-full animate-ping", statusStyles.dot)} />
                )}
              </div>
            </div>
            
            <div className="space-y-1">
              <h3 className="text-lg font-semibold text-white">{source.name}</h3>
              <p className="text-sm text-slate-400">{source.platform}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Status badge */}
            <Badge className={cn("border-none", statusStyles.badge)}>
              <div className="flex items-center gap-1.5">
                {source.status === 'connected' ? <Zap className="w-3 h-3" /> : 
                 source.status === 'error' ? <Shield className="w-3 h-3" /> : 
                 <Database className="w-3 h-3" />}
                <span className="capitalize">{source.status}</span>
              </div>
            </Badge>
            
            {/* Expand button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onExpand(source.id)}
              className="text-slate-400 hover:text-white"
            >
              {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-slate-800/30 rounded-lg">
            <div className="text-xl font-bold text-white">{source.campaigns}</div>
            <div className="text-xs text-slate-400">Campaigns</div>
          </div>
          <div className="text-center p-3 bg-slate-800/30 rounded-lg">
            <div className="text-xl font-bold text-white">{source.dailySpend}</div>
            <div className="text-xs text-slate-400">Daily Spend</div>
          </div>
          <div className="text-center p-3 bg-slate-800/30 rounded-lg">
            <div className="text-xl font-bold text-white">{source.impressions}</div>
            <div className="text-xs text-slate-400">Impressions</div>
          </div>
        </div>

        {/* Last sync info */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-slate-400">Last Sync:</span>
          <span className={cn("font-medium", statusStyles.text)}>
            {source.lastSync === 'Never' ? 'Never' : new Date(source.lastSync).toLocaleString()}
          </span>
        </div>

        {/* Mini trend chart */}
        <div className="h-12 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={source.trendData}>
              <Area
                type="monotone"
                dataKey="value"
                stroke={source.status === 'connected' ? '#10b981' : '#3b82f6'}
                fill={source.status === 'connected' ? '#10b981' : '#3b82f6'}
                fillOpacity={0.1}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Expanded content */}
        {isExpanded && (
          <div className="space-y-4 border-t border-slate-700 pt-4 animate-fade-in">
            {/* API Endpoint */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Globe className="w-4 h-4 text-slate-400" />
                <span className="text-slate-300">API Endpoint:</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/50 p-2 rounded group">
                <code className="text-xs text-slate-300 font-mono flex-1 truncate">
                  {source.apiEndpoint}
                </code>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(source.apiEndpoint)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Copy className="w-3 h-3" />
                </Button>
              </div>
            </div>

            {/* Credentials */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm">
                  <Key className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-300">Credentials:</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCredentials(!showCredentials)}
                  className="text-xs"
                >
                  <Eye className="w-3 h-3 mr-1" />
                  {showCredentials ? 'Hide' : 'Show'}
                </Button>
              </div>
              
              <div className="space-y-2">
                {Object.entries(source.credentials).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between bg-slate-800/30 p-2 rounded group">
                    <span className="text-sm text-slate-400 capitalize">
                      {key.replace(/([A-Z])/g, ' $1')}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-slate-300 font-mono">
                        {showCredentials ? value : value || 'Not set'}
                      </span>
                      {value && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(value)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Copy className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Health Score */}
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-300">Health Score:</span>
              <div className="flex items-center gap-2">
                <div className="w-20 h-2 bg-slate-700 rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full rounded-full transition-all duration-1000",
                      source.healthScore >= 80 ? 'bg-green-500' :
                      source.healthScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    )}
                    style={{ width: `${source.healthScore}%` }}
                  />
                </div>
                <span className="text-sm font-medium text-white">{source.healthScore}%</span>
              </div>
            </div>
            
            {/* Action buttons */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Sync Now
                </Button>
                <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  <Settings className="w-4 h-4 mr-2" />
                  Configure
                </Button>
              </div>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                Test Connection
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
