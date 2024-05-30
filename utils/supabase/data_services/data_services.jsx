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
      title
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



export async function fetchHeroSectionContent(language) {
  let query = supabase
    .from(`Hero_Section${language}`)
    .select(`*
      id,
      title,
      content
    `);



  const { data, error } = await query;

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }

  return data;
}



export async function updateHeroSectionContent(language, post_data) {
  const { data, error } = await supabase

    .from(`Hero_Section${language}`)
    .update({ title: post_data.title, content: post_data.content })
    .eq('id', post_data.id)
    .select()
  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }

  return data;
}





export async function fetch_about_content(language) {
  let query = supabase
    .from(`about${language}`)
    .select(`*`);



  const { data, error } = await query;

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }

  return data;
}




export async function fetch_testimonials(id) {
    let query = supabase
    .from('Testinomial')
    .select(`*,location:Locations (
      id,
      title
    )`);

  if (id) {
    query = query.eq('location_id', id);
  }




  const { data, error } = await query;

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }

  return data;
}



export async function fetch_careers(language) {
    let query = supabase
    .from(`career${language}`)
    .select(`*`);

  const { data, error } = await query;

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }

  return data;
}




export async function updateLocationData(id, post_data) {
  const { data, error } = await supabase

    .from(`Locations`)
    .update(post_data)
    .eq('id', post_data.id)
    .select()
  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }

  return data;
}
