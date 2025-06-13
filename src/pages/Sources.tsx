
import { Layout } from '@/components/Layout';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Search, 
  Plus, 
  Settings, 
  Database, 
  Zap,
  Shield,
  Edit,
  ChevronDown,
  ChevronUp,
  Key,
  Globe,
  Activity
} from 'lucide-react';

interface Source {
  id: string;
  name: string;
  platform: string;
  status: 'connected' | 'disconnected' | 'error';
  logo?: string;
  apiEndpoint: string;
  lastSync: string;
  campaigns: number;
  credentials: {
    apiKey?: string;
    secretKey?: string;
    accessToken?: string;
  };
}

const mockSources: Source[] = [
  {
    id: '1',
    name: 'Bigo Ads',
    platform: 'Bigo',
    status: 'connected',
    apiEndpoint: 'https://api.bigo.tv/ads/v1',
    lastSync: '2024-01-13T10:30:00Z',
    campaigns: 45,
    credentials: {
      apiKey: '••••••••••••7890',
      secretKey: '••••••••••••5678'
    }
  },
  {
    id: '2',
    name: 'Mintegral DSP',
    platform: 'Mintegral',
    status: 'connected',
    apiEndpoint: 'https://api.mintegral.com/api/v2',
    lastSync: '2024-01-13T09:15:00Z',
    campaigns: 32,
    credentials: {
      apiKey: '••••••••••••1234',
      secretKey: '••••••••••••9876'
    }
  },
  {
    id: '3',
    name: 'AppsFlyer Attribution',
    platform: 'AppsFlyer',
    status: 'error',
    apiEndpoint: 'https://api2.appsflyer.com/inappevent',
    lastSync: '2024-01-12T14:20:00Z',
    campaigns: 0,
    credentials: {
      apiKey: '••••••••••••5555',
      accessToken: '••••••••••••3333'
    }
  },
  {
    id: '4',
    name: 'TikTok For Business',
    platform: 'TikTok',
    status: 'disconnected',
    apiEndpoint: 'https://business-api.tiktok.com/open_api',
    lastSync: 'Never',
    campaigns: 0,
    credentials: {}
  }
];

const Sources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSource, setExpandedSource] = useState<string | null>(null);

  const filteredSources = mockSources.filter(source =>
    source.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    source.platform.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'connected': return 'bg-green-600 text-green-100';
      case 'disconnected': return 'bg-gray-600 text-gray-100';
      case 'error': return 'bg-red-600 text-red-100';
      default: return 'bg-gray-600 text-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'connected': return <Zap className="w-4 h-4" />;
      case 'disconnected': return <Database className="w-4 h-4" />;
      case 'error': return <Shield className="w-4 h-4" />;
      default: return <Database className="w-4 h-4" />;
    }
  };

  const stats = [
    { title: 'Total Sources', value: '4', icon: Database, color: 'text-blue-400' },
    { title: 'Connected', value: '2', icon: Zap, color: 'text-green-400' },
    { title: 'Active Campaigns', value: '77', icon: Activity, color: 'text-purple-400' },
    { title: 'Errors', value: '1', icon: Shield, color: 'text-red-400' },
  ];

  return (
    <Layout>
      <div className="p-6 space-y-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Sources</h1>
            <p className="text-slate-400">Manage advertising platform connections and credentials</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Source
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="bg-slate-900/50 border-slate-700 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-800/50">
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search sources..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-800/50 border-slate-600 text-slate-200 placeholder:text-slate-400"
            />
          </div>
          <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
            <Settings className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Sources Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredSources.map((source) => (
            <Card key={source.id} className="bg-slate-900/50 border-slate-700 backdrop-blur-xl hover:bg-slate-800/50 transition-all duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-slate-700 flex items-center justify-center">
                      <Database className="w-6 h-6 text-slate-300" />
                    </div>
                    <div>
                      <CardTitle className="text-white text-lg">{source.name}</CardTitle>
                      <p className="text-slate-400 text-sm">{source.platform}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`${getStatusColor(source.status)} border-none`}>
                      <div className="flex items-center gap-1">
                        {getStatusIcon(source.status)}
                        <span className="capitalize">{source.status}</span>
                      </div>
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setExpandedSource(expandedSource === source.id ? null : source.id)}
                      className="text-slate-400 hover:text-white"
                    >
                      {expandedSource === source.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-white">{source.campaigns}</div>
                    <div className="text-xs text-slate-400">Campaigns</div>
                  </div>
                  <div className="text-center flex-1">
                    <div className="text-sm text-slate-300">Last Sync</div>
                    <div className="text-xs text-slate-400">
                      {source.lastSync === 'Never' ? 'Never' : new Date(source.lastSync).toLocaleString()}
                    </div>
                  </div>
                </div>

                {expandedSource === source.id && (
                  <div className="space-y-4 border-t border-slate-700 pt-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Globe className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-300">API Endpoint:</span>
                      </div>
                      <div className="bg-slate-800/50 p-2 rounded text-xs text-slate-300 font-mono">
                        {source.apiEndpoint}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Key className="w-4 h-4 text-slate-400" />
                        <span className="text-slate-300">Credentials:</span>
                      </div>
                      
                      <div className="space-y-2">
                        {Object.entries(source.credentials).map(([key, value]) => (
                          <div key={key} className="flex items-center justify-between bg-slate-800/30 p-2 rounded">
                            <span className="text-sm text-slate-400 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                            <span className="text-sm text-slate-300 font-mono">{value || 'Not set'}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                        Test Connection
                      </Button>
                      <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Credentials
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredSources.length === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-400 mb-4">
              <Database className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No sources found</p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Sources;
