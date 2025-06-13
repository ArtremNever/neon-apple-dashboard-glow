
import { Layout } from '@/components/Layout';
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
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
  Phone
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
    paymentModel: 'Rev Share'
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
    paymentModel: 'CPA'
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
    paymentModel: 'Hybrid'
  }
];

const Clients = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedClient, setExpandedClient] = useState<string | null>(null);

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

  const stats = [
    { title: 'Total Clients', value: '24', icon: Building2, color: 'text-blue-400' },
    { title: 'Active Clients', value: '18', icon: Users, color: 'text-green-400' },
    { title: 'Total Spend', value: '$2.1M', icon: DollarSign, color: 'text-yellow-400' },
    { title: 'Total Revenue', value: '$4.8M', icon: TrendingUp, color: 'text-purple-400' },
  ];

  return (
    <Layout>
      <div className="p-6 space-y-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Clients</h1>
            <p className="text-slate-400">Manage client accounts and relationships</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Client
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <Card key={stat.title} className="bg-slate-900/50 border-slate-700 backdrop-blur-xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-slate-400 text-sm mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-800/50">
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-800/50 border-slate-600 text-slate-200 placeholder:text-slate-400"
            />
          </div>
          <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
            <Settings className="w-4 h-4 mr-2" />
            Filters
          </Button>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredClients.map((client) => (
            <Card key={client.id} className="bg-slate-900/50 border-slate-700 backdrop-blur-xl hover:bg-slate-800/50 transition-all duration-200">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={client.logo} />
                      <AvatarFallback className="bg-slate-700 text-slate-200">
                        {client.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-white text-lg">{client.name}</CardTitle>
                      <p className="text-slate-400 text-sm">{client.vertical}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`${getStatusColor(client.status)} border-none`}>
                      <span className="capitalize">{client.status}</span>
                    </Badge>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setExpandedClient(expandedClient === client.id ? null : client.id)}
                      className="text-slate-400 hover:text-white"
                    >
                      {expandedClient === client.id ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <div className="grid grid-cols-3 gap-4 mb-4">
                  <div className="text-center">
                    <div className="text-xl font-bold text-white">{client.campaigns}</div>
                    <div className="text-xs text-slate-400">Campaigns</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-white">${(client.totalSpend / 1000).toFixed(0)}K</div>
                    <div className="text-xs text-slate-400">Total Spend</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl font-bold text-white">${(client.revenue / 1000).toFixed(0)}K</div>
                    <div className="text-xs text-slate-400">Revenue</div>
                  </div>
                </div>

                {expandedClient === client.id && (
                  <div className="space-y-4 border-t border-slate-700 pt-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-300">{client.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-300">{client.phone}</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="w-4 h-4 text-slate-400" />
                          <span className="text-slate-300">{client.country}</span>
                        </div>
                        <Badge className={`${getPaymentModelColor(client.paymentModel)} border-none w-fit`}>
                          {client.paymentModel}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2">
                      <div className="text-sm text-slate-400">
                        Joined: {new Date(client.joinedDate).toLocaleDateString()}
                      </div>
                      <Button variant="outline" size="sm" className="border-slate-600 text-slate-300 hover:bg-slate-800">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Client
                      </Button>
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
