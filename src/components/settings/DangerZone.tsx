
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Trash2 } from 'lucide-react';

interface DangerAction {
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
  icon?: React.ReactNode;
}

interface DangerZoneProps {
  actions: DangerAction[];
}

export const DangerZone = ({ actions }: DangerZoneProps) => {
  return (
    <Card className="bg-slate-900/50 border-red-700/50 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="text-red-400 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-red-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">Danger Zone</h3>
            <p className="text-sm text-red-400/70 font-normal mt-1">
              These actions cannot be undone. Please be careful.
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {actions.map((action, index) => (
            <div key={index} className="border-t border-red-800/30 pt-6 first:border-t-0 first:pt-0">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="text-slate-200 font-medium mb-2">{action.title}</h4>
                  <p className="text-slate-400 text-sm">{action.description}</p>
                </div>
                <Button 
                  variant="outline" 
                  onClick={action.onClick}
                  className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white flex items-center gap-2"
                >
                  {action.icon || <Trash2 className="w-4 h-4" />}
                  {action.buttonText}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
