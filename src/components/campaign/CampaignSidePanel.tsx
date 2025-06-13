
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { BuilderBlock } from '@/types/campaign';
import { Sparkles, Zap, Settings2, Check, Save, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface CampaignSidePanelProps {
  selectedBlock: BuilderBlock | null;
  onBlockUpdate: (blockId: string, updates: Partial<BuilderBlock>) => void;
}

export const CampaignSidePanel = ({ 
  selectedBlock, 
  onBlockUpdate 
}: CampaignSidePanelProps) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [hasChanges, setHasChanges] = useState(false);

  // Initialize form data when selected block changes
  useEffect(() => {
    if (selectedBlock) {
      setFormData(selectedBlock.props);
      setHasChanges(false);
    }
  }, [selectedBlock]);

  if (!selectedBlock) {
    return (
      <div className="h-full bg-gradient-to-b from-slate-900/95 to-slate-950/95 backdrop-blur-sm flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-full flex items-center justify-center border border-green-500/30">
            <Settings2 className="w-8 h-8 text-green-400" />
          </div>
          <h3 className="font-semibold mb-2 text-green-400">Select a Block</h3>
          <p className="text-sm text-green-400/60 max-w-48">Click on any block in the canvas to configure its properties</p>
        </div>
      </div>
    );
  }

  const updateFormData = (newData: Record<string, any>) => {
    setFormData(prev => ({ ...prev, ...newData }));
    setHasChanges(true);
  };

  const handleSave = () => {
    const isValid = validateBlock(selectedBlock.type, formData);
    onBlockUpdate(selectedBlock.id, { 
      props: formData,
      isValid 
    });
    setHasChanges(false);
    console.log('Saved block configuration:', formData);
  };

  const handleCancel = () => {
    setFormData(selectedBlock.props);
    setHasChanges(false);
  };

  const validateBlock = (type: string, props: Record<string, any>): boolean => {
    switch (type) {
      case 'client':
        return !!props.name && !!props.company;
      case 'application':
        return !!props.name && !!props.platform;
      case 'platform':
        return !!props.platform && !!props.account;
      case 'campaign':
        return !!props.name && !!props.objective;
      case 'adset':
        return !!props.name && !!props.budget;
      case 'creative':
        return !!props.name && !!props.format;
      default:
        return true;
    }
  };

  const getBlockIcon = (type: BuilderBlock['type']) => {
    const icons = {
      client: '👤',
      application: '📱',
      platform: '🌐',
      campaign: '🎯',
      adset: '📊',
      creative: '🎨',
    };
    return icons[type] || '📦';
  };

  const getBlockTypeLabel = (type: BuilderBlock['type']) => {
    const labels = {
      client: 'Client',
      application: 'Application',
      platform: 'Platform',
      campaign: 'Campaign',
      adset: 'Ad Set',
      creative: 'Creative',
    };
    return labels[type] || type;
  };

  const FormField = ({ 
    label, 
    children, 
    className = "" 
  }: { 
    label: string; 
    children: React.ReactNode; 
    className?: string;
  }) => (
    <div className={`space-y-3 ${className}`}>
      <Label className="text-base font-medium text-green-300 block">{label}</Label>
      {children}
    </div>
  );

  const StyledInput = ({ ...props }) => (
    <Input
      {...props}
      className="
        h-12 px-4 rounded-xl border-2 border-slate-700/50 
        bg-slate-800/30 backdrop-blur-sm
        text-slate-200 placeholder:text-slate-400
        focus:border-green-500/60 focus:ring-2 focus:ring-green-500/20 focus:bg-slate-800/50
        transition-all duration-300
        hover:border-slate-600/60 hover:bg-slate-800/40
      "
    />
  );

  const StyledSelect = ({ children, ...props }) => (
    <Select {...props}>
      <SelectTrigger className="
        h-12 px-4 rounded-xl border-2 border-slate-700/50 
        bg-slate-800/30 backdrop-blur-sm
        text-slate-200 
        focus:border-green-500/60 focus:ring-2 focus:ring-green-500/20 focus:bg-slate-800/50
        transition-all duration-300
        hover:border-slate-600/60 hover:bg-slate-800/40
      ">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="
        bg-slate-800/95 backdrop-blur-xl border-2 border-slate-700/50 
        rounded-xl shadow-2xl z-50
      ">
        {children}
      </SelectContent>
    </Select>
  );

  const StyledTextarea = ({ ...props }) => (
    <Textarea
      {...props}
      className="
        min-h-[100px] p-4 rounded-xl border-2 border-slate-700/50 
        bg-slate-800/30 backdrop-blur-sm
        text-slate-200 placeholder:text-slate-400
        focus:border-green-500/60 focus:ring-2 focus:ring-green-500/20 focus:bg-slate-800/50
        transition-all duration-300
        hover:border-slate-600/60 hover:bg-slate-800/40
        resize-none
      "
    />
  );

  const AIButton = ({ onClick, children, variant = "primary" }) => (
    <Button
      onClick={onClick}
      className={`
        w-full h-12 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02]
        ${variant === "primary" 
          ? "bg-gradient-to-r from-green-600/80 to-emerald-600/80 hover:from-green-500/90 hover:to-emerald-500/90 border-2 border-green-500/40 hover:border-green-400/60 text-white shadow-lg hover:shadow-green-500/25"
          : "bg-gradient-to-r from-orange-600/70 to-red-600/70 hover:from-orange-500/80 hover:to-red-500/80 border-2 border-orange-500/40 hover:border-orange-400/60 text-white shadow-lg hover:shadow-orange-500/25"
        }
      `}
    >
      {children}
    </Button>
  );

  const renderBlockConfig = () => {
    switch (selectedBlock.type) {
      case 'client':
        return (
          <div className="space-y-6">
            <FormField label="Client Name">
              <StyledInput
                value={formData.name || ''}
                onChange={(e) => updateFormData({ name: e.target.value })}
                placeholder="Enter client name"
              />
            </FormField>

            <FormField label="Company">
              <StyledInput
                value={formData.company || ''}
                onChange={(e) => updateFormData({ company: e.target.value })}
                placeholder="Enter company name"
              />
            </FormField>

            <FormField label="Email">
              <StyledInput
                type="email"
                value={formData.email || ''}
                onChange={(e) => updateFormData({ email: e.target.value })}
                placeholder="client@company.com"
              />
            </FormField>
          </div>
        );

      case 'application':
        return (
          <div className="space-y-6">
            <FormField label="App Name">
              <StyledInput
                value={formData.name || ''}
                onChange={(e) => updateFormData({ name: e.target.value })}
                placeholder="Enter app name"
              />
            </FormField>

            <FormField label="Platform">
              <StyledSelect
                value={formData.platform || ''}
                onValueChange={(value) => updateFormData({ platform: value })}
              >
                <SelectItem value="ios">iOS</SelectItem>
                <SelectItem value="android">Android</SelectItem>
                <SelectItem value="web">Web</SelectItem>
              </StyledSelect>
            </FormField>

            <FormField label="Bundle ID">
              <StyledInput
                value={formData.bundleId || ''}
                onChange={(e) => updateFormData({ bundleId: e.target.value })}
                placeholder="com.company.app"
              />
            </FormField>
          </div>
        );

      case 'platform':
        return (
          <div className="space-y-6">
            <FormField label="Platform">
              <StyledSelect
                value={formData.platform || ''}
                onValueChange={(value) => updateFormData({ platform: value })}
              >
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="google">Google Ads</SelectItem>
                <SelectItem value="tiktok">TikTok</SelectItem>
                <SelectItem value="snapchat">Snapchat</SelectItem>
              </StyledSelect>
            </FormField>

            <FormField label="Account">
              <StyledSelect
                value={formData.account || ''}
                onValueChange={(value) => updateFormData({ account: value })}
                disabled={!formData.platform}
              >
                <SelectItem value="account1">Account 1</SelectItem>
                <SelectItem value="account2">Account 2</SelectItem>
              </StyledSelect>
            </FormField>
          </div>
        );

      case 'campaign':
        return (
          <div className="space-y-6">
            <FormField label="Campaign Name">
              <StyledInput
                value={formData.name || ''}
                onChange={(e) => updateFormData({ name: e.target.value })}
                placeholder="Enter campaign name"
              />
            </FormField>

            <FormField label="Objective">
              <StyledSelect
                value={formData.objective || ''}
                onValueChange={(value) => updateFormData({ objective: value })}
              >
                <SelectItem value="awareness">Brand Awareness</SelectItem>
                <SelectItem value="traffic">Traffic</SelectItem>
                <SelectItem value="conversions">Conversions</SelectItem>
                <SelectItem value="app_installs">App Installs</SelectItem>
              </StyledSelect>
            </FormField>

            <AIButton
              onClick={() => {
                const suggestedName = `CAMPAIGN_${formData.objective?.toUpperCase()}_${Date.now().toString().slice(-4)}`;
                updateFormData({ name: suggestedName });
              }}
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>AI-Generate Name</span>
              </div>
            </AIButton>
          </div>
        );

      case 'adset':
        return (
          <div className="space-y-6">
            <FormField label="Adset Name">
              <StyledInput
                value={formData.name || ''}
                onChange={(e) => updateFormData({ name: e.target.value })}
                placeholder="Enter adset name"
              />
            </FormField>

            <FormField label="Daily Budget ($)">
              <StyledInput
                type="number"
                value={formData.budget || ''}
                onChange={(e) => updateFormData({ budget: Number(e.target.value) })}
                placeholder="Enter daily budget"
              />
            </FormField>

            <FormField label="Geographic Targeting">
              <div className="p-4 bg-slate-800/20 backdrop-blur-sm rounded-xl border-2 border-slate-700/30">
                <div className="text-sm text-green-300/80 mb-4 font-medium">
                  Countries: {formData.countries?.join(', ') || 'None selected'}
                </div>
                <AIButton
                  variant="secondary"
                  onClick={() => {
                    const tier1Countries = ['US', 'CA', 'AU', 'GB'];
                    updateFormData({ countries: tier1Countries });
                  }}
                >
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    <span>🔥 AI-Pick Tier-1 GEOs</span>
                  </div>
                </AIButton>
              </div>
            </FormField>
          </div>
        );

      case 'creative':
        return (
          <div className="space-y-6">
            <FormField label="Creative Name">
              <StyledInput
                value={formData.name || ''}
                onChange={(e) => updateFormData({ name: e.target.value })}
                placeholder="Enter creative name"
              />
            </FormField>

            <FormField label="Format">
              <StyledSelect
                value={formData.format || ''}
                onValueChange={(value) => updateFormData({ format: value })}
              >
                <SelectItem value="image">Single Image</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="carousel">Carousel</SelectItem>
                <SelectItem value="collection">Collection</SelectItem>
              </StyledSelect>
            </FormField>

            <FormField label="Headline">
              <StyledInput
                value={formData.headline || ''}
                onChange={(e) => updateFormData({ headline: e.target.value })}
                placeholder="Enter headline"
              />
            </FormField>

            <FormField label="Description">
              <StyledTextarea
                value={formData.description || ''}
                onChange={(e) => updateFormData({ description: e.target.value })}
                placeholder="Enter description"
              />
            </FormField>
          </div>
        );

      default:
        return (
          <div className="text-center text-green-400/60 py-8">
            <p className="text-sm">Configuration for {selectedBlock.type} coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div className="h-full bg-gradient-to-b from-slate-900/95 to-slate-950/95 backdrop-blur-sm border-l border-green-500/30 flex flex-col">
      <Card className="border-0 rounded-none flex-1 bg-transparent shadow-none flex flex-col">
        <CardHeader className="pb-6 border-b border-green-500/20 flex-shrink-0">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center border-2 border-green-500/30">
                <span className="text-xl">
                  {getBlockIcon(selectedBlock.type)}
                </span>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-green-400">Configure {getBlockTypeLabel(selectedBlock.type)}</h3>
                <p className="text-xs text-green-400/60 font-normal mt-1">Block ID: {selectedBlock.id}</p>
              </div>
            </div>
            {selectedBlock.isValid && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/20 rounded-lg border-2 border-green-500/40">
                <Check className="w-4 h-4 text-green-400" />
                <span className="text-sm text-green-400 font-medium">Valid</span>
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 overflow-auto flex-1">
          {renderBlockConfig()}
        </CardContent>
        
        {/* Save/Cancel Buttons */}
        {hasChanges && (
          <div className="p-6 border-t border-green-500/20 bg-slate-900/50 backdrop-blur-sm flex-shrink-0">
            <div className="flex gap-3">
              <Button
                onClick={handleSave}
                className="
                  flex-1 h-12 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02]
                  bg-gradient-to-r from-green-600/80 to-emerald-600/80 hover:from-green-500/90 hover:to-emerald-500/90 
                  border-2 border-green-500/40 hover:border-green-400/60 text-white shadow-lg hover:shadow-green-500/25
                "
              >
                <div className="flex items-center gap-2">
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </div>
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
                className="
                  w-12 h-12 rounded-xl transition-all duration-300 transform hover:scale-[1.02]
                  border-2 border-slate-600/50 hover:border-slate-500/70 bg-slate-800/30 hover:bg-slate-800/50
                  text-slate-300 hover:text-slate-200
                "
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
