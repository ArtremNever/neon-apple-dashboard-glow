
import React, { useMemo, useEffect, useCallback } from 'react';
import {
  ReactFlow,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  useReactFlow,
  Controls,
  Background,
  BackgroundVariant,
  NodeTypes,
  addEdge,
  Connection,
  OnConnect,
  MiniMap
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { BuilderBlock } from '@/types/campaign';
import HierarchyNode, { HierarchyNodeData } from './HierarchyNode';

// Define node types
const nodeTypes: NodeTypes = {
  hierarchy: HierarchyNode,
};

interface CampaignCanvasProps {
  blocks: BuilderBlock[];
  selectedBlock: BuilderBlock | null;
  onBlockSelect: (block: BuilderBlock) => void;
  onBlockDelete: (blockId: string) => void;
  zoom: number;
}

const CampaignCanvas: React.FC<CampaignCanvasProps> = ({
  blocks,
  selectedBlock,
  onBlockSelect,
  onBlockDelete,
  zoom,
}: CampaignCanvasProps) => {
  const { zoomTo } = useReactFlow();

  const initialNodes: Node[] = useMemo(() => 
    blocks.map((block) => ({
      id: block.id,
      type: 'hierarchy',
      position: { x: block.layout.x, y: block.layout.y },
      data: {
        block,
        onSelect: onBlockSelect,
        onDelete: onBlockDelete,
        isSelected: selectedBlock?.id === block.id,
      } as HierarchyNodeData,
    })),
    [blocks, selectedBlock, onBlockSelect, onBlockDelete]
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  // Apply zoom when it changes
  useEffect(() => {
    if (zoom && zoom !== 1) {
      setTimeout(() => {
        zoomTo(zoom, { duration: 800 });
      }, 100);
    }
  }, [zoom, zoomTo]);

  const onConnect: OnConnect = useCallback(
    (params: Connection) => {
      const newEdge: Edge = {
        id: `edge-${params.source}-${params.target}`,
        source: params.source!,
        target: params.target!,
        sourceHandle: params.sourceHandle,
        targetHandle: params.targetHandle,
        animated: true,
        type: 'smoothstep',
        style: { 
          stroke: '#3b82f6',
          strokeWidth: 2,
        },
        markerEnd: {
          type: 'arrowclosed',
          color: '#3b82f6',
        },
      };
      setEdges((eds) => addEdge(newEdge, eds));
      console.log('Connected:', params.source, 'to', params.target);
    },
    [setEdges]
  );

  // Auto-layout nodes
  const applyAutoLayout = useCallback(() => {
    const layoutedNodes = nodes.map((node, index) => ({
      ...node,
      position: {
        x: (index % 3) * 280 + 100,
        y: Math.floor(index / 3) * 200 + 100,
      },
    }));
    setNodes(layoutedNodes);
  }, [nodes, setNodes]);

  // Apply auto-layout on mount and when blocks change significantly
  useEffect(() => {
    if (blocks.length > 0 && nodes.length === blocks.length) {
      const hasPositions = blocks.every(block => 
        block.layout.x !== undefined && block.layout.y !== undefined
      );
      
      if (!hasPositions) {
        applyAutoLayout();
      }
    }
  }, [blocks, nodes.length, applyAutoLayout]);

  // Update nodes when blocks change
  useEffect(() => {
    const newNodes: Node[] = blocks.map((block) => ({
      id: block.id,
      type: 'hierarchy',
      position: { x: block.layout.x, y: block.layout.y },
      data: {
        block,
        onSelect: onBlockSelect,
        onDelete: onBlockDelete,
        isSelected: selectedBlock?.id === block.id,
      } as HierarchyNodeData,
    }));
    setNodes(newNodes);
  }, [blocks, selectedBlock, onBlockSelect, onBlockDelete, setNodes]);

  return (
    <div className="w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 relative">
      {/* Custom styles for React Flow */}
      <style>
        {`
        .react-flow__handle {
          opacity: 1 !important;
          visibility: visible !important;
        }
        
        .react-flow__handle:hover {
          transform: scale(1.25) !important;
        }
        
        .react-flow__edge {
          stroke-dasharray: 10,5 !important;
          animation: dash 20s linear infinite !important;
        }
        
        .react-flow__edge-path {
          stroke: #3b82f6 !important;
          stroke-width: 2 !important;
          stroke-dasharray: 10,5 !important;
          animation: dash 20s linear infinite !important;
        }
        
        @keyframes dash {
          to {
            stroke-dashoffset: -1000;
          }
        }
        
        .react-flow__edge.animated .react-flow__edge-path {
          stroke-dasharray: 10,5 !important;
          animation: dash 20s linear infinite !important;
        }
        
        .react-flow__connection-line {
          stroke: #3b82f6 !important;
          stroke-width: 2 !important;
          stroke-dasharray: 10,5 !important;
        }

        .react-flow__edge .react-flow__edge-path {
          stroke: #3b82f6 !important;
          stroke-width: 2 !important;
        }

        .react-flow__edge-text {
          fill: #ffffff !important;
        }
        `}
      </style>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 right-1/3 w-24 h-24 bg-cyan-500/10 rounded-full blur-2xl animate-pulse delay-500" />
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="top-right"
        className="bg-transparent"
        connectionLineStyle={{
          stroke: '#3b82f6',
          strokeWidth: 2,
          strokeDasharray: '10,5',
        }}
        defaultEdgeOptions={{
          style: { stroke: '#3b82f6', strokeWidth: 2 },
          markerEnd: { type: 'arrowclosed', color: '#3b82f6' },
        }}
      >
        <Controls className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-xl [&>button]:bg-slate-700/80 [&>button]:border-slate-600/50 [&>button]:text-slate-200 [&>button:hover]:bg-slate-600/80" />
        <Background 
          color="#334155" 
          gap={20} 
          className="opacity-30"
          variant={BackgroundVariant.Dots}
        />
        <MiniMap 
          className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-lg"
          nodeColor={(node) => {
            const nodeData = node.data as HierarchyNodeData;
            const type = nodeData?.block?.type;
            switch (type) {
              case 'client': return '#3b82f6';
              case 'application': return '#8b5cf6';
              case 'platform': return '#06b6d4';
              case 'campaign': return '#f97316';
              case 'adset': return '#f59e0b';
              case 'creative': return '#10b981';
              default: return '#64748b';
            }
          }}
        />
      </ReactFlow>
    </div>
  );
};

export default CampaignCanvas;
