
import { Layout } from '@/components/Layout';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { ImprovedMetricCard, ActiveUsersList, PendingInviteItem, ActionButton } from '@/components/users/ImprovedMetricCard';
import { EnhancedUserTable } from '@/components/users/EnhancedUserTable';
import { InviteUserModal } from '@/components/users/InviteUserModal';

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

const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@company.com',
    role: 'admin',
    status: 'active',
    lastActive: '2 hours ago',
    campaigns: 12,
    joinedDate: '2023-06-15',
    tags: ['Marketing', 'Design'],
    permissions: { read: true, write: true, delete: true, admin: true }
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    role: 'manager',
    status: 'active',
    lastActive: '1 day ago',
    campaigns: 8,
    joinedDate: '2023-08-22',
    tags: ['Analytics'],
    permissions: { read: true, write: true, delete: false, admin: false }
  },
  {
    id: '3',
    name: 'Mike Chen',
    email: 'mike.chen@company.com',
    role: 'analyst',
    status: 'active',
    lastActive: '3 hours ago',
    campaigns: 5,
    joinedDate: '2023-09-10',
    tags: ['Data Science'],
    permissions: { read: true, write: true, delete: false, admin: false }
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.davis@company.com',
    role: 'viewer',
    status: 'inactive',
    lastActive: '2 weeks ago',
    campaigns: 0,
    joinedDate: '2023-11-05',
    permissions: { read: true, write: false, delete: false, admin: false }
  },
  {
    id: '5',
    name: 'David Wilson',
    email: 'david.wilson@company.com',
    role: 'manager',
    status: 'pending',
    lastActive: 'Never',
    campaigns: 0,
    joinedDate: '2024-01-12',
    permissions: { read: true, write: true, delete: false, admin: false }
  }
];

const activeUsers = [
  { id: '1', name: 'John Doe', avatar: '' },
  { id: '2', name: 'Sarah Johnson', avatar: '' },
  { id: '3', name: 'Mike Chen', avatar: '' }
];

const Users = () => {
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const handleUserSelect = (userIds: string[]) => {
    setSelectedUsers(userIds);
  };

  const handleUserAction = (action: string, userId: string) => {
    console.log(`Action: ${action} for user: ${userId}`);
  };

  const handleInviteUser = (userData: any) => {
    console.log('Inviting user:', userData);
  };

  return (
    <Layout>
      <div className="p-6 space-y-6 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Users</h1>
            <p className="text-slate-400">Manage team members and their permissions</p>
          </div>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => setInviteModalOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Invite User
          </Button>
        </div>

        {/* Enhanced Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <ImprovedMetricCard
            title="Total Users"
            value="24"
            icon="👥"
            gradient="blue"
            trend={{ value: "+12% this month", direction: "up" }}
          />
          
          <ImprovedMetricCard
            title="Active Now"
            value="18"
            icon="🟢"
            gradient="green"
            interactive
          >
            <ActiveUsersList users={activeUsers} totalCount={18} />
          </ImprovedMetricCard>
          
          <ImprovedMetricCard
            title="Pending Invites"
            value="3"
            icon="✉️"
            gradient="yellow"
          >
            <PendingInviteItem 
              email="alex@company.com" 
              expiresIn="Expires in 2 days" 
            />
          </ImprovedMetricCard>
          
          <ImprovedMetricCard
            title="Inactive Users"
            value="3"
            icon="🚫"
            gradient="red"
          >
            <ActionButton onClick={() => console.log('Review inactive users')}>
              Review Inactive
            </ActionButton>
          </ImprovedMetricCard>
        </div>

        {/* Enhanced User Table */}
        <EnhancedUserTable 
          users={mockUsers}
          onUserSelect={handleUserSelect}
          onUserAction={handleUserAction}
        />

        {/* Invite User Modal */}
        <InviteUserModal
          open={inviteModalOpen}
          onClose={() => setInviteModalOpen(false)}
          onInvite={handleInviteUser}
        />
      </div>
    </Layout>
  );
};

export default Users;
