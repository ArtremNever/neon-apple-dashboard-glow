
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';

interface SettingsCardProps {
  title: string;
  description?: string;
  icon: LucideIcon;
  children: React.ReactNode;
  className?: string;
}

export const SettingsCard = ({ 
  title, 
  description, 
  icon: Icon, 
  children, 
  className = "" 
}: SettingsCardProps) => {
  return (
    <Card className={`bg-slate-900/50 border-slate-700 backdrop-blur-xl ${className}`}>
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <Icon className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            {description && (
              <p className="text-sm text-slate-400 font-normal mt-1">{description}</p>
            )}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {children}
      </CardContent>
    </Card>
  );
};
