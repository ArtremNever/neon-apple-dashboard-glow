
import React from 'react';
import { Link, Key, Plus, Settings, Trash2, Copy, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const IntegrationsForm = () => {
  const integrations = [
    {
      name: 'Google Ads',
      logo: '🎯',
      connected: true,
      lastSync: '5 min ago'
    },
    {
      name: 'Facebook Ads',
      logo: '📘',
      connected: true,
      lastSync: '10 min ago'
    },
    {
      name: 'TikTok Ads',
      logo: '🎵',
      connected: false,
      lastSync: null
    },
    {
      name: 'Twitter Ads',
      logo: '🐦',
      connected: false,
      lastSync: null
    }
  ];

  const apiKeys = [
    {
      name: 'Production API Key',
      key: 'sk_live_••••••••••••••3a2f',
      created: 'Oct 15, 2023',
      lastUsed: '2 hours ago'
    },
    {
      name: 'Development API Key',
      key: 'sk_test_••••••••••••••7b9d',
      created: 'Sep 28, 2023',
      lastUsed: '1 day ago'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Integrations Grid */}
      <div className="bg-slate-900/30 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <Link className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">Platform Integrations</h3>
          </div>
          <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
            {integrations.filter(i => i.connected).length} connected
          </Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {integrations.map((integration, index) => (
            <div
              key={index}
              className={`p-4 rounded-xl border transition-all duration-200 hover:transform hover:scale-[1.02] ${
                integration.connected
                  ? 'bg-green-500/5 border-green-500/20 hover:border-green-500/30'
                  : 'bg-slate-800/30 border-slate-700/50 hover:border-slate-600/50'
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{integration.logo}</div>
                  <div>
                    <h4 className="text-white font-medium">{integration.name}</h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge
                        className={
                          integration.connected
                            ? 'bg-green-500/20 text-green-400 border-green-500/30'
                            : 'bg-slate-600/20 text-slate-400 border-slate-600/30'
                        }
                      >
                        {integration.connected ? 'Connected' : 'Not connected'}
                      </Badge>
                      {integration.lastSync && (
                        <span className="text-slate-500 text-xs">Synced {integration.lastSync}</span>
                      )}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {integration.connected ? (
                    <>
                      <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                        Disconnect
                      </Button>
                    </>
                  ) : (
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Connect
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* API Keys Section */}
      <div className="bg-slate-900/30 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
              <Key className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold text-white">API Keys</h3>
          </div>
          <Button className="bg-purple-600 hover:bg-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            Generate New Key
          </Button>
        </div>

        <div className="space-y-4">
          {apiKeys.map((apiKey, index) => (
            <div
              key={index}
              className="p-4 bg-slate-800/30 border border-slate-700/50 rounded-xl hover:border-slate-600/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-white font-medium">{apiKey.name}</h4>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-sm">
                    <span className="text-slate-300 font-mono bg-slate-800/50 px-2 py-1 rounded">
                      {apiKey.key}
                    </span>
                    <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white p-1">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-slate-500">
                    <span>Created {apiKey.created}</span>
                    <span>Last used {apiKey.lastUsed}</span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 ml-4">
                  <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                    <RefreshCw className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
