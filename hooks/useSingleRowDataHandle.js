import { create_content_service, fetch_content_service, update_content_service } from '@/utils/supabase/data_services/data_services';
import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function useSingleRowDataHandle({

    // fetch_content_function,
    // update_content_function,
    // create_content_function,
    
    initial_language = '', list_data, default_selected_section = '', list_item_section = [],  table }) {
    const [default_data, set_default_data] = useState(null);
    console.log(default_selected_section, table)

    const [data_list, setData_list] = useState([])
    const [data, set_data] = useState(null);
    const [is_edited, set_is_edited] = useState(false);
    const [update_loading, set_update_loading] = useState(false);
    const [selected_language, set_selected_language] = useState(initial_language);
    const [selected_section, setSelected_section] = useState(table)
    const [selected_list_id, setselected_list_id] = useState(1)
    const [create_row_language, setCreate_row_language] = useState('')



    const [create_data, setCreate_data] = useState({})
    const [create_data_loading, setCreate_data_loading] = useState(false)
    const [create_modal_open, setCreate_modal_open] = useState(false)




    const open_modal = () => {
        setCreate_modal_open(true)
    }


    const create_new_row_language_handle = (language) => {
        const lan = language.target.value;
        setCreate_row_language(lan)

    };


    const close_modal = () => {
        setCreate_data(prev => ({}))
        setCreate_modal_open(false)
        setCreate_data_loading(false)
        setCreate_row_language('')
    }


    const create_content_handle = () => {


        if (create_content_service) {
            setCreate_data_loading(true)
            async function create_row_handle() {
                const res_data = await create_content_service({ table:selected_section, language:create_row_language, post_data:create_data  });

                if (res_data?.length) {
                    toast.success('Created successfully');
                    close_modal()
                    setCreate_data_loading(false)
                }
            }
            create_row_handle();
        }


    }



    const change_selected_list_id = (e) => {
        const value = e.target.value

        setselected_list_id(value)
        const find_data = data_list.find((elem) => elem.id == value)
        set_data(find_data)
        set_is_edited(false)

    }

    const select_language_handle = (language) => {
        const lan = language.target.value;
        set_selected_language(lan);
        set_is_edited(false);

    };

    const on_change_handle = (field, val) => {
        if (create_modal_open) {
            setCreate_data(prev => ({
                ...prev,
                [field]: val
            }))
        }
        else {
            set_is_edited(true);
            set_data(prev => ({
                ...prev,
                [field]: val
            }));
        }
    };


    const fetch_handle = (val) => {
        if (fetch_content_service) {
            async function fetch_data() {
                const fetched_data = await fetch_content_service({ table: selected_section, language: selected_language });
                if (list_data || list_item_section.includes(selected_section)) {
                    setData_list(fetched_data)
                    setselected_list_id(fetched_data[0].id)
                }
                // else {
                set_default_data(fetched_data[0]);
                set_data(fetched_data[0]);
                // }
            }
            fetch_data();
        }

    }


    const fetch_data_by_parameter = (val) => {
        fetch_handle(val)
    }

    const handle_update = async () => {
        if (update_content_service) {
            set_update_loading(true);
            const res_data = await update_content_service({table:selected_section, language:selected_language, post_data:data});
            if (res_data?.length) {
                toast.success('Updated successfully');
            }
            console.log(res_data);
            set_default_data(res_data[0]);
            set_update_loading(false);
            set_is_edited(false);
        }
    };

    const reset_fields = (all) => {
        set_is_edited(false);
        set_data(default_data);
        if (all === true) {
            set_default_data(() => null)
            set_data(() => null)
        }
    };





    useEffect(() => {
        reset_fields(true);
        fetch_handle(selected_language);

    }, [selected_language, fetch_content_service, selected_section]);

    return {
        default_data,
        data,
        data_list,
        is_edited,
        update_loading,
        selected_language,
        fetch_data_by_parameter,
        select_language_handle,
        on_change_handle,
        handle_update,
        selected_section,
        selected_list_id,
        change_selected_list_id,
        setSelected_section,
        create_modal_open,
        create_data,
        create_data_loading,
        create_content_handle,
        create_row_language,
        create_new_row_language_handle,
        open_modal,
        close_modal,
        reset_fields,
    };
}


export { useSingleRowDataHandle };
