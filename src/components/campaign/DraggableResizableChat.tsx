
import { useState, useRef, useEffect } from 'react';
import { X, Move, RotateCcw } from 'lucide-react';
import { AiChatPanel } from './AiChatPanel';

interface DraggableResizableChatProps {
  onClose: () => void;
}

type ResizeDirection = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

export const DraggableResizableChat = ({ onClose }: DraggableResizableChatProps) => {
  const [position, setPosition] = useState({ x: window.innerWidth - 400, y: 100 });
  const [size, setSize] = useState({ width: 380, height: 500 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState<ResizeDirection | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const chatRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const minSize = { width: 300, height: 250 };
  const maxSize = { 
    width: Math.min(800, window.innerWidth - 20), 
    height: window.innerHeight - 76 
  };

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
    setIsResizing(null);
  };

  const resetPosition = () => {
    setPosition({ x: window.innerWidth - 400, y: 100 });
    setSize({ width: 380, height: 500 });
  };

  const startResize = (direction: ResizeDirection, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(direction);
    
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = size.width;
    const startHeight = size.height;
    const startPosX = position.x;
    const startPosY = position.y;

    const handleMouseMove = (e: MouseEvent) => {
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      
      let newWidth = startWidth;
      let newHeight = startHeight;
      let newX = startPosX;
      let newY = startPosY;

      // Handle horizontal resizing
      if (direction.includes('e')) {
        newWidth = Math.max(minSize.width, Math.min(maxSize.width, startWidth + deltaX));
      } else if (direction.includes('w')) {
        const proposedWidth = startWidth - deltaX;
        if (proposedWidth >= minSize.width && proposedWidth <= maxSize.width) {
          newWidth = proposedWidth;
          newX = startPosX + deltaX;
        }
      }

      // Handle vertical resizing
      if (direction.includes('s')) {
        newHeight = Math.max(minSize.height, Math.min(maxSize.height, startHeight + deltaY));
      } else if (direction.includes('n')) {
        const proposedHeight = startHeight - deltaY;
        if (proposedHeight >= minSize.height && proposedHeight <= maxSize.height) {
          newHeight = proposedHeight;
          newY = startPosY + deltaY;
        }
      }

      // Ensure position stays within bounds
      newX = Math.max(0, Math.min(window.innerWidth - newWidth, newX));
      newY = Math.max(56, Math.min(window.innerHeight - newHeight, newY));

      setSize({ width: newWidth, height: newHeight });
      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsResizing(null);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
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
  }, [isDragging, dragOffset, size]);

  useEffect(() => {
    const handleResize = () => {
      setPosition(prev => ({
        x: Math.max(0, Math.min(window.innerWidth - size.width, prev.x)),
        y: Math.max(56, Math.min(window.innerHeight - size.height, prev.y)),
      }));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [size]);

  const resizeHandles = [
    // Corners
    { direction: 'nw' as ResizeDirection, className: 'top-0 left-0 w-3 h-3 cursor-nw-resize' },
    { direction: 'ne' as ResizeDirection, className: 'top-0 right-0 w-3 h-3 cursor-ne-resize' },
    { direction: 'sw' as ResizeDirection, className: 'bottom-0 left-0 w-3 h-3 cursor-sw-resize' },
    { direction: 'se' as ResizeDirection, className: 'bottom-0 right-0 w-3 h-3 cursor-se-resize' },
    // Edges
    { direction: 'n' as ResizeDirection, className: 'top-0 left-3 right-3 h-1 cursor-n-resize' },
    { direction: 's' as ResizeDirection, className: 'bottom-0 left-3 right-3 h-1 cursor-s-resize' },
    { direction: 'w' as ResizeDirection, className: 'left-0 top-3 bottom-3 w-1 cursor-w-resize' },
    { direction: 'e' as ResizeDirection, className: 'right-0 top-3 bottom-3 w-1 cursor-e-resize' },
  ];

  return (
    <div
      ref={chatRef}
      className="fixed z-30 bg-slate-900/95 backdrop-blur-sm border border-green-500/30 rounded-lg shadow-2xl shadow-green-500/10 overflow-hidden flex flex-col"
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        minWidth: minSize.width,
        minHeight: minSize.height,
        maxWidth: maxSize.width,
        maxHeight: maxSize.height,
      }}
    >
      {/* Draggable Header */}
      <div
        ref={headerRef}
        className="flex items-center justify-between p-3 bg-slate-800/80 border-b border-green-500/30 cursor-move select-none flex-shrink-0"
        onMouseDown={handleMouseDown}
        style={{ height: '52px' }}
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

      {/* Chat Content */}
      <div className="flex-1 min-h-0 overflow-hidden">
        <AiChatPanel />
      </div>

      {/* Resize Handles */}
      {resizeHandles.map(({ direction, className }) => (
        <div
          key={direction}
          className={`absolute ${className} hover:bg-green-500/20 transition-colors z-10`}
          onMouseDown={(e) => startResize(direction, e)}
        >
          {/* Visual indicator for corners */}
          {direction.length === 2 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-1 h-1 bg-green-500/50 rounded-full"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
