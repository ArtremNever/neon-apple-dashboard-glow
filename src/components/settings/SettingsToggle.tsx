
import React from 'react';
import { Switch } from '@/components/ui/switch';

interface SettingsToggleProps {
  title: string;
  description: string;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}

export const SettingsToggle = ({ 
  title, 
  description, 
  checked, 
  onCheckedChange, 
  disabled = false 
}: SettingsToggleProps) => {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex-1">
        <h4 className="text-slate-200 font-medium">{title}</h4>
        <p className="text-slate-400 text-sm mt-1">{description}</p>
      </div>
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        className="ml-4"
      />
    </div>
  );
};
