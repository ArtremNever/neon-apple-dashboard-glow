
import { Button } from '@/components/ui/button';
import { 
  RefreshCw, 
  Activity, 
  HardDrive, 
  Search,
  Settings,
  Download,
  Zap,
  Shield
} from 'lucide-react';

export const QuickActionsBar = () => {
  const actions = [
    { icon: RefreshCw, label: 'Restart Services', color: 'text-blue-400 hover:bg-blue-500/10' },
    { icon: Activity, label: 'Auto-scale', color: 'text-green-400 hover:bg-green-500/10' },
    { icon: HardDrive, label: 'Backup Now', color: 'text-purple-400 hover:bg-purple-500/10' },
    { icon: Search, label: 'Run Diagnostics', color: 'text-yellow-400 hover:bg-yellow-500/10' },
    { icon: Settings, label: 'Configure', color: 'text-slate-400 hover:bg-slate-500/10' },
    { icon: Download, label: 'Export Logs', color: 'text-cyan-400 hover:bg-cyan-500/10' },
    { icon: Zap, label: 'Performance Boost', color: 'text-orange-400 hover:bg-orange-500/10' },
    { icon: Shield, label: 'Security Scan', color: 'text-red-400 hover:bg-red-500/10' },
  ];

  return (
    <div className="flex items-center gap-3 p-4 bg-slate-900/30 rounded-xl border border-slate-700/50 backdrop-blur-sm">
      <div className="text-sm font-medium text-slate-300 mr-2">Quick Actions:</div>
      <div className="flex items-center gap-2 flex-wrap">
        {actions.map((action, index) => (
          <Button
            key={index}
            variant="ghost"
            size="sm"
            className={`h-8 px-3 ${action.color} transition-all duration-200 hover:scale-105`}
            title={action.label}
          >
            <action.icon className="w-4 h-4 mr-2" />
            {action.label}
          </Button>
        ))}
      </div>
    </div>
  );
};
