
import { Layout } from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, User, Bell, Shield, Key, Palette } from 'lucide-react';
import { useSettings } from '@/hooks/useSettings';
import { GeneralSettingsTab } from '@/components/settings/tabs/GeneralSettingsTab';
import { NotificationsSettingsTab } from '@/components/settings/tabs/NotificationsSettingsTab';
import { SecuritySettingsTab } from '@/components/settings/tabs/SecuritySettingsTab';
import { ApiSettingsTab } from '@/components/settings/tabs/ApiSettingsTab';
import { DisplaySettingsTab } from '@/components/settings/tabs/DisplaySettingsTab';

const Settings = () => {
  const { settings, handleSettingChange } = useSettings();

  return (
    <Layout>
      <div className="p-6 space-y-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen">
        {/* Header */}
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

        {/* Settings Tabs */}
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="bg-slate-800/50 border-slate-600 grid grid-cols-5 w-full">
            <TabsTrigger value="general" className="data-[state=active]:bg-slate-700">
              <User className="w-4 h-4 mr-2" />
              General
            </TabsTrigger>
            <TabsTrigger value="notifications" className="data-[state=active]:bg-slate-700">
              <Bell className="w-4 h-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-slate-700">
              <Shield className="w-4 h-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="api" className="data-[state=active]:bg-slate-700">
              <Key className="w-4 h-4 mr-2" />
              API & Integrations
            </TabsTrigger>
            <TabsTrigger value="display" className="data-[state=active]:bg-slate-700">
              <Palette className="w-4 h-4 mr-2" />
              Display
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <GeneralSettingsTab settings={settings} onSettingChange={handleSettingChange} />
          </TabsContent>

          <TabsContent value="notifications">
            <NotificationsSettingsTab settings={settings} onSettingChange={handleSettingChange} />
          </TabsContent>

          <TabsContent value="security">
            <SecuritySettingsTab settings={settings} onSettingChange={handleSettingChange} />
          </TabsContent>

          <TabsContent value="api">
            <ApiSettingsTab settings={settings} onSettingChange={handleSettingChange} />
          </TabsContent>

          <TabsContent value="display">
            <DisplaySettingsTab settings={settings} onSettingChange={handleSettingChange} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
