
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { user, bell, settings, zap, display } from 'lucide-react';
import { SettingsState } from '@/hooks/useSettings';
import { GeneralSettingsTab } from './tabs/GeneralSettingsTab';
import { NotificationsSettingsTab } from './tabs/NotificationsSettingsTab';
import { SecuritySettingsTab } from './tabs/SecuritySettingsTab';
import { ApiSettingsTab } from './tabs/ApiSettingsTab';
import { DisplaySettingsTab } from './tabs/DisplaySettingsTab';

interface SettingsTabsProps {
  settings: SettingsState;
  onSettingChange: (key: keyof SettingsState, value: any) => void;
}

export const SettingsTabs = ({ settings, onSettingChange }: SettingsTabsProps) => {
  return (
    <Tabs defaultValue="general" className="space-y-6">
      <TabsList className="bg-slate-800/50 border-slate-600 grid grid-cols-5 w-full">
        <TabsTrigger value="general" className="data-[state=active]:bg-slate-700">
          <user className="w-4 h-4 mr-2" />
          General
        </TabsTrigger>
        <TabsTrigger value="notifications" className="data-[state=active]:bg-slate-700">
          <bell className="w-4 h-4 mr-2" />
          Notifications
        </TabsTrigger>
        <TabsTrigger value="security" className="data-[state=active]:bg-slate-700">
          <zap className="w-4 h-4 mr-2" />
          Security
        </TabsTrigger>
        <TabsTrigger value="api" className="data-[state=active]:bg-slate-700">
          <settings className="w-4 h-4 mr-2" />
          API & Integrations
        </TabsTrigger>
        <TabsTrigger value="display" className="data-[state=active]:bg-slate-700">
          <display className="w-4 h-4 mr-2" />
          Display
        </TabsTrigger>
      </TabsList>

      <TabsContent value="general">
        <GeneralSettingsTab settings={settings} onSettingChange={onSettingChange} />
      </TabsContent>

      <TabsContent value="notifications">
        <NotificationsSettingsTab settings={settings} onSettingChange={onSettingChange} />
      </TabsContent>

      <TabsContent value="security">
        <SecuritySettingsTab settings={settings} onSettingChange={onSettingChange} />
      </TabsContent>

      <TabsContent value="api">
        <ApiSettingsTab settings={settings} onSettingChange={onSettingChange} />
      </TabsContent>

      <TabsContent value="display">
        <DisplaySettingsTab settings={settings} onSettingChange={onSettingChange} />
      </TabsContent>
    </Tabs>
  );
};
