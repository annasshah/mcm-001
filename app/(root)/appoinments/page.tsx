'use client'

import { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { IoMdArrowDropdown } from "react-icons/io";
import { delete_appointment_service, fetchAppointmentsByLocation, fetchLocations } from '@/utils/supabase/data_services/data_services'
import { Select, Spinner } from "flowbite-react";
import { useLocationClinica } from '@/hooks/useLocationClinica'
import Moment from 'moment';
import { supabase } from "@/services/supabase";
import { toast } from "react-toastify";
import moment from "moment";
import { Calendar, DatePicker, Input } from "antd";
import { Appointment_Edit_Modal } from "@/components/Appointment_Edit/Appointment_Edit_Modal";

export interface Location {
  id: number;
  title: string;
  address: string;
}

interface RenderDetailKey {
  label: string
  key: keyof Appointment | 'location'
}

export interface Appointment {
  id: number;
  email_Address: string;
  date_and_time: string;
  address: string;
  location_id: number;
  first_name: string;
  dob: string;
  last_name: string;
  service: string;
  sex: string;
  phone: string;
  created_at: string;
  location?: Location;
  in_office_patient: boolean;
  new_patient: boolean;
}

export interface LocationInterface {
  id: number;
  created_at: string;
  phone: string;
  direction: string;
  email: string;
  address: string;
  mon_timing: string;
  tuesday_timing: string;
  wednesday_timing: string;
  thursday_timing: string;
  friday_timing: string;
  saturday_timing: string;
  sunday_timing: string;
  title: string;
  Group: string;
}

interface RenderDetailFields {
  label: string
  key: string,
  type?: string,
  date_format?: boolean
}

const render_detail_keys: RenderDetailFields[] = [
  {
    label: 'First Name',
    key: 'first_name'
  },
  {
    label: 'Last Name',
    key: 'last_name'
  },
  {
    label: 'Email Address',
    key: 'email_Address'
  },
  {
    label: 'D.O.B',
    key: 'dob'
  },
  {
    label: 'Sex',
    key: 'sex'
  },
  {
    label: 'Service',
    key: 'service'
  },
  {
    label: 'Location',
    key: 'location'
  },
  {
    label: 'Phone',
    key: 'phone'
  },
  {
    label: 'Address',
    key: 'address'
  },
  {
    label: 'Date slot',
    key: 'date_and_time',
    type: 'date_slot'

  },
  {
    label: 'Time slot',
    key: 'date_and_time',
    type: 'time_slot'

  },
  {
    label: 'Created at',
    key: 'created_at',
    date_format: true
  },
]


const List_Item = ({ data, click_handle, is_selected }: { data: any, click_handle: Function, is_selected: Boolean | null }) => {
  const { id, first_name, last_name, service, sex } = data

  const formattedDateTime = () => {

    const str = (data.date_and_time).split('|')[1].split(' - ')

    const date = str[0]
    const time = str[1]

    return `${date} ${time}`
  }


  return <div onClick={() => click_handle(data)} className={`${is_selected ? 'bg-text_primary_color' : 'bg-[#D9D9D9]'}   px-3 py-3 rounded-lg flex justify-between cursor-pointer pointer-events-auto`}>
    <div>
      <h1 className={`${is_selected ? 'text-white' : 'text-text_primary_color'}  font-bold text-xl`}>
        {`${data.first_name || '-'} ${data.last_name || '-'}`}
      </h1>
      <p className="text-primary_color text-lg">{service || '-'}</p>
    </div>
    <div className="text-end">
      <h3 className={`${is_selected ? 'text-white' : 'text-text_primary_color'} font-normal text-lg`}>
        {sex || '-'}
      </h3>
      {data.date_and_time && <h3 className={`${is_selected ? 'text-white' : 'text-text_primary_color'} font-normal text-xs`}>
        {/* 2024-06-28 21:28:52.532542+00 */}
        Appointment: {moment(formattedDateTime(), 'DD-MM-YYYY h:mm A').fromNow()}
      </h3>}
    </div>
  </div>
}



const Appoinments = () => {

  const { locations } = useLocationClinica()
  const [allAppointments, setAllAppointments] = useState<Appointment[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [appoint_loading, setAppoint_loading] = useState<boolean>(true)
  const [appointment_details, setAppointment_details] = useState<Appointment | null>(null)



  useEffect(() => {
    setAppoint_loading(true)

      ; (async function getLocations() {
        const data = await fetchLocations()
        const appoint_data:any = await fetchAppointmentsByLocation(null)
        setAllAppointments(appoint_data)
        setAppointments(appoint_data)
        setAppoint_loading(false)
        // console.log(data)
      })()

  }, [])



  const select_change_handle = async (e: any) => {
    const value = e.target.value
    setAppointment_details(null)
    setAppoint_loading(true)
    const data:any = await fetchAppointmentsByLocation(value)
    setAllAppointments(data)
    setAppointments(data)
    setAppoint_loading(false)
    // console.log(data)
  }

  const find_locations = (location_id: number) => {
    const find_location = locations.find((location: LocationInterface) => location.id === location_id)
    return find_location
  }

  const select_for_details_handle = (appoint: any) => {
    console.log(find_locations(appoint.location_id))

    setAppointment_details(appoint)
  }




  const delete_appointments_handle = async (delId: number) => {
    const { error } = await delete_appointment_service(delId)
    if (!error) {
      setAppointments(appointments.filter((appoint: any) => appoint.id !== delId))
      setAllAppointments(appointments.filter((appoint: any) => appoint.id !== delId))
      toast.success('Deleled successfully');
      setAppointment_details(null)
    }
    else if (error) {
      console.log(error.message)
      toast.error(error.message);
    }
  }

  const filterHandle = (e: Date | null) => {

    if (e) {
      const dateToStr = e.toString()
      const dateToMoment = moment(dateToStr).format('YYYY-MM-DD')


      const filteredAppointments = allAppointments.filter((appoint: any) => {

        if (appoint.date_and_time) {
          const str = appoint.date_and_time.split('|')[1].split(' - ')[0]
          const formattedDate = moment(str, 'DD-MM-YYYY').format('YYYY-MM-DD')
          return formattedDate === dateToMoment

        }




      })
      setAppointments(filteredAppointments)
    }
    else {
      setAppointments(allAppointments)
    }

    setAppointment_details(null)


  }







  const update_reflect_on_close_modal = (new_date_time: string) => {

    setAllAppointments((all_available) => {
      return all_available.map((elem) => {
        if (elem.id === appointment_details?.id) {
          return { ...elem, date_and_time: new_date_time }
        }
        return elem
      })
    })
    setAppointments((all_available) => {
      return all_available.map((elem) => {
        if (elem.id === appointment_details?.id) {
          return { ...elem, date_and_time: new_date_time }
        }
        return elem
      })
    })

    setAppointment_details((pre_details) => {

      if (pre_details) {
        return { ...pre_details, date_and_time: new_date_time }
      }
      else return pre_details
    })

  }



  return (
    <main className=" mt-20 w-full h-full text-[#B6B6B6] font-[500] text-[20px] space-y-5">



      <div className="flex justify-end items-end ps-3 gap-3 ">

        <div className="w-1/4 ">
          <div >
            <DatePicker onChange={filterHandle} className="bg-[#D9D9D9] py-2 w-full" placeholder="Filter by date appointment" />

          </div>
        </div>
        <div className="w-1/4 ">
          <div >
            <Select onChange={select_change_handle} style={{ backgroundColor: '#D9D9D9' }} id="locations" required>
              <option disabled selected value=''>All locations</option>
              {locations.map((location: any, index: any) => <option key={index} value={location.id}>{location.address}</option>)}
            </Select>

          </div>
        </div>

      </div>


      <div className="flex flex-row  h-[80vh] space-x-5 ">

        <div className="w-3/4 bg-[#EFEFEF] overflow-scroll px-3 py-3 rounded-lg space-y-5">


          {appoint_loading ? <div className="flex h-full flex-1 flex-col justify-center items-center">
            <Spinner size='xl' />


          </div> : appointments.length === 0 ? <div className="flex h-full flex-1 flex-col justify-center items-center">
            <h1>No Appointment is available</h1>
          </div> : appointments.map((appointment: Appointment, index: any) => <List_Item is_selected={appointment_details && appointment_details.id === appointment.id} click_handle={select_for_details_handle} key={index} data={appointment} />)}


        </div>
        <div className="w-1/4 bg-[#EFEFEF] overflow-scroll px-3 py-3 rounded-lg text-lg ">


          {appointment_details ?
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-end space-x-5 text-black">
                <div className="flex items-center space-x-1 text-base">
                  <GoDotFill />
                  <p>
                    {appointment_details.new_patient ? 'New Patient' : '-'}
                  </p>
                </div>
                <div className="flex items-center space-x-1 text-sm">
                  <GoDotFill />
                  <p>
                    {appointment_details.in_office_patient ? 'In-Office' : '-'}
                  </p>
                </div>
              </div>

              <div className=" font-semibold space-y-4 flex-1 text-black">
                {render_detail_keys.map((elem, index: any) => {
                  const key: string = elem.key
                  return <h1 key={index}>{elem.label}: <span className="font-normal">{elem.date_format ? Moment(appointment_details['created_at']).format('LLL') : elem.type === 'date_slot' && appointment_details?.date_and_time ? appointment_details?.date_and_time?.split('|')?.[1]?.split(' - ')[0] : elem.type === 'time_slot' && appointment_details?.date_and_time ? appointment_details?.date_and_time?.split('|')?.[1]?.split(' - ')[1] : elem.key === 'location' ? appointment_details?.location?.address : appointment_details ? appointment_details[key as keyof typeof Appoinments] : '-'}</span></h1>
                })}
              </div>

              <div className="w-full flex mt-3 gap-3">
                <button onClick={() => delete_appointments_handle(appointment_details.id)} className="border-red-700 flex-1 text-red-700 border-2 active:opacity-60 rounded-md px-4 py-1 hover:bg-text_primary_color_hover">Delete</button>
                <Appointment_Edit_Modal default_data_time={appointment_details.date_and_time} update_available_data={update_reflect_on_close_modal} appointment_details={appointment_details} location_data={find_locations(appointment_details.location_id)!} />
              </div >
            </div>
            : <div className="flex h-full flex-1 flex-col justify-center items-center">
              <h1>Select appointment to view details</h1>
            </div>}
        </div>


      </div>






    </main>
  );
};

export default Appoinments;
