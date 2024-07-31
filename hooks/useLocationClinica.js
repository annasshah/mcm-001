const { useEffect, useState } = require("react");
import { fetchLocations, updateLocationData } from '@/utils/supabase/data_services/data_services'
import { toast } from 'react-toastify';



export function useLocationClinica() {


    const [locations, setLocations] = useState([])
    
    const [selected_location, setSelected_location] = useState('')
    const [selected_location_data, setSelected_location_data] = useState(null)
    const [change_data, setChange_data] = useState(null)

    const [is_edited, set_is_edited] = useState(false);
    const [update_loading, set_update_loading] = useState(false);




    const set_location_handle = (value) => {
        setSelected_location(value);


        const data = locations.find(item => item.id == value)
        setSelected_location_data(data)
        setChange_data(data)

    };


    const reset_state = () => {
        setChange_data(selected_location_data)
    }



    const on_change_handle = (field, val) => {
        set_is_edited(true);
        setChange_data(prev => ({
            ...prev,
            [field]: val
        }));
    };


    const handle_update = async () => {
            set_update_loading(true);
            const res_data = await updateLocationData(change_data.id, change_data);
            if (res_data?.length) {
                toast.success('Updated successfully');
            }
            // console.log(res_data);
            setSelected_location_data(res_data[0]);
            set_update_loading(false);
            set_is_edited(false);
    };







    useEffect(() => {
        !(async function fetch_data() {
            const data = await fetchLocations()
            setLocations(data);
        })()

    }, []);



    return { locations, set_location_handle,selected_location_data,change_data, selected_location, reset_state, on_change_handle, is_edited, update_loading, handle_update }



}