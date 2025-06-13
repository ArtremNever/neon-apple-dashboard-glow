
import { useState, useRef, useEffect } from 'react';
import { X, Move, RotateCcw, Maximize2, Minimize2 } from 'lucide-react';
import { AiChatPanel } from './AiChatPanel';

interface DraggableResizableChatProps {
  onClose: () => void;
}

type ResizeDirection = 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';

export const DraggableResizableChat = ({ onClose }: DraggableResizableChatProps) => {
  const [position, setPosition] = useState({ x: window.innerWidth - 420, y: 100 });
  const [size, setSize] = useState({ width: 400, height: 600 });
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState<ResizeDirection | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isMaximized, setIsMaximized] = useState(false);
  const [previousState, setPreviousState] = useState({ position, size });
  const chatRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  const minSize = { width: 350, height: 400 };
  const maxSize = { 
    width: Math.min(900, window.innerWidth - 40), 
    height: window.innerHeight - 100 
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isMaximized) return;
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
    if (isDragging && !isResizing && !isMaximized) {
      const newX = Math.max(0, Math.min(window.innerWidth - size.width, e.clientX - dragOffset.x));
      const newY = Math.max(56, Math.min(window.innerHeight - size.height, e.clientY - dragOffset.y));
      
      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(null);
  };

  const toggleMaximize = () => {
    if (isMaximized) {
      setPosition(previousState.position);
      setSize(previousState.size);
      setIsMaximized(false);
    } else {
      setPreviousState({ position, size });
      setPosition({ x: 20, y: 80 });
      setSize({ width: window.innerWidth - 40, height: window.innerHeight - 120 });
      setIsMaximized(true);
    }
  };

  const resetPosition = () => {
    setPosition({ x: window.innerWidth - 420, y: 100 });
    setSize({ width: 400, height: 600 });
    setIsMaximized(false);
  };

  const startResize = (direction: ResizeDirection, e: React.MouseEvent) => {
    if (isMaximized) return;
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
      if (isMaximized) {
        setSize({ width: window.innerWidth - 40, height: window.innerHeight - 120 });
        setPosition({ x: 20, y: 80 });
      } else {
        setPosition(prev => ({
          x: Math.max(0, Math.min(window.innerWidth - size.width, prev.x)),
          y: Math.max(56, Math.min(window.innerHeight - size.height, prev.y)),
        }));
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [size, isMaximized]);

  const resizeHandles = !isMaximized ? [
    // Corners
    { direction: 'nw' as ResizeDirection, className: 'top-0 left-0 w-4 h-4 cursor-nw-resize' },
    { direction: 'ne' as ResizeDirection, className: 'top-0 right-0 w-4 h-4 cursor-ne-resize' },
    { direction: 'sw' as ResizeDirection, className: 'bottom-0 left-0 w-4 h-4 cursor-sw-resize' },
    { direction: 'se' as ResizeDirection, className: 'bottom-0 right-0 w-4 h-4 cursor-se-resize' },
    // Edges
    { direction: 'n' as ResizeDirection, className: 'top-0 left-4 right-4 h-2 cursor-n-resize' },
    { direction: 's' as ResizeDirection, className: 'bottom-0 left-4 right-4 h-2 cursor-s-resize' },
    { direction: 'w' as ResizeDirection, className: 'left-0 top-4 bottom-4 w-2 cursor-w-resize' },
    { direction: 'e' as ResizeDirection, className: 'right-0 top-4 bottom-4 w-2 cursor-e-resize' },
  ] : [];

  return (
    <div
      ref={chatRef}
      className={`
        fixed z-30 bg-slate-900/95 backdrop-blur-xl border border-primary-500/30 
        shadow-2xl shadow-primary-500/20 overflow-hidden flex flex-col
        ${isMaximized ? 'rounded-lg' : 'rounded-2xl'}
      `}
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
      {/* Enhanced Header */}
      <div
        ref={headerRef}
        className={`
          flex items-center justify-between p-4 bg-gradient-to-r from-slate-800/90 to-slate-700/90 
          border-b border-primary-500/30 backdrop-blur-sm flex-shrink-0
          ${!isMaximized ? 'cursor-move' : ''}
        `}
        onMouseDown={handleMouseDown}
        style={{ height: '64px' }}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
            <Move className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">AI Ассистент</h3>
            <p className="text-xs text-primary-400">Умный помощник</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMaximize}
            className="p-2 hover:bg-primary-500/20 rounded-xl transition-all duration-200 group"
            title={isMaximized ? 'Восстановить' : 'Развернуть'}
          >
            {isMaximized ? (
              <Minimize2 className="w-4 h-4 text-primary-400 group-hover:text-primary-300" />
            ) : (
              <Maximize2 className="w-4 h-4 text-primary-400 group-hover:text-primary-300" />
            )}
          </button>
          <button
            onClick={resetPosition}
            className="p-2 hover:bg-primary-500/20 rounded-xl transition-all duration-200 group"
            title="Сбросить позицию"
          >
            <RotateCcw className="w-4 h-4 text-primary-400 group-hover:text-primary-300" />
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-red-500/20 rounded-xl transition-all duration-200 group"
            title="Закрыть"
          >
            <X className="w-4 h-4 text-primary-400 group-hover:text-red-400" />
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
          className={`absolute ${className} hover:bg-primary-500/20 transition-colors z-10 group`}
          onMouseDown={(e) => startResize(direction, e)}
        >
          {/* Visual indicator for corners */}
          {direction.length === 2 && (
            <div className="absolute inset-1 flex items-center justify-center">
              <div className="w-2 h-2 bg-primary-500/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
