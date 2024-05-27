"use client"
import React from 'react';
import WebsiteContentLayout from '../Layout';
import { Rating, RatingStar, Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser } from "react-icons/hi";
import { langage_list_options } from '@/utils/list_options/dropdown_list_options';
import { Select_Dropdown } from '@/components/Select_Dropdown';

const Testimonials = () => {


    const customTheme = {
        root: {
            base: "bg-none overflow-y-auto",
            inner: `bg-none overflow-y-auto flex flex-col justify-between h-full pr-3`,
        },
    };
    return (
        <WebsiteContentLayout>
            <div className='mb-5 px-3' >
                <div className='grid grid-cols-4 gap-6 my-5'>

                    <Select_Dropdown value={''} label='Section' 
                    options_arr={[{
                        value: '',
                        label: '1',
                    }]} 
                    // on_change_handle={select_section_handle} 
                    required={true} />
                    <Select_Dropdown 
                    // on_change_handle={select_language_handle}
                    // value={selected_language}
                    label='Language' 
                    options_arr={langage_list_options} 
                     required={true} />
                </div>
                <div className="border-t my-3 border-black"></div>
                <div className='px-3 flex flex-col gap-5'>
                    <h6 className='text-primary_color'>Content</h6>
                    <div>
                        <p className='text-primary_color'>Rating :</p>
                        <Rating size="lg">
                            <RatingStar />
                            <RatingStar />
                            <RatingStar />
                            <RatingStar />
                            <RatingStar filled={false} />
                        </Rating>

                    </div>
                    <div>
                        <p className='text-primary_color'>Text :</p>
                        <textarea name=""

                            className='rounded-lg bg-input_bg resize-none outline-none border-none' rows={8} cols={51}></textarea>
                    </div>
                    <div>
                        <p className='text-primary_color'>Name :</p>
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

export default Testimonials;
