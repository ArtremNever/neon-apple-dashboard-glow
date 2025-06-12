
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
    const isValid = validateBlock(selectedBlock.type, newProps);
    onBlockUpdate(selectedBlock.id, { 
      props: { ...selectedBlock.props, ...newProps },
      isValid 
    });
  };

  const validateBlock = (type: string, props: Record<string, any>): boolean => {
    switch (type) {
      case 'platform':
        return !!props.platform && !!props.account;
      case 'budget':
        return !!props.daily && props.daily > 0;
      case 'audience':
        return !!props.countries && props.countries.length > 0;
      default:
        return true;
    }
  };

  const renderBlockConfig = () => {
    switch (selectedBlock.type) {
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

            <div>
              <Label htmlFor="application">Application</Label>
              <Select
                value={selectedBlock.props.application || ''}
                onValueChange={(value) => updateProps({ application: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select application" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="app1">My Game App</SelectItem>
                  <SelectItem value="app2">Shopping App</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={() => {
                const suggestedName = `${selectedBlock.props.platform?.toUpperCase()}_USCA_APP`;
                updateProps({ campaignName: suggestedName });
              }}
            >
              <Sparkles className="w-4 h-4" />
              AI-Suggest Name
            </Button>

            {selectedBlock.props.campaignName && (
              <div>
                <Label htmlFor="campaignName">Campaign Name</Label>
                <Input
                  value={selectedBlock.props.campaignName}
                  onChange={(e) => updateProps({ campaignName: e.target.value })}
                />
              </div>
            )}
          </div>
        );

      case 'audience':
        return (
          <div className="space-y-4">
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

            <div>
              <Label htmlFor="ageMin">Age Range</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Min"
                  value={selectedBlock.props.ageMin || ''}
                  onChange={(e) => updateProps({ ageMin: e.target.value })}
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={selectedBlock.props.ageMax || ''}
                  onChange={(e) => updateProps({ ageMax: e.target.value })}
                />
              </div>
            </div>
          </div>
        );

      case 'budget':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="daily">Daily Budget ($)</Label>
              <Input
                type="number"
                value={selectedBlock.props.daily || ''}
                onChange={(e) => updateProps({ daily: Number(e.target.value) })}
                placeholder="Enter daily budget"
              />
            </div>

            <div>
              <Label htmlFor="total">Total Budget ($)</Label>
              <Input
                type="number"
                value={selectedBlock.props.total || ''}
                onChange={(e) => updateProps({ total: Number(e.target.value) })}
                placeholder="Optional"
              />
            </div>

            <div>
              <Label htmlFor="bidStrategy">Bid Strategy</Label>
              <Select
                value={selectedBlock.props.bidStrategy || ''}
                onValueChange={(value) => updateProps({ bidStrategy: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select strategy" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="lowest_cost">Lowest Cost</SelectItem>
                  <SelectItem value="cost_cap">Cost Cap</SelectItem>
                  <SelectItem value="bid_cap">Bid Cap</SelectItem>
                </SelectContent>
              </Select>
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
              {selectedBlock.type === 'platform' && '🌐'}
              {selectedBlock.type === 'budget' && '💰'}
              {selectedBlock.type === 'audience' && '👥'}
              {selectedBlock.type === 'creative' && '🎨'}
              {selectedBlock.type === 'adset' && '📊'}
              {selectedBlock.type === 'client' && '👤'}
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
