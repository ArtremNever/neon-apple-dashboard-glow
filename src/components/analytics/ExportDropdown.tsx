
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Download, 
  FileSpreadsheet, 
  FileText, 
  Mail 
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface ExportDropdownProps {
  onExport: (type: string) => void;
}

export const ExportDropdown = ({ onExport }: ExportDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const exportOptions = [
    { 
      type: 'csv', 
      label: 'Export as CSV', 
      icon: FileSpreadsheet,
      description: 'Comma-separated values'
    },
    { 
      type: 'excel', 
      label: 'Export as Excel', 
      icon: FileSpreadsheet,
      description: 'Microsoft Excel format'
    },
    { 
      type: 'pdf', 
      label: 'Export as PDF', 
      icon: FileText,
      description: 'Portable document format'
    },
  ];

  const handleExport = (type: string) => {
    onExport(type);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="border-slate-600 text-slate-300 hover:bg-slate-800"
      >
        <Download className="w-4 h-4 mr-2" />
        Export
      </Button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-transparent z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Export Options Dropdown */}
          <div className="absolute top-full right-0 mt-2 w-64 bg-slate-900/95 backdrop-blur-xl border border-slate-700 rounded-xl shadow-2xl z-50 overflow-hidden animate-fade-in">
            <div className="p-2">
              {exportOptions.map((option, index) => (
                <button
                  key={option.type}
                  onClick={() => handleExport(option.type)}
                  className={cn(
                    "w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200",
                    "hover:bg-slate-800/50 text-left group"
                  )}
                >
                  <option.icon className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
                  <div>
                    <div className="text-sm font-medium text-slate-200 group-hover:text-white">
                      {option.label}
                    </div>
                    <div className="text-xs text-slate-500">
                      {option.description}
                    </div>
                  </div>
                </button>
              ))}
              
              <div className="h-px bg-slate-700/50 my-2" />
              
              <button
                onClick={() => handleExport('schedule')}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-lg transition-all duration-200",
                  "hover:bg-slate-800/50 text-left group"
                )}
              >
                <Mail className="w-5 h-5 text-slate-400 group-hover:text-blue-400 transition-colors" />
                <div>
                  <div className="text-sm font-medium text-slate-200 group-hover:text-white">
                    Schedule Email Report
                  </div>
                  <div className="text-xs text-slate-500">
                    Automated daily/weekly reports
                  </div>
                </div>
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
