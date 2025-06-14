
import React from 'react';
import { Bell } from 'lucide-react';
import { SettingsCard } from '../SettingsCard';
import { SettingsToggle } from '../SettingsToggle';
import { SettingsInput } from '../SettingsInput';
import { SettingsState } from '@/hooks/useSettings';

interface NotificationsSettingsTabProps {
  settings: SettingsState;
  onSettingChange: (key: keyof SettingsState, value: any) => void;
}

export const NotificationsSettingsTab = ({ settings, onSettingChange }: NotificationsSettingsTabProps) => {
  return (
    <div className="space-y-6">
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
            onCheckedChange={(checked) => onSettingChange('emailNotifications', checked)}
          />
          <SettingsToggle
            title="Slack Notifications"
            description="Send alerts to your Slack workspace"
            checked={settings.slackNotifications}
            onCheckedChange={(checked) => onSettingChange('slackNotifications', checked)}
          />
          <SettingsToggle
            title="Weekly Reports"
            description="Receive weekly performance summary reports"
            checked={settings.weeklyReports}
            onCheckedChange={(checked) => onSettingChange('weeklyReports', checked)}
          />
          <SettingsInput
            label="Alert Threshold ($)"
            type="number"
            value={settings.alertThreshold}
            onChange={(value) => onSettingChange('alertThreshold', parseInt(value))}
            description="Get notified when spend exceeds this amount"
            className="max-w-xs"
          />
        </div>
      </SettingsCard>
    </div>
  );
};
