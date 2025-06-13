
import { Button } from '@/components/ui/button';
import { MessageSquare, BarChart3, Phone, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuickActionButtonsProps {
  clientId: string;
  className?: string;
}

export const QuickActionButtons = ({ clientId, className }: QuickActionButtonsProps) => {
  const actions = [
    {
      icon: MessageSquare,
      label: 'Message',
      onClick: () => console.log('Message client:', clientId),
      color: 'hover:bg-blue-600/20 hover:text-blue-400'
    },
    {
      icon: Phone,
      label: 'Call',
      onClick: () => console.log('Call client:', clientId),
      color: 'hover:bg-green-600/20 hover:text-green-400'
    },
    {
      icon: BarChart3,
      label: 'Analytics',
      onClick: () => console.log('View analytics for:', clientId),
      color: 'hover:bg-purple-600/20 hover:text-purple-400'
    },
    {
      icon: FileText,
      label: 'Report',
      onClick: () => console.log('Generate report for:', clientId),
      color: 'hover:bg-orange-600/20 hover:text-orange-400'
    }
  ];

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {actions.map((action, index) => (
        <Button
          key={action.label}
          variant="ghost"
          size="sm"
          onClick={action.onClick}
          className={cn(
            'w-8 h-8 p-0 text-slate-400 transition-all duration-300 hover:scale-110',
            action.color
          )}
          title={action.label}
          style={{
            animationDelay: `${index * 100}ms`
          }}
        >
          <action.icon className="w-4 h-4" />
        </Button>
      ))}
    </div>
  );
};
