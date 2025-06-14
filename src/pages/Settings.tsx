
import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useSettings } from '@/hooks/useSettings';
import { SettingsLayout } from '@/components/settings/SettingsLayout';
import { SettingsSidebar } from '@/components/settings/SettingsSidebar';
import { SettingsContent } from '@/components/settings/SettingsContent';
import { CompanyProfileForm } from '@/components/settings/forms/CompanyProfileForm';
import { SecurityForm } from '@/components/settings/forms/SecurityForm';
import { IntegrationsForm } from '@/components/settings/forms/IntegrationsForm';
import { GeneralSettingsTab } from '@/components/settings/tabs/GeneralSettingsTab';
import { NotificationsSettingsTab } from '@/components/settings/tabs/NotificationsSettingsTab';
import { DisplaySettingsTab } from '@/components/settings/tabs/DisplaySettingsTab';

const Settings = () => {
  const { settings, handleSettingChange } = useSettings();
  const [activeTab, setActiveTab] = useState('company');

  const getTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return {
          title: 'Personal Profile',
          description: 'Manage your personal account settings and preferences',
          content: <GeneralSettingsTab settings={settings} onSettingChange={handleSettingChange} />
        };
      case 'security':
        return {
          title: 'Security & Privacy',
          description: 'Manage your account security settings and privacy preferences',
          content: <SecurityForm />
        };
      case 'notifications':
        return {
          title: 'Notifications',
          description: 'Configure how and when you receive notifications',
          content: <NotificationsSettingsTab settings={settings} onSettingChange={handleSettingChange} />
        };
      case 'company':
        return {
          title: 'Company Profile',
          description: 'Manage your company information and business settings',
          content: <CompanyProfileForm settings={settings} onSettingChange={handleSettingChange} />
        };
      case 'team':
        return {
          title: 'Team Management',
          description: 'Manage team members and their permissions',
          content: <div className="text-center py-12 text-slate-400">Team management coming soon...</div>
        };
      case 'billing':
        return {
          title: 'Billing & Subscription',
          description: 'Manage your subscription and billing information',
          content: <div className="text-center py-12 text-slate-400">Billing management coming soon...</div>
        };
      case 'integrations':
        return {
          title: 'Integrations & API Keys',
          description: 'Manage platform integrations and API access',
          content: <IntegrationsForm />
        };
      case 'api':
        return {
          title: 'API Management',
          description: 'Manage API keys and access tokens',
          content: <IntegrationsForm />
        };
      case 'appearance':
        return {
          title: 'Appearance & Display',
          description: 'Customize the look and feel of your workspace',
          content: <DisplaySettingsTab settings={settings} onSettingChange={handleSettingChange} />
        };
      default:
        return {
          title: 'Company Profile',
          description: 'Manage your company information and business settings',
          content: <CompanyProfileForm settings={settings} onSettingChange={handleSettingChange} />
        };
    }
  };

  const { title, description, content } = getTabContent();

  const handleSave = () => {
    console.log('Saving settings...', settings);
    // Here you would typically save to your backend
  };

  return (
    <Layout>
      <SettingsLayout>
        <SettingsSidebar 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
        <SettingsContent
          title={title}
          description={description}
          onSave={handleSave}
          lastSaved="2 hours ago"
        >
          {content}
        </SettingsContent>
      </SettingsLayout>
    </Layout>
  );
};

export default Settings;
