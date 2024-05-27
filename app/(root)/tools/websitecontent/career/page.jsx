"use client"
import React from 'react';
import WebsiteContentLayout from '../Layout';
import { Rating, RatingStar, Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser } from "react-icons/hi";
import PlusIcon from "@/assets/images/Logos/plus-icon.png"
import Image from 'next/image';
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
                <div className='flex  justify-between items-center p-0 my-5'>
                    <div className='flex gap-10'  >
                        <Sidebar

                            theme={customTheme}

                            className='h-auto ' >
                            <h6 className='text-primary_color'>ID</h6>
                            <Sidebar.Items    >
                                <Sidebar.ItemGroup className='bg-gray-200 rounded-lg'>
                                    <Sidebar.Collapse label="1" className='rounded'>
                                        {[...Array(5)].map((_, index) => (
                                            <Sidebar.Item key={index} href="#">Hero Section</Sidebar.Item>
                                        ))}
                                    </Sidebar.Collapse>
                                </Sidebar.ItemGroup>
                            </Sidebar.Items>
                        </Sidebar>
                        <Sidebar
                            theme={customTheme}

                            className='h-auto' aria-label="Sidebar with multi-level dropdown example">
                            <h6 className='text-primary_color'>Language</h6>
                            <Sidebar.Items>
                                <Sidebar.ItemGroup className='bg-gray-200 rounded-lg'>
                                    <Sidebar.Collapse label="Hero Section" className='rounded-lg'>
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
