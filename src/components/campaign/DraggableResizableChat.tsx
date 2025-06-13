
import { useState, useRef, useEffect } from 'react';
import { X, Move, RotateCcw } from 'lucide-react';
import { AiChatPanel } from './AiChatPanel';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '@/components/ui/resizable';

interface DraggableResizableChatProps {
  onClose: () => void;
}

export const DraggableResizableChat = ({ onClose }: DraggableResizableChatProps) => {
  const [position, setPosition] = useState({ x: window.innerWidth - 400, y: 100 });
  const [size, setSize] = useState({ width: 380, height: 500 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (headerRef.current && headerRef.current.contains(e.target as Node)) {
      setIsDragging(true);
      const rect = chatRef.current?.getBoundingClientRect();
      if (rect) {
        setDragOffset({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && !isResizing) {
      const newX = Math.max(0, Math.min(window.innerWidth - size.width, e.clientX - dragOffset.x));
      const newY = Math.max(56, Math.min(window.innerHeight - size.height, e.clientY - dragOffset.y));
      
      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleResizeStart = () => {
    setIsResizing(true);
  };

  const handleResizeEnd = () => {
    setIsResizing(false);
  };

  const resetPosition = () => {
    setPosition({ x: window.innerWidth - 400, y: 100 });
    setSize({ width: 380, height: 500 });
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragOffset, size, isResizing]);

  useEffect(() => {
    const handleResize = () => {
      // Adjust position if window is resized
      setPosition(prev => ({
        x: Math.max(0, Math.min(window.innerWidth - size.width, prev.x)),
        y: Math.max(56, Math.min(window.innerHeight - size.height, prev.y)),
      }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [size]);

  return (
    <div
      ref={chatRef}
      className="fixed z-30 bg-slate-900/95 backdrop-blur-sm border border-green-500/30 rounded-lg shadow-2xl shadow-green-500/10 overflow-hidden"
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        minWidth: 280,
        minHeight: 300,
        maxWidth: Math.min(800, window.innerWidth - 20),
        maxHeight: window.innerHeight - 76,
      }}
    >
      {/* Draggable Header */}
      <div
        ref={headerRef}
        className="flex items-center justify-between p-3 bg-slate-800/80 border-b border-green-500/30 cursor-move select-none"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2">
          <Move className="w-4 h-4 text-green-400/70" />
          <h3 className="text-sm font-medium text-green-400">AI Ассистент</h3>
        </div>
        
        <div className="flex items-center gap-1">
          <button
            onClick={resetPosition}
            className="p-1 hover:bg-green-500/20 rounded transition-colors"
            title="Сбросить позицию"
          >
            <RotateCcw className="w-4 h-4 text-green-400/70" />
          </button>
          <button
            onClick={onClose}
            className="p-1 hover:bg-red-500/20 rounded transition-colors"
          >
            <X className="w-4 h-4 text-green-400/70 hover:text-red-400" />
          </button>
        </div>
      </div>

      {/* Resizable Content */}
      <ResizablePanelGroup
        direction="vertical"
        className="h-[calc(100%-52px)]"
        onLayout={(sizes) => {
          // We don't need to track individual panel sizes for this use case
        }}
      >
        <ResizablePanel defaultSize={100} minSize={20}>
          <div className="h-full">
            <AiChatPanel />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      {/* Resize Handles */}
      <div
        className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-green-500/20 hover:bg-green-500/40 transition-colors"
        onMouseDown={(e) => {
          e.preventDefault();
          setIsResizing(true);
          
          const startX = e.clientX;
          const startY = e.clientY;
          const startWidth = size.width;
          const startHeight = size.height;

          const handleMouseMove = (e: MouseEvent) => {
            const newWidth = Math.max(280, Math.min(800, startWidth + (e.clientX - startX)));
            const newHeight = Math.max(300, Math.min(window.innerHeight - 76, startHeight + (e.clientY - startY)));
            
            setSize({ width: newWidth, height: newHeight });
          };

          const handleMouseUp = () => {
            setIsResizing(false);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
          };

          document.addEventListener('mousemove', handleMouseMove);
          document.addEventListener('mouseup', handleMouseUp);
        }}
      >
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-green-500/50"></div>
      </div>

      {/* Right resize handle */}
      <div
        className="absolute top-0 right-0 w-1 h-full cursor-e-resize hover:bg-green-500/20 transition-colors"
        onMouseDown={(e) => {
          e.preventDefault();
          setIsResizing(true);
          
          const startX = e.clientX;
          const startWidth = size.width;

          const handleMouseMove = (e: MouseEvent) => {
            const newWidth = Math.max(280, Math.min(800, startWidth + (e.clientX - startX)));
            setSize(prev => ({ ...prev, width: newWidth }));
          };

          const handleMouseUp = () => {
            setIsResizing(false);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
          };

          document.addEventListener('mousemove', handleMouseMove);
          document.addEventListener('mouseup', handleMouseUp);
        }}
      />

      {/* Bottom resize handle */}
      <div
        className="absolute bottom-0 left-0 w-full h-1 cursor-s-resize hover:bg-green-500/20 transition-colors"
        onMouseDown={(e) => {
          e.preventDefault();
          setIsResizing(true);
          
          const startY = e.clientY;
          const startHeight = size.height;

          const handleMouseMove = (e: MouseEvent) => {
            const newHeight = Math.max(300, Math.min(window.innerHeight - 76, startHeight + (e.clientY - startY)));
            setSize(prev => ({ ...prev, height: newHeight }));
          };

          const handleMouseUp = () => {
            setIsResizing(false);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
          };

          document.addEventListener('mousemove', handleMouseMove);
          document.addEventListener('mouseup', handleMouseUp);
        }}
      />
    </div>
  );
};
