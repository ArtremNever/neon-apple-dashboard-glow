
import React from 'react';
import { Palette, AlertTriangle } from 'lucide-react';
import { SettingsCard } from '../SettingsCard';
import { SettingsToggle } from '../SettingsToggle';
import { DangerZone } from '../DangerZone';
import { SettingsState } from '@/hooks/useSettings';

interface DisplaySettingsTabProps {
  settings: SettingsState;
  onSettingChange: (key: keyof SettingsState, value: any) => void;
}

export const DisplaySettingsTab = ({ settings, onSettingChange }: DisplaySettingsTabProps) => {
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
    <div className="space-y-6">
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
            onCheckedChange={(checked) => onSettingChange('darkMode', checked)}
          />
          <SettingsToggle
            title="Compact View"
            description="Show more data in less space"
            checked={settings.compactView}
            onCheckedChange={(checked) => onSettingChange('compactView', checked)}
          />
          <SettingsToggle
            title="Advanced Metrics"
            description="Display additional performance metrics"
            checked={settings.showAdvancedMetrics}
            onCheckedChange={(checked) => onSettingChange('showAdvancedMetrics', checked)}
          />
        </div>
      </SettingsCard>

      <DangerZone actions={dangerActions} />
    </div>
  );
};
