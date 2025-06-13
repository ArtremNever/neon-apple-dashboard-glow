import { Layout } from '@/components/Layout';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Database, Zap, Shield, Activity, Plus } from 'lucide-react';
import { EnhancedSourceMetricCard } from '@/components/EnhancedSourceMetricCard';
import { ModernSourceCard } from '@/components/ModernSourceCard';
import { QuickActionsBar } from '@/components/QuickActionsBar';
import { ActivityTimeline } from '@/components/ActivityTimeline';

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

const mockSources: Source[] = [
  {
    id: '1',
    name: 'Bigo Ads',
    platform: 'Bigo',
    status: 'connected',
    apiEndpoint: 'https://api.bigo.tv/ads/v1',
    lastSync: '2024-01-13T10:30:00Z',
    campaigns: 45,
    dailySpend: '12.5K',
    impressions: '2.4M',
    healthScore: 87,
    trendData: [
      { value: 10 }, { value: 15 }, { value: 12 }, { value: 18 }, 
      { value: 22 }, { value: 19 }, { value: 25 }
    ],
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
    dailySpend: '8.2K',
    impressions: '1.8M',
    healthScore: 92,
    trendData: [
      { value: 8 }, { value: 12 }, { value: 10 }, { value: 16 }, 
      { value: 14 }, { value: 18 }, { value: 20 }
    ],
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
    dailySpend: '0',
    impressions: '0',
    healthScore: 23,
    trendData: [
      { value: 15 }, { value: 12 }, { value: 8 }, { value: 5 }, 
      { value: 3 }, { value: 1 }, { value: 0 }
    ],
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
    dailySpend: '0',
    impressions: '0',
    healthScore: 0,
    trendData: [
      { value: 0 }, { value: 0 }, { value: 0 }, { value: 0 }, 
      { value: 0 }, { value: 0 }, { value: 0 }
    ],
    credentials: {}
  }
];

const mockTimelineEvents = [
  {
    id: '1',
    timestamp: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
    type: 'sync' as const,
    source: 'Bigo Ads',
    event: 'Sync completed successfully',
    stats: '+3 new campaigns'
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    type: 'connection' as const,
    source: 'Mintegral DSP',
    event: 'Connection refreshed',
    stats: 'API rate limit reset'
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    type: 'error' as const,
    source: 'AppsFlyer Attribution',
    event: 'Sync failed - Invalid credentials',
    details: 'Authentication failed with error code 401. Please check your API credentials and ensure they have the required permissions.',
    severity: 'high' as const
  },
  {
    id: '4',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
    type: 'update' as const,
    source: 'TikTok For Business',
    event: 'API version updated',
    stats: 'New features available'
  },
  {
    id: '5',
    timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
    type: 'new' as const,
    source: 'Google Ads',
    event: 'New source connected',
    stats: 'Initial setup complete'
  },
  {
    id: '6',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    type: 'sync' as const,
    source: 'Facebook Ads',
    event: 'Campaign data synced',
    stats: '+15% conversion rate'
  },
];

const Sources = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedSource, setExpandedSource] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'cards' | 'table' | 'timeline'>('cards');

  const filteredSources = mockSources.filter(source =>
    source.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    source.platform.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const connectedCount = mockSources.filter(s => s.status === 'connected').length;
  const errorCount = mockSources.filter(s => s.status === 'error').length;
  const totalCampaigns = mockSources.reduce((sum, s) => sum + s.campaigns, 0);

  const handleAddSource = () => {
    console.log('Add source clicked');
  };

  const handleSyncAll = () => {
    console.log('Sync all clicked');
  };

  const handleExportConfig = () => {
    console.log('Export config clicked');
  };

  const handleExpandSource = (id: string) => {
    setExpandedSource(expandedSource === id ? null : id);
  };

  return (
    <Layout>
      <div className="p-6 space-y-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Sources</h1>
            <p className="text-slate-400">Manage advertising platform connections and credentials</p>
          </div>
        </div>

        {/* Enhanced KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <EnhancedSourceMetricCard
            title="Total Sources"
            value={mockSources.length}
            icon={Database}
            donutData={[
              { name: 'Connected', value: connectedCount, color: '#10b981' },
              { name: 'Disconnected', value: mockSources.length - connectedCount, color: '#6b7280' }
            ]}
            delay={0}
          />
          
          <EnhancedSourceMetricCard
            title="Connected"
            value={connectedCount}
            icon={Zap}
            status="success"
            subText="Syncing..."
            miniChartData={[
              { value: 1 }, { value: 2 }, { value: 2 }, { value: 2 }, { value: 2 }
            ]}
            delay={100}
          />
          
          <EnhancedSourceMetricCard
            title="Active Campaigns"
            value={totalCampaigns}
            icon={Activity}
            trend="+12 this week"
            miniChartData={[
              { value: 65 }, { value: 70 }, { value: 68 }, { value: 75 }, { value: 77 }
            ]}
            delay={200}
          />
          
          <EnhancedSourceMetricCard
            title="Errors"
            value={errorCount}
            icon={Shield}
            status="error"
            showQuickAction={errorCount > 0}
            delay={300}
          />
        </div>

        {/* Quick Actions Bar */}
        <QuickActionsBar
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          onAddSource={handleAddSource}
          onSyncAll={handleSyncAll}
          onExportConfig={handleExportConfig}
        />

        {/* Content based on view mode */}
        {viewMode === 'cards' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredSources.map((source) => (
              <ModernSourceCard
                key={source.id}
                source={source}
                onExpand={handleExpandSource}
                isExpanded={expandedSource === source.id}
              />
            ))}
          </div>
        )}

        {viewMode === 'timeline' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div className="grid grid-cols-1 gap-6">
                {filteredSources.map((source) => (
                  <ModernSourceCard
                    key={source.id}
                    source={source}
                    onExpand={handleExpandSource}
                    isExpanded={expandedSource === source.id}
                  />
                ))}
              </div>
            </div>
            <div>
              <ActivityTimeline events={mockTimelineEvents} />
            </div>
          </div>
        )}

        {viewMode === 'table' && (
          <Card className="bg-slate-900/50 backdrop-blur-xl border-slate-700/50">
            <CardContent className="p-6">
              <div className="text-center py-12">
                <Database className="w-12 h-12 mx-auto mb-4 text-slate-400 opacity-50" />
                <p className="text-slate-400 mb-4">Table view coming soon</p>
                <Button
                  variant="outline"
                  onClick={() => setViewMode('cards')}
                  className="border-slate-600 text-slate-300"
                >
                  Switch to Cards View
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {filteredSources.length === 0 && viewMode === 'cards' && (
          <div className="text-center py-12">
            <div className="text-slate-400 mb-4">
              <Database className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No sources found</p>
            </div>
            <Button onClick={handleAddSource} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Source
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Sources;
