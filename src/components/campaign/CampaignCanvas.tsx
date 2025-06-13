
import { useCallback, useMemo, useEffect } from 'react';
import {
  ReactFlow,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
  BackgroundVariant,
  useReactFlow,
  NodeTypes,
  MarkerType,
  MiniMap,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { BuilderBlock } from '@/types/campaign';
import { HierarchyNode, HierarchyNodeData } from './HierarchyNode';

interface CampaignCanvasProps {
  blocks: BuilderBlock[];
  onBlockSelect: (block: BuilderBlock) => void;
  onBlockUpdate: (blockId: string, updates: Partial<BuilderBlock>) => void;
  onBlockDelete: (blockId: string) => void;
  onCanvasClick: () => void;
  selectedBlock: BuilderBlock | null;
  zoom: number;
}

const nodeTypes: NodeTypes = {
  hierarchy: HierarchyNode,
};

export const CampaignCanvas = ({
  blocks,
  onBlockSelect,
  onBlockUpdate,
  onBlockDelete,
  onCanvasClick,
  selectedBlock,
  zoom,
}: CampaignCanvasProps) => {
  const { zoomTo } = useReactFlow();

  const initialNodes: Node<HierarchyNodeData>[] = useMemo(() => 
    blocks.map((block) => ({
      id: block.id,
      type: 'hierarchy',
      position: { x: block.layout.x, y: block.layout.y },
      style: {
        width: block.layout.w * 80 + 64,
        height: block.layout.h * 60 + 32,
      },
      data: {
        block,
        onSelect: onBlockSelect,
        onDelete: onBlockDelete,
        isSelected: selectedBlock?.id === block.id,
      },
    })),
    [blocks, selectedBlock, onBlockSelect, onBlockDelete]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState<HierarchyNodeData>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Apply zoom when it changes
  useEffect(() => {
    if (zoomTo) {
      zoomTo(zoom / 100);
    }
  }, [zoom, zoomTo]);

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge: Edge = {
        ...params,
        id: `${params.source}-${params.target}-${params.sourceHandle}-${params.targetHandle}`,
        type: 'smoothstep',
        animated: true,
        style: { 
          stroke: 'url(#gradient)', 
          strokeWidth: 3,
          filter: 'drop-shadow(0 0 6px rgba(59, 130, 246, 0.6))'
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          width: 24,
          height: 24,
          color: '#3b82f6',
        },
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  const onNodeDragStop = useCallback(
    (event: any, node: Node) => {
      onBlockUpdate(node.id, {
        layout: {
          ...blocks.find(b => b.id === node.id)?.layout || { w: 3, h: 2 },
          x: node.position.x,
          y: node.position.y,
        },
      });
    },
    [blocks, onBlockUpdate]
  );

  const onPaneClick = useCallback(() => {
    onCanvasClick();
  }, [onCanvasClick]);

  // Handle edge click for deletion
  const onEdgeClick = useCallback((event: React.MouseEvent, edge: Edge) => {
    event.stopPropagation();
    setEdges((edges) => edges.filter((e) => e.id !== edge.id));
  }, [setEdges]);

  // Update nodes when blocks change
  useEffect(() => {
    const newNodes: Node<HierarchyNodeData>[] = blocks.map((block) => ({
      id: block.id,
      type: 'hierarchy',
      position: { x: block.layout.x, y: block.layout.y },
      style: {
        width: block.layout.w * 80 + 64,
        height: block.layout.h * 60 + 32,
      },
      data: {
        block,
        onSelect: onBlockSelect,
        onDelete: onBlockDelete,
        isSelected: selectedBlock?.id === block.id,
      },
    }));
    setNodes(newNodes);
  }, [blocks, selectedBlock, onBlockSelect, onBlockDelete, setNodes]);

  if (blocks.length === 0) {
    return (
      <div className="flex-1 p-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-auto relative" onClick={onPaneClick}>
        {/* Animated background elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-500/5 rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-3/4 left-1/4 w-80 h-80 bg-purple-500/3 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="flex items-center justify-center h-full relative z-10">
          <div className="text-center glass-medium p-12 rounded-3xl border border-primary-500/20 backdrop-blur-xl">
            <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-primary-500/20 to-primary-600/20 flex items-center justify-center border border-primary-500/30 animate-pulse-glow">
              <span className="text-4xl animate-float">🎯</span>
            </div>
            <h3 className="text-2xl font-semibold mb-4 text-white bg-gradient-to-r from-white to-primary-200 bg-clip-text text-transparent">
              Start Building Your Campaign
            </h3>
            <p className="text-primary-300/80 max-w-md mx-auto leading-relaxed">
              Add blocks from the toolbar to create your campaign hierarchy and watch the magic happen
            </p>
            <div className="mt-8 flex justify-center gap-2">
              <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse"></div>
              <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary-500/3 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-3/4 left-1/4 w-80 h-80 bg-purple-500/2 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-3/4 w-64 h-64 bg-emerald-500/2 rounded-full blur-3xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeDragStop={onNodeDragStop}
        onPaneClick={onPaneClick}
        onEdgeClick={onEdgeClick}
        nodeTypes={nodeTypes}
        fitView
        className="bg-transparent"
        style={{ backgroundColor: 'transparent' }}
      >
        {/* Enhanced Controls */}
        <Controls className="!bg-slate-800/40 !backdrop-blur-xl !border !border-slate-600/30 !rounded-2xl !shadow-2xl !shadow-primary-500/10 !p-2 !gap-2 [&>button]:!bg-slate-700/50 [&>button]:!backdrop-blur-sm [&>button]:!border [&>button]:!border-slate-600/40 [&>button]:!text-primary-300 [&>button:hover]:!bg-primary-500/20 [&>button:hover]:!text-primary-200 [&>button:hover]:!border-primary-500/50 [&>button]:!rounded-xl [&>button]:!transition-all [&>button]:!duration-200 [&>button:hover]:!scale-110 [&>button:hover]:!shadow-lg [&>button:hover]:!shadow-primary-500/20" />
        
        {/* Enhanced MiniMap */}
        <MiniMap 
          className="!bg-slate-800/40 !backdrop-blur-xl !border-slate-600/30 !rounded-2xl !shadow-2xl !shadow-primary-500/10 !overflow-hidden"
          nodeClassName={(node) => {
            switch (node.type) {
              case 'client': return '!fill-blue-400/60';
              case 'application': return '!fill-green-400/60';
              case 'platform': return '!fill-purple-400/60';
              case 'campaign': return '!fill-orange-400/60';
              case 'adset': return '!fill-pink-400/60';
              case 'creative': return '!fill-cyan-400/60';
              default: return '!fill-slate-400/60';
            }
          }}
          maskColor="rgba(15, 23, 42, 0.8)"
        />
        
        {/* Enhanced Background with gradient */}
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={24} 
          size={2}
          color="rgba(59, 130, 246, 0.15)"
          className="opacity-40"
        />
        
        {/* Custom SVG definitions for gradients */}
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.8} />
            <stop offset="50%" stopColor="#8b5cf6" stopOpacity={0.6} />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.8} />
          </linearGradient>
        </defs>
      </ReactFlow>
    </div>
  );
};
