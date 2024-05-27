"use client"
import React from 'react';
import WebsiteContentLayout from '../Layout';
import { Rating, RatingStar, Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser } from "react-icons/hi";
import PlusIcon from "@/assets/images/Logos/plus-icon.png"
import Image from 'next/image';
import { Select_Dropdown } from '@/components/Select_Dropdown';
const Career = () => {


    const customTheme = {
        root: {
            base: "bg-none overflow-y-auto",
            inner: `bg-none overflow-y-auto flex flex-col justify-between h-full pr-3`,
        },
    };
    return (
        <WebsiteContentLayout>
            <div className='mb-5 px-3' >
                <div className='flex items-end my-5'>


                    <div className='flex  flex-1'>
                        <div className='w-2/5'>
                        <Select_Dropdown value={''} label='ID' options_arr={[{
                            value: '',
                            label: '1',
                        }]}

                            // on_change_handle={select_language_handle}

                            required={true} />
                        </div>
                    </div>




                    <div >

                        <Image
                            className="w-12"
                            src={PlusIcon}
                            alt="Logo"
                        />


                    </div>

                </div>


                <div className="border-t my-3 border-black"></div>



                <div className='px-3 flex flex-col gap-5'>
                    <h6 className='text-primary_color'>Content</h6>


                    <div>
                        <p className='text-primary_color'>Text :</p>
                        <input

                            type="text" className='w-2/5 p-3 rounded-lg bg-input_bg' />
                    </div>
                    <div className='flex justify-end w-2/5 ' >
                        <div className='flex items-end gap-2 ' >
                            <span className='text-sm'>
                                Reset
                            </span>
                            <button className='bg-primary_color text-sm px-10 py-2 rounded-lg text-white' >
                                Update
                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </WebsiteContentLayout>
    );
};

export default Career;
