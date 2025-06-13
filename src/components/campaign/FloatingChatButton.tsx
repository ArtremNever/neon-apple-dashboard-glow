
import { useState } from 'react';
import { MessageCircle, X, Sparkles, Bot, Zap } from 'lucide-react';
import { DraggableResizableChat } from './DraggableResizableChat';

export const FloatingChatButton = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      {/* Modern Floating Chat Button */}
      <div className="fixed bottom-8 right-8 z-20">
        <button
          onClick={toggleChat}
          className={`
            group relative w-14 h-14 rounded-2xl transition-all duration-300 transform 
            hover:scale-110 active:scale-95 overflow-hidden
            ${isChatOpen 
              ? 'bg-slate-800/90 border-2 border-red-500/50 shadow-2xl shadow-red-500/20' 
              : 'bg-gradient-to-br from-primary-500 via-primary-600 to-primary-700 hover:from-primary-400 hover:via-primary-500 hover:to-primary-600 shadow-2xl shadow-primary-500/30'
            }
            backdrop-blur-xl border-2 border-white/10
          `}
          title={isChatOpen ? 'Закрыть AI чат' : 'Открыть AI ассистент'}
        >
          {/* Animated background gradient */}
          <div className={`
            absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
            ${isChatOpen 
              ? 'bg-gradient-to-br from-red-500/10 to-red-600/10' 
              : 'bg-gradient-to-br from-primary-400/20 to-primary-600/20'
            }
          `} />
          
          {/* Icon container with improved styling */}
          <div className="relative flex items-center justify-center w-full h-full">
            {isChatOpen ? (
              <X className="w-6 h-6 text-red-400 drop-shadow-lg transition-all duration-200 group-hover:rotate-90 group-hover:scale-110" />
            ) : (
              <div className="relative">
                <Bot className="w-6 h-6 text-white drop-shadow-lg transition-all duration-200 group-hover:scale-110" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center">
                  <Zap className="w-2 h-2 text-white animate-pulse" />
                </div>
              </div>
            )}
          </div>
          
          {/* Pulse animation rings */}
          {!isChatOpen && (
            <>
              <div className="absolute inset-0 rounded-2xl border-2 border-primary-400/30 animate-ping" />
              <div className="absolute inset-2 rounded-xl border border-primary-300/20 animate-pulse" />
            </>
          )}
          
          {/* Enhanced tooltip */}
          <div className={`
            absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-2 rounded-lg
            bg-slate-800/95 backdrop-blur-sm border border-white/10 text-xs text-white
            opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none
            whitespace-nowrap shadow-xl font-medium
          `}>
            {isChatOpen ? 'Закрыть AI чат' : 'AI Ассистент'}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-slate-800/95" />
          </div>
        </button>
      </div>

      {/* Draggable Chat Window */}
      {isChatOpen && (
        <DraggableResizableChat onClose={() => setIsChatOpen(false)} />
      )}
    </>
  );
};
