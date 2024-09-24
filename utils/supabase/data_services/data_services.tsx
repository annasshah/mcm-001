import { supabase } from "@/services/supabase"

// data.js

interface MatchCaseInterface {
  key: string;
  value: string | number;
}

interface FetchContentServiceInterface {
  table: string;
  language?: string;
  selectParam?: string
  matchCase?: MatchCaseInterface | null
}
interface UpdateContentServiceInterface {
  table: string;
  language?: string;
  post_data: any
  matchKey?: string;
}
interface CreateContentServiceInterface {
  table: string;
  language?: string;
  post_data: any
  multiple_rows?: boolean;
}
interface DeleteContentServiceInterface {
  table: string;
  language?: string;
  keyByDelete: string;
  id: string | number;
}


export async function fetchLocations() {
  const { data, error } = await supabase
    .from('Locations')
    .select('*')

  if (error) {
    throw new Error(error.message)
  }

  return data
}


export async function fetchAppointmentsByLocation(locationId: number) {
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




export async function fetch_content_service({ table, language = '', selectParam = '', matchCase = null }: FetchContentServiceInterface) {
  let query = supabase
    //  @ts-ignore
    .from(`${table}${language}`)
    .select(`*${selectParam ? selectParam : ''}`)

  if (matchCase) {
    query = query.eq(matchCase.key, matchCase.value)
  }
  const { data, error } = await query;
  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
  return data;
}


export async function update_content_service({ table, language = '', post_data, matchKey = 'id' }: UpdateContentServiceInterface) {
  // console.log({ language, post_data, section })
  const id = post_data[matchKey]
  delete post_data[matchKey]
  const { data, error } = await supabase
    //  @ts-ignore
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


export async function updateLocationData(id: number, post_data: any) {
  const { data, error } = await supabase
    .from(`Locations`)
    .update(post_data)
    .eq('id', id)
    .select()
  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }

  return data;
}



export async function create_content_service({ table, language = '', post_data, multiple_rows = false }: CreateContentServiceInterface) {

  let query = supabase
    //  @ts-ignore
    .from(`${table}${language}`)
    .insert(multiple_rows ? [...post_data] : [
      post_data
    ])
    .select()

  const { data, error } = await query;



  return { data, error }
}


export async function delete_appointment_service(id: number) {
  const query = await supabase
    .from('Appoinments')
    .delete()
    .eq('id', id)

  const { data, error } = await query;



  return { data, error }


}
export async function delete_content_service({ table, keyByDelete = 'id', id }: DeleteContentServiceInterface) {
  const query = await supabase
    // @ts-ignore
    .from(table)
    .delete()
    .eq(keyByDelete, id)

  const { data, error } = await query;



  return { data, error }
}



export async function update_appointment_service(id: number, value: string) {
  const query = await supabase
    .from('Appoinments')
    // @ts-ignore
    .update({ date_and_time: value })
    .eq('id', id)
    .select('*')




  const { data, error } = await query;



  return { data, error }
}


