
import { Layout } from '@/components/Layout';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { EnhancedMetricCard } from '@/components/EnhancedMetricCard';
import { ClientHealthIndicator } from '@/components/ClientHealthIndicator';
import { ClientActivityHeatmap } from '@/components/ClientActivityHeatmap';
import { QuickActionButtons } from '@/components/QuickActionButtons';
import { 
  Search, 
  Plus, 
  Settings, 
  Building2, 
  Users, 
  DollarSign, 
  TrendingUp,
  Edit,
  ChevronDown,
  ChevronUp,
  MapPin,
  Mail,
  Phone,
  Grid3X3,
  Table,
  Kanban,
  Map
} from 'lucide-react';

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  status: 'active' | 'inactive' | 'pending';
  vertical: string;
  campaigns: number;
  totalSpend: number;
  revenue: number;
  joinedDate: string;
  logo?: string;
  paymentModel: 'CPA' | 'Rev Share' | 'Hybrid';
  healthScore: number;
  engagementLevel: 'high' | 'medium' | 'low';
  riskLevel: 'low' | 'medium' | 'high';
  revenueGrowth: number;
  lastActivity: string;
  activityData: number[];
}

const mockClients: Client[] = [
  {
    id: '1',
    name: 'Gaming Studio Pro',
    email: 'contact@gamingstudio.com',
    phone: '+1-555-0123',
    country: 'United States',
    status: 'active',
    vertical: 'Gaming',
    campaigns: 15,
    totalSpend: 125000,
    revenue: 280000,
    joinedDate: '2023-06-15',
    paymentModel: 'Rev Share',
    healthScore: 87,
    engagementLevel: 'high',
    riskLevel: 'low',
    revenueGrowth: 23,
    lastActivity: '2 hours ago',
    activityData: [12, 15, 8, 23, 18, 25, 19, 30, 22, 16, 28, 20, 35, 18, 24]
  },
  {
    id: '2',
    name: 'E-commerce Plus',
    email: 'hello@ecomplus.com',
    phone: '+44-20-7946-0958',
    country: 'United Kingdom',
    status: 'active',
    vertical: 'E-commerce',
    campaigns: 8,
    totalSpend: 89000,
    revenue: 156000,
    joinedDate: '2023-08-22',
    paymentModel: 'CPA',
    healthScore: 72,
    engagementLevel: 'medium',
    riskLevel: 'medium',
    revenueGrowth: 12,
    lastActivity: '1 day ago',
    activityData: [8, 12, 6, 18, 14, 20, 15, 22, 18, 12, 24, 16, 28, 14, 20]
  },
  {
    id: '3',
    name: 'FinTech Solutions',
    email: 'support@fintechsol.com',
    phone: '+49-30-12345678',
    country: 'Germany',
    status: 'pending',
    vertical: 'Finance',
    campaigns: 0,
    totalSpend: 0,
    revenue: 0,
    joinedDate: '2024-01-12',
    paymentModel: 'Hybrid',
    healthScore: 45,
    engagementLevel: 'low',
    riskLevel: 'high',
    revenueGrowth: 0,
    lastActivity: '1 week ago',
    activityData: [0, 2, 1, 3, 2, 1, 0, 1, 2, 0, 1, 3, 2, 1, 0]
  }
];

