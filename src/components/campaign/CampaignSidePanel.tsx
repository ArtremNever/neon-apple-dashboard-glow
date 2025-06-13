
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BuilderBlock } from '@/pages/CampaignManagement';
import { Sparkles, Zap, Settings2, Check } from 'lucide-react';

interface CampaignSidePanelProps {
  selectedBlock: BuilderBlock | null;
  onBlockUpdate: (blockId: string, updates: Partial<BuilderBlock>) => void;
}

export const CampaignSidePanel = ({ 
  selectedBlock, 
  onBlockUpdate 
}: CampaignSidePanelProps) => {
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

  const updateProps = (newProps: Record<string, any>) => {
    const isValid = validateBlock(selectedBlock.type, { ...selectedBlock.props, ...newProps });
    onBlockUpdate(selectedBlock.id, { 
      props: { ...selectedBlock.props, ...newProps },
      isValid 
    });
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

  const renderBlockConfig = () => {
    switch (selectedBlock.type) {
      case 'client':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-green-300">Client Name</Label>
              <Input
                value={selectedBlock.props.name || ''}
                onChange={(e) => updateProps({ name: e.target.value })}
                placeholder="Enter client name"
                className="bg-slate-800/50 border-green-500/30 text-slate-200 placeholder:text-slate-400 focus:border-green-500/50 focus:ring-green-500/20 transition-all duration-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company" className="text-sm font-medium text-green-300">Company</Label>
              <Input
                value={selectedBlock.props.company || ''}
                onChange={(e) => updateProps({ company: e.target.value })}
                placeholder="Enter company name"
                className="bg-slate-800/50 border-green-500/30 text-slate-200 placeholder:text-slate-400 focus:border-green-500/50 focus:ring-green-500/20 transition-all duration-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium text-green-300">Email</Label>
              <Input
                type="email"
                value={selectedBlock.props.email || ''}
                onChange={(e) => updateProps({ email: e.target.value })}
                placeholder="client@company.com"
                className="bg-slate-800/50 border-green-500/30 text-slate-200 placeholder:text-slate-400 focus:border-green-500/50 focus:ring-green-500/20 transition-all duration-200"
              />
            </div>
          </div>
        );

      case 'application':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-green-300">App Name</Label>
              <Input
                value={selectedBlock.props.name || ''}
                onChange={(e) => updateProps({ name: e.target.value })}
                placeholder="Enter app name"
                className="bg-slate-800/50 border-green-500/30 text-slate-200 placeholder:text-slate-400 focus:border-green-500/50 focus:ring-green-500/20 transition-all duration-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="platform" className="text-sm font-medium text-green-300">Platform</Label>
              <Select
                value={selectedBlock.props.platform || ''}
                onValueChange={(value) => updateProps({ platform: value })}
              >
                <SelectTrigger className="bg-slate-800/50 border-green-500/30 text-slate-200 focus:border-green-500/50 focus:ring-green-500/20 transition-all duration-200">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-green-500/30">
                  <SelectItem value="ios">iOS</SelectItem>
                  <SelectItem value="android">Android</SelectItem>
                  <SelectItem value="web">Web</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="bundleId" className="text-sm font-medium text-green-300">Bundle ID</Label>
              <Input
                value={selectedBlock.props.bundleId || ''}
                onChange={(e) => updateProps({ bundleId: e.target.value })}
                placeholder="com.company.app"
                className="bg-slate-800/50 border-green-500/30 text-slate-200 placeholder:text-slate-400 focus:border-green-500/50 focus:ring-green-500/20 transition-all duration-200"
              />
            </div>
          </div>
        );

      case 'platform':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="platform" className="text-sm font-medium text-green-300">Platform</Label>
              <Select
                value={selectedBlock.props.platform || ''}
                onValueChange={(value) => updateProps({ platform: value })}
              >
                <SelectTrigger className="bg-slate-800/50 border-green-500/30 text-slate-200 focus:border-green-500/50 focus:ring-green-500/20 transition-all duration-200">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-green-500/30">
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="google">Google Ads</SelectItem>
                  <SelectItem value="tiktok">TikTok</SelectItem>
                  <SelectItem value="snapchat">Snapchat</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="account" className="text-sm font-medium text-green-300">Account</Label>
              <Select
                value={selectedBlock.props.account || ''}
                onValueChange={(value) => updateProps({ account: value })}
                disabled={!selectedBlock.props.platform}
              >
                <SelectTrigger className="bg-slate-800/50 border-green-500/30 text-slate-200 focus:border-green-500/50 focus:ring-green-500/20 transition-all duration-200 disabled:opacity-50">
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-green-500/30">
                  <SelectItem value="account1">Account 1</SelectItem>
                  <SelectItem value="account2">Account 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 'campaign':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-green-300">Campaign Name</Label>
              <Input
                value={selectedBlock.props.name || ''}
                onChange={(e) => updateProps({ name: e.target.value })}
                placeholder="Enter campaign name"
                className="bg-slate-800/50 border-green-500/30 text-slate-200 placeholder:text-slate-400 focus:border-green-500/50 focus:ring-green-500/20 transition-all duration-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="objective" className="text-sm font-medium text-green-300">Objective</Label>
              <Select
                value={selectedBlock.props.objective || ''}
                onValueChange={(value) => updateProps({ objective: value })}
              >
                <SelectTrigger className="bg-slate-800/50 border-green-500/30 text-slate-200 focus:border-green-500/50 focus:ring-green-500/20 transition-all duration-200">
                  <SelectValue placeholder="Select objective" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-green-500/30">
                  <SelectItem value="awareness">Brand Awareness</SelectItem>
                  <SelectItem value="traffic">Traffic</SelectItem>
                  <SelectItem value="conversions">Conversions</SelectItem>
                  <SelectItem value="app_installs">App Installs</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="outline"
              className="w-full gap-2 bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/50 text-green-300 hover:from-green-500/30 hover:to-emerald-500/30 hover:border-green-400/70 transition-all duration-200"
              onClick={() => {
                const suggestedName = `CAMPAIGN_${selectedBlock.props.objective?.toUpperCase()}_${Date.now().toString().slice(-4)}`;
                updateProps({ name: suggestedName });
              }}
            >
              <Sparkles className="w-4 h-4" />
              AI-Generate Name
            </Button>
          </div>
        );

      case 'adset':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-green-300">Adset Name</Label>
              <Input
                value={selectedBlock.props.name || ''}
                onChange={(e) => updateProps({ name: e.target.value })}
                placeholder="Enter adset name"
                className="bg-slate-800/50 border-green-500/30 text-slate-200 placeholder:text-slate-400 focus:border-green-500/50 focus:ring-green-500/20 transition-all duration-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="budget" className="text-sm font-medium text-green-300">Daily Budget ($)</Label>
              <Input
                type="number"
                value={selectedBlock.props.budget || ''}
                onChange={(e) => updateProps({ budget: Number(e.target.value) })}
                placeholder="Enter daily budget"
                className="bg-slate-800/50 border-green-500/30 text-slate-200 placeholder:text-slate-400 focus:border-green-500/50 focus:ring-green-500/20 transition-all duration-200"
              />
            </div>
            <div className="space-y-3">
              <Label className="text-sm font-medium text-green-300">Geographic Targeting</Label>
              <div className="p-3 bg-slate-800/30 rounded-lg border border-green-500/20">
                <div className="text-sm text-green-400/80 mb-2">
                  Countries: {selectedBlock.props.countries?.join(', ') || 'None selected'}
                </div>
                <Button
                  variant="outline"
                  className="w-full gap-2 bg-gradient-to-r from-orange-500/20 to-red-500/20 border-orange-500/50 text-orange-300 hover:from-orange-500/30 hover:to-red-500/30 hover:border-orange-400/70 transition-all duration-200"
                  onClick={() => {
                    const tier1Countries = ['US', 'CA', 'AU', 'GB'];
                    updateProps({ countries: tier1Countries });
                  }}
                >
                  <Zap className="w-4 h-4" />
                  🔥 AI-Pick Tier-1 GEOs
                </Button>
              </div>
            </div>
          </div>
        );

      case 'creative':
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-green-300">Creative Name</Label>
              <Input
                value={selectedBlock.props.name || ''}
                onChange={(e) => updateProps({ name: e.target.value })}
                placeholder="Enter creative name"
                className="bg-slate-800/50 border-green-500/30 text-slate-200 placeholder:text-slate-400 focus:border-green-500/50 focus:ring-green-500/20 transition-all duration-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="format" className="text-sm font-medium text-green-300">Format</Label>
              <Select
                value={selectedBlock.props.format || ''}
                onValueChange={(value) => updateProps({ format: value })}
              >
                <SelectTrigger className="bg-slate-800/50 border-green-500/30 text-slate-200 focus:border-green-500/50 focus:ring-green-500/20 transition-all duration-200">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-green-500/30">
                  <SelectItem value="image">Single Image</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="carousel">Carousel</SelectItem>
                  <SelectItem value="collection">Collection</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="headline" className="text-sm font-medium text-green-300">Headline</Label>
              <Input
                value={selectedBlock.props.headline || ''}
                onChange={(e) => updateProps({ headline: e.target.value })}
                placeholder="Enter headline"
                className="bg-slate-800/50 border-green-500/30 text-slate-200 placeholder:text-slate-400 focus:border-green-500/50 focus:ring-green-500/20 transition-all duration-200"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description" className="text-sm font-medium text-green-300">Description</Label>
              <Input
                value={selectedBlock.props.description || ''}
                onChange={(e) => updateProps({ description: e.target.value })}
                placeholder="Enter description"
                className="bg-slate-800/50 border-green-500/30 text-slate-200 placeholder:text-slate-400 focus:border-green-500/50 focus:ring-green-500/20 transition-all duration-200"
              />
            </div>
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
    <div className="h-full bg-gradient-to-b from-slate-900/95 to-slate-950/95 backdrop-blur-sm border-l border-green-500/30">
      <Card className="border-0 rounded-none h-full bg-transparent shadow-none">
        <CardHeader className="pb-4 border-b border-green-500/20">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-lg flex items-center justify-center border border-green-500/30">
                <span className="text-lg">
                  {getBlockIcon(selectedBlock.type)}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-green-400">Configure {getBlockTypeLabel(selectedBlock.type)}</h3>
                <p className="text-xs text-green-400/60 font-normal">Block ID: {selectedBlock.id}</p>
              </div>
            </div>
            {selectedBlock.isValid && (
              <div className="flex items-center gap-1 px-2 py-1 bg-green-500/20 rounded-md border border-green-500/40">
                <Check className="w-3 h-3 text-green-400" />
                <span className="text-xs text-green-400 font-medium">Valid</span>
              </div>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 overflow-auto">
          {renderBlockConfig()}
        </CardContent>
      </Card>
    </div>
  );
};
