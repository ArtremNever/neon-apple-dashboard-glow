
import React from 'react';
import { Input } from '@/components/ui/input';

interface SettingsInputProps {
  label: string;
  description?: string;
  value: string | number;
  onChange: (value: string) => void;
  type?: 'text' | 'email' | 'number';
  placeholder?: string;
  className?: string;
}

export const SettingsInput = ({ 
  label, 
  description, 
  value, 
  onChange, 
  type = 'text', 
  placeholder,
  className = ""
}: SettingsInputProps) => {
  return (
    <div className={className}>
      <label className="block text-slate-300 text-sm font-medium mb-2">
        {label}
      </label>
      <Input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-slate-800/50 border-slate-600 text-slate-200 focus:border-blue-500 focus:ring-blue-500"
      />
      {description && (
        <p className="text-slate-400 text-sm mt-1">{description}</p>
      )}
    </div>
  );
};
