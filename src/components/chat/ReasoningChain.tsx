
import { useState } from 'react';
import { CheckCircle, Clock, AlertCircle, Brain, Lightbulb, ArrowRight, Zap, ChevronDown, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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
  const [isExpanded, setIsExpanded] = useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="w-3 h-3 text-emerald-400" />;
      case 'processing': return <Clock className="w-3 h-3 text-blue-400 animate-spin" />;
      case 'failed': return <AlertCircle className="w-3 h-3 text-red-400" />;
      default: return <Clock className="w-3 h-3 text-slate-400" />;
    }
  };

  const getStepTypeIcon = (type: string) => {
    switch (type) {
      case 'analysis': return <Brain className="w-3 h-3" />;
      case 'decision': return <Lightbulb className="w-3 h-3" />;
      case 'action': return <ArrowRight className="w-3 h-3" />;
      case 'validation': return <CheckCircle className="w-3 h-3" />;
      default: return <Zap className="w-3 h-3" />;
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

  const completedSteps = steps.filter(step => step.status === 'completed').length;
  const currentStep = steps.find(step => step.status === 'processing');

  return (
    <Card className="bg-slate-800/40 border border-slate-700/30 backdrop-blur-sm mb-4">
      {/* Collapsible Header */}
      <div 
        className="p-4 cursor-pointer hover:bg-slate-700/20 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-slate-700/50 flex items-center justify-center border border-slate-600/50">
              <Brain className="w-4 h-4 text-slate-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-200">DeepSearch</span>
                <span className="text-xs text-slate-400">13s</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                {currentStep && (
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-blue-400 animate-spin" />
                    <span className="text-xs text-slate-400">{currentStep.title}</span>
                  </div>
                )}
                {!currentStep && (
                  <div className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3 text-emerald-400" />
                    <span className="text-xs text-slate-400">Завершено ({completedSteps}/{steps.length})</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="w-6 h-6 p-0 text-slate-400 hover:text-slate-200"
          >
            {isExpanded ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronRight className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Expandable Content */}
      {isExpanded && (
        <div className="px-4 pb-4 border-t border-slate-700/30">
          <div className="mt-4 space-y-3">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-start gap-3">
                <div className="flex items-center justify-center w-5 h-5 mt-0.5 flex-shrink-0">
                  {getStatusIcon(step.status)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-slate-200">{step.title}</span>
                    {step.status === 'processing' && (
                      <div className="flex items-center gap-1">
                        <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" />
                        <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                        <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                      </div>
                    )}
                  </div>
                  
                  <p className="text-xs text-slate-400 leading-relaxed mb-2">
                    {step.description}
                  </p>
                  
                  {step.data && (
                    <div className="bg-slate-900/50 rounded border border-slate-700/30 p-2">
                      <pre className="text-xs text-slate-400 overflow-x-auto whitespace-pre-wrap">
                        {JSON.stringify(step.data, null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};
