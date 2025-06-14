
import React, { useState } from 'react';
import { Settings as SettingsIcon } from 'lucide-react';
import { SettingsCard } from '../SettingsCard';
import { SettingsInput } from '../SettingsInput';
import { ApiKeyCard } from '../ApiKeyCard';
import { SettingsState } from '@/hooks/useSettings';

interface ApiSettingsTabProps {
  settings: SettingsState;
  onSettingChange: (key: keyof SettingsState, value: any) => void;
}

export const ApiSettingsTab = ({ settings, onSettingChange }: ApiSettingsTabProps) => {
  const [apiKeyVisibility, setApiKeyVisibility] = useState<Record<string, boolean>>({});

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

  return (
    <div className="space-y-6">
      <SettingsCard
        title="API Keys & Integrations"
        description="Manage your API keys and third-party integrations"
        icon={SettingsIcon}
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
        icon={SettingsIcon}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SettingsInput
            label="API Rate Limit (requests/hour)"
            type="number"
            value={settings.apiRateLimit}
            onChange={(value) => onSettingChange('apiRateLimit', parseInt(value))}
          />
          <SettingsInput
            label="Data Retention (days)"
            type="number"
            value={settings.dataRetention}
            onChange={(value) => onSettingChange('dataRetention', parseInt(value))}
          />
        </div>
      </SettingsCard>
    </div>
  );
};
