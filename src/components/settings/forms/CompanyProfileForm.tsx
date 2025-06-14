
import React from 'react';
import { Building2, Mail, Globe, Upload, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SettingsState } from '@/hooks/useSettings';

interface CompanyProfileFormProps {
  settings: SettingsState;
  onSettingChange: (key: keyof SettingsState, value: any) => void;
}

export const CompanyProfileForm = ({ settings, onSettingChange }: CompanyProfileFormProps) => {
  return (
    <div className="space-y-8">
      {/* Basic Information Section */}
      <div className="bg-slate-900/30 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-blue-400" />
          </div>
          <h3 className="text-xl font-semibold text-white">Basic Information</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="lg:col-span-1">
            <label className="block text-slate-300 text-sm font-medium mb-2">
              Company Name
              <span className="text-red-400 ml-1">*</span>
            </label>
            <div className="relative">
              <Input
                value={settings.companyName}
                onChange={(e) => onSettingChange('companyName', e.target.value)}
                className="bg-slate-800/50 border-slate-600 text-slate-200 focus:border-blue-500 focus:ring-blue-500 pr-10"
                placeholder="Enter company name"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              </div>
            </div>
            <p className="text-slate-500 text-sm mt-1">This will be displayed across the platform</p>
          </div>

          <div className="lg:col-span-1">
            <label className="block text-slate-300 text-sm font-medium mb-2">Company Logo</label>
            <div className="flex items-center space-x-4">
              <div className="relative w-16 h-16 bg-slate-800/50 border border-slate-600 rounded-lg flex items-center justify-center">
                <Building2 className="w-6 h-6 text-slate-400" />
                <button className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                  <X className="w-3 h-3 text-white" />
                </button>
              </div>
              <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                <Upload className="w-4 h-4 mr-2" />
                Upload New
              </Button>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">Industry</label>
            <Select>
              <SelectTrigger className="bg-slate-800/50 border-slate-600 text-slate-200">
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="marketing">Marketing & Advertising</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="ecommerce">E-commerce</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">Company Size</label>
            <Select>
              <SelectTrigger className="bg-slate-800/50 border-slate-600 text-slate-200">
                <SelectValue placeholder="Select company size" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="1-10">1-10 employees</SelectItem>
                <SelectItem value="11-50">11-50 employees</SelectItem>
                <SelectItem value="51-200">51-200 employees</SelectItem>
                <SelectItem value="200+">200+ employees</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <div className="bg-slate-900/30 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
            <Mail className="w-5 h-5 text-green-400" />
          </div>
          <h3 className="text-xl font-semibold text-white">Contact Information</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">Email Address</label>
            <Input
              type="email"
              value={settings.email}
              onChange={(e) => onSettingChange('email', e.target.value)}
              className="bg-slate-800/50 border-slate-600 text-slate-200 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">Phone Number</label>
            <div className="flex">
              <Select>
                <SelectTrigger className="w-20 bg-slate-800/50 border-slate-600 border-r-0 rounded-r-none">
                  <SelectValue placeholder="+1" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="+1">+1</SelectItem>
                  <SelectItem value="+44">+44</SelectItem>
                  <SelectItem value="+49">+49</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="(555) 123-4567"
                className="bg-slate-800/50 border-slate-600 text-slate-200 rounded-l-none focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="lg:col-span-2">
            <label className="block text-slate-300 text-sm font-medium mb-2">Address</label>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
              <Input
                placeholder="Street Address"
                className="md:col-span-2 bg-slate-800/50 border-slate-600 text-slate-200 focus:border-blue-500 focus:ring-blue-500"
              />
              <Input
                placeholder="City"
                className="bg-slate-800/50 border-slate-600 text-slate-200 focus:border-blue-500 focus:ring-blue-500"
              />
              <Select>
                <SelectTrigger className="bg-slate-800/50 border-slate-600 text-slate-200">
                  <SelectValue placeholder="State" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="ca">California</SelectItem>
                  <SelectItem value="ny">New York</SelectItem>
                  <SelectItem value="tx">Texas</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Localization Section */}
      <div className="bg-slate-900/30 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
            <Globe className="w-5 h-5 text-purple-400" />
          </div>
          <h3 className="text-xl font-semibold text-white">Localization</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">Timezone</label>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 bg-slate-800/30 rounded-lg">
                <div className="w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center">
                  <span className="text-sm">🕐</span>
                </div>
                <div>
                  <div className="text-white font-medium">3:45 PM</div>
                  <div className="text-slate-400 text-xs">Current time</div>
                </div>
              </div>
              <Select value={settings.timezone} onValueChange={(value) => onSettingChange('timezone', value)}>
                <SelectTrigger className="bg-slate-800/50 border-slate-600 text-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  <SelectItem value="UTC-5">UTC-5 (Eastern Time)</SelectItem>
                  <SelectItem value="UTC-8">UTC-8 (Pacific Time)</SelectItem>
                  <SelectItem value="UTC">UTC (Greenwich Time)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">Language</label>
            <div className="space-y-2">
              <div className="flex items-center space-x-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                <span className="text-xl">🇺🇸</span>
                <span className="text-white font-medium">English</span>
                <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-slate-800/30 rounded-lg cursor-pointer hover:bg-slate-800/50">
                <span className="text-xl">🇪🇸</span>
                <span className="text-slate-400">Español</span>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">Currency</label>
            <Select>
              <SelectTrigger className="bg-slate-800/50 border-slate-600 text-slate-200">
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="usd">$ USD</SelectItem>
                <SelectItem value="eur">€ EUR</SelectItem>
                <SelectItem value="gbp">£ GBP</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-slate-300 text-sm font-medium mb-2">Date Format</label>
            <Select>
              <SelectTrigger className="bg-slate-800/50 border-slate-600 text-slate-200">
                <SelectValue placeholder="Select date format" />
              </SelectTrigger>
              <SelectContent className="bg-slate-800 border-slate-700">
                <SelectItem value="mdy">MM/DD/YYYY</SelectItem>
                <SelectItem value="dmy">DD/MM/YYYY</SelectItem>
                <SelectItem value="ymd">YYYY-MM-DD</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};
