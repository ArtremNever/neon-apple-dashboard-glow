
import { Layout } from '@/components/Layout';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, User, Bell, Shield, Key, Palette, AlertTriangle } from 'lucide-react';
import { SettingsCard } from '@/components/settings/SettingsCard';
import { SettingsToggle } from '@/components/settings/SettingsToggle';
import { SettingsInput } from '@/components/settings/SettingsInput';
import { ApiKeyCard } from '@/components/settings/ApiKeyCard';
import { DangerZone } from '@/components/settings/DangerZone';

const Settings = () => {
  const [settings, setSettings] = useState({
    // Profile settings
    companyName: 'AdChampagne Analytics',
    email: 'admin@adchampagne.com',
    timezone: 'UTC',
    language: 'English',
    
    // Notification settings
    emailNotifications: true,
    slackNotifications: false,
    weeklyReports: true,
    alertThreshold: 10000,
    
    // Security settings
    twoFactorAuth: false,
    sessionTimeout: 24,
    
    // API settings
    apiRateLimit: 1000,
    dataRetention: 90,
    
    // Display settings
    darkMode: true,
    compactView: false,
    showAdvancedMetrics: true
  });

  const [apiKeyVisibility, setApiKeyVisibility] = useState<Record<string, boolean>>({});

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const apiKeys = [
    { name: 'Facebook API', status: 'active' as const, lastUsed: '2 hours ago', key: 'fb_sk_1234567890abcdef' },
    { name: 'Google Ads API', status: 'active' as const, lastUsed: '1 hour ago', key: 'gads_12345_67890abcdef' },
    { name: 'TikTok API', status: 'inactive' as const, lastUsed: '1 week ago', key: 'tt_abcdef1234567890' },
  ];

  const toggleApiKeyVisibility = (keyName: string) => {
    setApiKeyVisibility(prev => ({
      ...prev,
      [keyName]: !prev[keyName]
    }));
  };

  const dangerActions = [
    {
      title: 'Reset All Settings',
      description: 'This will reset all settings to their default values. This action cannot be undone.',
      buttonText: 'Reset Settings',
      onClick: () => console.log('Reset settings'),
      icon: <AlertTriangle className="w-4 h-4" />
    }
  ];

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

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <SettingsCard
              title="Company Profile"
              description="Manage your company information and preferences"
              icon={User}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SettingsInput
                  label="Company Name"
                  value={settings.companyName}
                  onChange={(value) => handleSettingChange('companyName', value)}
                />
                <SettingsInput
                  label="Email Address"
                  type="email"
                  value={settings.email}
                  onChange={(value) => handleSettingChange('email', value)}
                />
                <SettingsInput
                  label="Timezone"
                  value={settings.timezone}
                  onChange={(value) => handleSettingChange('timezone', value)}
                />
                <SettingsInput
                  label="Language"
                  value={settings.language}
                  onChange={(value) => handleSettingChange('language', value)}
                />
              </div>
            </SettingsCard>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <SettingsCard
              title="Notification Preferences"
              description="Configure how and when you receive notifications"
              icon={Bell}
            >
              <div className="space-y-6">
                <SettingsToggle
                  title="Email Notifications"
                  description="Receive campaign alerts and updates via email"
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                />
                <SettingsToggle
                  title="Slack Notifications"
                  description="Send alerts to your Slack workspace"
                  checked={settings.slackNotifications}
                  onCheckedChange={(checked) => handleSettingChange('slackNotifications', checked)}
                />
                <SettingsToggle
                  title="Weekly Reports"
                  description="Receive weekly performance summary reports"
                  checked={settings.weeklyReports}
                  onCheckedChange={(checked) => handleSettingChange('weeklyReports', checked)}
                />
                <SettingsInput
                  label="Alert Threshold ($)"
                  type="number"
                  value={settings.alertThreshold}
                  onChange={(value) => handleSettingChange('alertThreshold', parseInt(value))}
                  description="Get notified when spend exceeds this amount"
                  className="max-w-xs"
                />
              </div>
            </SettingsCard>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <SettingsCard
              title="Security Settings"
              description="Manage your account security and authentication"
              icon={Shield}
            >
              <div className="space-y-6">
                <SettingsToggle
                  title="Two-Factor Authentication"
                  description="Enhance security with 2FA"
                  checked={settings.twoFactorAuth}
                  onCheckedChange={(checked) => handleSettingChange('twoFactorAuth', checked)}
                />
                <SettingsInput
                  label="Session Timeout (hours)"
                  type="number"
                  value={settings.sessionTimeout}
                  onChange={(value) => handleSettingChange('sessionTimeout', parseInt(value))}
                  description="Automatically logout after inactivity"
                  className="max-w-xs"
                />
                <div className="pt-4 border-t border-slate-700">
                  <Button variant="outline" className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Reset Password
                  </Button>
                </div>
              </div>
            </SettingsCard>
          </TabsContent>

          {/* API Settings */}
          <TabsContent value="api" className="space-y-6">
            <SettingsCard
              title="API Keys & Integrations"
              description="Manage your API keys and third-party integrations"
              icon={Key}
            >
              <div className="space-y-4">
                {apiKeys.map((api, index) => (
                  <ApiKeyCard
                    key={index}
                    name={api.name}
                    keyPreview={api.key}
                    status={api.status}
                    lastUsed={api.lastUsed}
                    isVisible={apiKeyVisibility[api.name]}
                    onToggleVisibility={() => toggleApiKeyVisibility(api.name)}
                    onCopy={() => navigator.clipboard.writeText(api.key)}
                    onRefresh={() => console.log(`Refresh ${api.name}`)}
                  />
                ))}
              </div>
            </SettingsCard>

            <SettingsCard
              title="Data Management"
              description="Configure API limits and data retention policies"
              icon={Key}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <SettingsInput
                  label="API Rate Limit (requests/hour)"
                  type="number"
                  value={settings.apiRateLimit}
                  onChange={(value) => handleSettingChange('apiRateLimit', parseInt(value))}
                />
                <SettingsInput
                  label="Data Retention (days)"
                  type="number"
                  value={settings.dataRetention}
                  onChange={(value) => handleSettingChange('dataRetention', parseInt(value))}
                />
              </div>
            </SettingsCard>
          </TabsContent>

          {/* Display Settings */}
          <TabsContent value="display" className="space-y-6">
            <SettingsCard
              title="Display Preferences"
              description="Customize the appearance and behavior of the interface"
              icon={Palette}
            >
              <div className="space-y-6">
                <SettingsToggle
                  title="Dark Mode"
                  description="Use dark theme for better viewing experience"
                  checked={settings.darkMode}
                  onCheckedChange={(checked) => handleSettingChange('darkMode', checked)}
                />
                <SettingsToggle
                  title="Compact View"
                  description="Show more data in less space"
                  checked={settings.compactView}
                  onCheckedChange={(checked) => handleSettingChange('compactView', checked)}
                />
                <SettingsToggle
                  title="Advanced Metrics"
                  description="Display additional performance metrics"
                  checked={settings.showAdvancedMetrics}
                  onCheckedChange={(checked) => handleSettingChange('showAdvancedMetrics', checked)}
                />
              </div>
            </SettingsCard>

            <DangerZone actions={dangerActions} />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
