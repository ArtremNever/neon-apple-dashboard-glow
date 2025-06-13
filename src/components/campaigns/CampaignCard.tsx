
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Play, Pause, Edit, MoreVertical, TrendingUp, TrendingDown } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

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

interface CampaignCardProps {
  campaign: Campaign;
  onSelect: (campaign: Campaign) => void;
  isSelected: boolean;
}

export const CampaignCard = ({ campaign, onSelect, isSelected }: CampaignCardProps) => {
  const spendPercentage = (campaign.spend / campaign.budget) * 100;
  const ctr = ((campaign.clicks / campaign.impressions) * 100).toFixed(2);
  const conversionRate = ((campaign.conversions / campaign.clicks) * 100).toFixed(2);

  const getStatusColor = (status: Campaign['status']) => {
    switch (status) {
      case 'active': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'paused': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'draft': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'google': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'tiktok': return 'bg-pink-500/20 text-pink-400 border-pink-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <Card 
      className={`bg-slate-900/50 border-slate-700 backdrop-blur-xl hover:bg-slate-900/70 transition-all duration-200 cursor-pointer ${
        isSelected ? 'ring-2 ring-blue-500/50 border-blue-500/50' : ''
      }`}
      onClick={() => onSelect(campaign)}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-white font-semibold text-lg mb-2 truncate">{campaign.name}</h3>
            <div className="flex items-center gap-2 mb-3">
              <Badge className={getPlatformColor(campaign.platform)}>
                {campaign.platform}
              </Badge>
              <Badge className={getStatusColor(campaign.status)}>
                {campaign.status}
              </Badge>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-slate-800 border-slate-600">
              <DropdownMenuItem className="text-slate-200 hover:bg-slate-700">
                <Edit className="w-4 h-4 mr-2" />
                Edit Campaign
              </DropdownMenuItem>
              <DropdownMenuItem className="text-slate-200 hover:bg-slate-700">
                {campaign.status === 'active' ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Pause Campaign
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Start Campaign
                  </>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Budget Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Budget Usage</span>
            <span className="text-slate-300">${campaign.spend.toLocaleString()} / ${campaign.budget.toLocaleString()}</span>
          </div>
          <Progress value={spendPercentage} className="h-2 bg-slate-700" />
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wide mb-1">Impressions</div>
              <div className="text-slate-200 font-medium">{campaign.impressions.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wide mb-1">CTR</div>
              <div className="text-slate-200 font-medium flex items-center gap-1">
                {ctr}%
                {parseFloat(ctr) > 2 ? (
                  <TrendingUp className="w-3 h-3 text-green-400" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-red-400" />
                )}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wide mb-1">CPA</div>
              <div className="text-slate-200 font-medium">${campaign.cpa}</div>
            </div>
          </div>
          
          <div className="space-y-3">
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wide mb-1">Clicks</div>
              <div className="text-slate-200 font-medium">{campaign.clicks.toLocaleString()}</div>
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wide mb-1">Conv. Rate</div>
              <div className="text-slate-200 font-medium flex items-center gap-1">
                {conversionRate}%
                {parseFloat(conversionRate) > 10 ? (
                  <TrendingUp className="w-3 h-3 text-green-400" />
                ) : (
                  <TrendingDown className="w-3 h-3 text-red-400" />
                )}
              </div>
            </div>
            <div>
              <div className="text-xs text-slate-400 uppercase tracking-wide mb-1">ROAS</div>
              <div className={`font-medium flex items-center gap-1 ${
                campaign.roas >= 3 ? 'text-green-400' : campaign.roas >= 2 ? 'text-yellow-400' : 'text-red-400'
              }`}>
                {campaign.roas}x
                {campaign.roas >= 3 ? (
                  <TrendingUp className="w-3 h-3" />
                ) : (
                  <TrendingDown className="w-3 h-3" />
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
