
import { cn } from '@/lib/utils';

interface AnalyticsTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const tabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'media-sources', label: 'Media Sources' },
  { id: 'campaigns', label: 'Campaigns' },
  { id: 'events', label: 'In-app Events' },
  { id: 'cohorts', label: 'Cohorts' },
  { id: 'retention', label: 'Retention' }
];

export const AnalyticsTabs = ({ activeTab, onTabChange }: AnalyticsTabsProps) => {
  return (
    <div className="border-b border-slate-700/50 mb-8">
      <nav className="flex space-x-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              "py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 relative",
              activeTab === tab.id
                ? "border-blue-500 text-blue-400"
                : "border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-600"
            )}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};
