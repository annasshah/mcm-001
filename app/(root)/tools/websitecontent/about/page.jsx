"use client"
import React from 'react';
import WebsiteContentLayout from '@/app/(root)/tools/websitecontent/Layout';
import { Button, Label, Select } from "flowbite-react";
import { useSingleRowDataHandle } from '@/hooks/useSingleRowDataHandle'
import { Select_Dropdown } from '@/components/Select_Dropdown'
import { about_section_options, langage_list_options } from '@/utils/list_options/dropdown_list_options'
import { fetch_about_content } from '@/utils/supabase/data_services/data_services';



const fields = {
    text: ({ value, on_change_handle, label }) => {
        return (
            <div className='flex flex-col space-y-2'>
                {/* <Label>{label}</Label> */}
                <textarea
                    // defaultValue={default_data?.content}
                    className='rounded-lg w-full  bg-input_bg resize-none outline-none border-none'
                    rows={8} cols={51}
                    value={value}
                    onChange={(e) => on_change_handle(label, e.target.value)}
                />
            </div>
        )
    },
    title: ({ value, on_change_handle, label }) => {
        return <div className='flex flex-col space-y-2'>
            {/* <Label>{label}</Label> */}
            <input type='text' className='w-full' value={value} onChange={(e) => on_change_handle(label, e.target.value)} />
        </div>

    },
    image: ({ value, on_change_handle, label }) => {
        return <div className='flex flex-col space-y-2'>
        {/* <Label>{label}</Label> */}
        <img className='w-1/2' src="https://vsvueqtgulraaczqnnvh.supabase.co/storage/v1/object/public/Aboutus_images/image%201.svg?t=2024-03-17T13%3A01%3A13.546Z"  />
    </div>

    }
}
const About = () => {

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
    } = useSingleRowDataHandle({fetch_content_function:fetch_about_content});


    console.log({ data })


    const select_section_handle = (val) => {


    }

    return (
        <WebsiteContentLayout>
            <div className='mb-5 px-3' >
                <div className='grid grid-cols-5 lg:flex-row lg:gap-24 my-5'>

                    <Select_Dropdown value={''} label='Section' options_arr={about_section_options} on_change_handle={select_section_handle} required={true} />
                    <Select_Dropdown value={selected_language} label='Language' options_arr={langage_list_options} on_change_handle={select_language_handle} required={true} />
                </div>
                <div className="border-t my-3 border-black"></div>
                <div className='px-3 w-1/2 space-y-5'>
                    <h6 className='text-primary_color font-bold'>Content</h6>


                    <div className='space-y-8'>
                    {data &&
                        Object.keys(data).map((field, key) => {
                            const field_type = field.split('_')

                            const Field_To_Render = fields[field_type[0]]

                            if(Field_To_Render){
                                return (
                                    <div key={key} className='space-y-3'>
                                        <p className='text-primary_color'>{field_type.join(' ')} :</p>
                                        <Field_To_Render
                                            value={data[field]}
                                            label={field}
                                            // className='w-full  p-3 rounded-lg bg-input_bg'
                                            on_change_handle={on_change_handle}
                                        />
                                    </div>
                                )

                            }

                        })
                    }
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
export default About;
