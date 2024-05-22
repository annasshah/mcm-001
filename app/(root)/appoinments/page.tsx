'use client'

import { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import { IoMdArrowDropdown } from "react-icons/io";
import { fetchAppointmentsByLocation, fetchLocations } from '@/utils/supabase/data_services'
import { Select, Spinner } from "flowbite-react";


const render_detail_keys = [
  {
    label:'First Name',
    key:'first_name'
  },
  {
    label:'Last Name',
    key:'last_name'
  },
  {
    label:'Email Address',
    key:'email_Address'
  },
  {
    label:'D.O.B',
    key:'dob'
  },
  {
    label:'Sex',
    key:'sex'
  },
  {
    label:'Service',
    key:'service'
  },
  {
    label:'Location',
    key:'location'
  },
  {
    label:'Address',
    key:'address'
  },
]


const List_Item = ({ data, click_handle,is_selected }: { data: Object, click_handle:Function, is_selected:Boolean }) => {
  const { id, first_name, last_name, service, sex } = data


  return <div onClick={()=>click_handle(data)} className={`${is_selected ? 'bg-text_primary_color' : 'bg-[#D9D9D9]' }   px-3 py-3 rounded-lg flex justify-between cursor-pointer pointer-events-auto`}>
    <div>
      <h1 className={`${is_selected ? 'text-white' : 'text-text_primary_color'}  font-bold text-xl`}>
        {`${first_name || '-'} ${last_name || '-'}`}
      </h1>
      <p className="text-primary_color text-lg">{service || '-'}</p>
    </div>
    <h3 className={`${is_selected ? 'text-white' : 'text-text_primary_color'} font-normal text-lg`}>
      {sex || '-'}
    </h3>
  </div>
}



const Appoinments = () => {

  const [locations, setLocations] = useState<any>([])
  const [appointments, setAppointments] = useState<any>([])
  const [appoint_loading, setAppoint_loading] = useState(false)
  const [appointment_details, setAppointment_details] = useState(null)


  useEffect(() => {

    ; (async function getLocations() {
      const data = await fetchLocations()
      setLocations(data)
      // console.log(data)
    })()

  }, [])


  const select_change_handle = async (e: any) => {
    const value = e.target.value
    setAppointment_details(null)
    setAppoint_loading(true)
    const data = await fetchAppointmentsByLocation(value)
    setAppointments(data)
    setAppoint_loading(false)
    console.log(data)
  }

  const select_for_details_handle = (appoint:any) => {
    setAppointment_details(appoint)
  }

  return (
    <main className="mt-20 w-full h-full text-[#B6B6B6] font-[500] text-[20px] space-y-5">



      <div className="flex flex-col items-end ps-3">

        <div className="w-1/4 ">
          <div >
            <Select onChange={select_change_handle} style={{ backgroundColor: '#D9D9D9' }} id="locations" required>
              <option disabled selected value=''>Locations</option>
              {locations.map((location: any, index: any) => <option key={index} value={location.id}>{location.title}</option>)}
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
          </div> : appointments.map((appointment: Object, index: any) => <List_Item is_selected={appointment_details && appointment_details.id === appointment.id} click_handle={select_for_details_handle} key={index} data={appointment} />)}


        </div>
        <div className="w-1/4 bg-[#EFEFEF] overflow-scroll px-3 py-3 rounded-lg text-lg ">


          { appointment_details ?
            <>
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

              <div className=" font-semibold space-y-4 text-black">
                {render_detail_keys.map((elem, index)=><h1 key={index}>{elem.label}: <span className="font-normal">{ elem.key === 'location' ? appointment_details.location.title : appointment_details[elem.key]}</span></h1>)}
                {/* <h1>Name:</h1>
                <h1>Last Name:</h1>
                <h1>Email Address:</h1>
                <h1>D.O.B:</h1>
                <h1>Sex:</h1>
                <h1>Service:</h1>
                <h1>Location:</h1>
                <h1>Address:</h1> */}
              </div>
            </>
           : <div className="flex h-full flex-1 flex-col justify-center items-center">
           <h1>Select appointment to view details</h1>
         </div>}
        </div>

      </div>
    </main>
  );
};

export default Appoinments;
