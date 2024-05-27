

"use client"
import React from 'react';
import WebsiteContentLayout from './Layout';
import { Button, Label, Select } from "flowbite-react";
import { fetchHeroSectionContent, updateHeroSectionContent } from '@/utils/supabase/data_services/data_services';
import { useSingleRowDataHandle } from '@/hooks/useSingleRowDataHandle'
import { Select_Dropdown } from '@/components/Select_Dropdown'
import { home_section_options, langage_list_options } from '@/utils/list_options/dropdown_list_options'
const Home = () => {

    const {
        default_data,
        data,
        is_edited,
        update_loading,
        selected_language,
        select_language_handle,
        on_change_handle,
        handle_update,
        reset_fields
    } = useSingleRowDataHandle(fetchHeroSectionContent, updateHeroSectionContent);



    const select_section_handle = (val) => {

        console.log(language)

    }

    return (
        <WebsiteContentLayout>
            <div className='mb-5 px-3' >
                <div className='grid grid-cols-5 lg:flex-row lg:gap-24 my-5'>

                    <Select_Dropdown value={''} label='Section' options_arr={home_section_options} on_change_handle={select_section_handle} required={true} />
                    <Select_Dropdown value={selected_language} label='Language' options_arr={langage_list_options} on_change_handle={select_language_handle} required={true} />
                </div>
                <div className="border-t my-3 border-black"></div>
                <div className='px-3 w-1/2 space-y-5'>
                    <h6 className='text-primary_color font-bold'>Content</h6>
                    <div>
                        <p className='text-primary_color'>Title :</p>
                        <input
                            value={data?.title}
                            type="text"
                            className='w-full  p-3 rounded-lg bg-input_bg'
                            onChange={(e) => on_change_handle('title', e.target.value)}
                        />
                    </div>
                    <div>
                        <p className='text-primary_color'>Text :</p>
                        <textarea
                            // defaultValue={default_data?.content}
                            className='rounded-lg w-full  bg-input_bg resize-none outline-none border-none'
                            rows={8} cols={51}
                            value={data?.content}
                            onChange={(e) => on_change_handle('content', e.target.value)}
                        ></textarea>
                    </div>
                    <div className='flex justify-end' >
                        <div className='flex items-end gap-2 ' >
                            <button onClick={reset_fields}>
                                <span className='text-sm underline' >
                                    Reset
                                </span>
                            </button>
                            <Button onClick={handle_update} isProcessing={update_loading} disabled={!is_edited || update_loading} className='bg-primary_color px-3'>
                                <span className='text-sm' >
                                    Update
                                </span>
                            </Button>

                        </div>
                    </div>
                </div>
            </div>
        </WebsiteContentLayout>
    );
}
export default Home;
