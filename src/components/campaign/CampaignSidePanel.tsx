import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BuilderBlock } from '@/pages/CampaignManagement';
import { Sparkles, Zap } from 'lucide-react';

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
      <div className="h-full bg-slate-950 flex items-center justify-center p-4">
        <div className="text-center text-green-400/70">
          <div className="text-2xl mb-2">👆</div>
          <h3 className="font-medium mb-1 text-sm">Выберите блок</h3>
          <p className="text-xs text-green-400/50">Кликните на блок для настройки</p>
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

  const renderBlockConfig = () => {
    switch (selectedBlock.type) {
      case 'client':
        return (
          <div className="space-y-3">
            <div>
              <Label htmlFor="name" className="text-xs">Client Name</Label>
              <Input
                value={selectedBlock.props.name || ''}
                onChange={(e) => updateProps({ name: e.target.value })}
                placeholder="Enter client name"
                className="h-8 text-xs"
              />
            </div>
            <div>
              <Label htmlFor="company" className="text-xs">Company</Label>
              <Input
                value={selectedBlock.props.company || ''}
                onChange={(e) => updateProps({ company: e.target.value })}
                placeholder="Enter company name"
                className="h-8 text-xs"
              />
            </div>
            <div>
              <Label htmlFor="email" className="text-xs">Email</Label>
              <Input
                type="email"
                value={selectedBlock.props.email || ''}
                onChange={(e) => updateProps({ email: e.target.value })}
                placeholder="client@company.com"
                className="h-8 text-xs"
              />
            </div>
          </div>
        );

      case 'application':
        return (
          <div className="space-y-3">
            <div>
              <Label htmlFor="name" className="text-xs">App Name</Label>
              <Input
                value={selectedBlock.props.name || ''}
                onChange={(e) => updateProps({ name: e.target.value })}
                placeholder="Enter app name"
                className="h-8 text-xs"
              />
            </div>
            <div>
              <Label htmlFor="platform" className="text-xs">Platform</Label>
              <Select
                value={selectedBlock.props.platform || ''}
                onValueChange={(value) => updateProps({ platform: value })}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ios">iOS</SelectItem>
                  <SelectItem value="android">Android</SelectItem>
                  <SelectItem value="web">Web</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="bundleId" className="text-xs">Bundle ID</Label>
              <Input
                value={selectedBlock.props.bundleId || ''}
                onChange={(e) => updateProps({ bundleId: e.target.value })}
                placeholder="com.company.app"
                className="h-8 text-xs"
              />
            </div>
          </div>
        );

      case 'platform':
        return (
          <div className="space-y-3">
            <div>
              <Label htmlFor="platform" className="text-xs">Platform</Label>
              <Select
                value={selectedBlock.props.platform || ''}
                onValueChange={(value) => updateProps({ platform: value })}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue placeholder="Select platform" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="facebook">Facebook</SelectItem>
                  <SelectItem value="google">Google Ads</SelectItem>
                  <SelectItem value="tiktok">TikTok</SelectItem>
                  <SelectItem value="snapchat">Snapchat</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="account" className="text-xs">Account</Label>
              <Select
                value={selectedBlock.props.account || ''}
                onValueChange={(value) => updateProps({ account: value })}
                disabled={!selectedBlock.props.platform}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue placeholder="Select account" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="account1">Account 1</SelectItem>
                  <SelectItem value="account2">Account 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 'campaign':
        return (
          <div className="space-y-3">
            <div>
              <Label htmlFor="name" className="text-xs">Campaign Name</Label>
              <Input
                value={selectedBlock.props.name || ''}
                onChange={(e) => updateProps({ name: e.target.value })}
                placeholder="Enter campaign name"
                className="h-8 text-xs"
              />
            </div>
            <div>
              <Label htmlFor="objective" className="text-xs">Objective</Label>
              <Select
                value={selectedBlock.props.objective || ''}
                onValueChange={(value) => updateProps({ objective: value })}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue placeholder="Select objective" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="awareness">Brand Awareness</SelectItem>
                  <SelectItem value="traffic">Traffic</SelectItem>
                  <SelectItem value="conversions">Conversions</SelectItem>
                  <SelectItem value="app_installs">App Installs</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              variant="outline"
              className="w-full gap-1 h-8 text-xs"
              onClick={() => {
                const suggestedName = `CAMPAIGN_${selectedBlock.props.objective?.toUpperCase()}_${Date.now().toString().slice(-4)}`;
                updateProps({ name: suggestedName });
              }}
            >
              <Sparkles className="w-3 h-3" />
              AI-Generate Name
            </Button>
          </div>
        );

      case 'adset':
        return (
          <div className="space-y-3">
            <div>
              <Label htmlFor="name" className="text-xs">Adset Name</Label>
              <Input
                value={selectedBlock.props.name || ''}
                onChange={(e) => updateProps({ name: e.target.value })}
                placeholder="Enter adset name"
                className="h-8 text-xs"
              />
            </div>
            <div>
              <Label htmlFor="budget" className="text-xs">Daily Budget ($)</Label>
              <Input
                type="number"
                value={selectedBlock.props.budget || ''}
                onChange={(e) => updateProps({ budget: Number(e.target.value) })}
                placeholder="Enter daily budget"
                className="h-8 text-xs"
              />
            </div>
            <div>
              <Label className="text-xs">Geographic Targeting</Label>
              <div className="text-xs text-green-400/60 mb-2">
                Countries: {selectedBlock.props.countries?.join(', ') || 'None'}
              </div>
              <Button
                variant="outline"
                className="w-full gap-1 h-8 text-xs"
                onClick={() => {
                  const tier1Countries = ['US', 'CA', 'AU', 'GB'];
                  updateProps({ countries: tier1Countries });
                }}
              >
                <Zap className="w-3 h-3" />
                🔥 AI-Pick Tier-1 GEOs
              </Button>
            </div>
          </div>
        );

      case 'creative':
        return (
          <div className="space-y-3">
            <div>
              <Label htmlFor="name" className="text-xs">Creative Name</Label>
              <Input
                value={selectedBlock.props.name || ''}
                onChange={(e) => updateProps({ name: e.target.value })}
                placeholder="Enter creative name"
                className="h-8 text-xs"
              />
            </div>
            <div>
              <Label htmlFor="format" className="text-xs">Format</Label>
              <Select
                value={selectedBlock.props.format || ''}
                onValueChange={(value) => updateProps({ format: value })}
              >
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="image">Single Image</SelectItem>
                  <SelectItem value="video">Video</SelectItem>
                  <SelectItem value="carousel">Carousel</SelectItem>
                  <SelectItem value="collection">Collection</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="headline" className="text-xs">Headline</Label>
              <Input
                value={selectedBlock.props.headline || ''}
                onChange={(e) => updateProps({ headline: e.target.value })}
                placeholder="Enter headline"
                className="h-8 text-xs"
              />
            </div>
            <div>
              <Label htmlFor="description" className="text-xs">Description</Label>
              <Input
                value={selectedBlock.props.description || ''}
                onChange={(e) => updateProps({ description: e.target.value })}
                placeholder="Enter description"
                className="h-8 text-xs"
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center text-green-400/60">
            <p className="text-xs">Configuration for {selectedBlock.type} coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div className="h-full bg-slate-950">
      <Card className="border-0 rounded-none h-full border-green-500/30">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-sm">
            <span className="text-lg">
              {getBlockIcon(selectedBlock.type)}
            </span>
            Configure {selectedBlock.type.charAt(0).toUpperCase() + selectedBlock.type.slice(1)}
          </CardTitle>
        </CardHeader>
        <CardContent className="text-xs">
          {renderBlockConfig()}
        </CardContent>
      </Card>
    </div>
  );
};
