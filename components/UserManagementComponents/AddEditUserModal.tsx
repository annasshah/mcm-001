import React, { useState } from 'react';
import Modal from '@mui/material/Modal';
import { Input_Component } from '../Input_Component';
import { Select_Dropdown } from '../Select_Dropdown';
import LocationModal from './LocationModal';
import { CreateUserModalDataInterface } from '@/types/typesInterfaces';

interface PropsInterface {
    open: boolean;
    handleClose: () => void;
    submitHandle: (data: CreateUserModalDataInterface) => Promise<void>;
    loading: boolean
}

const roles = [
    { id: 1, label: 'Admin' },
    { id: 2, label: 'Manager' },
    { id: 3, label: 'Inventory Manager' },
];

export default function AddEditUserModal({
    open,
    handleClose,
    submitHandle,
    loading,
}: PropsInterface) {
    const [formData, setFormData] = useState<CreateUserModalDataInterface>({
        email: '',
        roleId: 0,
        locationIds: [],
        fullName: '',
        password: '',
    });

    const handleInputChange = (field: keyof CreateUserModalDataInterface, value: string | number | number[]) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = async () => {
        if (!formData.fullName || !formData.email || !formData.roleId) {
            alert('Please fill in all required fields.');
            return;
        }
        await submitHandle(formData);
    };


    const closeModalHandle = () => {
        setFormData({
            email: '',
            roleId: 0,
            locationIds: [],
            fullName: '',
            password: '',
        })
        handleClose()
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={closeModalHandle}
                aria-labelledby="add-edit-user-modal-title"
                aria-describedby="add-edit-user-modal-description"
            >
                <div className="w-full h-full flex justify-center items-center">
                    <div className="bg-white rounded-md px-3 py-3 min-w-[650px]">
                        <h2 id="add-edit-user-modal-title" className="mb-4 font-bold">
                            Add a new user
                        </h2>

                        <div className="flex flex-col w-full space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div >
                                    <Input_Component
                                        value={formData.fullName}
                                        placeholder="Full Name"
                                        border="border-[1px] border-gray-300 rounded-md"
                                        onChange={(value) => handleInputChange('fullName', value)}
                                    />
                                </div>

                                <div >
                                    <Select_Dropdown
                                    hideLabel={true}
                                    label='Select Role'
                                    start_empty={true}
                                        bg_color="#fff"
                                        value={formData.roleId}
                                        options_arr={roles.map((role) => ({ value: role.id, label: role.label }))}
                                        on_change_handle={(e) => handleInputChange('roleId', Number(e.target.value))}
                                        required
                                    />
                                </div>

                                <div className="col-span-full">
                                    <Input_Component
                                        value={formData.email}

                                        placeholder="Email"
                                        type='email'
                                        border="border-[1px] border-gray-300 rounded-md"
                                        onChange={(value) => handleInputChange('email', value)}
                                    />
                                </div>

                                <div className="col-span-full">
                                    <LocationModal
                                        onChange={(value: number[]) => handleInputChange('locationIds', value)}
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-4 gap-x-3 w-full">
                                <button
                                    onClick={handleClose}
                                    className="bg-[#F5F7F9] text-[#44444F] hover:bg-gray-200 px-4 py-2 rounded-md"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="bg-black border-2 border-black text-white px-4 py-2 rounded-md disabled:bg-gray-400 disabled:border-gray-400 col-span-3 w-full"
                                >
                                    {loading ? 'Adding...' : 'Add User'}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
