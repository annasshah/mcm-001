'use client'
import React, { useEffect, useState } from 'react'
import { Select } from 'flowbite-react';
import { CiFilter } from "react-icons/ci";
import { useLocationClinica } from '@/hooks/useLocationClinica';
import moment from 'moment';
import { fetch_content_service } from '@/utils/supabase/data_services/data_services';
import InventoryCards from './InventoryCards';

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
    label: 'Category',
    render_value: (val: string, elem?:any) => elem?.products?.category_id?.category_name || '-',
  },
  {
    id: 'name',
    label: 'Name',
    render_value: (val: any,  elem?:any) => elem?.products?.product_name || '-',
  },
  {
    id: 'price',
    label: 'Price',
    render_value: (val: any,  elem?:any) => elem?.products?.price,
  },
  {
    id: 'quantity_in_stock',
    label: 'Quantity Available',
    
  },
  {
    id: 'last_updated',
    label: 'Last Updated',
    render_value: (val: string) => moment(val, 'YYYY-MM-DD h:mm s').format('MMM DD, YYYY'),
    align: 'text-end'

  },
]



const StockPanel = () => {

  const [dataList, setDataList] = useState<DataListInterface[]>([])
  const [allData, setAllData] = useState<DataListInterface[]>([])
  const [loading, setLoading] = useState(true)


  const fetch_handle = async () => {
    setLoading(true)
    const fetched_data = await fetch_content_service({ table: 'inventory', language: '', selectParam:',products(product_id,product_name,price,category_id(category_name))' });
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

      const filteredData = allData.filter((elem) => elem.products.product_name.toLocaleLowerCase().includes(val.toLocaleLowerCase()))
      setDataList([...filteredData])
    }
  }


  useEffect(() => {
    fetch_handle()

  }, [])


  return (
    <main className="w-full  h-full font-[500] text-[20px]">




      <div className='w-full min-h-[81.5dvh] h-[100%] overflow-auto py-2 px-2'>
        <InventoryCards />
        <div className='bg-[#D9DFE9] h-[100%]  col-span-2 rounded-md py-2   ' >

          <div className='space-y-6 px-3 pb-4 flex justify-between'>
            <div>
              <h1 className='text-xl font-bold'>
                search
              </h1>
              <input onChange={onChangeHandle} type="text" placeholder="" className=' px-1 py-2 w-72 text-sm rounded-md focus:outline-none bg-white' />
            </div>



            {/* <div>
              <CiFilter size={30} />
            </div> */}



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
                      const content = render_value ? render_value(elem[id], elem) : elem[id]
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

export default StockPanel