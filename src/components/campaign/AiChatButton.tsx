
import { MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { AiChatPanel } from './AiChatPanel';

export const AiChatButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            relative h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200
            ${isOpen ? 'bg-muted-foreground hover:bg-muted-foreground/90' : 'bg-primary hover:bg-primary/90'}
          `}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
          
          {/* Индикатор активности */}
          {!isOpen && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
          )}
        </Button>
      </div>

      <AiChatPanel isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};
