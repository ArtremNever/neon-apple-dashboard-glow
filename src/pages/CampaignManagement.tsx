
import { useState } from 'react';
import { CampaignCanvas } from '@/components/campaign/CampaignCanvas';
import { CampaignToolbar } from '@/components/campaign/CampaignToolbar';
import { CampaignSidePanel } from '@/components/campaign/CampaignSidePanel';
import { KpiForecast } from '@/components/campaign/KpiForecast';
import { DraggableResizableChat } from '@/components/campaign/DraggableResizableChat';
import { Sidebar } from '@/components/Sidebar';
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
  isValid?: boolean;
}

const CampaignManagement = () => {
  const [blocks, setBlocks] = useState<BuilderBlock[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<BuilderBlock | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [forecast, setForecast] = useState({ cpi: 0 });
  const [showAiChat, setShowAiChat] = useState(false);
  const [zoom, setZoom] = useState(100);

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

  const handleCanvasClick = () => {
    setSelectedBlock(null);
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
      <Sidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="h-14 bg-slate-900 border-b border-green-500/30 flex items-center justify-between px-6 flex-shrink-0">
          <div className="flex items-center gap-2 text-sm text-green-400/70">
            <span>Dashboard</span>
            <span>{'>'}</span>
            <span className="text-green-400">Visual Builder</span>
          </div>
          
          <div className="flex items-center gap-4">
            <KpiForecast forecast={forecast} />
            <button
              onClick={() => setShowAiChat(!showAiChat)}
              className="px-3 py-1.5 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 rounded-lg text-green-400 text-sm transition-colors"
            >
              {showAiChat ? 'Hide AI' : 'Show AI'}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex relative">
          {/* Main Canvas Area - now responsive to side panel */}
          <div className={`flex-1 flex flex-col transition-all duration-300 ${selectedBlock ? 'mr-80' : ''}`}>
            <CampaignToolbar
              onAddBlock={addBlock}
              onRunPlan={runPlan}
              isValid={isValidPlan}
              isLoading={isLoading}
              zoom={zoom}
              onZoomChange={setZoom}
            />
            
            <ReactFlowProvider>
              <CampaignCanvas
                blocks={blocks}
                onBlockSelect={setSelectedBlock}
                onBlockUpdate={updateBlock}
                onBlockDelete={deleteBlock}
                onCanvasClick={handleCanvasClick}
                selectedBlock={selectedBlock}
                zoom={zoom}
              />
            </ReactFlowProvider>
          </div>

          {/* Sliding Configuration Panel - now positioned relative to adjusted canvas */}
          <div className={`
            fixed top-14 right-0 h-[calc(100vh-3.5rem)] 
            bg-slate-900/95 backdrop-blur-sm border-l border-green-500/30
            transform transition-transform duration-300 ease-in-out z-20
            ${selectedBlock ? 'translate-x-0' : 'translate-x-full'}
            w-80
          `}>
            {selectedBlock && (
              <CampaignSidePanel
                selectedBlock={selectedBlock}
                onBlockUpdate={updateBlock}
              />
            )}
          </div>

          {/* Draggable Resizable AI Chat */}
          {showAiChat && (
            <DraggableResizableChat onClose={() => setShowAiChat(false)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignManagement;
