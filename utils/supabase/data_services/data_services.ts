import { supabase } from "@/services/supabase";

// data.js

export async function fetchLocations() {
  const { data, error } = await supabase.from("Locations").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function fetchAppointmentsByLocation(locationId: any) {
  let query = supabase.from("Appoinments").select(`*,location:Locations (
      id,
      title
    )`);

  if (locationId) {
    query = query.eq("location_id", locationId);
  }

  const { data, error } = await query;

  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }

  return data;
}

export async function fetch_content_service({ table, language }: any) {
  let query = supabase.from(`${table}${language}`).select(`*`);
  const { data, error } = await query;
  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
  return data;
}

export async function update_content_service({
  table,
  language,
  post_data,
}: any) {
  console.log({ language, post_data, section });
  const { data, error } = await supabase

    .from(`${table}${language}`)
    .update(post_data)
    .eq("id", post_data.id)
    .select();
  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }

  return data;
}

export async function create_content_service({
  table,
  language: any,
  post_data,
}: any) {
  let query = supabase.from(`${table}${language}`).insert([post_data]).select();

  const { data, error } = await query;

  return { data, error };
}

export async function update_testimonial_content() {}

export async function create_testimonials() {}

export async function updateHeroSectionContent() {}
