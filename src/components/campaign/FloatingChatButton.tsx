
import { useState } from 'react';
import { MessageCircle, X, Sparkles, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DraggableResizableChat } from './DraggableResizableChat';

export const FloatingChatButton = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <div className="fixed bottom-8 right-8 z-20">
        <button
          onClick={toggleChat}
          className={`
            group relative w-16 h-16 rounded-2xl shadow-2xl transition-all duration-300 transform 
            hover:scale-110 active:scale-95 overflow-hidden
            ${isChatOpen 
              ? 'bg-gradient-to-br from-red-500 to-red-600 hover:from-red-400 hover:to-red-500 shadow-red-500/30' 
              : 'bg-gradient-to-br from-green-500 via-emerald-500 to-teal-500 hover:from-green-400 hover:via-emerald-400 hover:to-teal-400 shadow-green-500/30'
            }
            border-2 border-white/20 backdrop-blur-sm
          `}
          title={isChatOpen ? 'Закрыть AI чат' : 'Открыть AI ассистент'}
        >
          {/* Background glow effect */}
          <div className={`
            absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300
            ${isChatOpen 
              ? 'bg-gradient-to-br from-red-400/20 to-red-600/20' 
              : 'bg-gradient-to-br from-green-400/20 to-teal-600/20'
            }
          `} />
          
          {/* Icon container */}
          <div className="relative flex items-center justify-center w-full h-full">
            {isChatOpen ? (
              <X className="w-7 h-7 text-white drop-shadow-lg transition-transform duration-200 group-hover:rotate-90" />
            ) : (
              <div className="relative">
                <Bot className="w-7 h-7 text-white drop-shadow-lg transition-transform duration-200 group-hover:scale-110" />
                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-300 animate-pulse opacity-80" />
              </div>
            )}
          </div>
          
          {/* Pulse animation ring */}
          {!isChatOpen && (
            <div className="absolute inset-0 rounded-2xl border-2 border-green-400/50 animate-ping opacity-20" />
          )}
          
          {/* Label */}
          <div className={`
            absolute -top-10 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-lg
            bg-slate-800/90 backdrop-blur-sm border border-slate-600/50 text-xs text-white
            opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none
            whitespace-nowrap shadow-lg
          `}>
            {isChatOpen ? 'Закрыть чат' : 'AI Ассистент'}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-slate-800/90" />
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
