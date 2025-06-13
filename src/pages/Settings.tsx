
import { Layout } from '@/components/Layout';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Database, 
  Palette,
  Globe,
  Key,
  Save,
  RefreshCw,
  AlertTriangle,
  Trash2
} from 'lucide-react';

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

  const handleSettingChange = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const apiKeys = [
    { name: 'Facebook API', status: 'active', lastUsed: '2 hours ago', key: 'fb_***************' },
    { name: 'Google Ads API', status: 'active', lastUsed: '1 hour ago', key: 'gads_*************' },
    { name: 'TikTok API', status: 'inactive', lastUsed: '1 week ago', key: 'tt_***************' },
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
            <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Company Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">
                      Company Name
                    </label>
                    <Input
                      value={settings.companyName}
                      onChange={(e) => handleSettingChange('companyName', e.target.value)}
                      className="bg-slate-800/50 border-slate-600 text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      value={settings.email}
                      onChange={(e) => handleSettingChange('email', e.target.value)}
                      className="bg-slate-800/50 border-slate-600 text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">
                      Timezone
                    </label>
                    <Input
                      value={settings.timezone}
                      onChange={(e) => handleSettingChange('timezone', e.target.value)}
                      className="bg-slate-800/50 border-slate-600 text-slate-200"
                    />
                  </div>
                  <div>
                    <label className="block text-slate-300 text-sm font-medium mb-2">
                      Language
                    </label>
                    <Input
                      value={settings.language}
                      onChange={(e) => handleSettingChange('language', e.target.value)}
                      className="bg-slate-800/50 border-slate-600 text-slate-200"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Settings */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-slate-200 font-medium">Email Notifications</h4>
                    <p className="text-slate-400 text-sm">Receive campaign alerts and updates via email</p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-slate-200 font-medium">Slack Notifications</h4>
                    <p className="text-slate-400 text-sm">Send alerts to your Slack workspace</p>
                  </div>
                  <Switch
                    checked={settings.slackNotifications}
                    onCheckedChange={(checked) => handleSettingChange('slackNotifications', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-slate-200 font-medium">Weekly Reports</h4>
                    <p className="text-slate-400 text-sm">Receive weekly performance summary reports</p>
                  </div>
                  <Switch
                    checked={settings.weeklyReports}
                    onCheckedChange={(checked) => handleSettingChange('weeklyReports', checked)}
                  />
                </div>
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">
                    Alert Threshold ($)
                  </label>
                  <Input
                    type="number"
                    value={settings.alertThreshold}
                    onChange={(e) => handleSettingChange('alertThreshold', parseInt(e.target.value))}
                    className="bg-slate-800/50 border-slate-600 text-slate-200 max-w-xs"
                  />
                  <p className="text-slate-400 text-sm mt-1">Get notified when spend exceeds this amount</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security" className="space-y-6">
            <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-slate-200 font-medium">Two-Factor Authentication</h4>
                    <p className="text-slate-400 text-sm">Enhance security with 2FA</p>
                  </div>
                  <Switch
                    checked={settings.twoFactorAuth}
                    onCheckedChange={(checked) => handleSettingChange('twoFactorAuth', checked)}
                  />
                </div>
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">
                    Session Timeout (hours)
                  </label>
                  <Input
                    type="number"
                    value={settings.sessionTimeout}
                    onChange={(e) => handleSettingChange('sessionTimeout', parseInt(e.target.value))}
                    className="bg-slate-800/50 border-slate-600 text-slate-200 max-w-xs"
                  />
                  <p className="text-slate-400 text-sm mt-1">Automatically logout after inactivity</p>
                </div>
                <div className="pt-4 border-t border-slate-700">
                  <Button variant="outline" className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    Reset Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* API Settings */}
          <TabsContent value="api" className="space-y-6">
            <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Key className="w-5 h-5" />
                  API Keys & Integrations
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {apiKeys.map((api, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-slate-800/30 rounded-lg">
                    <div>
                      <h4 className="text-slate-200 font-medium">{api.name}</h4>
                      <p className="text-slate-400 text-sm">Key: {api.key}</p>
                      <p className="text-slate-400 text-sm">Last used: {api.lastUsed}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge 
                        className={api.status === 'active' ? 'bg-green-600' : 'bg-gray-600'}
                      >
                        {api.status}
                      </Badge>
                      <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Database className="w-5 h-5" />
                  Data Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">
                    API Rate Limit (requests/hour)
                  </label>
                  <Input
                    type="number"
                    value={settings.apiRateLimit}
                    onChange={(e) => handleSettingChange('apiRateLimit', parseInt(e.target.value))}
                    className="bg-slate-800/50 border-slate-600 text-slate-200 max-w-xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 text-sm font-medium mb-2">
                    Data Retention (days)
                  </label>
                  <Input
                    type="number"
                    value={settings.dataRetention}
                    onChange={(e) => handleSettingChange('dataRetention', parseInt(e.target.value))}
                    className="bg-slate-800/50 border-slate-600 text-slate-200 max-w-xs"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Display Settings */}
          <TabsContent value="display" className="space-y-6">
            <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-xl">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Display Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-slate-200 font-medium">Dark Mode</h4>
                    <p className="text-slate-400 text-sm">Use dark theme for better viewing experience</p>
                  </div>
                  <Switch
                    checked={settings.darkMode}
                    onCheckedChange={(checked) => handleSettingChange('darkMode', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-slate-200 font-medium">Compact View</h4>
                    <p className="text-slate-400 text-sm">Show more data in less space</p>
                  </div>
                  <Switch
                    checked={settings.compactView}
                    onCheckedChange={(checked) => handleSettingChange('compactView', checked)}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-slate-200 font-medium">Advanced Metrics</h4>
                    <p className="text-slate-400 text-sm">Display additional performance metrics</p>
                  </div>
                  <Switch
                    checked={settings.showAdvancedMetrics}
                    onCheckedChange={(checked) => handleSettingChange('showAdvancedMetrics', checked)}
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-xl border-red-700/50">
              <CardHeader>
                <CardTitle className="text-red-400 flex items-center gap-2">
                  <Trash2 className="w-5 h-5" />
                  Danger Zone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-slate-200 font-medium mb-2">Reset All Settings</h4>
                    <p className="text-slate-400 text-sm mb-4">This will reset all settings to their default values. This action cannot be undone.</p>
                    <Button variant="outline" className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white">
                      Reset Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Settings;
