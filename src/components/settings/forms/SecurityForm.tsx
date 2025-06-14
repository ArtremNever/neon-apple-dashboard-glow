
import React from 'react';
import { Shield, Lock, Smartphone, Monitor, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

export const SecurityForm = () => {
  return (
    <div className="space-y-8">
      {/* Security Score Section */}
      <div className="bg-slate-900/30 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
        <div className="flex items-start space-x-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500/20 to-blue-500/20 border-4 border-green-500/30 flex items-center justify-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">75%</div>
                <div className="text-xs text-slate-400">Score</div>
              </div>
            </div>
            <div className="absolute inset-0 rounded-full" style={{
              background: `conic-gradient(from 0deg, #22c55e 0deg ${75 * 3.6}deg, rgba(34, 197, 94, 0.1) ${75 * 3.6}deg 360deg)`
            }}></div>
          </div>
          
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-white mb-2">Security Score</h3>
            <p className="text-slate-400 mb-4">Your account security is good</p>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Shield className="w-4 h-4 text-orange-400" />
                  <span className="text-slate-200">Enable two-factor authentication</span>
                </div>
                <Button size="sm" variant="outline" className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10">
                  Setup
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Security Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Password Card */}
        <div className="bg-slate-900/30 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                <Lock className="w-5 h-5 text-red-400" />
              </div>
              <h4 className="text-lg font-semibold text-white">Password</h4>
            </div>
            <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">Weak</Badge>
          </div>
          
          <div className="space-y-3">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span className="text-slate-400">Strength</span>
                <span className="text-orange-400">40%</span>
              </div>
              <Progress value={40} className="h-2 bg-slate-800" />
            </div>
            <p className="text-slate-500 text-sm">Last changed 6 months ago</p>
            <Button className="w-full" variant="outline">Change Password</Button>
          </div>
        </div>

        {/* Two-Factor Auth Card */}
        <div className="bg-slate-900/30 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-blue-400" />
              </div>
              <h4 className="text-lg font-semibold text-white">Two-Factor Auth</h4>
            </div>
            <Switch />
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2 bg-slate-800/30 rounded">
              <span className="text-slate-300 text-sm">Authenticator App</span>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            </div>
            <div className="flex items-center justify-between p-2 bg-slate-800/30 rounded opacity-50">
              <span className="text-slate-500 text-sm">SMS Backup</span>
              <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Active Sessions Card */}
        <div className="bg-slate-900/30 backdrop-blur-xl border border-slate-700/50 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                <Monitor className="w-5 h-5 text-green-400" />
              </div>
              <h4 className="text-lg font-semibold text-white">Active Sessions</h4>
            </div>
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">3 devices</Badge>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-2 bg-slate-800/30 rounded">
              <Monitor className="w-4 h-4 text-slate-400" />
              <div className="flex-1">
                <div className="text-slate-300 text-sm font-medium">Chrome on MacBook</div>
                <div className="text-slate-500 text-xs">San Francisco • Now</div>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full">
              Manage Sessions
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
