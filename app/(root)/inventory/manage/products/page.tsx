'use client'
import React, { useEffect, useState } from 'react'
import { Select, Spinner } from 'flowbite-react';
import { HiMiniChevronUpDown } from "react-icons/hi2";
import moment from 'moment';
import Image from 'next/image';
import PlusIcon from "@/assets/images/Logos/plus-icon.png"
import { Action_Button } from '@/components/Action_Button';
import { fetch_content_service } from '@/utils/supabase/data_services/data_services';


interface DataListInterface {
  [key: string]: any; // This allows dynamic property access
}


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
    id: 'product_name',
    label: 'Name'
  },
  {
    id: 'price',
    label: 'Price'
  },
  {
    id: 'quantity_available',
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



const Products = () => {
  const [dataList, setDataList] = useState<DataListInterface[]>([])
  const [allData, setAllData] = useState<DataListInterface[]>([])
  const [loading, setLoading] = useState(true)


  const fetch_handle = async () => {
    setLoading(true)
    const fetched_data = await fetch_content_service({ table: 'products', language: '', selectParam:',categories(category_name)' });
    setDataList(fetched_data)
    setAllData(fetched_data)
    setLoading(false)


  }

  const onChangeHandle = (e: any) => {
    const val = e.target.value
    if (val === '') {
      setDataList([...allData])

    }
    else {

      const filteredData = allData.filter((elem) => elem.categories.category_name.toLocaleLowerCase().includes(val.toLocaleLowerCase()))
      setDataList([...filteredData])
    }
  }


  useEffect(() => {
    fetch_handle()

  }, [])


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

                <input onChange={onChangeHandle} type="text" placeholder="" className=' px-1 py-2 w-72 text-sm rounded-md focus:outline-none bg-white' />
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

            <div className='flex items-center flex-1 font-semibold pr-5'>
              {tableHeader.map(({ label, align }, index) => {

                return <h1 key={index} className={`flex-1 ${align || 'text-start'}  `}>
                  {label}
                </h1>
              })}
            </div>


            <div className='mt-5 mb-4 space-y-5 h-[60dvh] overflow-y-auto'>

              <>
                {loading ? <div className="flex h-full flex-1 flex-col justify-center items-center">
                  <Spinner size='xl' />


                </div> : dataList.length === 0 ? <div className="flex h-full flex-1 flex-col justify-center items-center">
                  <h1>No Product is available</h1> </div> : <div className='space-y-5'>

                  {dataList.map((elem: DataListInterface, index) => {
                    const even_row = (index + 1) % 2
                    return <div key={index} className={`cursor-pointer hover:bg-text_primary_color hover:text-white flex items-center flex-1 font-semibold ${even_row ? 'bg-[#B8C8E1]' : 'bg-white'}  px-3 py-4 rounded-md`}>
                      {
                        tableHeader.map(({ id, render_value, align }, ind) => {
                          const content = render_value ? render_value(elem[id]) : elem[id]
                          return <h1 key={ind} className={`flex-1 ${align || 'text-start'}  `}>
                            {id === 'category' ? elem.categories.category_name : content}
                          </h1>
                        })
                      }
                    </div>
                  })}
                </div>}
              </>
            </div>
          </div>


        </div>



      </div>


    </main>
  )
}

export default Products