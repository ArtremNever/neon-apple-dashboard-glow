
import { Layout } from '@/components/Layout';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Send, 
  Bot, 
  User, 
  Sparkles,
  Zap
} from 'lucide-react';
import { ChatHistory } from '@/components/chat/ChatHistory';
import { ReasoningChain, ReasoningStep } from '@/components/chat/ReasoningChain';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  reasoning?: ReasoningStep[];
}

const AIChat = () => {
  const [message, setMessage] = useState('');
  const [currentChatId, setCurrentChatId] = useState('1');

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Привет! Я ваш AI-ассистент для управления кампаниями. Помогу создать, оптимизировать и управлять рекламными кампаниями. Что хотите сделать сегодня?',
      timestamp: '2024-01-13T10:00:00Z',
    },
    {
      id: '2',
      role: 'user',
      content: 'Создай новую кампанию для игрового приложения на iOS с бюджетом $5000 в день, таргетинг на США',
      timestamp: '2024-01-13T10:01:00Z',
    },
    {
      id: '3',
      role: 'assistant',
      content: 'Отлично! Создам кампанию для установок игрового приложения. Анализирую требования и настрою оптимальную конфигурацию.',
      timestamp: '2024-01-13T10:01:30Z',
      reasoning: [
        {
          id: 'r1',
          type: 'analysis',
          title: 'Анализ требований кампании',
          description: 'Анализирую параметры: игровая вертикаль, iOS платформа, бюджет $5000/день, таргетинг США',
          status: 'completed',
          data: { vertical: 'Gaming', platform: 'iOS', budget: 5000, geo: 'US' }
        },
        {
          id: 'r2',
          type: 'decision',
          title: 'Выбор платформ',
          description: 'Подбираю оптимальные рекламные сети для игровых приложений: Facebook, Google UAC, Unity Ads',
          status: 'completed',
          data: { platforms: ['Facebook', 'Google UAC', 'Unity Ads'] }
        },
        {
          id: 'r3',
          type: 'action',
          title: 'Настройка кампании',
          description: 'Создаю структуру кампании с 3 группами объявлений для разных сегментов аудитории',
          status: 'processing',
          data: { adSets: 3, targetingTypes: ['Lookalike', 'Interest', 'Behavioral'] }
        },
        {
          id: 'r4',
          type: 'validation',
          title: 'Оптимизация бюджета и ставок',
          description: 'Рассчитываю оптимальные стратегии ставок и распределение бюджета по группам',
          status: 'pending',
          data: null
        }
      ]
    }
  ]);

  const handleSendMessage = () => {
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: message,
      timestamp: new Date().toISOString(),
    };

    setMessages([...messages, newMessage]);
    setMessage('');

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: 'Понял ваш запрос. Обрабатываю информацию...',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const handleSelectChat = (chatId: string) => {
    setCurrentChatId(chatId);
    // Здесь можно загрузить историю конкретного чата
    if (chatId === 'new') {
      setMessages([{
        id: '1',
        role: 'assistant',
        content: 'Привет! Начинаем новый диалог. Чем могу помочь?',
        timestamp: new Date().toISOString(),
      }]);
    }
  };

  return (
    <Layout>
      <div className="h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex">
        {/* Chat History Sidebar */}
        <div className="w-80 flex-shrink-0">
          <ChatHistory 
            onSelectChat={handleSelectChat}
            currentChatId={currentChatId}
          />
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col min-h-0">
          {/* Modern Header */}
          <div className="border-b border-slate-800/50 bg-slate-900/80 backdrop-blur-xl">
            <div className="px-6 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
                      <Bot className="w-6 h-6 text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-slate-900 flex items-center justify-center">
                      <div className="w-2 h-2 bg-emerald-600 rounded-full animate-pulse" />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-white flex items-center gap-2">
                      AI Ассистент
                      <Sparkles className="w-5 h-5 text-yellow-400 animate-pulse" />
                    </h1>
                    <p className="text-sm text-slate-400">Умный помощник для управления кампаниями</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20">
                    <Zap className="w-3 h-3 mr-1" />
                    Онлайн
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Messages */}
          <ScrollArea className="flex-1 min-h-0">
            <div className="p-6 space-y-6">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'assistant' && (
                    <div className="relative flex-shrink-0">
                      <Avatar className="w-10 h-10 border-2 border-blue-500/20">
                        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <Bot className="w-5 h-5 text-white" />
                        </div>
                      </Avatar>
                    </div>
                  )}
                  
                  <div className={`max-w-2xl ${msg.role === 'user' ? 'order-2' : ''}`}>
                    {/* Reasoning Chain - показывается ПЕРЕД сообщением ассистента */}
                    {msg.reasoning && msg.role === 'assistant' && (
                      <div className="mb-4">
                        <ReasoningChain steps={msg.reasoning} />
                      </div>
                    )}

                    <Card className={`p-4 shadow-lg backdrop-blur-sm ${
                      msg.role === 'user' 
                        ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white ml-auto border border-blue-500/30' 
                        : 'bg-slate-800/80 text-slate-100 border border-slate-700/50'
                    }`}>
                      <CardContent className="p-0">
                        <p className="leading-relaxed">{msg.content}</p>
                        <p className={`text-xs mt-3 ${msg.role === 'user' ? 'text-blue-100/70' : 'text-slate-400'}`}>
                          {new Date(msg.timestamp).toLocaleTimeString('ru-RU', { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </CardContent>
                    </Card>
                  </div>

                  {msg.role === 'user' && (
                    <div className="relative flex-shrink-0 order-3">
                      <Avatar className="w-10 h-10 border-2 border-slate-600/50">
                        <div className="w-full h-full bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center">
                          <User className="w-5 h-5 text-slate-300" />
                        </div>
                      </Avatar>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>

          {/* Modern Input */}
          <div className="border-t border-slate-800/50 bg-slate-900/80 backdrop-blur-xl p-6">
            <div className="flex gap-4 items-end">
              <div className="flex-1 relative">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Напишите сообщение..."
                  className="bg-slate-800/60 border-slate-700/50 text-slate-200 placeholder:text-slate-400 rounded-2xl pr-12 py-3 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 backdrop-blur-sm"
                />
                <Button 
                  onClick={handleSendMessage}
                  disabled={!message.trim()}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 p-0 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-400 hover:to-purple-500 border-0 rounded-xl shadow-lg shadow-blue-500/20 disabled:opacity-50 disabled:shadow-none"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <p className="text-xs text-slate-500 mt-2 text-center">
              AI может допускать ошибки. Проверяйте важную информацию.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AIChat;
