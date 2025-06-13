
import { useState } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MessageSquare, Calendar, Search, Plus } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface ChatSession {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  isActive?: boolean;
}

interface ChatHistoryProps {
  onSelectChat: (chatId: string) => void;
  currentChatId?: string;
}

export const ChatHistory = ({ onSelectChat, currentChatId }: ChatHistoryProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Мок данные для демонстрации
  const chatSessions: ChatSession[] = [
    {
      id: '1',
      title: 'Создание кампании для игрового приложения',
      lastMessage: 'Создал кампанию для установок игрового приложения...',
      timestamp: new Date(2024, 0, 13, 10, 30),
      isActive: currentChatId === '1'
    },
    {
      id: '2',
      title: 'Оптимизация таргетинга для e-commerce',
      lastMessage: 'Рекомендую использовать lookalike аудитории...',
      timestamp: new Date(2024, 0, 12, 15, 45),
      isActive: currentChatId === '2'
    },
    {
      id: '3',
      title: 'Анализ эффективности рекламных сетей',
      lastMessage: 'Проанализировал результаты по всем платформам...',
      timestamp: new Date(2024, 0, 11, 9, 20),
      isActive: currentChatId === '3'
    },
    {
      id: '4',
      title: 'Настройка креативов для финансовой сферы',
      lastMessage: 'Для финансовых продуктов важно соблюдать...',
      timestamp: new Date(2024, 0, 10, 14, 10),
      isActive: currentChatId === '4'
    }
  ];

  const filteredChats = chatSessions.filter(chat =>
    chat.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 24) {
      return date.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    } else if (diffInHours < 48) {
      return 'Вчера';
    } else {
      return date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });
    }
  };

  return (
    <div className="h-full flex flex-col bg-slate-900/50 border-r border-slate-700/50">
      {/* Header */}
      <div className="p-4 border-b border-slate-700/50">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-blue-400" />
            История чатов
          </h2>
          <Button 
            size="sm" 
            className="bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 border border-blue-500/30"
            onClick={() => onSelectChat('new')}
          >
            <Plus className="w-4 h-4" />
          </Button>
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <Input
            placeholder="Поиск по чатам..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-slate-800/60 border-slate-700/50 text-slate-200 placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Chat List */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-2">
          {filteredChats.map((chat) => (
            <Card
              key={chat.id}
              className={`p-3 cursor-pointer transition-all duration-200 hover:bg-slate-800/60 border-slate-700/40 ${
                chat.isActive 
                  ? 'bg-blue-500/15 border-blue-500/30 shadow-lg shadow-blue-500/10' 
                  : 'bg-slate-800/40 hover:border-slate-600/50'
              }`}
              onClick={() => onSelectChat(chat.id)}
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <h3 className={`text-sm font-medium line-clamp-2 ${
                    chat.isActive ? 'text-blue-300' : 'text-slate-200'
                  }`}>
                    {chat.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-slate-400 ml-2 flex-shrink-0">
                    <Calendar className="w-3 h-3" />
                    {formatTimestamp(chat.timestamp)}
                  </div>
                </div>
                
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {chat.lastMessage}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
