
import { Search, Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const Header = () => {
  return (
    <header className="h-16 glass-card border-b border-border/50 flex items-center justify-between px-6 animate-fade-in-up">
      <div className="flex items-center gap-4">
        <h1 className="text-2xl font-bold neon-text">Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input 
            placeholder="Search..." 
            className="pl-10 w-64 bg-secondary/30 border-border/50 focus:border-neon-green/50 focus:ring-neon-green/20"
          />
        </div>

        {/* Notifications */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative hover:bg-secondary/50 text-muted-foreground hover:text-foreground"
        >
          <Bell className="w-5 h-5" />
          <div className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-neon-green rounded-full animate-pulse-glow"></div>
        </Button>

        {/* Profile */}
        <Button 
          variant="ghost" 
          size="icon" 
          className="hover:bg-secondary/50 text-muted-foreground hover:text-foreground"
        >
          <User className="w-5 h-5" />
        </Button>
      </div>
    </header>
  );
};
