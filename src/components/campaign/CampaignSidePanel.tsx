
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { BuilderBlock } from '@/types/campaign';
import { Sparkles, Zap, Settings2, Check, Save, X, EyeOff, Eye } from 'lucide-react';
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
  const [isHidden, setIsHidden] = useState(false);

  // Initialize form data when selected block changes
  useEffect(() => {
    if (selectedBlock) {
      setFormData(selectedBlock.props);
      setHasChanges(false);
      setIsHidden(false);
    }
  }, [selectedBlock]);

  if (!selectedBlock) {
    return (
      <div className="h-full bg-gradient-to-b from-slate-900/95 to-slate-950/95 backdrop-blur-sm flex items-center justify-center p-6">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-full flex items-center justify-center border border-blue-500/30">
            <Settings2 className="w-8 h-8 text-blue-400" />
          </div>
          <h3 className="font-semibold mb-2 text-blue-400">Select a Block</h3>
          <p className="text-sm text-slate-500 max-w-48">Click on any block in the canvas to configure its properties</p>
        </div>
      </div>
    );
  }

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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

  const toggleVisibility = () => {
    setIsHidden(!isHidden);
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
    <div className={`space-y-2 ${className}`}>
      <Label className="text-sm font-medium text-slate-300 block">{label}</Label>
      {children}
    </div>
  );

  const StyledInput = ({ field, ...props }) => (
    <Input
      {...props}
      value={formData[field] || ''}
      onChange={(e) => updateFormData(field, e.target.value)}
      className="
        h-10 px-3 rounded-lg border border-slate-600/50 
        bg-slate-800/30 backdrop-blur-sm
        text-slate-200 placeholder:text-slate-500
        focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/20 focus:bg-slate-800/50
        transition-all duration-200
        hover:border-slate-500/60 hover:bg-slate-800/40
      "
    />
  );

  const StyledSelect = ({ field, children, ...props }) => (
    <Select value={formData[field] || ''} onValueChange={(value) => updateFormData(field, value)} {...props}>
      <SelectTrigger className="
        h-10 px-3 rounded-lg border border-slate-600/50 
        bg-slate-800/30 backdrop-blur-sm
        text-slate-200 
        focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/20 focus:bg-slate-800/50
        transition-all duration-200
        hover:border-slate-500/60 hover:bg-slate-800/40
      ">
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="
        bg-slate-800/95 backdrop-blur-xl border border-slate-600/50 
        rounded-lg shadow-2xl
      ">
        {children}
      </SelectContent>
    </Select>
  );

  const StyledTextarea = ({ field, ...props }) => (
    <Textarea
      {...props}
      value={formData[field] || ''}
      onChange={(e) => updateFormData(field, e.target.value)}
      className="
        min-h-[80px] p-3 rounded-lg border border-slate-600/50 
        bg-slate-800/30 backdrop-blur-sm
        text-slate-200 placeholder:text-slate-500
        focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/20 focus:bg-slate-800/50
        transition-all duration-200
        hover:border-slate-500/60 hover:bg-slate-800/40
        resize-none
      "
    />
  );

  const AIButton = ({ onClick, children, variant = "primary" }) => (
    <Button
      onClick={onClick}
      className={`
        w-full h-10 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02]
        ${variant === "primary" 
          ? "bg-gradient-to-r from-blue-600/80 to-indigo-600/80 hover:from-blue-500/90 hover:to-indigo-500/90 border border-blue-500/40 hover:border-blue-400/60 text-white shadow-lg hover:shadow-blue-500/25"
          : "bg-gradient-to-r from-amber-600/70 to-orange-600/70 hover:from-amber-500/80 hover:to-orange-500/80 border border-amber-500/40 hover:border-amber-400/60 text-white shadow-lg hover:shadow-amber-500/25"
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
          <div className="space-y-4">
            <FormField label="Client Name">
              <StyledInput
                field="name"
                placeholder="Enter client name"
              />
            </FormField>

            <FormField label="Company">
              <StyledInput
                field="company"
                placeholder="Enter company name"
              />
            </FormField>

            <FormField label="Email">
              <StyledInput
                field="email"
                type="email"
                placeholder="client@company.com"
              />
            </FormField>
          </div>
        );

      case 'application':
        return (
          <div className="space-y-4">
            <FormField label="App Name">
              <StyledInput
                field="name"
                placeholder="Enter app name"
              />
            </FormField>

            <FormField label="Platform">
              <StyledSelect field="platform">
                <SelectItem value="ios">iOS</SelectItem>
                <SelectItem value="android">Android</SelectItem>
                <SelectItem value="web">Web</SelectItem>
              </StyledSelect>
            </FormField>

            <FormField label="Bundle ID">
              <StyledInput
                field="bundleId"
                placeholder="com.company.app"
              />
            </FormField>
          </div>
        );

      case 'platform':
        return (
          <div className="space-y-4">
            <FormField label="Platform">
              <StyledSelect field="platform">
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="google">Google Ads</SelectItem>
                <SelectItem value="tiktok">TikTok</SelectItem>
                <SelectItem value="snapchat">Snapchat</SelectItem>
              </StyledSelect>
            </FormField>

            <FormField label="Account">
              <StyledSelect field="account" disabled={!formData.platform}>
                <SelectItem value="account1">Account 1</SelectItem>
                <SelectItem value="account2">Account 2</SelectItem>
              </StyledSelect>
            </FormField>
          </div>
        );

      case 'campaign':
        return (
          <div className="space-y-4">
            <FormField label="Campaign Name">
              <StyledInput
                field="name"
                placeholder="Enter campaign name"
              />
            </FormField>

            <FormField label="Objective">
              <StyledSelect field="objective">
                <SelectItem value="awareness">Brand Awareness</SelectItem>
                <SelectItem value="traffic">Traffic</SelectItem>
                <SelectItem value="conversions">Conversions</SelectItem>
                <SelectItem value="app_installs">App Installs</SelectItem>
              </StyledSelect>
            </FormField>

            <AIButton
              onClick={() => {
                const suggestedName = `CAMPAIGN_${formData.objective?.toUpperCase()}_${Date.now().toString().slice(-4)}`;
                updateFormData('name', suggestedName);
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
          <div className="space-y-4">
            <FormField label="Adset Name">
              <StyledInput
                field="name"
                placeholder="Enter adset name"
              />
            </FormField>

            <FormField label="Daily Budget ($)">
              <StyledInput
                field="budget"
                type="number"
                placeholder="Enter daily budget"
              />
            </FormField>

            <FormField label="Geographic Targeting">
              <div className="p-3 bg-slate-800/20 backdrop-blur-sm rounded-lg border border-slate-600/30">
                <div className="text-sm text-slate-400 mb-3 font-medium">
                  Countries: {formData.countries?.join(', ') || 'None selected'}
                </div>
                <AIButton
                  variant="secondary"
                  onClick={() => {
                    const tier1Countries = ['US', 'CA', 'AU', 'GB'];
                    updateFormData('countries', tier1Countries);
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
          <div className="space-y-4">
            <FormField label="Creative Name">
              <StyledInput
                field="name"
                placeholder="Enter creative name"
              />
            </FormField>

            <FormField label="Format">
              <StyledSelect field="format">
                <SelectItem value="image">Single Image</SelectItem>
                <SelectItem value="video">Video</SelectItem>
                <SelectItem value="carousel">Carousel</SelectItem>
                <SelectItem value="collection">Collection</SelectItem>
              </StyledSelect>
            </FormField>

            <FormField label="Headline">
              <StyledInput
                field="headline"
                placeholder="Enter headline"
              />
            </FormField>

            <FormField label="Description">
              <StyledTextarea
                field="description"
                placeholder="Enter description"
              />
            </FormField>
          </div>
        );

      default:
        return (
          <div className="text-center text-slate-500 py-8">
            <p className="text-sm">Configuration for {selectedBlock.type} coming soon...</p>
          </div>
        );
    }
  };

  if (isHidden) {
    return (
      <div className="h-full bg-gradient-to-b from-slate-900/95 to-slate-950/95 backdrop-blur-sm border-l border-slate-700/50 flex items-center justify-center p-6">
        <Button
          onClick={toggleVisibility}
          variant="outline"
          className="
            h-12 px-4 rounded-xl font-medium transition-all duration-200 transform hover:scale-105
            border-slate-600/50 hover:border-slate-500/70 bg-slate-800/30 hover:bg-slate-800/50
            text-slate-300 hover:text-slate-200
          "
        >
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            <span>Show Configure</span>
          </div>
        </Button>
      </div>
    );
  }

  return (
    <div className="h-full bg-gradient-to-b from-slate-900/95 to-slate-950/95 backdrop-blur-sm border-l border-slate-700/50 flex flex-col">
      <Card className="border-0 rounded-none flex-1 bg-transparent shadow-none flex flex-col">
        <CardHeader className="pb-4 border-b border-slate-700/50 flex-shrink-0">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-indigo-500/20 rounded-lg flex items-center justify-center border border-blue-500/30">
                <span className="text-lg">
                  {getBlockIcon(selectedBlock.type)}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-200">Configure {getBlockTypeLabel(selectedBlock.type)}</h3>
                <p className="text-xs text-slate-500 font-normal mt-1">Block ID: {selectedBlock.id}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {selectedBlock.isValid && (
                <div className="flex items-center gap-2 px-2 py-1 bg-blue-500/20 rounded-md border border-blue-500/40">
                  <Check className="w-3 h-3 text-blue-400" />
                  <span className="text-xs text-blue-400 font-medium">Valid</span>
                </div>
              )}
              <Button
                onClick={toggleVisibility}
                variant="ghost"
                size="sm"
                className="
                  h-8 w-8 p-0 rounded-lg transition-all duration-200 transform hover:scale-105
                  text-slate-400 hover:text-slate-200 hover:bg-slate-700/50
                "
              >
                <EyeOff className="w-4 h-4" />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4 overflow-auto flex-1">
          {renderBlockConfig()}
        </CardContent>
        
        {/* Save/Cancel Buttons */}
        {hasChanges && (
          <div className="p-4 border-t border-slate-700/50 bg-slate-900/50 backdrop-blur-sm flex-shrink-0">
            <div className="flex gap-3">
              <Button
                onClick={handleSave}
                className="
                  flex-1 h-10 rounded-lg font-medium transition-all duration-200 transform hover:scale-[1.02]
                  bg-gradient-to-r from-blue-600/80 to-indigo-600/80 hover:from-blue-500/90 hover:to-indigo-500/90 
                  border border-blue-500/40 hover:border-blue-400/60 text-white shadow-lg hover:shadow-blue-500/25
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
                  w-10 h-10 rounded-lg transition-all duration-200 transform hover:scale-[1.02]
                  border border-slate-600/50 hover:border-slate-500/70 bg-slate-800/30 hover:bg-slate-800/50
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
