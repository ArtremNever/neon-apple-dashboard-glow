
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
  NodeTypes,
  addEdge,
  Connection,
  OnNodesChange,
  OnEdgesChange,
  OnConnect
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

  const initialNodes: Node<HierarchyNodeData>[] = useMemo(() => 
    blocks.map((block) => ({
      id: block.id,
      type: 'hierarchy',
      position: { x: block.layout.x, y: block.layout.y },
      data: {
        block,
        onSelect: onBlockSelect,
        onDelete: onBlockDelete,
        isSelected: selectedBlock?.id === block.id,
      },
    })),
    [blocks, selectedBlock, onBlockSelect, onBlockDelete]
  );

  const [nodes, setNodes, onNodesChange]: [
    Node<HierarchyNodeData>[],
    React.Dispatch<React.SetStateAction<Node<HierarchyNodeData>[]>>,
    OnNodesChange<Node<HierarchyNodeData>>
  ] = useNodesState(initialNodes);
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
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  // Auto-layout nodes
  const applyAutoLayout = useCallback(() => {
    const layoutedNodes = nodes.map((node, index) => ({
      ...node,
      position: {
        x: (index % 3) * 250 + 50,
        y: Math.floor(index / 3) * 150 + 50,
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
    const newNodes: Node<HierarchyNodeData>[] = blocks.map((block) => ({
      id: block.id,
      type: 'hierarchy',
      position: { x: block.layout.x, y: block.layout.y },
      data: {
        block,
        onSelect: onBlockSelect,
        onDelete: onBlockDelete,
        isSelected: selectedBlock?.id === block.id,
      },
    }));
    setNodes(newNodes);
  }, [blocks, selectedBlock, onBlockSelect, onBlockDelete, setNodes]);

  // Create edges based on block relationships
  useEffect(() => {
    const newEdges: Edge[] = [];
    
    blocks.forEach((block) => {
      if (block.parentId) {
        newEdges.push({
          id: `${block.parentId}-${block.id}`,
          source: block.parentId,
          target: block.id,
          type: 'smoothstep',
          animated: true,
          style: { stroke: '#3b82f6', strokeWidth: 2 },
        });
      }
    });
    
    setEdges(newEdges);
  }, [blocks, setEdges]);

  return (
    <div className="w-full h-full bg-gray-50">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
        attributionPosition="top-right"
      >
        <Controls />
        <Background color="#aaa" gap={16} />
      </ReactFlow>
    </div>
  );
};

export default CampaignCanvas;
