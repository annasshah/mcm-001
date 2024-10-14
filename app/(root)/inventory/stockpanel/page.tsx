'use client'
import React, { useEffect, useState } from 'react'
import { fetch_content_service } from '@/utils/supabase/data_services/data_services';
import InventoryCards from './InventoryCards';
import TableComponent from '@/components/TableComponent';

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
    render_value: (val: string, elem?: any) => elem?.categories?.category_name || '-',
  },
  {
    id: 'name',
    label: 'Name',
    render_value: (val: any, elem?: any) => elem?.product_name || '-',
    align: 'text-center'
  },
  {
    id: 'price',
    label: 'Price',
    render_value: (val: any, elem?: any) => elem?.price,
    align: 'text-center'
  },
  {
    id: 'quantity_in_stock',
    label: 'Quantity Available',
    render_value: (val: any, elem?: any) => elem?.quantity_available,
    align: 'text-center'

  },
  // {
  //   id: 'last_updated',
  //   label: 'Last Updated',
  //   render_value: (val: string) => moment(val, 'YYYY-MM-DD h:mm s').format('MMM DD, YYYY'),
  //   align: 'text-end'

  // },
]



const StockPanel = () => {

  const [dataList, setDataList] = useState<DataListInterface[]>([])
  const [allData, setAllData] = useState<DataListInterface[]>([])
  const [loading, setLoading] = useState(true)
  const [getDataArchiveType, setGetDataArchiveType] = useState(false)


  const fetch_handle = async (archived:boolean) => {
    setLoading(true)
    const fetched_data = await fetch_content_service({ table: 'products', language: '', selectParam: ',categories(category_name)', matchCase: { key: 'archived', value: archived } });
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
    fetch_handle(getDataArchiveType)

  }, [getDataArchiveType])





  return (
    <main className="w-full  h-full font-[500] text-[20px]">




      <div className='w-full min-h-[81.5dvh] h-[100%] overflow-auto py-2 px-2'>
        <InventoryCards />

        <TableComponent
          tableHeight='h-[72dvh]'
          tableBodyHeight='h-[56dvh]'
          tableHeader={tableHeader}
          loading={loading}
          dataList={dataList}
          searchInputplaceholder="Search by product id"
          searchHandle={onChangeHandle}
          RightSideComponent={() =>
            <div className='text-sm text-gray-500 underline space-x-4 mr-6 '>
              <button onClick={()=>setGetDataArchiveType(false)} className={`${!getDataArchiveType ? 'bg-primary_color text-white' : 'bg-gray-400 text-white'} px-3 py-2 rounded-md`}>
                Active
              </button>
              <button onClick={()=>setGetDataArchiveType(true)} className={`${getDataArchiveType ? 'bg-primary_color text-white' : 'bg-gray-400 text-white'} px-3 py-2 rounded-md`}>
                Archive
              </button>
            </div>
          }
        />
      </div>


    </main>
  )
}

export default StockPanel