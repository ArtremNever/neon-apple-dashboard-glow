
import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface KpiForecastProps {
  forecast: {
    cpi: number;
    ctr?: number;
    cvr?: number;
  };
}

export const KpiForecast = ({ forecast }: KpiForecastProps) => {
  return (
    <Card className="px-3 py-2 bg-primary/10 border-primary/20">
      <div className="flex items-center gap-2 text-sm">
        <TrendingUp className="w-4 h-4 text-primary" />
        <span className="text-muted-foreground">KPI Forecast:</span>
        <span className="font-medium">
          ${forecast.cpi.toFixed(2)} CPI
        </span>
        {forecast.ctr && (
          <>
            <span className="text-muted-foreground">•</span>
            <span>{forecast.ctr.toFixed(1)}% CTR</span>
          </>
        )}
      </div>
    </Card>
  );
};
