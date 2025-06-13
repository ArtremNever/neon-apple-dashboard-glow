
import { useState } from 'react';
import { CampaignCanvas } from '@/components/campaign/CampaignCanvas';
import { CampaignToolbar } from '@/components/campaign/CampaignToolbar';
import { CampaignSidePanel } from '@/components/campaign/CampaignSidePanel';
import { KpiForecast } from '@/components/campaign/KpiForecast';
import { AiChatPanel } from '@/components/campaign/AiChatPanel';
import { Sidebar } from '@/components/Sidebar';

export interface BuilderBlock {
  id: string;
  type: 'client' | 'application' | 'platform' | 'campaign' | 'adset' | 'creative';
  props: Record<string, any>;
  layout: {
    x: number;
    y: number;
    w: number;
    h: number;
  };
  isValid?: boolean;
}

const CampaignManagement = () => {
  const [blocks, setBlocks] = useState<BuilderBlock[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<BuilderBlock | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [forecast, setForecast] = useState({ cpi: 0 });

  const addBlock = (type: BuilderBlock['type']) => {
    const newBlock: BuilderBlock = {
      id: `${type}-${Date.now()}`,
      type,
      props: {},
      layout: {
        x: Math.random() * 400,
        y: Math.random() * 200,
        w: 3,
        h: 2,
      },
      isValid: false,
    };
    
    setBlocks(prev => [...prev, newBlock]);
    setSelectedBlock(newBlock);
  };

  const updateBlock = (blockId: string, updates: Partial<BuilderBlock>) => {
    setBlocks(prev => 
      prev.map(block => 
        block.id === blockId 
          ? { ...block, ...updates }
          : block
      )
    );
    
    if (selectedBlock?.id === blockId) {
      setSelectedBlock(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  const deleteBlock = (blockId: string) => {
    setBlocks(prev => prev.filter(block => block.id !== blockId));
    if (selectedBlock?.id === blockId) {
      setSelectedBlock(null);
    }
  };

  const isValidPlan = blocks.length > 0 && blocks.every(block => block.isValid);

  const runPlan = async () => {
    if (!isValidPlan) return;
    
    setIsLoading(true);
    try {
      console.log('Running plan with blocks:', blocks);
      await new Promise(resolve => setTimeout(resolve, 2000));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* Sidebar Navigation */}
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <div className="h-14 bg-slate-900 border-b border-green-500/30 flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center gap-2 text-sm text-green-400/70">
            <span>Dashboard</span>
            <span>{'>'}</span>
            <span className="text-green-400">Visual Builder</span>
          </div>
          
          <KpiForecast forecast={forecast} />
        </div>

        {/* Main Content Area with Fixed Layout */}
        <div className="flex-1 flex min-h-0">
          {/* Canvas Area - Fixed width calculation */}
          <div className="flex flex-col min-w-0" style={{ 
            width: `calc(100% - ${selectedBlock ? '384px' : '0px'} - 384px)` 
          }}>
            <CampaignToolbar
              onAddBlock={addBlock}
              onRunPlan={runPlan}
              isValid={isValidPlan}
              isLoading={isLoading}
            />
            
            <CampaignCanvas
              blocks={blocks}
              onBlockSelect={setSelectedBlock}
              onBlockUpdate={updateBlock}
              onBlockDelete={deleteBlock}
              selectedBlock={selectedBlock}
            />
          </div>

          {/* Configuration Panel - Fixed Width */}
          {selectedBlock && (
            <div className="w-96 flex-shrink-0">
              <CampaignSidePanel
                selectedBlock={selectedBlock}
                onBlockUpdate={updateBlock}
              />
            </div>
          )}

          {/* AI Chat Panel - Fixed Width */}
          <div className="w-96 flex-shrink-0">
            <AiChatPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CampaignManagement;
