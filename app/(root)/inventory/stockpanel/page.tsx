'use client'
import React, { useState } from 'react'
import { Select } from 'flowbite-react';
import { CiFilter } from "react-icons/ci";
import { useLocationClinica } from '@/hooks/useLocationClinica';
import moment from 'moment';

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
    quantity_available: "200",
    last_updateded: "2024-06-28 21:28:52.532542+00",

  },
  {
    product_id: "5453",
    category: "Medicine",
    name: "Panadol",
    price: "$20",
    quantity_available: "200",
    last_updateded: "2024-06-28 21:28:52.532542+00",

  },
  {
    product_id: "5453",
    category: "Medicine",
    name: "Panadol",
    price: "$20",
    quantity_available: "200",
    last_updateded: "2024-06-28 21:28:52.532542+00",

  },
  {
    product_id: "5453",
    category: "Medicine",
    name: "Panadol",
    price: "$20",
    quantity_available: "200",
    last_updateded: "2024-06-28 21:28:52.532542+00",

  },
  {
    product_id: "5453",
    category: "Medicine",
    name: "Panadol",
    price: "$20",
    quantity_available: "200",
    last_updateded: "2024-06-28 21:28:52.532542+00",

  },
  {
    product_id: "5453",
    category: "Medicine",
    name: "Panadol",
    price: "$20",
    quantity_available: "200",
    last_updateded: "2024-06-28 21:28:52.532542+00",

  },
  {
    product_id: "5453",
    category: "Medicine",
    name: "Panadol",
    price: "$20",
    quantity_available: "200",
    last_updateded: "2024-06-28 21:28:52.532542+00",

  },
  {
    product_id: "5453",
    category: "Medicine",
    name: "Panadol",
    price: "$20",
    quantity_available: "200",
    last_updateded: "2024-06-28 21:28:52.532542+00",

  },
  {
    product_id: "5453",
    category: "Medicine",
    name: "Panadol",
    price: "$20",
    quantity_available: "200",
    last_updateded: "2024-06-28 21:28:52.532542+00",

  },
  {
    product_id: "5453",
    category: "Medicine",
    name: "Panadol",
    price: "$20",
    quantity_available: "200",
    last_updateded: "2024-06-28 21:28:52.532542+00",

  },
  {
    product_id: "5453",
    category: "Medicine",
    name: "Panadol",
    price: "$20",
    quantity_available: "200",
    last_updateded: "2024-06-28 21:28:52.532542+00",

  },
  {
    product_id: "5453",
    category: "Medicine",
    name: "Panadol",
    price: "$20",
    quantity_available: "200",
    last_updateded: "2024-06-28 21:28:52.532542+00",

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
    id: 'quantity_available',
    label: 'Quantity Available'
  },
  {
    id: 'last_updateded',
    label: 'Last Updated',
    render_value: (val: string) => moment(val, 'YYYY-MM-DD h:mm s').format('MMM DD, YYYY'),
    align: 'text-end'

  },
]



const Patients = () => {


  return (
    <main className="w-full  h-full font-[500] text-[20px]">




      <div className='w-full min-h-[81.5dvh] h-[100%] overflow-auto py-2 px-2'>
        <div className='py-3 space-x-20 my-5 flex flex-1 items-center'>
          <div className='px-5 py-3 rounded-lg bg-[#EFEFEF] flex-1'>
            <h1 className='text-5xl'>400</h1>
            <h4 className='text-base'>Products</h4>
          </div>
          <div className='px-5 py-3 rounded-lg bg-[#EFEFEF] flex-1'>
            <h1 className='text-5xl'>400</h1>
            <h4 className='text-base'>Total Categories</h4>
          </div>
          <div className='px-5 py-3 rounded-lg bg-[#EFEFEF] flex-1'>
            <h1 className='text-5xl'>400</h1>
            <h4 className='text-base'>Stock Value</h4>
          </div>
          <div className='px-5 py-3 rounded-lg bg-[#EFEFEF] flex-1'>
            <h1 className='text-5xl'>400</h1>
            <h4 className='text-base'>low stock alerts</h4>
          </div>
        </div>
        <div className='bg-[#D9DFE9] h-[100%]  col-span-2 rounded-md py-2   ' >

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

          <div className='px-3 pt-5'>
            {/* Table goes here */}

            <div className='flex items-center flex-1 font-semibold'>
              {tableHeader.map(({ label, align }, index) => {

                return <h1 key={index} className={`flex-1 ${align || 'text-start'}  `}>
                  {label}
                </h1>
              })}
            </div>


            <div className='mt-5 mb-4 space-y-5 h-[53dvh] overflow-y-auto'>
              {dataList.map((elem: DataListInterface, index) => {
                const even_row = (index + 1) % 2
                return <div key={index} className={`cursor-pointer hover:bg-text_primary_color hover:text-white flex items-center flex-1 font-semibold ${even_row ? 'bg-[#B8C8E1]' : 'bg-white'}  px-3 py-4 rounded-md`}>
                  {
                    tableHeader.map(({ id, render_value, align }, ind) => {
                      const content = render_value ? render_value(elem[id]) : elem[id]
                      return <h1 key={ind} className={`flex-1 ${align || 'text-start'}  `}>
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