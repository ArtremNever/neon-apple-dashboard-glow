
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
      <div className="w-96 bg-card border-l border-border p-6">
        <div className="text-center text-muted-foreground">
          <div className="text-4xl mb-4">👆</div>
          <h3 className="font-medium mb-2">Select a Block</h3>
          <p className="text-sm">Choose a block from the canvas to configure its settings</p>
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
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Client Name</Label>
              <Input
                value={selectedBlock.props.name || ''}
                onChange={(e) => updateProps({ name: e.target.value })}
                placeholder="Enter client name"
              />
            </div>
            <div>
              <Label htmlFor="company">Company</Label>
              <Input
                value={selectedBlock.props.company || ''}
                onChange={(e) => updateProps({ company: e.target.value })}
                placeholder="Enter company name"
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                value={selectedBlock.props.email || ''}
                onChange={(e) => updateProps({ email: e.target.value })}
                placeholder="client@company.com"
              />
            </div>
          </div>
        );

      case 'application':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">App Name</Label>
              <Input
                value={selectedBlock.props.name || ''}
                onChange={(e) => updateProps({ name: e.target.value })}
                placeholder="Enter app name"
              />
            </div>
            <div>
              <Label htmlFor="platform">Platform</Label>
              <Select
                value={selectedBlock.props.platform || ''}
                onValueChange={(value) => updateProps({ platform: value })}
              >
                <SelectTrigger>
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
              <Label htmlFor="bundleId">Bundle ID</Label>
              <Input
                value={selectedBlock.props.bundleId || ''}
                onChange={(e) => updateProps({ bundleId: e.target.value })}
                placeholder="com.company.app"
              />
            </div>
          </div>
        );

      case 'platform':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="platform">Platform</Label>
              <Select
                value={selectedBlock.props.platform || ''}
                onValueChange={(value) => updateProps({ platform: value })}
              >
                <SelectTrigger>
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
              <Label htmlFor="account">Account</Label>
              <Select
                value={selectedBlock.props.account || ''}
                onValueChange={(value) => updateProps({ account: value })}
                disabled={!selectedBlock.props.platform}
              >
                <SelectTrigger>
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
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Campaign Name</Label>
              <Input
                value={selectedBlock.props.name || ''}
                onChange={(e) => updateProps({ name: e.target.value })}
                placeholder="Enter campaign name"
              />
            </div>
            <div>
              <Label htmlFor="objective">Objective</Label>
              <Select
                value={selectedBlock.props.objective || ''}
                onValueChange={(value) => updateProps({ objective: value })}
              >
                <SelectTrigger>
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
              className="w-full gap-2"
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
            <div>
              <Label htmlFor="name">Adset Name</Label>
              <Input
                value={selectedBlock.props.name || ''}
                onChange={(e) => updateProps({ name: e.target.value })}
                placeholder="Enter adset name"
              />
            </div>
            <div>
              <Label htmlFor="budget">Daily Budget ($)</Label>
              <Input
                type="number"
                value={selectedBlock.props.budget || ''}
                onChange={(e) => updateProps({ budget: Number(e.target.value) })}
                placeholder="Enter daily budget"
              />
            </div>
            <div>
              <Label>Geographic Targeting</Label>
              <div className="text-sm text-muted-foreground mb-2">
                Countries: {selectedBlock.props.countries?.join(', ') || 'None'}
              </div>
              <Button
                variant="outline"
                className="w-full gap-2"
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
        );

      case 'creative':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Creative Name</Label>
              <Input
                value={selectedBlock.props.name || ''}
                onChange={(e) => updateProps({ name: e.target.value })}
                placeholder="Enter creative name"
              />
            </div>
            <div>
              <Label htmlFor="format">Format</Label>
              <Select
                value={selectedBlock.props.format || ''}
                onValueChange={(value) => updateProps({ format: value })}
              >
                <SelectTrigger>
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
              <Label htmlFor="headline">Headline</Label>
              <Input
                value={selectedBlock.props.headline || ''}
                onChange={(e) => updateProps({ headline: e.target.value })}
                placeholder="Enter headline"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                value={selectedBlock.props.description || ''}
                onChange={(e) => updateProps({ description: e.target.value })}
                placeholder="Enter description"
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center text-muted-foreground">
            <p>Configuration for {selectedBlock.type} coming soon...</p>
          </div>
        );
    }
  };

  return (
    <div className="w-96 bg-card border-l border-border">
      <Card className="border-0 rounded-none h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <span className="text-2xl">
              {getBlockIcon(selectedBlock.type)}
            </span>
            Configure {selectedBlock.type.charAt(0).toUpperCase() + selectedBlock.type.slice(1)}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {renderBlockConfig()}
        </CardContent>
      </Card>
    </div>
  );
};
