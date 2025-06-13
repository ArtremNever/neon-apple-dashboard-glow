import { Layout } from '@/components/Layout';
import { useState, useCallback } from 'react';
import { CampaignCanvas } from '@/components/campaign/CampaignCanvas';
import { CampaignToolbar } from '@/components/campaign/CampaignToolbar';
import { CampaignSidePanel } from '@/components/campaign/CampaignSidePanel';
import { FloatingChatButton } from '@/components/campaign/FloatingChatButton';
import { ReactFlowProvider } from '@xyflow/react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Eye } from 'lucide-react';

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
  const [blocksVisible, setBlocksVisible] = useState(true);
  const [sidePanelVisible, setSidePanelVisible] = useState(true);

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
    setSidePanelVisible(true);
    
    toast.success(`Added new ${type} block`, {
      description: `Block ${newBlock.id.slice(-4)} has been created`,
    });
    
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
    const blockToDelete = blocks.find(b => b.id === blockId);
    
    setBlocks(prev => prev.filter(block => block.id !== blockId));
    if (selectedBlock?.id === blockId) {
      setSelectedBlock(null);
      setSidePanelVisible(false);
    }
    
    if (blockToDelete) {
      toast.info(`Deleted ${blockToDelete.type} block`, {
        description: `Block ${blockId.slice(-4)} has been removed`,
      });
    }
    
    console.log(`Deleted block ${blockId}`);
  }, [selectedBlock, blocks]);

  const selectBlock = useCallback((block: BuilderBlock) => {
    setSelectedBlock(block);
    setSidePanelVisible(true);
    console.log('Selected block:', block);
  }, []);

  const clearSelection = useCallback(() => {
    setSelectedBlock(null);
    setSidePanelVisible(false);
    console.log('Cleared selection');
  }, []);

  const runPlan = useCallback(async () => {
    setIsLoading(true);
    console.log('Running campaign plan with blocks:', blocks);
    
    toast.promise(
      new Promise(resolve => setTimeout(resolve, 2000)),
      {
        loading: 'Running campaign plan...',
        success: 'Campaign plan executed successfully!',
        error: 'Failed to execute campaign plan',
      }
    );
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    console.log('Campaign plan execution completed');
  }, [blocks]);

  const toggleBlocksVisibility = useCallback(() => {
    setBlocksVisible(prev => !prev);
    console.log('Toggled blocks visibility:', !blocksVisible);
  }, [blocksVisible]);

  const isValidPlan = blocks.length > 0 && blocks.every(block => block.isValid);

  return (
    <Layout>
      <div className="h-full flex flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        <CampaignToolbar
          onAddBlock={addBlock}
          onRunPlan={runPlan}
          isValid={isValidPlan}
          isLoading={isLoading}
          zoom={zoom}
          onZoomChange={setZoom}
          blocksVisible={blocksVisible}
          onToggleBlocksVisibility={toggleBlocksVisibility}
        />
        
        <div className="flex-1 flex overflow-hidden min-h-0 relative">
          <ReactFlowProvider>
            <CampaignCanvas
              blocks={blocksVisible ? blocks : []}
              onBlockSelect={selectBlock}
              onBlockUpdate={updateBlock}
              onBlockDelete={deleteBlock}
              onCanvasClick={clearSelection}
              selectedBlock={selectedBlock}
              zoom={zoom}
            />
          </ReactFlowProvider>
          
          {selectedBlock && sidePanelVisible && (
            <div className="w-80 border-l border-slate-700/50 bg-slate-900/95 backdrop-blur-xl shadow-2xl">
              <CampaignSidePanel
                selectedBlock={selectedBlock}
                onBlockUpdate={updateBlock}
              />
            </div>
          )}

          {selectedBlock && !sidePanelVisible && (
            <div className="absolute right-4 top-4 z-10">
              <Button
                onClick={() => setSidePanelVisible(true)}
                className="
                  h-12 px-4 rounded-xl font-medium transition-all duration-200 transform hover:scale-105
                  bg-gradient-to-r from-blue-600/80 to-indigo-600/80 hover:from-blue-500/90 hover:to-indigo-500/90
                  border border-blue-500/40 hover:border-blue-400/60 text-white shadow-lg hover:shadow-blue-500/25
                "
              >
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4" />
                  <span>Show Configure</span>
                </div>
              </Button>
            </div>
          )}
        </div>

        <FloatingChatButton />
      </div>
    </Layout>
  );
};

export default CampaignManagement;
