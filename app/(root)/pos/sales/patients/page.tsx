'use client'
import { Input_Component } from '@/components/Input_Component';
import { Select_Dropdown } from '@/components/Select_Dropdown';
import React from 'react'
import { Quantity_Field } from '@/components/Quantity_Field';
import { RxReload } from "react-icons/rx";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { Select } from 'flowbite-react';
import { PiCaretCircleRightFill } from "react-icons/pi";
import { CiFilter } from "react-icons/ci";

interface PatientDetailsInterface {
  name: string;
  phone_number: string;
  email: string;
  treatment_category: string;
}

const patient_details: PatientDetailsInterface = {
  name: "Sarah S.",
  phone_number: "+1 436 793 8493",
  email: "Sarahsilk@gmail.com",
  treatment_category: "Family Medicine"
};

const render_details = [
  {
    key: 'name',
    label: 'Name:'
  },
  {
    key: 'phone_number',
    label: 'Phone Number:'
  },
  {
    key: 'email',
    label: 'Email:'
  },
  {
    key: 'treatment_category',
    label: 'Treatment Category:'
  },
]



const Promo_Input = () => {
  return (
    <div className='w-52 flex rounded-md  items-center bg-white p-2 px-2'>
      <input type="text" placeholder="Enter Promo Code" className='w-full px-1 py-1 text-sm border-2 focus:outline-none focus:border-blue-500' />
      <IoCloseOutline />
    </div>)
}

const Payment_Method_Select = () => {

  return (
    <div className='w-52'>
      <Select className='w-full h-auto' style={{ backgroundColor: 'white' }} id="section" required={true}>
        <option>
          Cash
        </option>
        <option>
          Debit Card
        </option>
      </Select>
    </div>)
}

interface Action_Button_Props {
  bg_color: string;
  label: string;
}

const Action_Button: React.FC<Action_Button_Props> = ({ bg_color, label }) => {
  const bg_class = `${bg_color}`

  return <button className={`text-[17px] text-white ${bg_class}  py-1 px-4 rounded-lg`} >
    {label}
  </button>
}



const Patients = () => {
  const category_change_handle = () => {

  }
  const select_product_change_handle = () => {

  }
  return (
    <main className="w-full  h-full font-[500] text-[20px]">


      <div className='w-full min-h-[81.5dvh] h-[100%] py-2 px-2 grid grid-cols-3 gap-2'>
        <div className='bg-[#B8C8E1] h-[100%]  col-span-2 rounded-md py-2   ' >

          <div className='space-y-6 px-3 pb-4 flex justify-between'>
            <div>
              <h1 className='text-xl font-bold'>
                search
              </h1>
              <input type="text" placeholder="" className=' px-1 py-2 w-72 text-sm rounded-md focus:outline-none bg-white' />
            </div>



            <div>
              <CiFilter size={30} />
            </div>



          </div>
          <div className='h-[1px] w-full bg-black' />

          <div className='h-[100%] !overflow-auto space-y-4 px-3 py-4'>


            {Array(5).fill(null).map((elem, ind) => {
              return <div key={ind} className='space-y-6 px-3'>


                <div className='bg-[#D9D9D9] rounded-md px-4 py-3'>
                  <div>
                    <p className='text-xl'>
                      Marco Barfield
                    </p>

                  </div>

                  <div className='flex items-start'>
                    <p className='text-lg flex-1 text-gray-600'>
                      {"(555) 555-1234"}
                    </p>
                    <div className='text-right space-y-2'>
                      <div className='space-x-3'>
                        <Action_Button label='Edit' bg_color='bg-[#13787E]' />
                        <Action_Button label='Delete' bg_color='bg-[#FF6363]' />
                        <Action_Button label='Select' bg_color='bg-[#00720B]' />

                      </div>
                      <p className='text-sm text-gray-600'>10:48 PM</p>
                    </div>
                  </div>
                </div>


              </div>
            })}




          </div>

        </div>

        <div className='bg-[#B8C8E1] h-[100%] rounded-md overflow-hidden flex flex-col' >

          <div className='px-4 py-4 bg-[#11252C80]  border-b-[1px] border-b-[#817B7B] flex items-center'>
            <h1 className='text-xl font-normal text-white text-center w-full'>
              Add new customer
            </h1>
          </div>


          <div className='overflow-auto h-[100%] px-4 py-4'>


            <div className='space-x-3'>
              <button className='bg-[#202B40] py-2 px-3 text-white text-sm rounded-lg'>
                New Patient
              </button>
              <button className='bg-white py-2 px-3 text-[#202B40] text-sm rounded-lg'>
                Returning patient
              </button>
            </div>


            <div className='w-2/3 space-y-4'>
              <Input_Component label='Name' />
              <Input_Component label='Email Address' />
              <Input_Component label='Phone Number' />

              <Select_Dropdown bg_color='#fff' start_empty={true} options_arr={[]} required={true} on_change_handle={category_change_handle} label='Treatment Type' />

            </div>




          </div>


          <div>
            <button className='bg-[#11252C] py-3 w-full text-center text-white'>
            Add Patient
            </button>
          </div>



        </div>

      </div>

    </main>
  )
}

export default Patients