
import { useState } from 'react';

export interface SettingsState {
  // Profile settings
  companyName: string;
  email: string;
  timezone: string;
  language: string;
  
  // Notification settings
  emailNotifications: boolean;
  slackNotifications: boolean;
  weeklyReports: boolean;
  alertThreshold: number;
  
  // Security settings
  twoFactorAuth: boolean;
  sessionTimeout: number;
  
  // API settings
  apiRateLimit: number;
  dataRetention: number;
  
  // Display settings
  darkMode: boolean;
  compactView: boolean;
  showAdvancedMetrics: boolean;
}

export const useSettings = () => {
  const [settings, setSettings] = useState<SettingsState>({
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

  const handleSettingChange = (key: keyof SettingsState, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return {
    settings,
    handleSettingChange
  };
};
