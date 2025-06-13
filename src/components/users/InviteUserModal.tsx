
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { 
  User, 
  Edit, 
  Crown, 
  Settings, 
  Check, 
  Mail,
  ArrowLeft,
  ArrowRight
} from 'lucide-react';

interface InviteUserModalProps {
  open: boolean;
  onClose: () => void;
  onInvite: (userData: any) => void;
}

interface RoleOption {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  permissions: string[];
}

const roleOptions: RoleOption[] = [
  {
    id: 'viewer',
    name: 'Viewer',
    description: 'Can view campaigns and reports',
    icon: <User className="w-5 h-5" />,
    permissions: ['View campaigns', 'View reports', 'Export data']
  },
  {
    id: 'editor',
    name: 'Editor',
    description: 'Can create and edit campaigns',
    icon: <Edit className="w-5 h-5" />,
    permissions: ['View campaigns', 'Create campaigns', 'Edit campaigns', 'View reports']
  },
  {
    id: 'admin',
    name: 'Admin',
    description: 'Full access to all features',
    icon: <Crown className="w-5 h-5" />,
    permissions: ['Full access', 'User management', 'System settings']
  },
  {
    id: 'custom',
    name: 'Custom',
    description: 'Configure specific permissions',
    icon: <Settings className="w-5 h-5" />,
    permissions: ['Custom configuration']
  }
];

