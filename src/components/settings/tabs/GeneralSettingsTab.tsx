
import React from 'react';
import { User } from 'lucide-react';
import { SettingsCard } from '../SettingsCard';
import { SettingsInput } from '../SettingsInput';
import { SettingsState } from '@/hooks/useSettings';

interface GeneralSettingsTabProps {
  settings: SettingsState;
  onSettingChange: (key: keyof SettingsState, value: any) => void;
}

export const GeneralSettingsTab = ({ settings, onSettingChange }: GeneralSettingsTabProps) => {
  return (
    <div className="space-y-6">
      <SettingsCard
        title="Company Profile"
        description="Manage your company information and preferences"
        icon={User}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <SettingsInput
            label="Company Name"
            value={settings.companyName}
            onChange={(value) => onSettingChange('companyName', value)}
          />
          <SettingsInput
            label="Email Address"
            type="email"
            value={settings.email}
            onChange={(value) => onSettingChange('email', value)}
          />
          <SettingsInput
            label="Timezone"
            value={settings.timezone}
            onChange={(value) => onSettingChange('timezone', value)}
          />
          <SettingsInput
            label="Language"
            value={settings.language}
            onChange={(value) => onSettingChange('language', value)}
          />
        </div>
      </SettingsCard>
    </div>
  );
};
