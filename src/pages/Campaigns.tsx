
import { Layout } from '@/components/Layout';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Plus, Settings, Play, Pause, Edit, BarChart } from 'lucide-react';
import { CampaignCard } from '@/components/campaigns/CampaignCard';

interface Campaign {
  id: string;
  name: string;
  platform: string;
  status: 'active' | 'paused' | 'draft';
  budget: number;
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
  cpa: number;
  roas: number;
  createdAt: string;
}

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'Summer Sale Campaign',
    platform: 'Facebook',
    status: 'active',
    budget: 5000,
    spend: 3200,
    impressions: 125000,
    clicks: 2400,
    conversions: 156,
    cpa: 20.51,
    roas: 3.2,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Mobile App Install Q4',
    platform: 'Google',
    status: 'active',
    budget: 8000,
    spend: 6100,
    impressions: 89000,
    clicks: 1890,
    conversions: 245,
    cpa: 24.90,
    roas: 2.8,
    createdAt: '2024-01-10'
  },
  {
    id: '3',
    name: 'Brand Awareness Campaign',
    platform: 'TikTok',
    status: 'paused',
    budget: 3000,
    spend: 1200,
    impressions: 45000,
    clicks: 890,
    conversions: 34,
    cpa: 35.29,
    roas: 1.9,
    createdAt: '2024-01-08'
  }
];

const Campaigns = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  const filteredCampaigns = mockCampaigns.filter(campaign =>
    campaign.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="p-6 space-y-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Campaigns</h1>
            <p className="text-slate-400">Manage and optimize your advertising campaigns</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            New Campaign
          </Button>
        </div>

        {/* Search and Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search campaigns..."
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

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCampaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              campaign={campaign}
              onSelect={setSelectedCampaign}
              isSelected={selectedCampaign?.id === campaign.id}
            />
          ))}
        </div>

        {filteredCampaigns.length === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-400 mb-4">
              <BarChart className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No campaigns found</p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Campaigns;
