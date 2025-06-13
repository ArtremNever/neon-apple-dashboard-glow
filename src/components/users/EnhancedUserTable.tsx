
import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  Search, 
  Filter, 
  Grid3X3, 
  List, 
  MoreHorizontal, 
  Edit, 
  Key, 
  Activity,
  Eye,
  Shield,
  UserX,
  Crown,
  User
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  tags?: string[];
  permissions?: {
    read: boolean;
    write: boolean;
    delete: boolean;
    admin: boolean;
  };
}

interface EnhancedUserTableProps {
  users: User[];
  onUserSelect?: (userIds: string[]) => void;
  onUserAction?: (action: string, userId: string) => void;
}

export const EnhancedUserTable = ({ users, onUserSelect, onUserAction }: EnhancedUserTableProps) => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.role.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectUser = (userId: string, checked: boolean) => {
    const newSelectedUsers = checked 
      ? [...selectedUsers, userId]
      : selectedUsers.filter(id => id !== userId);
    
    setSelectedUsers(newSelectedUsers);
    onUserSelect?.(newSelectedUsers);
  };

  const handleSelectAll = (checked: boolean) => {
    const newSelectedUsers = checked ? filteredUsers.map(user => user.id) : [];
    setSelectedUsers(newSelectedUsers);
    onUserSelect?.(newSelectedUsers);
  };

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

  return (
    <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-xl">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-white">Team Members</CardTitle>
          
          <div className="flex items-center gap-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search by name, email, role..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-800/50 border-slate-600 text-slate-200 placeholder:text-slate-400 w-80"
              />
              {selectedUsers.length > 0 && (
                <Badge className="absolute -top-2 -right-2 bg-blue-600">
                  {selectedUsers.length}
                </Badge>
              )}
            </div>

            {/* View Toggle */}
            <div className="flex bg-slate-800/50 rounded-lg p-1">
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('list')}
                className="px-3"
              >
                <List className="w-4 h-4" />
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setViewMode('grid')}
                className="px-3"
              >
                <Grid3X3 className="w-4 h-4" />
              </Button>
            </div>

            {/* Filter */}
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-800">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedUsers.length > 0 && (
          <div className="flex items-center gap-2 p-3 bg-blue-600/10 border border-blue-500/20 rounded-lg animate-fade-in">
            <span className="text-blue-400 text-sm">
              {selectedUsers.length} user(s) selected
            </span>
            <div className="flex gap-2 ml-auto">
              <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                Change Role
              </Button>
              <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                Export
              </Button>
              <Button size="sm" variant="outline" className="border-red-600 text-red-400 hover:bg-red-600 hover:text-white">
                Remove
              </Button>
            </div>
          </div>
        )}
      </CardHeader>

      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700">
                <th className="text-left py-3 px-4">
                  <Checkbox 
                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                    onCheckedChange={handleSelectAll}
                  />
                </th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">User</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Role</th>
                <th className="text-center py-3 px-4 text-slate-400 font-medium">Status</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Activity</th>
                <th className="text-left py-3 px-4 text-slate-400 font-medium">Permissions</th>
                <th className="text-center py-3 px-4 text-slate-400 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors">
                  <td className="py-4 px-4">
                    <Checkbox 
                      checked={selectedUsers.includes(user.id)}
                      onCheckedChange={(checked) => handleSelectUser(user.id, checked as boolean)}
                    />
                  </td>
                  
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback className="bg-slate-700 text-slate-200">
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-slate-900 ${
                          user.status === 'active' ? 'bg-green-500' : 
                          user.status === 'pending' ? 'bg-yellow-500' : 'bg-gray-500'
                        }`}></div>
                      </div>
                      <div>
                        <div className="text-white font-medium">{user.name}</div>
                        <div className="text-slate-400 text-sm">{user.email}</div>
                        <div className="flex gap-1 mt-1">
                          {user.tags?.map((tag, index) => (
                            <Badge key={index} className="text-xs bg-slate-700 text-slate-300 border-slate-600">
                              {tag}
                            </Badge>
                          ))}
                        </div>
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

                  <td className="py-4 px-4">
                    <div className="space-y-1">
                      <div className="text-slate-300 text-sm">
                        <span className="font-medium">{user.campaigns}</span> campaigns
                      </div>
                      <div className="text-slate-400 text-xs">
                        Last: {user.lastActive}
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        user.permissions?.read ? 'bg-green-600/20 text-green-400' : 'bg-slate-700 text-slate-500'
                      }`}>
                        <Eye className="w-3 h-3" />
                      </div>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        user.permissions?.write ? 'bg-blue-600/20 text-blue-400' : 'bg-slate-700 text-slate-500'
                      }`}>
                        <Edit className="w-3 h-3" />
                      </div>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                        user.permissions?.delete ? 'bg-red-600/20 text-red-400' : 'bg-slate-700 text-slate-500'
                      }`}>
                        <UserX className="w-3 h-3" />
                      </div>
                      <span className="text-slate-400 text-xs ml-1">+4</span>
                    </div>
                  </td>

                  <td className="py-4 px-4 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-slate-400 hover:text-white"
                        onClick={() => onUserAction?.('edit', user.id)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-slate-400 hover:text-white"
                        onClick={() => onUserAction?.('reset-password', user.id)}
                      >
                        <Key className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-slate-400 hover:text-white"
                        onClick={() => onUserAction?.('activity', user.id)}
                      >
                        <Activity className="w-4 h-4" />
                      </Button>
                      
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="bg-slate-800 border-slate-700">
                          <DropdownMenuItem className="text-slate-300 hover:bg-slate-700">
                            View Profile
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-slate-300 hover:bg-slate-700">
                            Change Role
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-slate-300 hover:bg-slate-700">
                            Suspend User
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-400 hover:bg-red-600/20">
                            Delete User
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
