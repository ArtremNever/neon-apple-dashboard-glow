
import { Layout } from '@/components/Layout';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallage } from '@/components/ui/avatar';
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
  Lightbulb
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
      content: 'Hello! I\'m your AI campaign management assistant. I can help you create, optimize, and manage your advertising campaigns. What would you like to do today?',
      timestamp: '2024-01-13T10:00:00Z',
    },
    {
      id: '2',
      role: 'user',
      content: 'Create a new gaming app install campaign for iOS with a $5000 daily budget targeting users in the US',
      timestamp: '2024-01-13T10:01:00Z',
    },
    {
      id: '3',
      role: 'assistant',
      content: 'I\'ll create a gaming app install campaign for you. Let me analyze the requirements and set up the optimal configuration.',
      timestamp: '2024-01-13T10:01:30Z',
      reasoning: [
        {
          id: 'r1',
          type: 'analysis',
          title: 'Campaign Requirements Analysis',
          description: 'Analyzing campaign parameters: Gaming vertical, iOS platform, $5000 daily budget, US geo-targeting',
          status: 'completed',
          data: { vertical: 'Gaming', platform: 'iOS', budget: 5000, geo: 'US' }
        },
        {
          id: 'r2',
          type: 'decision',
          title: 'Platform Selection',
          description: 'Selecting optimal ad networks for gaming app installs: Facebook, Google UAC, Unity Ads',
          status: 'completed',
          data: { platforms: ['Facebook', 'Google UAC', 'Unity Ads'] }
        },
        {
          id: 'r3',
          type: 'action',
          title: 'Campaign Configuration',
          description: 'Setting up campaign structure with 3 ad sets targeting different audience segments',
          status: 'processing',
          data: { adSets: 3, targetingTypes: ['Lookalike', 'Interest', 'Behavioral'] }
        },
        {
          id: 'r4',
          type: 'validation',
          title: 'Budget & Bid Optimization',
          description: 'Calculating optimal bid strategies and budget distribution across ad sets',
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
        content: 'I understand your request. Let me process that for you...',
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-4 h-4 text-green-400" />;
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
      case 'validation': return 'text-green-400';
      default: return 'text-slate-400';
    }
  };

  return (
    <Layout>
      <div className="p-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white mb-2">AI Campaign Assistant</h1>
            <p className="text-slate-400">Chat with AI to create and manage your advertising campaigns</p>
          </div>

          {/* Chat Container */}
          <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-xl">
            <CardContent className="p-0">
              {/* Messages */}
              <div className="h-96 overflow-y-auto p-6 space-y-6">
                {messages.map((msg) => (
                  <div key={msg.id} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {msg.role === 'assistant' && (
                      <Avatar className="w-8 h-8 bg-blue-600">
                        <Bot className="w-4 h-4 text-white" />
                      </Avatar>
                    )}
                    
                    <div className={`max-w-2xl ${msg.role === 'user' ? 'order-2' : ''}`}>
                      <div className={`p-4 rounded-lg ${
                        msg.role === 'user' 
                          ? 'bg-blue-600 text-white ml-auto' 
                          : 'bg-slate-800 text-slate-200'
                      }`}>
                        <p>{msg.content}</p>
                        <p className="text-xs opacity-70 mt-2">
                          {new Date(msg.timestamp).toLocaleTimeString()}
                        </p>
                      </div>

                      {/* Reasoning Chain */}
                      {msg.reasoning && (
                        <div className="mt-4 space-y-3 pl-4 border-l-2 border-slate-600">
                          <div className="flex items-center gap-2 text-sm font-medium text-slate-300">
                            <Brain className="w-4 h-4" />
                            AI Reasoning Process
                          </div>
                          
                          {msg.reasoning.map((step, index) => (
                            <div key={step.id} className="relative">
                              <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
                                <div className="flex items-center justify-between mb-2">
                                  <div className="flex items-center gap-2">
                                    <div className={`p-1.5 rounded-lg bg-slate-700 ${getStepTypeColor(step.type)}`}>
                                      {getStepTypeIcon(step.type)}
                                    </div>
                                    <div>
                                      <h4 className="text-sm font-medium text-white">{step.title}</h4>
                                      <Badge className={`text-xs mt-1 ${
                                        step.type === 'analysis' ? 'bg-purple-600 text-purple-100' :
                                        step.type === 'decision' ? 'bg-yellow-600 text-yellow-100' :
                                        step.type === 'action' ? 'bg-blue-600 text-blue-100' :
                                        'bg-green-600 text-green-100'
                                      } border-none`}>
                                        {step.type}
                                      </Badge>
                                    </div>
                                  </div>
                                  {getStatusIcon(step.status)}
                                </div>
                                
                                <p className="text-sm text-slate-300 mb-3">{step.description}</p>
                                
                                {step.data && (
                                  <div className="bg-slate-900/50 rounded p-3 text-xs">
                                    <pre className="text-slate-400">{JSON.stringify(step.data, null, 2)}</pre>
                                  </div>
                                )}
                              </div>
                              
                              {index < msg.reasoning.length - 1 && (
                                <div className="flex justify-center my-2">
                                  <ArrowRight className="w-4 h-4 text-slate-500" />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {msg.role === 'user' && (
                      <Avatar className="w-8 h-8 bg-slate-600 order-3">
                        <User className="w-4 h-4 text-white" />
                      </Avatar>
                    )}
                  </div>
                ))}
              </div>

              {/* Input */}
              <div className="border-t border-slate-700 p-4">
                <div className="flex gap-2">
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask me to create campaigns, optimize performance, or analyze data..."
                    className="flex-1 bg-slate-800 border-slate-600 text-slate-200 placeholder:text-slate-400"
                  />
                  <Button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700">
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 h-auto p-4">
              <div className="text-center">
                <MessageSquare className="w-6 h-6 mx-auto mb-2" />
                <div className="font-medium">Create Campaign</div>
                <div className="text-xs text-slate-400">Start a new campaign</div>
              </div>
            </Button>
            
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 h-auto p-4">
              <div className="text-center">
                <Brain className="w-6 h-6 mx-auto mb-2" />
                <div className="font-medium">Optimize Performance</div>
                <div className="text-xs text-slate-400">AI-powered optimization</div>
              </div>
            </Button>
            
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 h-auto p-4">
              <div className="text-center">
                <Lightbulb className="w-6 h-6 mx-auto mb-2" />
                <div className="font-medium">Get Insights</div>
                <div className="text-xs text-slate-400">Campaign analysis</div>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AIChat;
