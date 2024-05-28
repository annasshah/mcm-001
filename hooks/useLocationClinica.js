const { useEffect, useState } = require("react");
import { fetchLocations } from '@/utils/supabase/data_services/data_services'



export function useLocationClinica() {


    const [locations, setLocations] = useState([])
    const [selected_location, setSelected_location] = useState('')




    const set_location_handle = (value) => {
        setSelected_location(value);

    };






    useEffect(() => {
        !(async function fetch_data() {
            const data = await fetchLocations()
            setLocations(data);
        })()

    }, []);



    return { locations, set_location_handle, selected_location }



}