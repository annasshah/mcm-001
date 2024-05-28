"use client"
import React from 'react';
import WebsiteContentLayout from '../Layout';
import { Rating, RatingStar, Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiChartPie, HiInbox, HiShoppingBag, HiTable, HiUser } from "react-icons/hi";
import PlusIcon from "@/assets/images/Logos/plus-icon.png"
import Image from 'next/image';
import { Select_Dropdown } from '@/components/Select_Dropdown';
import { useSingleRowDataHandle } from '@/hooks/useSingleRowDataHandle';
import { fetch_careers } from '@/utils/supabase/data_services/data_services';
import { langage_list_options } from '@/utils/list_options/dropdown_list_options';
const Career = () => {


    const {
        default_data,
        data_list,
        data,
        is_edited,
        update_loading,
        selected_language,
        select_language_handle,
        on_change_handle,
        handle_update,
        reset_fields,
        fetch_data_by_parameter
    } = useSingleRowDataHandle({ fetch_content_function: fetch_careers, list_data: true });


    console.log(data_list)




    return (
        <WebsiteContentLayout>
            <div className='mb-5 px-3' >
                <div className='flex items-end my-5'>


                    <div className='flex flex-1'>

                        <div className='flex w-2/5 items-end justify-center gap-4'>
                            <div className='flex flex-1'>
                            <Select_Dropdown
                                value={''} label='ID' start_empty={true} options_arr={data_list.map(({ id, }) => ({ value: id, label: id }))}
                                // on_change_handle={select_section_handle} 
                                required={true} />
                            </div>
                            
                            <div className='flex flex-1'>
                            <Select_Dropdown value={selected_language} label='Language' options_arr={langage_list_options} on_change_handle={select_language_handle} required={true} />
                            </div>
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


                    <div>
                        {data_list.map((career,  ind) => {

                            const { Text } = career
                            return <div key={ind} className='border-t my-3 bg-slate-200 hover:bg-slate-300 rounded-lg px-4 py-4 cursor-pointer'>
                                <p>{Text}</p>

                            </div>
                        })
                        }
                    </div>

                </div>
            </div>
        </WebsiteContentLayout>
    );
};

export default Career;
