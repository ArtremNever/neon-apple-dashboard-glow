
import { Layout } from '@/components/Layout';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Plus, Settings, Play, Pause, Edit, BarChart, Target, Sparkles, Filter, ArrowUpRight, TrendingUp } from 'lucide-react';
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
  },
  {
    id: '4',
    name: 'Holiday Special Promo',
    platform: 'Instagram',
    status: 'active',
    budget: 4500,
    spend: 2800,
    impressions: 78000,
    clicks: 1560,
    conversions: 89,
    cpa: 31.46,
    roas: 2.4,
    createdAt: '2024-01-12'
  },
  {
    id: '5',
    name: 'Product Launch Campaign',
    platform: 'LinkedIn',
    status: 'draft',
    budget: 6000,
    spend: 0,
    impressions: 0,
    clicks: 0,
    conversions: 0,
    cpa: 0,
    roas: 0,
    createdAt: '2024-01-18'
  },
  {
    id: '6',
    name: 'Retargeting Campaign',
    platform: 'Facebook',
    status: 'active',
    budget: 2500,
    spend: 1950,
    impressions: 34000,
    clicks: 890,
    conversions: 67,
    cpa: 29.10,
    roas: 3.8,
    createdAt: '2024-01-14'
  }
];

const Campaigns = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'paused' | 'draft'>('all');

  const filteredCampaigns = mockCampaigns.filter(campaign => {
    const matchesSearch = campaign.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || campaign.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  // Calculate summary metrics
  const totalBudget = mockCampaigns.reduce((sum, campaign) => sum + campaign.budget, 0);
  const totalSpend = mockCampaigns.reduce((sum, campaign) => sum + campaign.spend, 0);
  const totalConversions = mockCampaigns.reduce((sum, campaign) => sum + campaign.conversions, 0);
  const activeCampaigns = mockCampaigns.filter(c => c.status === 'active').length;

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900/95 to-slate-950 overflow-auto">
        {/* Animated background elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-500/3 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-3/4 left-1/4 w-80 h-80 bg-purple-500/2 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 right-3/4 w-64 h-64 bg-emerald-500/2 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
        </div>

        {/* Main content */}
        <div className="relative z-10 p-8 space-y-8">
          {/* Enhanced header */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-3">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-2xl bg-primary-500/10 border border-primary-500/20 flex items-center justify-center backdrop-blur-sm shadow-lg shadow-primary-500/10 animate-pulse-glow">
                    <Target className="w-8 h-8 text-primary-400" />
                  </div>
                  <div>
                    <h1 className="text-5xl font-semibold text-white tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent animate-fade-in">
                      Campaigns
                    </h1>
                    <p className="text-slate-400 text-xl font-normal mt-2 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                      Управление и оптимизация рекламных кампаний
                    </p>
                  </div>
                </div>
              </div>
              
              <Button 
                className="bg-primary-500 hover:bg-primary-600 text-white border-0 backdrop-blur-md transition-all duration-250 hover:scale-105 hover:shadow-lg hover:shadow-primary-500/20 animate-fade-in"
                style={{ animationDelay: '0.4s' }}
              >
                <Plus className="w-4 h-4 mr-2" />
                Новая кампания
              </Button>
            </div>
          </div>

          {/* Enhanced summary metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Card className="group relative overflow-hidden border-0 bg-white/[0.08] backdrop-blur-md hover:bg-white/[0.12] transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="relative z-10 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-400 uppercase tracking-wide">Активные кампании</p>
                    <p className="text-3xl font-semibold text-white mt-2">{activeCampaigns}</p>
                  </div>
                  <div className="p-3 bg-green-500/10 rounded-xl border border-green-500/20">
                    <Play className="w-6 h-6 text-green-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden border-0 bg-white/[0.08] backdrop-blur-md hover:bg-white/[0.12] transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="relative z-10 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-400 uppercase tracking-wide">Общий бюджет</p>
                    <p className="text-3xl font-semibold text-white mt-2">${totalBudget.toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                    <BarChart className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden border-0 bg-white/[0.08] backdrop-blur-md hover:bg-white/[0.12] transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="relative z-10 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-400 uppercase tracking-wide">Потрачено</p>
                    <p className="text-3xl font-semibold text-white mt-2">${totalSpend.toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-orange-500/10 rounded-xl border border-orange-500/20">
                    <TrendingUp className="w-6 h-6 text-orange-400" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="group relative overflow-hidden border-0 bg-white/[0.08] backdrop-blur-md hover:bg-white/[0.12] transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1">
              <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <CardContent className="relative z-10 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-400 uppercase tracking-wide">Конверсии</p>
                    <p className="text-3xl font-semibold text-white mt-2">{totalConversions.toLocaleString()}</p>
                  </div>
                  <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
                    <Target className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced search and filters */}
          <Card className="group relative overflow-hidden border-0 bg-white/[0.08] backdrop-blur-md hover:bg-white/[0.12] transition-all duration-300 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <CardContent className="relative z-10 p-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Поиск кампаний..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/[0.08] border-white/[0.12] text-slate-200 placeholder:text-slate-400 backdrop-blur-md hover:bg-white/[0.12] focus:bg-white/[0.12] transition-all duration-250"
                  />
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    {['all', 'active', 'paused', 'draft'].map((status) => (
                      <Button
                        key={status}
                        variant={filterStatus === status ? "default" : "outline"}
                        size="sm"
                        onClick={() => setFilterStatus(status as any)}
                        className={`
                          transition-all duration-250 hover:scale-105
                          ${filterStatus === status 
                            ? 'bg-primary-500 text-white border-primary-500 shadow-lg shadow-primary-500/20' 
                            : 'bg-white/[0.08] border-white/[0.12] text-slate-300 hover:bg-white/[0.12] hover:border-primary-500/30 hover:text-primary-400'
                          }
                        `}
                      >
                        {status === 'all' ? 'Все' : status === 'active' ? 'Активные' : status === 'paused' ? 'Приостановлены' : 'Черновики'}
                      </Button>
                    ))}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="bg-white/[0.08] border-white/[0.12] text-slate-300 hover:bg-white/[0.12] hover:border-primary-500/30 hover:text-primary-400 backdrop-blur-md transition-all duration-250 hover:scale-105"
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    Фильтры
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Enhanced campaigns grid */}
          <div className="space-y-6">
            {filteredCampaigns.length > 0 ? (
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                {filteredCampaigns.map((campaign, index) => (
                  <div
                    key={campaign.id}
                    className="animate-fade-in-up"
                    style={{ animationDelay: `${0.7 + index * 0.1}s` }}
                  >
                    <CampaignCard
                      campaign={campaign}
                      onSelect={setSelectedCampaign}
                      isSelected={selectedCampaign?.id === campaign.id}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <Card className="group relative overflow-hidden border-0 bg-white/[0.08] backdrop-blur-md hover:bg-white/[0.12] transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <CardContent className="relative z-10 text-center py-16">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-slate-500/10 border border-slate-500/20 flex items-center justify-center">
                    <BarChart className="w-10 h-10 text-slate-400 opacity-50" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">Кампании не найдены</h3>
                  <p className="text-slate-400 mb-6">Попробуйте изменить параметры поиска или создайте новую кампанию</p>
                  <Button className="bg-primary-500 hover:bg-primary-600 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Создать кампанию
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Campaigns;
