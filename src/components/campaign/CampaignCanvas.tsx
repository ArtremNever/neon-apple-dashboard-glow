
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
        style: { stroke: '#3b82f6', strokeWidth: 2 },
        markerEnd: {
          type: 'arrowclosed' as const,
          width: 20,
          height: 20,
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
      <div className="flex-1 p-6 bg-slate-950 overflow-auto" onClick={onPaneClick}>
        <div className="flex items-center justify-center h-full">
          <div className="text-center text-slate-400">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-lg font-medium mb-2 text-slate-300">Start Building Your Campaign</h3>
            <p className="text-sm text-slate-500">Add blocks from the toolbar to create your campaign hierarchy</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-slate-950">
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
        className="bg-slate-950"
        style={{ backgroundColor: '#020617' }}
      >
        <Controls className="bg-slate-800 border-slate-600 text-slate-300" />
        <Background 
          variant={BackgroundVariant.Dots} 
          gap={20} 
          size={1}
          color="#475569"
        />
      </ReactFlow>
    </div>
  );
};
