import { supabase } from "@/services/supabase";

// data.js

export async function fetchLocations() {
  const { data, error } = await supabase.from("Locations").select("*");

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function create_location() {}

export async function updateLocationData(id, data) {}

export async function fetchAppointmentsByLocation(locationId) {
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

export async function fetch_content_service({ table, language }) {
  let query = supabase.from(`${table}${language}`).select(`*`);
  const { data, error } = await query;
  if (error) {
    console.log(error.message);
    throw new Error(error.message);
  }
  return data;
}

export async function update_content_service({ table, language, post_data }) {
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
}) {
  let query = supabase.from(`${table}${language}`).insert([post_data]).select();

  const { data, error } = await query;

  return { data, error };
}

// Update testimonial content
export async function update_testimonial_content(id, content) {
  const { data, error } = await supabase
    .from("Testimonials")
    .update({ content })
    .eq("id", id)
    .select();

  if (error) {
    console.log(error.message);
    return { data: null, error };
  }

  return { data, error: null };
}

// Create a new testimonial
export async function create_testimonials(testimonialData) {
  const { data, error } = await supabase
    .from("Testimonials")
    .insert([testimonialData])
    .select();

  if (error) {
    console.log(error.message);
    return { data: null, error };
  }

  return { data, error: null };
}

// Update Hero Section content
export async function updateHeroSectionContent(id, content) {
  const { data, error } = await supabase
    .from("HeroSection")
    .update(content)
    .eq("id", id)
    .select();

  if (error) {
    console.log(error.message);
    return { data: null, error };
  }

  return { data, error: null };
}

// Update About content
export async function update_about_content(id, data) {
  const { data: resultData, error } = await supabase
    .from("About")
    .update(data)
    .eq("id", id)
    .select();

  if (error) {
    console.log(error.message);
    return { data: null, error };
  }

  return { data: resultData, error: null };
}

// Create a new career entry
export async function create_career(careerData) {
  const { data, error } = await supabase
    .from("Careers")
    .insert([careerData])
    .select();

  if (error) {
    console.log(error.message);
    return { data: null, error };
  }

  return { data, error: null };
}

// Delete an appointment
export async function delete_appointment_service(id) {
  const { data, error } = await supabase
    .from("Appointments")
    .delete()
    .eq("id", id);

  if (error) {
    console.log(error.message);
    return { data: null, error };
  }

  return { data, error: null };
}

// Update a career entry
export async function update_career(id, data) {
  const { data: resultData, error } = await supabase
    .from("Careers")
    .update(data)
    .eq("id", id)
    .select();

  if (error) {
    console.log(error.message);
    return { data: null, error };
  }

  return { data: resultData, error: null };
}
