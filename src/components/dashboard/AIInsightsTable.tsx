
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

interface AIInsight {
  id: string;
  type: 'optimization' | 'alert' | 'recommendation';
  campaign: string;
  message: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'approved' | 'dismissed';
  createdAt: string;
}

const mockInsights: AIInsight[] = [
  {
    id: '1',
    type: 'optimization',
    campaign: 'Summer Sale Campaign',
    message: 'Consider increasing bid by 15% for better performance. Current CPA is 23% below target.',
    priority: 'high',
    status: 'pending',
    createdAt: '2 hours ago'
  },
  {
    id: '2',
    type: 'alert',
    campaign: 'Mobile App Install',
    message: 'Budget depletion detected. Campaign will pause in 4 hours at current spend rate.',
    priority: 'high',
    status: 'pending',
    createdAt: '3 hours ago'
  },
  {
    id: '3',
    type: 'recommendation',
    campaign: 'Brand Awareness Q4',
    message: 'Audience expansion recommended. Similar performing segments identified.',
    priority: 'medium',
    status: 'approved',
    createdAt: '1 day ago'
  }
];

export const AIInsightsTable = () => {
  const getIcon = (type: AIInsight['type']) => {
    switch (type) {
      case 'optimization': return <TrendingUp className="w-4 h-4" />;
      case 'alert': return <AlertTriangle className="w-4 h-4" />;
      case 'recommendation': return <CheckCircle className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: AIInsight['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border-green-500/30';
    }
  };

  const getStatusColor = (status: AIInsight['status']) => {
    switch (status) {
      case 'pending': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'approved': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'dismissed': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-4">
      <Table>
        <TableHeader>
          <TableRow className="border-slate-700 hover:bg-slate-800/50">
            <TableHead className="text-slate-300">Type</TableHead>
            <TableHead className="text-slate-300">Campaign</TableHead>
            <TableHead className="text-slate-300">Message</TableHead>
            <TableHead className="text-slate-300">Priority</TableHead>
            <TableHead className="text-slate-300">Status</TableHead>
            <TableHead className="text-slate-300">Time</TableHead>
            <TableHead className="text-slate-300">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {mockInsights.map((insight) => (
            <TableRow key={insight.id} className="border-slate-700 hover:bg-slate-800/30">
              <TableCell>
                <div className="flex items-center gap-2 text-slate-300">
                  {getIcon(insight.type)}
                  <span className="capitalize">{insight.type}</span>
                </div>
              </TableCell>
              <TableCell className="text-slate-300 font-medium">{insight.campaign}</TableCell>
              <TableCell className="text-slate-400 max-w-md truncate">{insight.message}</TableCell>
              <TableCell>
                <Badge className={getPriorityColor(insight.priority)}>
                  {insight.priority}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge className={getStatusColor(insight.status)}>
                  {insight.status}
                </Badge>
              </TableCell>
              <TableCell className="text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {insight.createdAt}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {insight.status === 'pending' && (
                    <>
                      <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                        Dismiss
                      </Button>
                    </>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
