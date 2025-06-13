
import React from 'react';
import { CheckCircle, AlertCircle, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface ValidationPanelProps {
  blockType: string;
  completedFields: number;
  totalFields: number;
  errors: string[];
  warnings: string[];
}

export const ValidationPanel: React.FC<ValidationPanelProps> = ({
  blockType,
  completedFields,
  totalFields,
  errors,
  warnings,
}) => {
  const progressPercentage = (completedFields / totalFields) * 100;
  
  return (
    <div className="bg-slate-800/50 backdrop-blur-xl rounded-xl border border-slate-700/50 p-4 mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white">Configuration Status</h3>
        <div className="text-xs text-slate-300">
          {completedFields}/{totalFields} complete
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <Progress 
          value={progressPercentage} 
          className="h-2 bg-slate-700/50"
        />
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-slate-400">Progress</span>
          <span className="text-xs font-medium text-white">{Math.round(progressPercentage)}%</span>
        </div>
      </div>

      {/* Status Steps */}
      <div className="space-y-2 mb-4">
        {['Name', 'Platform', 'Bundle ID', 'API Key', 'Permissions'].map((step, index) => {
          const isCompleted = index < completedFields;
          const isActive = index === completedFields;
          const hasError = errors.some(error => error.toLowerCase().includes(step.toLowerCase()));
          
          return (
            <div key={step} className="flex items-center gap-3">
              <div className={`
                w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold
                ${isCompleted ? 'bg-green-500 text-white' : 
                  isActive ? 'bg-blue-500 text-white' : 
                  hasError ? 'bg-red-500 text-white' :
                  'bg-slate-600 text-slate-400'}
              `}>
                {isCompleted ? <CheckCircle className="w-3 h-3" /> : 
                 hasError ? '!' : index + 1}
              </div>
              <span className={`text-sm ${isCompleted ? 'text-green-400' : 
                isActive ? 'text-blue-400' : 
                hasError ? 'text-red-400' : 'text-slate-400'}`}>
                {step}
              </span>
              {hasError && (
                <AlertCircle className="w-4 h-4 text-red-400 animate-pulse" />
              )}
            </div>
          );
        })}
      </div>

      {/* Summary */}
      <div className="space-y-2">
        {errors.length > 0 && (
          <div className="flex items-center gap-2 text-red-400">
            <AlertCircle className="w-4 h-4" />
            <span className="text-xs">{errors.length} error{errors.length > 1 ? 's' : ''} to fix</span>
          </div>
        )}
        
        {warnings.length > 0 && (
          <div className="flex items-center gap-2 text-yellow-400">
            <Clock className="w-4 h-4" />
            <span className="text-xs">{warnings.length} warning{warnings.length > 1 ? 's' : ''}</span>
          </div>
        )}
        
        {errors.length === 0 && warnings.length === 0 && completedFields === totalFields && (
          <div className="flex items-center gap-2 text-green-400">
            <CheckCircle className="w-4 h-4" />
            <span className="text-xs">Configuration complete!</span>
          </div>
        )}
      </div>

      {/* Quick Fix Button */}
      {errors.length > 0 && (
        <Button 
          size="sm" 
          className="w-full mt-4 bg-blue-600/80 hover:bg-blue-500/90 text-white border-0"
        >
          <span>Fix Issues</span>
          <ArrowRight className="w-4 h-4 ml-2" />
        </Button>
      )}
    </div>
  );
};
