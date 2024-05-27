"use client"
import React from 'react';
import WebsiteContentLayout from '../Layout';
import { Rating, RatingStar, Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser } from "react-icons/hi";

import PlusIcon from "@/assets/images/Logos/plus-icon.png"
import Image from 'next/image';

const Locations = () => {



    const inputLabelandValue = [
        {
            Title: ""
        },
        {
            "Monday_to_Friday_Timing": ""
        },
        {
            Phone: ""
        },
        {
            "Saturday_Timing": ""
        },
        {
            "Direction": ""
        },
        {
            Email: ""
        },
        {
            Address: ""
        },
        {
            "Sunday_Timing": ""
        }
    ];


    const customTheme = {
        root: {
            base: "bg-none",
            inner: `bg-none  flex flex-col justify-between h-full pr-10`,
        },
    };
    return (
        <WebsiteContentLayout>
            <div className='mb-5 px-3' >

                <div className='flex  justify-between items-start p-0 my-5'>
                    <div className='w-1/2' >
                        <Sidebar

                            theme={customTheme}

                            className='h-auto w-auto ' >
                            <h6 className='text-primary_color'>ID</h6>
                            <Sidebar.Items    >
                                <Sidebar.ItemGroup className='bg-gray-200 rounded-lg'>
                                    <Sidebar.Collapse label="ID" className='rounded'>
                                        {[...Array(5)].map((_, index) => (
                                            <Sidebar.Item key={index} href="#">Hero Section</Sidebar.Item>
                                        ))}
                                    </Sidebar.Collapse>
                                </Sidebar.ItemGroup>
                            </Sidebar.Items>
                        </Sidebar>

                    </div>
                    <div >

                        <Image
                            className="w-16"
                            src={PlusIcon}
                            alt="Logo"
                        />


                    </div>

                </div>


                <div className="border-t my-3 border-black"></div>
                <div className='px-3 grid grid-cols-12 gap-5'>
                    <h6 className='col-span-12 text-primary_color'>Content</h6>
                    {
                        inputLabelandValue.map((item, index) => {
                            const [key, value] = Object.entries(item)[0];
                            const formattedKey = key.replace(/_/g, " ");
                            return (
                                <div key={index} className='col-span-6'>
                                    <p className='text-primary_color'>{formattedKey}:</p>
                                    <input type="text" value={value} className='w-full rounded-lg bg-input_bg p-3' />
                                </div>
                            );
                        })
                    }


                </div>
                <div className='flex justify-end items-end  my-10 w-1/2  ' >
                    <div className='flex justify-center items-end gap-3' >
                        <span className='text-sm'>
                            Reset
                        </span>
                        <button className='bg-primary_color text-sm px-12 py-2 rounded-lg text-white' >
                            Update
                        </button>
                    </div>

                </div>

            </div>
        </WebsiteContentLayout>
    );
};

export default Locations;
