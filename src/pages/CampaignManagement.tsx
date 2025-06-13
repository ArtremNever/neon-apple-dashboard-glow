
import { Layout } from '@/components/Layout';
import { useState, useCallback } from 'react';
import { CampaignCanvas } from '@/components/campaign/CampaignCanvas';
import { CampaignToolbar } from '@/components/campaign/CampaignToolbar';
import { CampaignSidePanel } from '@/components/campaign/CampaignSidePanel';
import { ReactFlowProvider } from '@xyflow/react';

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
  isValid: boolean;
}

const CampaignManagement = () => {
  const [blocks, setBlocks] = useState<BuilderBlock[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<BuilderBlock | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [zoom, setZoom] = useState(100);

  const generateId = () => Math.random().toString(36).substr(2, 9);

  const addBlock = useCallback((type: BuilderBlock['type']) => {
    const newBlock: BuilderBlock = {
      id: generateId(),
      type,
      props: {},
      layout: {
        x: Math.random() * 400,
        y: Math.random() * 300,
        w: 3,
        h: 2,
      },
      isValid: false,
    };
    
    setBlocks(prev => [...prev, newBlock]);
    setSelectedBlock(newBlock);
    console.log(`Added new ${type} block:`, newBlock);
  }, []);

  const updateBlock = useCallback((blockId: string, updates: Partial<BuilderBlock>) => {
    setBlocks(prev => prev.map(block => 
      block.id === blockId ? { ...block, ...updates } : block
    ));
    
    if (selectedBlock?.id === blockId) {
      setSelectedBlock(prev => prev ? { ...prev, ...updates } : null);
    }
    console.log(`Updated block ${blockId}:`, updates);
  }, [selectedBlock]);

  const deleteBlock = useCallback((blockId: string) => {
    setBlocks(prev => prev.filter(block => block.id !== blockId));
    if (selectedBlock?.id === blockId) {
      setSelectedBlock(null);
    }
    console.log(`Deleted block ${blockId}`);
  }, [selectedBlock]);

  const selectBlock = useCallback((block: BuilderBlock) => {
    setSelectedBlock(block);
    console.log('Selected block:', block);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedBlock(null);
    console.log('Cleared selection');
  }, []);

  const runPlan = useCallback(async () => {
    setIsLoading(true);
    console.log('Running campaign plan with blocks:', blocks);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    console.log('Campaign plan execution completed');
  }, [blocks]);

  const isValidPlan = blocks.length > 0 && blocks.every(block => block.isValid);

  return (
    <Layout>
      <div className="h-full flex flex-col bg-slate-950">
        <CampaignToolbar
          onAddBlock={addBlock}
          onRunPlan={runPlan}
          isValid={isValidPlan}
          isLoading={isLoading}
          zoom={zoom}
          onZoomChange={setZoom}
        />
        
        <div className="flex-1 flex overflow-hidden">
          <ReactFlowProvider>
            <CampaignCanvas
              blocks={blocks}
              onBlockSelect={selectBlock}
              onBlockUpdate={updateBlock}
              onBlockDelete={deleteBlock}
              onCanvasClick={clearSelection}
              selectedBlock={selectedBlock}
              zoom={zoom}
            />
          </ReactFlowProvider>
          
          <div className="w-80 border-l border-green-500/30">
            <CampaignSidePanel
              selectedBlock={selectedBlock}
              onBlockUpdate={updateBlock}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CampaignManagement;
