'use client'
import React, { useState } from 'react'
import { Select } from 'flowbite-react';
import { HiMiniChevronUpDown } from "react-icons/hi2";
import moment from 'moment';
import Image from 'next/image';
import PlusIcon from "@/assets/images/Logos/plus-icon.png"
import { Action_Button } from '@/components/Action_Button';


// interface DataListInterface {
//     product_id:string;
//     category:string;
//     name:string;
//     price:string;
//     quantity_available:string;
//     last_updateded:string;
// }

interface DataListInterface {
  [key: string]: any; // This allows dynamic property access
}

const dataList: DataListInterface[] = [
  {
    product_id: "5453",
    category: "Medicine",
    name: "Panadol",
    price: "$20",
    units: "200",
    actions: "",

  },
  {
    product_id: "5453",
    category: "Medicine",
    name: "Panadol",
    price: "$20",
    units: "200",
    actions: "",

  },
  {
    product_id: "5453",
    category: "Medicine",
    name: "Panadol",
    price: "$20",
    units: "200",
    actions: "",

  },
  {
    product_id: "5453",
    category: "Medicine",
    name: "Panadol",
    price: "$20",
    units: "200",
    actions: "",

  },
  {
    product_id: "5453",
    category: "Medicine",
    name: "Panadol",
    price: "$20",
    units: "200",
    actions: "",

  },
  {
    product_id: "5453",
    category: "Medicine",
    name: "Panadol",
    price: "$20",
    units: "200",
    actions: "",

  },
  {
    product_id: "5453",
    category: "Medicine",
    name: "Panadol",
    price: "$20",
    units: "200",
    actions: "",

  },
  {
    product_id: "5453",
    category: "Medicine",
    name: "Panadol",
    price: "$20",
    units: "200",
    actions: "",

  },
  {
    product_id: "5453",
    category: "Medicine",
    name: "Panadol",
    price: "$20",
    units: "200",
    actions: "",

  },
]


const tableHeader = [
  {
    id: 'product_id',
    label: 'Product ID'
  },
  {
    id: 'category',
    label: 'Category'
  },
  {
    id: 'name',
    label: 'Name'
  },
  {
    id: 'price',
    label: 'Price'
  },
  {
    id: 'units',
    label: 'Units'
  },
  {
    id: 'actions',
    label: 'Action',
    align:'text-right',
    render_value: (val: string) => {

      return <div className='flex items-end justify-end space-x-2'>
      <Action_Button label='Update' bg_color='bg-[#6596FF]' /> <Action_Button label='Delete' bg_color='bg-[#FF6363]' /> 
    </div>

    }

  },
]



const Patients = () => {


  return (
    <main className="w-full  h-full font-[500] text-[20px]">




      <div className='w-full min-h-[81.5dvh] h-[100%] overflow-auto py-2 px-2'>
        <div className='bg-[#D9DFE9] h-[100%]  col-span-2 rounded-md py-2   ' >

          <div className='space-y-6 px-3 pb-4 flex justify-between'>
            <div className='space-y-1'>
              <h1 className='text-lg font-bold'>
                Search by Category
              </h1>

              <div className='flex items-center gap-x-3'>

                <input type="text" placeholder="" className=' px-1 py-2 w-72 text-sm rounded-md focus:outline-none bg-white' />
                <button >
                  <Image
                    className="w-9"
                    src={PlusIcon}
                    alt="Logo"
                  />
                </button>
              </div>


            </div>



            <div>
              <HiMiniChevronUpDown size={30} />
            </div>



          </div>
          <div className='h-[1px] w-full bg-black' />

          <div className='px-3 pt-5'>
            {/* Table goes here */}

            <div className='flex items-center flex-1 font-semibold mr-3'>
              {tableHeader.map(({ label, align }, index) => {

                return <h1 key={index} className={`flex-1 ${align || 'text-start'}  `}>
                  {label}
                </h1>
              })}
            </div>


            <div className='mt-5 mb-4 space-y-5 h-[60dvh] overflow-y-auto'>
              {dataList.map((elem: DataListInterface, index) => {
                const even_row = (index + 1) % 2
                return <div key={index} className={`cursor-pointer hover:bg-text_primary_color hover:text-white flex items-center flex-1 font-semibold ${even_row ? 'bg-[#B8C8E1]' : 'bg-white'}  px-3 py-4 rounded-md`}>
                  {
                    tableHeader.map(({ id, render_value, align }, ind) => {
                      const content = render_value ? render_value(elem[id]) : elem[id]
                      return <h1  key={ind} className={`flex-1 ${align || 'text-start'}  `}>
                        {content}
                      </h1>
                    })
                  }
                </div>
              })}
            </div>
          </div>


        </div>



      </div>


    </main>
  )
}

export default Patients