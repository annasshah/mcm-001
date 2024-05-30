"use client"
import React from 'react';
import WebsiteContentLayout from '../Layout';
import { Button, Rating, RatingStar, Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser } from "react-icons/hi";

import PlusIcon from "@/assets/images/Logos/plus-icon.png"
import Image from 'next/image';
import { Select_Dropdown } from '@/components/Select_Dropdown';
import { useLocationClinica } from '@/hooks/useLocationClinica';
import { Custom_Modal } from '@/components/Modal_Components/Custom_Modal';

const Locations = () => {




    const inputLabelandValue = [
        {
            label: "Title",
            key: "title"
        },
        {
            label: "Monday_to_Friday_Timing",
            key: "mon_timing"
        },
        {
            label: 'Phone',
            key: "phone"
        },
        {
            label: "Saturday Timing",
            key: "saturday_timing"
        },
        {
            label: "Direction",
            key: "direction",
            col_span: "2"
        },
        {
            label: 'Email',
            key: "email"
        },
        {
            label: "Sunday Timing",
            key: "sunday_timing"
        },
        {
            label: 'Address',
            key: "address",
            col_span: "2"
        },
    ];


    const { locations, set_location_handle, selected_location, change_data, reset_state, is_edited, update_loading, on_change_handle, handle_update } = useLocationClinica()


    return (
        <WebsiteContentLayout>
            <div className='mb-5 px-3' >

                <div className='flex items-end  justify-between p-0 my-5'>
                    <div className='w-1/2' >
                        <Select_Dropdown
                            value={selected_location} label='Locations' start_empty={true} options_arr={locations.map(({ id, title }) => ({ value: id, label: title }))}
                            on_change_handle={(e) => set_location_handle(e.target.value)}
                            required={true} />

                    </div>
                    {/* <button >
                        <Image
                            className="w-12"
                            src={PlusIcon}
                            alt="Logo"
                        />

                    </button> */}

                    <Custom_Modal Title='Create Location' >
                    <div className='grid grid-cols-2 gap-4'>
                    {
                        inputLabelandValue.map((item, index) => {
                            const { key, label, col_span } = item
                            const formattedKey = label.replace(/_/g, " ");
                            const is_disabled = update_loading || !change_data
                            return (
                                <div key={index} className={col_span ? `col-span-2` : ''}>
                                    <p className='text-primary_color'>{formattedKey}:</p>
                                    <input 
                                    // disabled={is_disabled} onChange={(e)=>on_change_handle(key,e.target.value)}
                                     type="text" 
                                    //  value={change_data ? change_data[key] : ''}
                                      className={`w-full rounded-lg bg-input_bg p-3 ${ is_disabled && 'text-gray-500'}`} />
                                </div>
                            );
                        })
                    }
                    </div>

                    </Custom_Modal>
                </div>


                <div className="border-t my-3 border-black"></div>
                <div className='px-3 grid grid-cols-12 gap-5'>
                    <h6 className='col-span-12 text-primary_color'>Content</h6>
                    {
                        inputLabelandValue.map((item, index) => {
                            const { key, label } = item
                            const formattedKey = label.replace(/_/g, " ");
                            const is_disabled = update_loading || !change_data
                            return (
                                <div key={index} className='col-span-6'>
                                    <p className='text-primary_color'>{formattedKey}:</p>
                                    <input disabled={is_disabled} onChange={(e)=>on_change_handle(key,e.target.value)} type="text" value={change_data ? change_data[key] : ''} className={`w-full rounded-lg bg-input_bg p-3 ${ is_disabled && 'text-gray-500'}`} />
                                </div>
                            );
                        })
                    }


                </div>
                <div className='grid grid-cols-2 mt-4' >
                    <div className='flex justify-end gap-2 me-2' >
                        <button onClick={reset_state}>
                            <span className='text-sm underline' >
                                Reset
                            </span>
                        </button>
                        <Button 
                        onClick={handle_update}
                         isProcessing={update_loading} disabled={!is_edited || update_loading}
                         className='bg-primary_color px-3'>
                            <span className='text-sm' >
                                Update
                            </span>
                        </Button>

                    </div>
                </div>

            </div>
        </WebsiteContentLayout>
    );
};

export default Locations;
