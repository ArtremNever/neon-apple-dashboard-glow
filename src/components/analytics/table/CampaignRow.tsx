
import { Badge } from '@/components/ui/badge';
import { BarChart3 } from 'lucide-react';

interface CampaignRowProps {
  campaign: {
    id: string;
    name: string;
    installs: number;
    revenue: number;
    ctr: number;
    badges?: string[];
  };
}

export const CampaignRow = ({ campaign }: CampaignRowProps) => {
  return (
    <tr 
      className="bg-slate-800/20 border-b border-slate-800/30 hover:bg-slate-800/40 transition-colors animate-fade-in"
    >
      <td className="py-3 px-6"></td>
      <td className="py-3 px-6 pl-16">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 rounded bg-slate-600/50 flex items-center justify-center">
            <BarChart3 className="w-3 h-3 text-slate-400" />
          </div>
          <div>
            <div className="text-slate-300 text-sm font-medium">{campaign.name}</div>
            {campaign.badges && (
              <div className="flex gap-1 mt-1">
                {campaign.badges.map((badge, idx) => (
                  <Badge key={idx} className="text-xs bg-slate-700 text-slate-300 border-slate-600">
                    {badge}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
      </td>
      <td className="py-3 px-6 text-right text-slate-400 text-sm">-</td>
      <td className="py-3 px-6 text-right text-slate-400 text-sm font-mono">
        {campaign.installs.toLocaleString()}
      </td>
      <td className="py-3 px-6 text-right text-slate-400 text-sm font-mono">
        ${campaign.revenue.toLocaleString()}
      </td>
      <td className="py-3 px-6 text-right text-slate-400 text-sm font-mono">
        {campaign.ctr.toFixed(2)}%
      </td>
      <td className="py-3 px-6 text-center">-</td>
      <td className="py-3 px-6"></td>
    </tr>
  );
};
