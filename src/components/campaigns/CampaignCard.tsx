
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Play, Pause, Edit, MoreVertical, TrendingUp, TrendingDown, ExternalLink } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useState } from 'react';

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
  const [isHovered, setIsHovered] = useState(false);
  const spendPercentage = campaign.budget > 0 ? (campaign.spend / campaign.budget) * 100 : 0;
  const ctr = campaign.impressions > 0 ? ((campaign.clicks / campaign.impressions) * 100).toFixed(2) : '0.00';
  const conversionRate = campaign.clicks > 0 ? ((campaign.conversions / campaign.clicks) * 100).toFixed(2) : '0.00';

  const getStatusConfig = (status: Campaign['status']) => {
    switch (status) {
      case 'active': 
        return { 
          color: 'bg-green-500/10 text-green-400 border-green-500/20',
          icon: Play,
          text: 'Активна'
        };
      case 'paused': 
        return { 
          color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20',
          icon: Pause,
          text: 'Приостановлена'
        };
      case 'draft': 
        return { 
          color: 'bg-gray-500/10 text-gray-400 border-gray-500/20',
          icon: Edit,
          text: 'Черновик'
        };
    }
  };

  const getPlatformConfig = (platform: string) => {
    const configs = {
      facebook: { color: 'bg-blue-500/10 text-blue-400 border-blue-500/20', emoji: '📘' },
      google: { color: 'bg-red-500/10 text-red-400 border-red-500/20', emoji: '🔍' },
      tiktok: { color: 'bg-pink-500/10 text-pink-400 border-pink-500/20', emoji: '🎵' },
      instagram: { color: 'bg-purple-500/10 text-purple-400 border-purple-500/20', emoji: '📷' },
      linkedin: { color: 'bg-blue-600/10 text-blue-300 border-blue-600/20', emoji: '💼' },
    };
    return configs[platform.toLowerCase() as keyof typeof configs] || 
           { color: 'bg-gray-500/10 text-gray-400 border-gray-500/20', emoji: '📱' };
  };

  const statusConfig = getStatusConfig(campaign.status);
  const platformConfig = getPlatformConfig(campaign.platform);
  const StatusIcon = statusConfig.icon;

  return (
    <Card 
      className={`
        group relative overflow-hidden border-0 bg-white/[0.08] backdrop-blur-md cursor-pointer transition-all duration-300
        hover:bg-white/[0.12] hover:scale-[1.02] hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary-500/10
        ${isSelected ? 'ring-2 ring-primary-500/50 border-primary-500/30 bg-white/[0.12]' : ''}
      `}
      onClick={() => onSelect(campaign)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.12] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
      
      {/* Glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 via-transparent to-transparent" />
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-500 to-transparent opacity-50" />
      </div>
      
      <CardHeader className="relative z-10 pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-3">
              <div className={`
                p-2 rounded-lg transition-all duration-300 ${platformConfig.color}
                ${isHovered ? 'scale-110 rotate-3' : ''}
              `}>
                <span className="text-lg">{platformConfig.emoji}</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold text-lg mb-1 truncate group-hover:text-white transition-colors duration-300">
                  {campaign.name}
                </h3>
                <div className="flex items-center gap-2">
                  <Badge className={`${platformConfig.color} text-xs font-medium border transition-all duration-300 ${isHovered ? 'scale-105' : ''}`}>
                    {campaign.platform}
                  </Badge>
                  <Badge className={`${statusConfig.color} text-xs font-medium border transition-all duration-300 flex items-center gap-1 ${isHovered ? 'scale-105' : ''}`}>
                    <StatusIcon className="w-3 h-3" />
                    {statusConfig.text}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`
                  text-slate-400 hover:text-white hover:bg-white/[0.08] transition-all duration-300 
                  ${isHovered ? 'scale-110 rotate-12' : ''}
                `}
                onClick={(e) => e.stopPropagation()}
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-slate-800/90 backdrop-blur-md border-slate-600/50 shadow-xl">
              <DropdownMenuItem className="text-slate-200 hover:bg-slate-700/50 transition-colors duration-200">
                <Edit className="w-4 h-4 mr-2" />
                Редактировать
              </DropdownMenuItem>
              <DropdownMenuItem className="text-slate-200 hover:bg-slate-700/50 transition-colors duration-200">
                {campaign.status === 'active' ? (
                  <>
                    <Pause className="w-4 h-4 mr-2" />
                    Приостановить
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-2" />
                    Запустить
                  </>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem className="text-slate-200 hover:bg-slate-700/50 transition-colors duration-200">
                <ExternalLink className="w-4 h-4 mr-2" />
                Открыть в платформе
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Enhanced Budget Progress */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400 font-medium">Использование бюджета</span>
            <span className="text-slate-300 font-semibold">
              ${campaign.spend.toLocaleString()} / ${campaign.budget.toLocaleString()}
            </span>
          </div>
          <div className="relative">
            <Progress 
              value={spendPercentage} 
              className="h-3 bg-slate-700/50 backdrop-blur-sm border border-slate-600/30 rounded-full overflow-hidden"
            />
            <div className={`
              absolute inset-0 bg-gradient-to-r from-primary-500/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300
            `} />
          </div>
          <div className="flex justify-between text-xs text-slate-500">
            <span>{spendPercentage.toFixed(1)}% использовано</span>
            <span>${(campaign.budget - campaign.spend).toLocaleString()} осталось</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative z-10 pt-0">
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="group/metric">
              <div className="text-xs text-slate-400 uppercase tracking-wide mb-1 font-medium">Показы</div>
              <div className="text-slate-200 font-semibold text-lg group-hover/metric:text-white transition-colors duration-200">
                {campaign.impressions.toLocaleString()}
              </div>
            </div>
            
            <div className="group/metric">
              <div className="text-xs text-slate-400 uppercase tracking-wide mb-1 font-medium">CTR</div>
              <div className="text-slate-200 font-semibold flex items-center gap-2 group-hover/metric:text-white transition-colors duration-200">
                <span className="text-lg">{ctr}%</span>
                <div className={`
                  p-1 rounded transition-all duration-300
                  ${parseFloat(ctr) > 2 
                    ? 'bg-green-500/10 text-green-400' 
                    : 'bg-red-500/10 text-red-400'
                  }
                  ${isHovered ? 'scale-110' : ''}
                `}>
                  {parseFloat(ctr) > 2 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                </div>
              </div>
            </div>
            
            <div className="group/metric">
              <div className="text-xs text-slate-400 uppercase tracking-wide mb-1 font-medium">CPA</div>
              <div className="text-slate-200 font-semibold text-lg group-hover/metric:text-white transition-colors duration-200">
                ${campaign.cpa.toFixed(2)}
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="group/metric">
              <div className="text-xs text-slate-400 uppercase tracking-wide mb-1 font-medium">Клики</div>
              <div className="text-slate-200 font-semibold text-lg group-hover/metric:text-white transition-colors duration-200">
                {campaign.clicks.toLocaleString()}
              </div>
            </div>
            
            <div className="group/metric">
              <div className="text-xs text-slate-400 uppercase tracking-wide mb-1 font-medium">Конверсии</div>
              <div className="text-slate-200 font-semibold flex items-center gap-2 group-hover/metric:text-white transition-colors duration-200">
                <span className="text-lg">{conversionRate}%</span>
                <div className={`
                  p-1 rounded transition-all duration-300
                  ${parseFloat(conversionRate) > 10 
                    ? 'bg-green-500/10 text-green-400' 
                    : 'bg-red-500/10 text-red-400'
                  }
                  ${isHovered ? 'scale-110' : ''}
                `}>
                  {parseFloat(conversionRate) > 10 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                </div>
              </div>
            </div>
            
            <div className="group/metric">
              <div className="text-xs text-slate-400 uppercase tracking-wide mb-1 font-medium">ROAS</div>
              <div className={`
                font-semibold flex items-center gap-2 text-lg transition-all duration-200
                ${campaign.roas >= 3 
                  ? 'text-green-400' 
                  : campaign.roas >= 2 
                    ? 'text-yellow-400' 
                    : 'text-red-400'
                }
              `}>
                <span>{campaign.roas.toFixed(1)}x</span>
                <div className={`
                  p-1 rounded transition-all duration-300
                  ${campaign.roas >= 3 
                    ? 'bg-green-500/10' 
                    : campaign.roas >= 2 
                      ? 'bg-yellow-500/10' 
                      : 'bg-red-500/10'
                  }
                  ${isHovered ? 'scale-110' : ''}
                `}>
                  {campaign.roas >= 2 ? (
                    <TrendingUp className="w-3 h-3" />
                  ) : (
                    <TrendingDown className="w-3 h-3" />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance indicator bar */}
        <div className="mt-6 pt-4 border-t border-slate-700/50">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500">Общая производительность</span>
            <span className={`
              font-medium
              ${campaign.roas >= 3 
                ? 'text-green-400' 
                : campaign.roas >= 2 
                  ? 'text-yellow-400' 
                  : 'text-red-400'
              }
            `}>
              {campaign.roas >= 3 ? 'Отлично' : campaign.roas >= 2 ? 'Хорошо' : 'Требует внимания'}
            </span>
          </div>
          <div className="mt-2 h-1 bg-slate-700/50 rounded-full overflow-hidden">
            <div 
              className={`
                h-full transition-all duration-1000 rounded-full
                ${campaign.roas >= 3 
                  ? 'bg-gradient-to-r from-green-500 to-green-400' 
                  : campaign.roas >= 2 
                    ? 'bg-gradient-to-r from-yellow-500 to-yellow-400' 
                    : 'bg-gradient-to-r from-red-500 to-red-400'
                }
                ${isHovered ? 'shadow-lg' : ''}
              `}
              style={{ 
                width: `${Math.min(100, (campaign.roas / 4) * 100)}%`,
                boxShadow: isHovered ? `0 0 12px ${
                  campaign.roas >= 3 ? 'rgba(34, 197, 94, 0.4)' :
                  campaign.roas >= 2 ? 'rgba(234, 179, 8, 0.4)' :
                  'rgba(239, 68, 68, 0.4)'
                }` : 'none'
              }}
            />
          </div>
        </div>
      </CardContent>

      {/* Floating particles effect on hover */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-4 right-4 w-1 h-1 bg-primary-400 rounded-full animate-ping" />
          <div className="absolute top-8 right-8 w-1 h-1 bg-primary-400 rounded-full animate-ping" style={{ animationDelay: '0.2s' }} />
          <div className="absolute top-6 right-12 w-1 h-1 bg-primary-400 rounded-full animate-ping" style={{ animationDelay: '0.4s' }} />
        </div>
      )}
    </Card>
  );
};
