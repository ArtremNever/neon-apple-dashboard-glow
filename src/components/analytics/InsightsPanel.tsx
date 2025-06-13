
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Lightbulb, 
  TrendingUp, 
  AlertTriangle,
  X
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

interface Insight {
  id: string;
  type: 'opportunity' | 'warning' | 'info';
  title: string;
  description: string;
  action?: string;
}

export const InsightsPanel = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [insights] = useState<Insight[]>([
    {
      id: '1',
      type: 'opportunity',
      title: 'Performance Opportunity',
      description: 'mintegral_int shows 23% better CTR than average. Consider increasing budget allocation.',
      action: 'Increase Budget'
    },
    {
      id: '2',
      type: 'warning',
      title: 'Campaign Alert',
      description: 'facebook_int performance dropped 15% compared to last week. Review recent changes.',
      action: 'Review Campaign'
    },
    {
      id: '3',
      type: 'info',
      title: 'Trend Analysis',
      description: 'Weekend performance typically increases by 12%. Consider adjusting bid strategies.',
      action: 'View Details'
    }
  ]);

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity':
        return <TrendingUp className="w-5 h-5 text-green-400" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      default:
        return <Lightbulb className="w-5 h-5 text-blue-400" />;
    }
  };

  const getInsightColors = (type: string) => {
    switch (type) {
      case 'opportunity':
        return 'border-green-500/20 bg-green-500/5';
      case 'warning':
        return 'border-yellow-500/20 bg-yellow-500/5';
      default:
        return 'border-blue-500/20 bg-blue-500/5';
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 w-80 max-h-96 overflow-y-auto z-50 animate-slide-in-right">
      <Card className="bg-slate-900/95 border-slate-700 backdrop-blur-xl shadow-2xl">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-400" />
              <h3 className="font-semibold text-white">AI Insights</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsVisible(false)}
              className="h-6 w-6 p-0 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="space-y-3">
            {insights.map((insight) => (
              <div
                key={insight.id}
                className={cn(
                  "p-3 rounded-lg border transition-all duration-200 hover:scale-[1.02]",
                  getInsightColors(insight.type)
                )}
              >
                <div className="flex items-start gap-3">
                  {getInsightIcon(insight.type)}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-white mb-1">
                      {insight.title}
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed mb-2">
                      {insight.description}
                    </p>
                    {insight.action && (
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 px-2 text-xs text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                      >
                        {insight.action}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-700/50">
            <Button
              variant="ghost"
              size="sm"
              className="w-full text-xs text-slate-400 hover:text-slate-200"
            >
              View All Insights
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
