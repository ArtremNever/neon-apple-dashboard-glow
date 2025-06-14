
import React from 'react';

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export const SettingsLayout = ({ children }: SettingsLayoutProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="flex h-screen">
        {children}
      </div>
    </div>
  );
};
