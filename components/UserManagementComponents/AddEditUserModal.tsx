import React from 'react';
import Modal from '@mui/material/Modal';
import { Input_Component } from '../Input_Component';
import { Select_Dropdown } from '../Select_Dropdown';
import LocationModal from './LocationModal';


interface PropsInterface {
    open: boolean;
    handleOpen: () => void;
    handleClose: () => void;
    submitHandle: () => void;
    loading: boolean;
}

const roles = [
    'Super Admin',
    'Manager',
    'Inventory manager'
]

export default function AddEditUserModal({
    open,
    handleOpen,
    handleClose,
    submitHandle,
    loading
}: PropsInterface) {


    const select_section_handle = () => {

    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="date-range-modal-title"
                aria-describedby="date-range-modal-description"
            >
                <div className='w-full h-full flex justify-center items-center ' >
                    <div className='bg-white rounded-md px-3 py-3 min-w-[650px] '>
                        <h2 id="date-range-modal-title" className='mb-4 font-bold'>Add a new user</h2>

                        <div className='flex flex-col w-full space-y-4 '>
                            <div className='grid grid-cols-2 gap-4'>

                                <div className='col-span-full'>
                                    <Input_Component placeholder='Full Name' border='border-[1px] border-gray-300 rounded-md' onChange={function (value: any): void {
                                        throw new Error('Function not implemented.');
                                    }} />
                                </div>

                                <div className='col-span-full'>
                                    <Select_Dropdown  bg_color="#fff" value={''} options_arr={roles.map((role) => ({ value: role, label: role }))} on_change_handle={select_section_handle} required={true} />
                                </div>
                                <div className=''>
                                    <Input_Component placeholder='Email' border='border-[1px] border-gray-300 rounded-md' onChange={function (value: any): void {
                                        throw new Error('Function not implemented.');
                                    }} />
                                </div>
                                <div className=''>
                                    <Input_Component value="sdfsdfds" passwordEye placeholder='Password' border='border-[1px] border-gray-300 rounded-md' onChange={function (value: any): void {
                                        throw new Error('Function not implemented.');
                                    }} />
                                </div>
                                <div className='col-span-full'>
                                    <LocationModal />
                                </div>
                            </div>




                            <div className='grid grid-cols-4 gap-x-3 w-full'>
                                <button
                                    onClick={handleClose}
                                    className="bg-[#F5F7F9] text-[#44444F] hover:bg-gray-200 px-4 py-2 rounded-md "
                                >
                                    Close
                                </button>
                                <button
                                    onClick={submitHandle}
                                    disabled={loading}
                                    className="bg-black border-2 border-black text-white px-4 py-2 rounded-md disabled:bg-gray-400 disabled:border-gray-400 col-span-3 w-full"
                                >
                                    Add user
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
