import React, { useState } from 'react';
import PermissionToggle from './PermissionToggle';
import RoleInput from './RoleInput';
import { CiSquarePlus } from 'react-icons/ci';
import { TbPencil } from "react-icons/tb";
import { Switch } from 'antd';

const UserManagementComponents: React.FC = () => {
    const [roles, setRoles] = useState<string[]>(['Super Admin', 'Manager', 'Risk Associate']);
    const [permissions, setPermissions] = useState([
        { name: 'Dashboard', allowed: true },
        { name: 'Patients', allowed: true },
        { name: 'Pos', allowed: true },
        { name: 'Inventory', allowed: true },
        { name: 'User Management', allowed: true },
        { name: 'Appointment', allowed: true },
        { name: 'Texts', allowed: true },
        { name: 'Reputation', allowed: true },
    ]);

    const [newRole, setNewRole] = useState('');

    const handleAddRole = () => {
        if (newRole.trim() !== '') {
            setRoles([...roles, newRole]);
            setNewRole('');
        }
    };

    const handlePermissionToggle = (permissionName: string) => {
        setPermissions((prev) =>
            prev.map((perm) =>
                perm.name === permissionName ? { ...perm, allowed: !perm.allowed } : perm
            )
        );
    };

    const handleAllowAll = (allowed: boolean) => {
        setPermissions((prev) => prev.map((perm) => ({ ...perm, allowed })));
    };

    return (
        <div className="p-6 bg-white rounded shadow-lg max-w-[950px] w-full mx-auto">
            <div className="grid grid-cols-2 gap-4">
                {/* User Roles Section */}
                <div className="w-full ">
                    <div className='flex items-center justify-between px-2'>
                        <h2 className="text-lg font-bold mb-4">User roles</h2>
                        <CiSquarePlus size={25} />
                    </div>
                    <div className="space-y-3">
                        {roles.map((role, index) => (
                            <div key={index} className="flex items-center justify-between gap-3 flex-1 px-3 py-2 border-2 border-gray-100 rounded focus:outline-none">
                                <p>{role}</p>
                                <button className="p-2 text-gray-500 hover:text-gray-700">
                                    {index > 0 ? <TbPencil size={20} /> : null}
                                </button>
                            </div>
                        ))}
                    </div>
                    <RoleInput
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                        onSave={handleAddRole}
                    />
                </div>

                {/* Permissions Section */}
                <div className="w-full ">
                    <div className="flex items-center justify-between mb-4 px-2">
                        <h2 className="text-lg font-bold">Permissions</h2>
                        <label className="flex items-center gap-2">
                            <span>Allow all</span>
                            <Switch onChange={(e) => handleAllowAll(e)} checked={permissions.every((perm) => perm.allowed)} />

                        </label>
                    </div>
                    <div className="space-y-3 border-2 border-gray-100 rounded-md px-2 py-2">
                        {permissions.map((perm, index) => (
                            <PermissionToggle
                                key={index}
                                permission={perm}
                                onToggle={handlePermissionToggle}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserManagementComponents;
