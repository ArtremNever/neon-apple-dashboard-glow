
import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles, Copy, ThumbsUp, ThumbsDown, Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  isStreaming?: boolean;
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
  const [isListening, setIsListening] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const quickSuggestions = [
    'Как настроить блок Campaign?',
    'Оптимизировать структуру',
    'Добавить новый блок',
    'Проверить соединения'
  ];

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

  const simulateStreaming = async (text: string, messageId: string) => {
    const words = text.split(' ');
    let currentText = '';
    
    for (let i = 0; i < words.length; i++) {
      currentText += (i > 0 ? ' ' : '') + words[i];
      
      setMessages(prev => prev.map(msg => 
        msg.id === messageId 
          ? { ...msg, text: currentText, isStreaming: i < words.length - 1 }
          : msg
      ));
      
      await new Promise(resolve => setTimeout(resolve, 50 + Math.random() * 100));
    }
  };

  const handleSendMessage = async (text?: string) => {
    const messageText = text || inputValue;
    if (!messageText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Simulate AI thinking
    setTimeout(async () => {
      const botResponse = generateAiResponse(messageText);
      const botMessageId = (Date.now() + 1).toString();
      
      const botMessage: Message = {
        id: botMessageId,
        text: '',
        isBot: true,
        timestamp: new Date(),
        isStreaming: true,
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsLoading(false);
      
      // Stream the response
      await simulateStreaming(botResponse, botMessageId);
    }, 1500);
  };

  const generateAiResponse = (userInput: string): string => {
    const lowercaseInput = userInput.toLowerCase();
    
    if (lowercaseInput.includes('блок') || lowercaseInput.includes('компонент')) {
      return 'Я вижу, что вы спрашиваете о блоках. В нашем визуальном построителе есть 6 типов блоков:\n\n• **Client** - основная информация о клиенте\n• **Application** - настройки приложения\n• **Platform** - рекламная платформа\n• **Campaign** - параметры кампании\n• **Adset** - группы объявлений\n• **Creative** - креативные материалы\n\nКакой именно блок вас интересует?';
    }
    
    if (lowercaseInput.includes('кампани') || lowercaseInput.includes('рекламa')) {
      return 'Для эффективной рекламной кампании рекомендую следующую структуру:\n\n1. **Client** - начните с блока клиента\n2. **Application** - подключите нужные приложения\n3. **Platform** - выберите рекламные платформы\n4. **Campaign** - создайте кампании с четкими целями\n5. **Adset** - настройте группы для разных аудиторий\n6. **Creative** - подготовьте качественные креативы\n\nВажно правильно соединить блоки для корректной работы!';
    }
    
    if (lowercaseInput.includes('оптимизаци') || lowercaseInput.includes('улучш')) {
      return 'Для оптимизации кампании обратите внимание на:\n\n🔗 **Связи между блоками** - убедитесь, что все соединения логичны\n✅ **Статус блоков** - все должны быть настроены (зеленая галочка)\n📊 **KPI прогноз** - следите за метриками в верхней панели\n🎯 **Таргетинг** - проверьте настройки аудитории\n💰 **Бюджет** - оптимизируйте распределение средств\n\nЧто именно хотите оптимизировать?';
    }
    
    return 'Отличный вопрос! Я анализирую вашу кампанию и могу предложить персонализированные рекомендации. Вот что я могу для вас сделать:\n\n• Помочь с настройкой любого блока\n• Оптимизировать структуру кампании\n• Объяснить лучшие практики\n• Предложить улучшения\n\nРасскажите больше о ваших целях!';
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleCopyMessage = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const toggleVoiceInput = () => {
    setIsListening(!isListening);
    // Here you would implement actual voice recognition
  };

  return (
    <div className="h-full flex flex-col min-h-0 bg-gradient-to-b from-slate-900/50 via-slate-950/80 to-slate-950/90 backdrop-blur-xl relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary-500/10 to-purple-500/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-cyan-500/8 to-blue-500/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Enhanced Header */}
      <div className="relative z-10 flex-shrink-0 p-6 border-b border-primary-500/20 bg-gradient-to-r from-slate-800/60 via-slate-800/40 to-slate-800/60 backdrop-blur-xl">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-2xl shadow-primary-500/30 animate-pulse-glow">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-br from-green-400 to-green-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
              <div className="w-2 h-2 bg-green-200 rounded-full animate-pulse" />
            </div>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-bold text-white bg-gradient-to-r from-white to-primary-200 bg-clip-text text-transparent">
                AI Ассистент
              </h3>
              <Badge className="bg-primary-500/20 text-primary-300 border-primary-500/30">
                <Sparkles className="w-3 h-3 mr-1 animate-pulse" />
                Pro
              </Badge>
            </div>
            <p className="text-sm text-primary-400/80 mt-1">Всегда готов помочь с вашими кампаниями</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea ref={scrollAreaRef} className="flex-1 min-h-0 p-6 relative z-10">
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-4 ${message.isBot ? 'justify-start' : 'justify-end'} animate-fade-in-up`}
            >
              {message.isBot && (
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary-500/30 to-primary-600/40 rounded-2xl flex items-center justify-center border border-primary-500/40 backdrop-blur-sm shadow-lg shadow-primary-500/20">
                    <Bot className="w-5 h-5 text-primary-300" />
                  </div>
                  {message.isStreaming && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-br from-green-400 to-green-500 rounded-full animate-pulse" />
                  )}
                </div>
              )}
              
              <div className={`max-w-[85%] ${message.isBot ? '' : 'order-2'}`}>
                <Card className={`p-4 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] ${
                  message.isBot 
                    ? 'bg-gradient-to-br from-slate-800/80 via-slate-800/60 to-slate-900/80 text-slate-100 border-primary-500/20 shadow-primary-500/10' 
                    : 'bg-gradient-to-br from-primary-500/20 to-primary-600/30 text-primary-100 ml-auto border-primary-400/40 shadow-primary-500/20'
                }`}>
                  <div className="space-y-3">
                    <div className="prose prose-sm max-w-none">
                      {message.text.split('\n').map((line, index) => {
                        if (line.startsWith('• **') || line.startsWith('🔗 **') || line.startsWith('✅ **') || line.startsWith('📊 **') || line.startsWith('🎯 **') || line.startsWith('💰 **')) {
                          const [bullet, ...rest] = line.split('**');
                          const [bold, normal] = rest.join('**').split('**');
                          return (
                            <div key={index} className="flex items-start gap-2 mb-2">
                              <span className="text-primary-400 font-medium">{bullet}</span>
                              <div>
                                <span className="font-semibold text-primary-200">{bold}</span>
                                <span className="text-slate-300">{normal}</span>
                              </div>
                            </div>
                          );
                        }
                        if (line.includes('**')) {
                          const parts = line.split('**');
                          return (
                            <p key={index} className="leading-relaxed mb-2">
                              {parts.map((part, i) => 
                                i % 2 === 1 ? 
                                  <span key={i} className="font-semibold text-primary-200">{part}</span> : 
                                  <span key={i}>{part}</span>
                              )}
                            </p>
                          );
                        }
                        return line ? <p key={index} className="leading-relaxed mb-2">{line}</p> : <br key={index} />;
                      })}
                      {message.isStreaming && (
                        <span className="inline-block w-2 h-5 bg-primary-400 animate-pulse ml-1" />
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 border-t border-slate-600/30">
                      <span className={`text-xs ${
                        message.isBot ? 'text-primary-400/70' : 'text-primary-200/70'
                      }`}>
                        {message.timestamp.toLocaleTimeString('ru-RU', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                      
                      {message.isBot && !message.isStreaming && (
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopyMessage(message.text)}
                            className="h-6 px-2 text-slate-400 hover:text-primary-300"
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 px-2 text-slate-400 hover:text-green-400"
                          >
                            <ThumbsUp className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 px-2 text-slate-400 hover:text-red-400"
                          >
                            <ThumbsDown className="w-3 h-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </div>

              {!message.isBot && (
                <div className="w-10 h-10 bg-gradient-to-br from-primary-500/40 to-primary-600/50 rounded-2xl flex items-center justify-center flex-shrink-0 border border-primary-400/50 backdrop-blur-sm shadow-lg shadow-primary-500/20 order-3">
                  <User className="w-5 h-5 text-primary-200" />
                </div>
              )}
            </div>
          ))}
          
          {isLoading && (
            <div className="flex gap-4 justify-start animate-fade-in">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500/30 to-primary-600/40 rounded-2xl flex items-center justify-center border border-primary-500/40 backdrop-blur-sm">
                <Bot className="w-5 h-5 text-primary-300" />
              </div>
              <Card className="bg-slate-800/80 p-4 border-primary-500/20 backdrop-blur-xl max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                  <span className="text-sm text-primary-400/70">AI думает...</span>
                </div>
              </Card>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Quick Suggestions */}
      <div className="relative z-10 px-6 py-3">
        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {quickSuggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => handleSendMessage(suggestion)}
              className="flex-shrink-0 px-3 py-1.5 text-xs bg-slate-700/50 hover:bg-primary-500/20 border border-slate-600/30 hover:border-primary-500/40 rounded-full text-slate-300 hover:text-primary-300 transition-all duration-200 backdrop-blur-sm"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      {/* Enhanced Input */}
      <div className="relative z-10 flex-shrink-0 p-6 border-t border-primary-500/20 bg-gradient-to-r from-slate-800/60 via-slate-800/40 to-slate-800/60 backdrop-blur-xl">
        <div className="flex gap-3 items-end">
          <div className="flex-1 relative">
            <Input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Задайте вопрос или опишите проблему..."
              className="bg-slate-900/60 border-primary-500/30 text-slate-200 placeholder:text-slate-400 focus:border-primary-500/50 focus:ring-primary-500/20 min-w-0 backdrop-blur-sm pr-12 py-3 rounded-2xl transition-all duration-200"
              disabled={isLoading}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleVoiceInput}
              className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 transition-all duration-200 ${
                isListening ? 'text-red-400 hover:text-red-300' : 'text-slate-400 hover:text-primary-300'
              }`}
            >
              {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
            </Button>
          </div>
          <Button
            onClick={() => handleSendMessage()}
            disabled={!inputValue.trim() || isLoading}
            className="px-6 bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-400 hover:to-primary-500 text-white shadow-lg shadow-primary-500/20 hover:shadow-primary-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-primary-400/20 rounded-2xl hover:scale-105"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
        <p className="text-xs text-slate-500 mt-3 text-center">
          AI может допускать ошибки. Проверяйте важную информацию.
        </p>
      </div>
    </div>
  );
};
