'use client'

import { CircularProgress } from "@mui/material";
import { Switch } from "antd";
import { useContext, useState } from "react";
import { MdPassword } from "react-icons/md";
import { GoPencil } from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";
import AddEditUserModal from "./AddEditUserModal";
import { LocationContext } from "@/context";


interface DataListInterface {
    id: number;
    name: string;
    role: string;
    email: string;
    locations: [string];
    password: string;

}


const dataListArray = [
    {
        id: 1,
        name: "Mack Martinez",
        role: "Admin",
        email: "Mackjmart@gmail,com",
        locations: ["River Oaks"],
        password: "****************",
    },
    {
        id: 1,
        name: "Mack Martinez",
        role: "Admin",
        email: "Mackjmart@gmail,com",
        locations: ["River Oaks"],
        password: "****************",
    },
    {
        id: 1,
        name: "Mack Martinez",
        role: "Admin",
        email: "Mackjmart@gmail,com",
        locations: ["River Oaks"],
        password: "****************",
    },
    {
        id: 1,
        name: "Mack Martinez",
        role: "Admin",
        email: "Mackjmart@gmail,com",
        locations: ["River Oaks"],
        password: "****************",
    },
    {
        id: 1,
        name: "Mack Martinez",
        role: "Admin",
        email: "Mackjmart@gmail,com",
        locations: ["River Oaks"],
        password: "****************",
    },
    {
        id: 1,
        name: "Mack Martinez",
        role: "Admin",
        email: "Mackjmart@gmail,com",
        locations: ["River Oaks"],
        password: "****************",
    },
    {
        id: 1,
        name: "Mack Martinez",
        role: "Admin",
        email: "Mackjmart@gmail,com",
        locations: ["River Oaks"],
        password: "****************",
    },
    {
        id: 1,
        name: "Mack Martinez",
        role: "Admin",
        email: "Mackjmart@gmail,com",
        locations: ["River Oaks"],
        password: "****************",
    },
    {
        id: 1,
        name: "Mack Martinez",
        role: "Admin",
        email: "Mackjmart@gmail,com",
        locations: ["River Oaks"],
        password: "****************",
    },
    {
        id: 1,
        name: "Mack Martinez",
        role: "Admin",
        email: "Mackjmart@gmail,com",
        locations: ["River Oaks"],
        password: "****************",
    },
    {
        id: 1,
        name: "Mack Martinez",
        role: "Admin",
        email: "Mackjmart@gmail,com",
        locations: ["River Oaks"],
        password: "****************",
    },
]


const tableHeader = [
    { id: 'toggle', label: '', align: 'text-start', classNames: 'w-24' },
    { id: 'name', label: 'Name', align: 'text-start' },
    { id: 'role', label: 'Role' },
    { id: 'email', label: 'Email' },
    { id: 'locations', label: 'Location(s)' },
    { id: 'password', label: 'Password' },
    { id: 'actions', label: '', classNames: 'w-28' },
];

const UserManagementComponent = () => {

    const [loading, setLoading] = useState(false)

    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onChangeHandle = () => {

    }
    const addNewHandle = () => {

    }
    const submitHandle = () => {

    }


    return (
        <div className="mt-16 bg-gray-50 flex justify-center px-4 py-3">




            <div className='px-3 pt-1 pb-4 w-full bg-white'>

                <div className='space-y-6 px-3 pb-4 flex justify-between items-center'>
                    <h1 className="text-xl font-bold pt-5">Users</h1>

                    <div className="flex items-center space-x-3 ">
                        <div className='pl-1 pr-3 w-72 text-sm rounded-md bg-[#F5F7F9] flex items-center '>
                            <input onChange={onChangeHandle} className="bg-transparent flex-1 focus:outline-none placeholder:text-[#B5B5BE]" type="text" placeholder="Search for a user" />
                            <IoSearchOutline size={24} color="#B5B5BE" />




                        </div>

                        <button onClick={handleOpen} className='bg-black text-sm text-white px-5 py-2 rounded-md hover:opacity-70 active:opacity-90'>
                            Add New User
                        </button>
                    </div>





                </div>

                <div className='pb-4 pt-3 flex text-base text-[#71717A] items-center flex-1 font-normal w-full px-3'>
                    {tableHeader.map(({ label, align, classNames }, index: number) => (
                        <h1 key={index} className={`${classNames ? classNames : 'flex-1'} ${align || 'text-start'}`}>
                            {label}
                        </h1>
                    ))}
                </div>

                <div className={`mb-4 h-[71dvh] overflow-y-auto space-y-3`}>
                    {loading ? (
                        <div className='h-full w-full flex items-center justify-center'>
                            <CircularProgress />
                        </div>
                    ) : (
                        dataListArray.map((elem: any, index: number) => {

                            return <div key={index} className={`hover:bg-[#f0efef] flex items-center flex-1 text-base py-5 border-[1px] border-[#E4E4E7] rounded-lg px-3 `}>
                                {tableHeader.map(({ id, classNames, align }, ind) => {

                                    const content = elem[id];

                                    return (<div className={`${classNames ? classNames : 'flex-1'} ${align || 'text-start'}`} key={ind}>
                                        {id === 'toggle' ? <Switch /> : id === 'actions' ? <div className="flex items-center space-x-5 justify-end ">
                                            <MdPassword size={25} /><GoPencil size={25} />

                                        </div> : <h1 key={ind}>
                                            {content}
                                        </h1>}
                                    </div>);

                                })}
                            </div>
                        })
                    )}
                </div>
            </div>

            <AddEditUserModal
                open={open}
                handleOpen={handleOpen}
                handleClose={handleClose}
                submitHandle={submitHandle}
                loading={loading}
            />

        </div>
    )
}


export default UserManagementComponent;