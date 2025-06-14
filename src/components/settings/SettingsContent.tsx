
import React from 'react';
import { Save, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SettingsContentProps {
  title: string;
  description: string;
  children: React.ReactNode;
  onSave?: () => void;
  lastSaved?: string;
}

export const SettingsContent = ({ 
  title, 
  description, 
  children, 
  onSave,
  lastSaved = "2 hours ago"
}: SettingsContentProps) => {
  return (
    <div className="flex-1 flex flex-col">
      {/* Content Header */}
      <div className="p-8 border-b border-slate-700/50 bg-slate-900/20 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">{title}</h1>
            <p className="text-slate-400">{description}</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="flex items-center text-slate-500 text-sm">
                <Clock className="w-4 h-4 mr-2" />
                Last saved {lastSaved}
              </div>
            </div>
            <Button onClick={onSave} className="bg-blue-600 hover:bg-blue-700 text-white">
              <Save className="w-4 h-4 mr-2" />
              Save Changes
            </Button>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="flex-1 overflow-y-auto p-8">
        {children}
      </div>
    </div>
  );
};
