
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save } from 'lucide-react';

export const SettingsHeader = () => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Settings</h1>
        <p className="text-slate-400">Configure your application preferences and integrations</p>
      </div>
      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
        <Save className="w-4 h-4 mr-2" />
        Save Changes
      </Button>
    </div>
  );
};
