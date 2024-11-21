import { Switch } from 'antd';
import React from 'react';

interface Permission {
  name: string;
  allowed: boolean;
}

interface PermissionToggleProps {
  permission: Permission;
  onToggle: (name: string) => void;
}

const PermissionToggle: React.FC<PermissionToggleProps> = ({ permission, onToggle }) => {
  return (
    <div className="flex items-center justify-between px-3 py-2 ">
      <span>{permission.name}</span>
      <Switch  checked={permission.allowed} onChange={() => onToggle(permission.name)} />
    
    </div>
  );
};

export default PermissionToggle;