type ViewMode = 'grid' | 'table' | 'kanban' | 'map';

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedClient, setExpandedClient] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const filteredClients = mockClients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.vertical.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600 text-green-100';
      case 'inactive': return 'bg-gray-600 text-gray-100';
      case 'pending': return 'bg-yellow-600 text-yellow-100';
      default: return 'bg-gray-600 text-gray-100';
    }
  };

  const getPaymentModelColor = (model: string) => {
    switch (model) {
      case 'CPA': return 'bg-blue-600 text-blue-100';
      case 'Rev Share': return 'bg-purple-600 text-purple-100';
      case 'Hybrid': return 'bg-orange-600 text-orange-100';
      default: return 'bg-gray-600 text-gray-100';
    }
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const metricsData = [
    { 
      title: 'Total Clients', 
      value: '24', 
      change: '+12%', 
      icon: Building2, 
      trend: 'up' as const,
      sparklineData: [{ value: 18 }, { value: 20 }, { value: 22 }, { value: 24 }]
    },
    { 
      title: 'Active Clients', 
      value: '18', 
      change: '+8%', 
      icon: Users, 
      trend: 'up' as const,
      sparklineData: [{ value: 14 }, { value: 16 }, { value: 17 }, { value: 18 }]
    },
    { 
      title: 'Total Spend', 
      value: '$2.1M', 
      change: '+23%', 
      icon: DollarSign, 
      trend: 'up' as const,
      sparklineData: [{ value: 1.7 }, { value: 1.9 }, { value: 2.0 }, { value: 2.1 }]
    },
    { 
      title: 'Total Revenue', 
      value: '$4.8M', 
      change: '+18%', 
      icon: TrendingUp, 
      trend: 'up' as const,
      sparklineData: [{ value: 4.1 }, { value: 4.3 }, { value: 4.6 }, { value: 4.8 }]
    },
  ];

  const viewModeIcons = {
    grid: Grid3X3,
    table: Table,
    kanban: Kanban,
    map: Map
  };

  return (
    <Layout>
      <div className="p-6 space-y-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Clients</h1>
            <p className="text-slate-400">Manage client accounts and relationships</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-all duration-300 hover:scale-105">
            <Plus className="w-4 h-4 mr-2" />
            Add Client
          </Button>
        </div>

        {/* Enhanced KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metricsData.map((metric, index) => (
            <EnhancedMetricCard
              key={metric.title}
              title={metric.title}
              value={metric.value}
              change={metric.change}
              icon={metric.icon}
              trend={metric.trend}
              delay={index * 0.1}
              gradient={index % 2 === 0 ? 'from-blue-500/20 to-transparent' : 'from-purple-500/20 to-transparent'}
            />
          ))}
        </div>

        {/* Search and View Controls */}
        <div className="flex items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-800/50 border-slate-600 text-slate-200 placeholder:text-slate-400 transition-all duration-300 focus:bg-slate-800/70"
            />
          </div>
          
          <div className="flex items-center gap-2">
            {/* View Mode Toggle */}
            <div className="flex items-center bg-slate-800/50 rounded-lg p-1 border border-slate-700">
              {Object.entries(viewModeIcons).map(([mode, Icon]) => (
                <Button
                  key={mode}
                  variant={viewMode === mode ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode(mode as ViewMode)}
                  className={`w-8 h-8 p-0 transition-all duration-200 ${
                    viewMode === mode 
                      ? 'bg-blue-600 text-white' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </Button>
              ))}
            </div>
            
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800 transition-all duration-300">
              <Settings className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Enhanced Clients Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredClients.map((client, index) => (
            <Card 
              key={client.id} 
              className="relative overflow-hidden bg-white/[0.03] backdrop-blur-xl border-white/[0.05] 
                       hover:bg-white/[0.05] transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2
                       group animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Animated border effect */}
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="absolute inset-0 rounded-lg border-2 border-blue-500/20 animate-pulse" />
              </div>
              
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-5">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-transparent to-transparent animate-pulse" />
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-shimmer" />
              </div>

              <CardHeader className="pb-3 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Avatar className="w-14 h-14 ring-2 ring-blue-500/20 transition-all duration-300 group-hover:ring-4 group-hover:ring-blue-500/40">
                        <AvatarImage src={client.logo} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-600 to-purple-600 text-white font-semibold text-lg">
                          {client.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {/* Activity pulse indicator */}
                      {client.status === 'active' && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse">
                          <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75" />
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <div>
                        <CardTitle className="text-white text-lg font-semibold transition-colors duration-300 group-hover:text-blue-400">
                          {client.name}
                        </CardTitle>
                        <p className="text-slate-400 text-sm">{client.vertical}</p>
                      </div>
                      
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge className={`${getStatusColor(client.status)} border-none transition-all duration-300 hover:scale-105`}>
                          <span className="capitalize">{client.status}</span>
                        </Badge>
                        <Badge className={`${getPaymentModelColor(client.paymentModel)} border-none`}>
                          {client.paymentModel}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <ClientHealthIndicator 
                      score={client.healthScore}
                      size="sm"
                      showLabel={false}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setExpandedClient(expandedClient === client.id ? null : client.id)}
                      className="text-slate-400 hover:text-white transition-all duration-300 hover:bg-slate-700/50"
                    >
                      {expandedClient === client.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0 relative z-10">
                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center group-hover:scale-105 transition-transform duration-300">
                    <div className="text-xl font-bold text-white">{client.campaigns}</div>
                    <div className="text-xs text-slate-400">Campaigns</div>
                  </div>
                  <div className="text-center group-hover:scale-105 transition-transform duration-300">
                    <div className="text-xl font-bold text-white">${(client.totalSpend / 1000).toFixed(0)}K</div>
                    <div className="text-xs text-slate-400">Total Spend</div>
                  </div>
                  <div className="text-center group-hover:scale-105 transition-transform duration-300">
                    <div className="text-xl font-bold text-white">${(client.revenue / 1000).toFixed(0)}K</div>
                    <div className="text-xs text-slate-400">Revenue</div>
                  </div>
                </div>

                {/* Activity Heatmap */}
                <ClientActivityHeatmap 
                  data={client.activityData} 
                  className="mb-4"
                />

                {expandedClient === client.id && (
                  <div className="space-y-4 border-t border-slate-700 pt-4 animate-fade-in">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-300">{client.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-300">{client.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-300">{client.country}</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="text-sm">
                          <span className="text-slate-400">Health Score:</span>
                          <span className={`ml-2 font-semibold ${getHealthScoreColor(client.healthScore)}`}>
                            {client.healthScore}/100
                          </span>
                        </div>
                        <div className="text-sm">
                          <span className="text-slate-400">Revenue Growth:</span>
                          <span className="ml-2 font-semibold text-green-400">+{client.revenueGrowth}%</span>
                        </div>
                        <div className="text-sm">
                          <span className="text-slate-400">Last Activity:</span>
                          <span className="ml-2 text-slate-300">{client.lastActivity}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <div className="text-sm text-slate-400">
                        Joined: {new Date(client.joinedDate).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-2">
                        <QuickActionButtons clientId={client.id} />
                        <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-800 transition-all duration-300">
                          <Edit className="w-4 h-4 mr-2" />
                          Edit
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredClients.length === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-400 mb-4">
              <Building2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No clients found</p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Clients;
