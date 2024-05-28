"use client"
import React from 'react';
import WebsiteContentLayout from '../Layout';
import { Select_Dropdown } from '@/components/Select_Dropdown';
import { useLocationClinica } from '@/hooks/useLocationClinica';
import { fetch_testimonials } from '@/utils/supabase/data_services/data_services';
import { useSingleRowDataHandle } from '@/hooks/useSingleRowDataHandle';
import {Render_Rating} from '@/components/Rating_Component/Render_Rating'


const Testimonials = () => {

    const { locations, set_location_handle, selected_location } = useLocationClinica()


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
    } = useSingleRowDataHandle({ fetch_content_function: fetch_testimonials, list_data: true });


    const select_location_handle = (val) => {
        const value = val.target.value
        set_location_handle(value)
        fetch_data_by_parameter(value)
    }



    return (
        <WebsiteContentLayout>
            <div className='mb-5 px-3' >
                <div className='grid grid-cols-5 lg:flex-row lg:gap-24 my-5'>

                    <Select_Dropdown
                        value={''} label='ID' start_empty={true} options_arr={data_list.map(({ id, }) => ({ value: id, label: id }))}
                        // on_change_handle={select_section_handle} 
                        required={true} />
                    <Select_Dropdown
                        value={selected_location} label='Locations' start_empty={true} options_arr={locations.map(({ id, title }) => ({ value: id, label: title }))}
                        on_change_handle={select_location_handle}
                        required={true} />
                </div>
                <div className="border-t my-3 border-black"></div>




                <div>
                    {data_list.map(({ name, rating, review },ind) => {

                        return <div key={ind} className="border-t my-3 bg-slate-200 hover:bg-slate-300 rounded-lg px-4 py-4 cursor-pointer">
                            <ul className='space-y-3'>
                                <li className='text-primary_color font-bold text-xl'>{name}</li>
                                <li className='text-primary_color'><Render_Rating rating={rating} /> </li>
                                <li className='text-primary_color'>{review}</li>
                            </ul>
                        </div>
                    })}
                </div>

            </div>
        </WebsiteContentLayout>
    );
};

export default Testimonials;