export const InviteUserModal = ({ open, onClose, onInvite }: InviteUserModalProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    welcomeMessage: '',
    role: 'viewer',
    customPermissions: {}
  });

  const steps = [
    { id: 1, title: 'User Info', completed: currentStep > 1 },
    { id: 2, title: 'Role & Permissions', completed: currentStep > 2 },
    { id: 3, title: 'Team Assignment', completed: currentStep > 3 }
  ];

  const progress = (currentStep / steps.length) * 100;

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    onInvite(formData);
    onClose();
    setCurrentStep(1);
    setFormData({
      email: '',
      firstName: '',
      lastName: '',
      welcomeMessage: '',
      role: 'viewer',
      customPermissions: {}
    });
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.email.length > 0;
      case 2:
        return formData.role.length > 0;
      case 3:
        return true;
      default:
        return false;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-slate-900 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold mb-4">Invite New User</DialogTitle>
          
          {/* Progress Steps */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              {steps.map((step, index) => (
                <div key={step.id} className="flex items-center">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium
                    ${currentStep >= step.id 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-slate-700 text-slate-400'
                    }
                  `}>
                    {step.completed ? <Check className="w-5 h-5" /> : step.id}
                  </div>
                  <span className={`ml-2 text-sm ${
                    currentStep >= step.id ? 'text-white' : 'text-slate-400'
                  }`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 ${
                      currentStep > step.id ? 'bg-blue-600' : 'bg-slate-700'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </DialogHeader>

        {/* Step Content */}
        <div className="min-h-[400px]">
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <Label htmlFor="email" className="text-slate-300">Email Address *</Label>
                <div className="relative mt-2">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="user@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="pl-10 bg-slate-800 border-slate-600 text-white"
                  />
                </div>
                <p className="text-slate-400 text-sm mt-1">User will receive an invitation email</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-slate-300">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="mt-2 bg-slate-800 border-slate-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-slate-300">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="mt-2 bg-slate-800 border-slate-600 text-white"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="welcomeMessage" className="text-slate-300">Welcome Message (Optional)</Label>
                <Textarea
                  id="welcomeMessage"
                  placeholder="Add a personal message..."
                  value={formData.welcomeMessage}
                  onChange={(e) => setFormData({ ...formData, welcomeMessage: e.target.value })}
                  className="mt-2 bg-slate-800 border-slate-600 text-white resize-none"
                  rows={4}
                />
                <div className="flex justify-between items-center mt-1">
                  <p className="text-slate-400 text-sm">This message will be included in the invitation email</p>
                  <span className="text-slate-400 text-sm">{formData.welcomeMessage.length}/200</span>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <Label className="text-slate-300 text-lg">Select Role</Label>
                <div className="grid grid-cols-2 gap-4 mt-4">
                  {roleOptions.map((role) => (
                    <div
                      key={role.id}
                      className={`
                        p-4 rounded-lg border-2 cursor-pointer transition-all
                        ${formData.role === role.id 
                          ? 'border-blue-500 bg-blue-500/10' 
                          : 'border-slate-600 bg-slate-800/50 hover:border-slate-500'
                        }
                      `}
                      onClick={() => setFormData({ ...formData, role: role.id })}
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`p-2 rounded-full ${
                          formData.role === role.id ? 'bg-blue-500 text-white' : 'bg-slate-700 text-slate-400'
                        }`}>
                          {role.icon}
                        </div>
                        <div>
                          <h4 className="font-medium text-white">{role.name}
                          </h4>
                          {formData.role === role.id && (
                            <Check className="w-4 h-4 text-blue-400 ml-auto" />
                          )}
                        </div>
                      </div>
                      <p className="text-slate-400 text-sm mb-3">{role.description}</p>
                      <div className="space-y-1">
                        {role.permissions.slice(0, 3).map((permission, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-slate-500 rounded-full"></div>
                            <span className="text-slate-400 text-xs">{permission}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {formData.role === 'custom' && (
                <div className="mt-6 p-4 bg-slate-800/50 rounded-lg border border-slate-600">
                  <h4 className="text-white font-medium mb-4">Custom Permissions</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-slate-300 font-medium mb-2">Campaigns</h5>
                      <div className="space-y-2">
                        {['View campaigns', 'Create campaigns', 'Edit campaigns', 'Delete campaigns'].map((permission) => (
                          <label key={permission} className="flex items-center gap-2">
                            <input type="checkbox" className="rounded" />
                            <span className="text-slate-400 text-sm">{permission}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h5 className="text-slate-300 font-medium mb-2">Analytics</h5>
                      <div className="space-y-2">
                        {['View reports', 'Export data', 'Advanced analytics', 'Custom dashboards'].map((permission) => (
                          <label key={permission} className="flex items-center gap-2">
                            <input type="checkbox" className="rounded" />
                            <span className="text-slate-400 text-sm">{permission}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Ready to Send Invite</h3>
                <p className="text-slate-400 mb-6">
                  Review the invitation details below and click "Send Invite" to proceed.
                </p>
                
                <div className="bg-slate-800/50 rounded-lg p-6 text-left">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Email:</span>
                      <span className="text-white">{formData.email}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Name:</span>
                      <span className="text-white">
                        {formData.firstName} {formData.lastName} 
                        {!formData.firstName && !formData.lastName && '(Not provided)'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Role:</span>
                      <Badge className="bg-blue-600">
                        {roleOptions.find(r => r.id === formData.role)?.name}
                      </Badge>
                    </div>
                    {formData.welcomeMessage && (
                      <div>
                        <span className="text-slate-400">Message:</span>
                        <p className="text-white text-sm mt-1 p-3 bg-slate-700/50 rounded">
                          {formData.welcomeMessage}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-700">
          <Button 
            variant="ghost" 
            onClick={onClose}
            className="text-slate-400 hover:text-white"
          >
            Cancel
          </Button>
          
          <div className="flex gap-3">
            {currentStep > 1 && (
              <Button 
                variant="outline" 
                onClick={handlePrevious}
                className="border-slate-600 text-slate-300 hover:bg-slate-800"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>
            )}
            
            {currentStep < steps.length ? (
              <Button 
                onClick={handleNext}
                disabled={!isStepValid()}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button 
                onClick={handleSubmit}
                className="bg-green-600 hover:bg-green-700"
              >
                Send Invite
                <Mail className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
