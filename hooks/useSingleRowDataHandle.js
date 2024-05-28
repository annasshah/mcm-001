import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

function useSingleRowDataHandle({fetch_content_function, update_content_function, initial_language = '', list_data}) {
    const [default_data, set_default_data] = useState(null);
    
    const [data_list, setData_list] = useState([])
    const [data, set_data] = useState(null);
    const [is_edited, set_is_edited] = useState(false);
    const [update_loading, set_update_loading] = useState(false);
    const [selected_language, set_selected_language] = useState(initial_language);

    const select_language_handle = (language) => {
        const lan = language.target.value;
        set_selected_language(lan);
        set_is_edited(false);

    };

    const on_change_handle = (field, val) => {
        set_is_edited(true);
        set_data(prev => ({
            ...prev,
            [field]: val
        }));
    };


    const fetch_handle = (val) => {
        if (fetch_content_function) {
            async function fetch_data() {
                const fetched_data = await fetch_content_function(val || selected_language);
                if (list_data) {
                    setData_list(fetched_data)
                }
                else {
                    set_default_data(fetched_data[0]);
                    set_data(fetched_data[0]);
                }
            }
            fetch_data();
        }

    }


    const fetch_data_by_parameter = (val) => {
        fetch_handle(val)
    }

    const handle_update = async () => {
        if (update_content_function) {
            set_update_loading(true);
            const res_data = await update_content_function(selected_language, data);
            if (res_data?.length) {
                toast.success('Updated successfully');
            }
            console.log(res_data);
            set_default_data(res_data[0]);
            set_update_loading(false);
            set_is_edited(false);
        }
    };

    const reset_fields = () => {
        set_is_edited(false);
        set_data(default_data);
    };



    

    useEffect(() => {

        fetch_handle(selected_language);

    }, [selected_language, fetch_content_function]);

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
        reset_fields
    };
}


export { useSingleRowDataHandle };
