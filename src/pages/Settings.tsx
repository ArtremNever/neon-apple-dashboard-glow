
import { Layout } from '@/components/Layout';
import { useSettings } from '@/hooks/useSettings';
import { SettingsHeader } from '@/components/settings/SettingsHeader';
import { SettingsTabs } from '@/components/settings/SettingsTabs';

const Settings = () => {
  const { settings, handleSettingChange } = useSettings();

  return (
    <Layout>
      <div className="p-6 space-y-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen">
        <SettingsHeader />
        <SettingsTabs settings={settings} onSettingChange={handleSettingChange} />
      </div>
    </Layout>
  );
};

export default Settings;
