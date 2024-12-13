

"use client"
import React from 'react';
import WebsiteContentLayout from './Layout';
import { Button, Label, Select, Toast } from "flowbite-react";
import { useSingleRowDataHandle } from '@/hooks/useSingleRowDataHandle'
import { Select_Dropdown } from '@/components/Select_Dropdown'
import { Form_Component } from '@/components/Form_Component'
import { home_section_options, langage_list_options } from '@/utils/list_options/dropdown_list_options'



const only_fields_to_render = {
    Hero_Section: ['title', 'content'],
    About_Short: ['content'],
    Mission: ['Title', 'Text']

}



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
        setSelected_section,
        selected_section,
        data_list,
        selected_list_id,
        change_selected_list_id,
        reset_fields
    } = useSingleRowDataHandle({
        default_selected_section: home_section_options[0].value, list_item_section: ['Mission'], table: 'Hero_Section',
        required_fields: []
    });



    const select_section_handle = (e: React.ChangeEvent<HTMLSelectElement>) => {

        setSelected_section(() => e.target.value)

    }


    return (
        <WebsiteContentLayout>
            <div className='mb-5 px-3' >
                <div className='grid grid-cols-5 lg:flex-row lg:gap-24 my-5'>

                    <Select_Dropdown value={selected_section} label='Section' options_arr={home_section_options} on_change_handle={select_section_handle} required={true} />
                    <Select_Dropdown value={selected_language} label='Language' options_arr={langage_list_options} on_change_handle={select_language_handle} required={true} />
                    {selected_section === 'Mission' && <Select_Dropdown value={selected_list_id} label='ID' options_arr={data_list.map((e) => ({ label: e.id, value: e.id }))} on_change_handle={change_selected_list_id} required={true} />}
                </div>
                <div className="border-t my-3 border-black"></div>
                <div className='px-3 w-1/2 space-y-5'>
                {/* @ts-ignore  */}
                    {data && <Form_Component reset_fields={reset_fields} handle_update={handle_update} is_edited={is_edited} update_loading={update_loading} data={data} render_list_fields={only_fields_to_render[selected_section]} on_change_handle={on_change_handle} />}

                </div>
            </div>
        </WebsiteContentLayout>
    );
}
export default Home;
