
import { Search, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserMenu } from '@/components/UserMenu';

export const Header = () => {
  return (
    <header className="h-14 bg-card border-b border-border flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-medium text-foreground">Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="Search..." 
            className="pl-10 w-64 bg-background border-border"
          />
        </div>

        {/* Notifications */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative text-muted-foreground hover:text-foreground"
        >
          <Bell className="w-4 h-4" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"></div>
        </Button>

        {/* User Menu */}
        <UserMenu />
      </div>
    </header>
  );
};
