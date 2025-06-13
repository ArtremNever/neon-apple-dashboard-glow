
import { Layout } from '@/components/Layout';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { 
  Send, 
  Bot, 
  User, 
  MessageSquare, 
  Brain,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Clock,
  Lightbulb,
  Sparkles,
  Zap
} from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  reasoning?: ReasoningStep[];
}

interface ReasoningStep {
  id: string;
  type: 'analysis' | 'decision' | 'action' | 'validation';
  title: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  data?: any;
}

const AIChat = () => {
  const [message, setMessage] = useState('');
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-emerald-400" />;
      case 'processing': return <Clock className="w-4 h-4 text-blue-400 animate-spin" />;
      case 'failed': return <AlertCircle className="w-4 h-4 text-red-400" />;
      default: return <Clock className="w-4 h-4 text-slate-400" />;
    }
  };

  const getStepTypeIcon = (type: string) => {
    switch (type) {
      case 'analysis': return <Brain className="w-4 h-4" />;
      case 'decision': return <Lightbulb className="w-4 h-4" />;
      case 'action': return <ArrowRight className="w-4 h-4" />;
      case 'validation': return <CheckCircle className="w-4 h-4" />;
      default: return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getStepTypeColor = (type: string) => {
    switch (type) {
      case 'analysis': return 'text-purple-400';
      case 'decision': return 'text-yellow-400';
      case 'action': return 'text-blue-400';
      case 'validation': return 'text-emerald-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <Layout>
      <div className="h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col">
        {/* Modern Header */}
        <div className="border-b border-slate-800/50 bg-slate-900/80 backdrop-blur-xl">
          <div className="max-w-4xl mx-auto px-6 py-4">
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

        {/* Chat Container */}
        <div className="flex-1 max-w-4xl mx-auto w-full flex flex-col min-h-0">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
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
                  <div className={`p-4 rounded-2xl shadow-lg backdrop-blur-sm ${
                    msg.role === 'user' 
                      ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white ml-auto border border-blue-500/30' 
                      : 'bg-slate-800/80 text-slate-100 border border-slate-700/50'
                  }`}>
                    <p className="leading-relaxed">{msg.content}</p>
                    <p className={`text-xs mt-3 ${msg.role === 'user' ? 'text-blue-100/70' : 'text-slate-400'}`}>
                      {new Date(msg.timestamp).toLocaleTimeString('ru-RU', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>

                  {/* Enhanced Reasoning Chain */}
                  {msg.reasoning && (
                    <div className="mt-6 space-y-4">
                      <div className="flex items-center gap-3 px-4">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500/20 to-purple-600/20 flex items-center justify-center border border-purple-500/30">
                          <Brain className="w-4 h-4 text-purple-400" />
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-white">Процесс рассуждений AI</h4>
                          <p className="text-xs text-slate-400">Пошаговый анализ решения</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        {msg.reasoning.map((step, index) => (
                          <div key={step.id} className="relative">
                            <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/40 backdrop-blur-sm">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                  <div className={`p-2 rounded-xl bg-slate-700/50 ${getStepTypeColor(step.type)} border border-slate-600/50`}>
                                    {getStepTypeIcon(step.type)}
                                  </div>
                                  <div>
                                    <h5 className="text-sm font-medium text-white">{step.title}</h5>
                                    <Badge className={`text-xs mt-1 border-none ${
                                      step.type === 'analysis' ? 'bg-purple-600/20 text-purple-300' :
                                      step.type === 'decision' ? 'bg-yellow-600/20 text-yellow-300' :
                                      step.type === 'action' ? 'bg-blue-600/20 text-blue-300' :
                                      'bg-emerald-600/20 text-emerald-300'
                                    }`}>
                                      {step.type}
                                    </Badge>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  {getStatusIcon(step.status)}
                                </div>
                              </div>
                              
                              <p className="text-sm text-slate-300 mb-3 leading-relaxed">{step.description}</p>
                              
                              {step.data && (
                                <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700/30">
                                  <pre className="text-xs text-slate-400 overflow-x-auto">{JSON.stringify(step.data, null, 2)}</pre>
                                </div>
                              )}
                            </div>
                            
                            {index < msg.reasoning.length - 1 && (
                              <div className="flex justify-center my-3">
                                <div className="w-px h-8 bg-gradient-to-b from-slate-600 to-transparent" />
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
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
