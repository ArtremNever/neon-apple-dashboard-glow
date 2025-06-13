
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  RefreshCw, 
  Settings, 
  Plus,
  ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface GrafanaSectionProps {
  isConfigured?: boolean;
  grafanaUrl?: string;
}

export const GrafanaSection = ({ isConfigured = false, grafanaUrl }: GrafanaSectionProps) => {
  const [activeTab, setActiveTab] = useState('Overview');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [timeRange, setTimeRange] = useState('Last 1h');

  const tabs = ['Overview', 'Application', 'Infrastructure', 'Kubernetes', 'Custom'];
  const timeRanges = ['Last 15m', 'Last 1h', 'Last 24h', 'Last 7d'];

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  const ConfigurationWizard = () => (
    <div className="flex items-center justify-center min-h-96">
      <div className="text-center space-y-6 max-w-md">
        <div className="p-4 rounded-full bg-blue-500/10 w-20 h-20 mx-auto flex items-center justify-center">
          <Settings className="w-10 h-10 text-blue-400" />
        </div>
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">Connect your Grafana Dashboard</h3>
          <p className="text-slate-400">Integrate your existing Grafana dashboards for comprehensive monitoring</p>
        </div>
        
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30">
            <div className="w-8 h-8 rounded-full bg-green-600 flex items-center justify-center text-white text-sm font-bold">✓</div>
            <span className="text-slate-300">Install Prometheus</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-bold">2</div>
            <span className="text-white font-medium">Configure Grafana</span>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-800/30">
            <div className="w-8 h-8 rounded-full bg-slate-600 flex items-center justify-center text-slate-300 text-sm font-bold">3</div>
            <span className="text-slate-400">Add Dashboard URL</span>
          </div>
        </div>

        <div className="space-y-3">
          <input 
            className="w-full p-3 rounded-lg bg-slate-800/50 border border-slate-700 text-white placeholder-slate-400"
            placeholder="Grafana URL (e.g., https://grafana.company.com)"
          />
          <input 
            type="password"
            className="w-full p-3 rounded-lg bg-slate-800/50 border border-slate-700 text-white placeholder-slate-400"
            placeholder="API Key"
          />
          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            Connect Dashboard
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5" />
            Performance Dashboards
          </CardTitle>
          
          <div className="flex items-center gap-3">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
            >
              {timeRanges.map(range => (
                <option key={range} value={range}>{range}</option>
              ))}
            </select>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleRefresh}
              className="border-slate-600 text-slate-300 hover:bg-slate-800"
            >
              <RefreshCw className={cn("w-4 h-4 mr-2", isRefreshing && "animate-spin")} />
              Auto-refresh: 30s
            </Button>

            {isConfigured && (
              <Button
                variant="outline"
                size="sm"
                className="border-slate-600 text-slate-300 hover:bg-slate-800"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                Open in Grafana
              </Button>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent>
        {isConfigured && (
          <div className="mb-6">
            <div className="flex items-center gap-2 border-b border-slate-700">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium transition-colors relative",
                    activeTab === tab 
                      ? "text-blue-400 border-b-2 border-blue-400" 
                      : "text-slate-400 hover:text-slate-300"
                  )}
                >
                  {tab}
                  {tab === 'Custom' && (
                    <Badge className="ml-2 bg-blue-600 text-blue-100 text-xs">2</Badge>
                  )}
                </button>
              ))}
              <button className="px-3 py-2 text-slate-400 hover:text-slate-300">
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {isConfigured ? (
          <div className="rounded-xl overflow-hidden bg-slate-950/50">
            <iframe
              src={grafanaUrl || "about:blank"}
              className="w-full h-96 border-none"
              title="Grafana Dashboard"
            />
          </div>
        ) : (
          <ConfigurationWizard />
        )}
      </CardContent>
    </Card>
  );
};
