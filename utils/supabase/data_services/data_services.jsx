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
  let query = supabase
    .from('Appoinments')
    .select(`*,location:Locations (
      id,
      title,
      address
    )`);

  if (locationId) {
    query = query.eq('location_id', locationId);
  }

  const { data, error } = await query;

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }

  return data;
}







export async function fetch_content_service({ table, language = '', selectParam = '' }) {
  let query = supabase
    .from(`${table}${language}`)
    .select(`*${selectParam ? selectParam : ''}`);
  const { data, error } = await query;
  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
  return data;
}


export async function update_content_service({ table, language, post_data, matchKey = 'id' }) {
  // console.log({ language, post_data, section })
  const id = post_data[matchKey]
  delete post_data[matchKey]
  const { data, error } = await supabase

    .from(`${table}${language}`)
    .update(post_data)
    .eq(matchKey, id)
    .select()
  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }

  return data;
}



export async function create_content_service({ table, language, post_data }) {

  let query = supabase
    .from(`${table}${language}`)
    .insert([
      post_data
    ])
    .select()

  const { data, error } = await query;



  return { data, error }
}


export async function delete_appointment_service(id) {
  const query = await supabase
    .from('Appoinments')
    .delete()
    .eq('id', id)

  const { data, error } = await query;



  return { data, error }


}
export async function delete_content_service({ table, keyByDelete = 'id', id }) {
  const query = await supabase
    .from(table)
    .delete()
    .eq(keyByDelete, id)

  const { data, error } = await query;



  return { data, error }
}



export async function update_appointment_service(id, value) {
  const query = await supabase
    .from('Appoinments')
    .update({ date_and_time: value })
    .eq('id', id)
    .select('*')




  const { data, error } = await query;



  return { data, error }
}


