import { supabase } from "@/services/supabase"

// data.js

export async function fetchLocations() {
  const { data, error } = await supabase
    .from('Locations')
    .select('*')

  if (error) {
    throw new Error(error.message)
  }
  
  return data
}



export async function fetchAppointmentsByLocation(locationId) {
  const { data, error } = await supabase
    .from('Appoinments')
    .select(`*,location:Locations (
      id,
      title
    )`)
    .eq('location_id', locationId)

  if (error) {
    console.log(error.message)
    throw new Error(error.message)
  }

  return data
}
