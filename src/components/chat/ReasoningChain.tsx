
import { CheckCircle, Clock, AlertCircle, Brain, Lightbulb, ArrowRight, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export interface ReasoningStep {
  id: string;
  type: 'analysis' | 'decision' | 'action' | 'validation';
  title: string;
  description: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  data?: any;
}

interface ReasoningChainProps {
  steps: ReasoningStep[];
}

export const ReasoningChain = ({ steps }: ReasoningChainProps) => {
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
      default: return <Zap className="w-4 h-4" />;
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

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'analysis': return 'Анализ';
      case 'decision': return 'Решение';
      case 'action': return 'Действие';
      case 'validation': return 'Проверка';
      default: return type;
    }
  };

  return (
    <div className="space-y-4">
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
        {steps.map((step, index) => (
          <div key={step.id} className="relative">
            <Card className="bg-slate-800/60 border border-slate-700/40 p-4 backdrop-blur-sm">
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
                      {getTypeLabel(step.type)}
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
                  <pre className="text-xs text-slate-400 overflow-x-auto whitespace-pre-wrap">
                    {JSON.stringify(step.data, null, 2)}
                  </pre>
                </div>
              )}
            </Card>
            
            {index < steps.length - 1 && (
              <div className="flex justify-center my-3">
                <div className="w-px h-8 bg-gradient-to-b from-slate-600 to-transparent" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
