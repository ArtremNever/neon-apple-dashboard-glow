
import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
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
    <div className="h-full flex flex-col min-h-0 bg-gradient-to-b from-slate-900/50 to-slate-950/80">
      {/* Header */}
      <div className="flex-shrink-0 p-4 border-b border-primary-500/20 bg-slate-800/40 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">AI Ассистент</h3>
            <p className="text-xs text-primary-400">Всегда готов помочь</p>
          </div>
          <div className="ml-auto">
            <Sparkles className="w-4 h-4 text-primary-400 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 min-h-0 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-3 ${message.isBot ? 'justify-start' : 'justify-end'}`}
            >
              {message.isBot && (
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 border border-primary-500/30 backdrop-blur-sm">
                  <Bot className="w-4 h-4 text-primary-400" />
                </div>
              )}
              
              <Card className={`max-w-[80%] p-3 shadow-lg backdrop-blur-sm ${
                message.isBot 
                  ? 'bg-slate-800/80 text-slate-100 border-primary-500/20 shadow-primary-500/10' 
                  : 'bg-gradient-to-br from-primary-500/20 to-primary-600/20 text-primary-100 ml-auto border-primary-500/40 shadow-primary-500/20'
              }`}>
                <p className="text-sm leading-relaxed break-words">{message.text}</p>
                <p className={`text-xs mt-2 ${
                  message.isBot ? 'text-primary-400/70' : 'text-primary-200/70'
                }`}>
                  {message.timestamp.toLocaleTimeString('ru-RU', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </Card>

              {!message.isBot && (
                <div className="w-8 h-8 bg-gradient-to-br from-primary-500/30 to-primary-600/30 rounded-xl flex items-center justify-center flex-shrink-0 mt-1 border border-primary-500/40 backdrop-blur-sm">
                  <User className="w-4 h-4 text-primary-300" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-xl flex items-center justify-center flex-shrink-0 border border-primary-500/30 backdrop-blur-sm">
                <Bot className="w-4 h-4 text-primary-400" />
              </div>
              <Card className="bg-slate-800/80 p-3 border-primary-500/20 backdrop-blur-sm">
                <div className="flex items-center gap-3">
                  <Loader2 className="w-4 h-4 animate-spin text-primary-400" />
                  <span className="text-sm text-primary-400/70">Печатаю...</span>
                </div>
              </Card>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className="flex-shrink-0 p-4 border-t border-primary-500/20 bg-slate-800/40 backdrop-blur-sm">
        <div className="flex gap-3">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Задайте вопрос..."
            className="flex-1 bg-slate-900/60 border-primary-500/30 text-slate-200 placeholder:text-slate-400 focus:border-primary-500/50 focus:ring-primary-500/20 min-w-0 backdrop-blur-sm"
            disabled={isLoading}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="px-4 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 text-white shadow-lg shadow-primary-500/20 hover:shadow-primary-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-primary-400/20"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
