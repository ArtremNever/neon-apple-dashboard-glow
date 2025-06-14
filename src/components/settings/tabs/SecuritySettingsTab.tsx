
import React from 'react';
import { Shield, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SettingsCard } from '../SettingsCard';
import { SettingsToggle } from '../SettingsToggle';
import { SettingsInput } from '../SettingsInput';
import { SettingsState } from '@/hooks/useSettings';

interface SecuritySettingsTabProps {
  settings: SettingsState;
  onSettingChange: (key: keyof SettingsState, value: any) => void;
}

export const SecuritySettingsTab = ({ settings, onSettingChange }: SecuritySettingsTabProps) => {
  return (
    <div className="space-y-6">
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
            onCheckedChange={(checked) => onSettingChange('twoFactorAuth', checked)}
          />
          <SettingsInput
            label="Session Timeout (hours)"
            type="number"
            value={settings.sessionTimeout}
            onChange={(value) => onSettingChange('sessionTimeout', parseInt(value))}
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
    </div>
  );
};
