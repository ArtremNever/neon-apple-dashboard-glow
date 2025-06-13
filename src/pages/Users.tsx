
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
  MoreHorizontal, 
  Shield, 
  User, 
  Mail, 
  Calendar,
  Filter,
  UserCheck,
  UserX,
  Crown
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'analyst' | 'viewer';
  status: 'active' | 'inactive' | 'pending';
  lastActive: string;
  avatar?: string;
  campaigns: number;
  joinedDate: string;
}

const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@company.com',
    role: 'admin',
    status: 'active',
    lastActive: '2 hours ago',
    campaigns: 12,
    joinedDate: '2023-06-15'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    role: 'manager',
    status: 'active',
    lastActive: '1 day ago',
    campaigns: 8,
    joinedDate: '2023-08-22'
  },
  {
    id: '3',
    name: 'Mike Chen',
    email: 'mike.chen@company.com',
    role: 'analyst',
    status: 'active',
    lastActive: '3 hours ago',
    campaigns: 5,
    joinedDate: '2023-09-10'
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.davis@company.com',
    role: 'viewer',
    status: 'inactive',
    lastActive: '2 weeks ago',
    campaigns: 0,
    joinedDate: '2023-11-05'
  },
  {
    id: '5',
    name: 'David Wilson',
    email: 'david.wilson@company.com',
    role: 'manager',
    status: 'pending',
    lastActive: 'Never',
    campaigns: 0,
    joinedDate: '2024-01-12'
  }
];

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const filteredUsers = mockUsers.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Crown className="w-4 h-4" />;
      case 'manager': return <Shield className="w-4 h-4" />;
      case 'analyst': return <User className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-purple-600 text-purple-100';
      case 'manager': return 'bg-blue-600 text-blue-100';
      case 'analyst': return 'bg-green-600 text-green-100';
      default: return 'bg-gray-600 text-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600 text-green-100';
      case 'inactive': return 'bg-gray-600 text-gray-100';
      case 'pending': return 'bg-yellow-600 text-yellow-100';
      default: return 'bg-gray-600 text-gray-100';
    }
  };

  const stats = [
    { title: 'Total Users', value: '24', icon: User, color: 'text-blue-400' },
    { title: 'Active Users', value: '18', icon: UserCheck, color: 'text-green-400' },
    { title: 'Pending Invites', value: '3', icon: Mail, color: 'text-yellow-400' },
    { title: 'Inactive Users', value: '3', icon: UserX, color: 'text-red-400' },
  ];

  return (
    <Layout>
      <div className="p-6 space-y-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Users</h1>
            <p className="text-slate-400">Manage team members and their permissions</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Invite User
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
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

        {/* Search and Filters */}
        <div className="flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-800/50 border-slate-600 text-slate-200 placeholder:text-slate-400"
            />
          </div>
          <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
            <Filter className="w-4 h-4 mr-2" />
            Filters
          </Button>
          <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
            <Settings className="w-4 h-4 mr-2" />
            Roles
          </Button>
        </div>

        {/* Users Table */}
        <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-xl">
          <CardHeader>
            <CardTitle className="text-white">Team Members</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">User</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Role</th>
                    <th className="text-center py-3 px-4 text-slate-400 font-medium">Status</th>
                    <th className="text-right py-3 px-4 text-slate-400 font-medium">Campaigns</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Last Active</th>
                    <th className="text-left py-3 px-4 text-slate-400 font-medium">Joined</th>
                    <th className="text-center py-3 px-4 text-slate-400 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b border-slate-800 hover:bg-slate-800/30">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback className="bg-slate-700 text-slate-200">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-white font-medium">{user.name}</div>
                            <div className="text-slate-400 text-sm">{user.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge className={`${getRoleColor(user.role)} border-none`}>
                          <div className="flex items-center gap-1">
                            {getRoleIcon(user.role)}
                            <span className="capitalize">{user.role}</span>
                          </div>
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Badge className={`${getStatusColor(user.status)} border-none`}>
                          <span className="capitalize">{user.status}</span>
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-right text-slate-300">
                        {user.campaigns}
                      </td>
                      <td className="py-4 px-4 text-slate-300">
                        {user.lastActive}
                      </td>
                      <td className="py-4 px-4 text-slate-300">
                        {new Date(user.joinedDate).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4 text-center">
                        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <div className="text-slate-400 mb-4">
              <User className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No users found</p>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Users;
