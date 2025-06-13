
import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

export const AiChatPanel = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Привет! Я ваш AI-ассистент для управления кампаниями. Могу помочь с настройкой блоков, оптимизацией структуры кампании или ответить на вопросы о платформах.',
      isBot: true,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const inputContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Симуляция ответа AI
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAiResponse(inputValue),
        isBot: true,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
    }, 1500);
  };

  const generateAiResponse = (userInput: string): string => {
    const lowercaseInput = userInput.toLowerCase();
    
    if (lowercaseInput.includes('блок') || lowercaseInput.includes('компонент')) {
      return 'Я вижу, что вы спрашиваете о блоках. В нашем визуальном построителе есть 6 типов блоков: Client (клиент), Application (приложение), Platform (платформа), Campaign (кампания), Adset (группа объявлений) и Creative (креатив). Какой именно блок вас интересует?';
    }
    
    if (lowercaseInput.includes('кампани') || lowercaseInput.includes('рекламa')) {
      return 'Для эффективной рекламной кампании рекомендую следующую структуру: начните с блока Client, подключите нужные Applications, выберите Platform, создайте Campaign с четкими целями, настройте Adsets для разных аудиторий и подготовьте качественные Creatives.';
    }
    
    if (lowercaseInput.includes('оптимизаци') || lowercaseInput.includes('улучш')) {
      return 'Для оптимизации кампании обратите внимание на связи между блоками. Убедитесь, что все блоки правильно настроены (зеленая галочка) и логически связаны. Проверьте KPI прогноз в верхней панели.';
    }
    
    if (lowercaseInput.includes('помощ') || lowercaseInput.includes('как')) {
      return 'Конечно, помогу! Вы можете добавлять блоки через панель инструментов, соединять их перетаскиванием, настраивать свойства в боковой панели. Что именно вас интересует?';
    }
    
    return 'Интересный вопрос! Я анализирую вашу кампанию и могу предложить персонализированные рекомендации. Расскажите больше о ваших целях, и я подскажу оптимальную стратегию.';
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="h-full flex flex-col min-h-0">
      {/* Messages */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 min-h-0 p-2 sm:p-3">
        <div className="space-y-2 sm:space-y-3">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-1 sm:gap-2 ${message.isBot ? 'justify-start' : 'justify-end'}`}
            >
              {message.isBot && (
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1 border border-green-500/50">
                  <Bot className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-400" />
                </div>
              )}
              
              <Card className={`max-w-[80%] sm:max-w-[75%] p-1.5 sm:p-2 border-green-500/30 ${
                message.isBot 
                  ? 'bg-slate-800/80 text-slate-200 shadow-green-500/10' 
                  : 'bg-green-500/20 text-green-100 ml-auto border-green-500/50 shadow-green-500/20'
              }`}>
                <p className="text-xs leading-relaxed break-words">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.isBot ? 'text-green-400/70' : 'text-green-200/70'
                }`}>
                  {message.timestamp.toLocaleTimeString('ru-RU', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </Card>

              {!message.isBot && (
                <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500/30 rounded-full flex items-center justify-center flex-shrink-0 mt-1 border border-green-500/50">
                  <User className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-300" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-1 sm:gap-2 justify-start">
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-green-500/20 rounded-full flex items-center justify-center flex-shrink-0 border border-green-500/50">
                <Bot className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-green-400" />
              </div>
              <Card className="bg-slate-800/80 p-1.5 sm:p-2 border-green-500/30">
                <div className="flex items-center gap-1 sm:gap-2">
                  <Loader2 className="w-2.5 h-2.5 sm:w-3 sm:h-3 animate-spin text-green-400" />
                  <span className="text-xs text-green-400/70">Печатаю...</span>
                </div>
              </Card>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div 
        ref={inputContainerRef}
        className="p-2 sm:p-3 border-t border-green-500/30 flex-shrink-0 bg-slate-900/80"
      >
        <div className="flex gap-1 sm:gap-2">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Задайте вопрос..."
            className="flex-1 bg-slate-800 border-green-500/30 text-slate-200 placeholder:text-slate-400 focus:border-green-500/50 focus:ring-green-500/20 text-xs h-7 sm:h-8 min-w-0"
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            size="sm"
            className="px-2 h-7 sm:h-8 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 text-green-400 flex-shrink-0"
          >
            <Send className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};
