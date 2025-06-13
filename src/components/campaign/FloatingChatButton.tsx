
import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
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
      <div className="fixed bottom-6 right-6 z-20">
        <Button
          onClick={toggleChat}
          className={`
            w-14 h-14 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105
            ${isChatOpen 
              ? 'bg-red-500/80 hover:bg-red-600/90 border-2 border-red-400/50' 
              : 'bg-green-600/80 hover:bg-green-500/90 border-2 border-green-400/50'
            }
            backdrop-blur-sm
          `}
          title={isChatOpen ? 'Закрыть чат' : 'Открыть AI чат'}
        >
          {isChatOpen ? (
            <X className="w-6 h-6 text-white" />
          ) : (
            <MessageCircle className="w-6 h-6 text-white" />
          )}
        </Button>
      </div>

      {/* Draggable Chat Window */}
      {isChatOpen && (
        <DraggableResizableChat onClose={() => setIsChatOpen(false)} />
      )}
    </>
  );
};
