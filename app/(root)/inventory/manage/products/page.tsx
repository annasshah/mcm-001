'use client'
import React, { useEffect, useState } from 'react'
import { Label, Select, Spinner } from 'flowbite-react';
import { HiMiniChevronUpDown } from "react-icons/hi2";
import moment from 'moment';
import Image from 'next/image';
import PlusIcon from "@/assets/images/Logos/plus-icon.png"
import { Action_Button } from '@/components/Action_Button';
import { create_content_service, delete_content_service, fetch_content_service, update_content_service } from '@/utils/supabase/data_services/data_services';
import { Custom_Modal } from '@/components/Modal_Components/Custom_Modal';
import { Input_Component } from '@/components/Input_Component';
import { toast } from 'react-toastify';
import { useCategoriesClinica } from '@/hooks/useCategoriesClinica'
import { PiCaretUpDownBold } from "react-icons/pi";


interface DataListInterface {
  [key: string]: any; // This allows dynamic property access
}

const modalStateEnum = {
  CREATE: "Create",
  UPDATE: "Update",
  DELETE: "delete",
  EMPTY: ""
}

const tableHeader = [
  {
    id: 'product_id',
    label: 'Product ID'
  },
  {
    id: 'category',
    label: 'Category',
    can_sort: true
  },
  {
    id: 'product_name',
    label: 'Name',
    can_sort: true
  },
  {
    id: 'price',
    label: 'Price',
    can_sort: true
  },
  {
    id: 'quantity_available',
    label: 'Units',
    can_sort: true
  },
  {
    id: 'actions',
    label: 'Action',
    align: 'text-right',
    Render_Value: ({ clickHandle }: { clickHandle: (state: string) => void }) => {

      return <div className='flex items-end justify-end space-x-2'>
        <Action_Button onClick={() => clickHandle(modalStateEnum.UPDATE)} label='Update' bg_color='bg-[#6596FF]' /> <Action_Button label='Delete' onClick={() => clickHandle(modalStateEnum.DELETE)} bg_color='bg-[#FF6363]' />
      </div>

    }

  },
]

const requiredInputFields = [
  {
    id: 'category_id',
    label: 'Category'
  },
  {
    id: 'product_name',
    label: 'Name'
  },
  {
    id: 'price',
    label: 'Price',
    colSpan: 'col-span-1'
  },
  {
    id: 'quantity_available',
    label: 'Units',
    colSpan: 'col-span-1'
  },
]




const Products = () => {
  const [dataList, setDataList] = useState<DataListInterface[]>([])
  const [allData, setAllData] = useState<DataListInterface[]>([])
  const [loading, setLoading] = useState(true)

  const [modalEventLoading, setModalEventLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [modalData, setModalData] = useState<DataListInterface>({})
  const [modalState, setModalState] = useState('')
  const { categories } = useCategoriesClinica()
  const [sortOrder, setSortOrder] = useState(-1)
  const [sortColumn, setSortColumn] = useState('')




  const openModalHandle = (state: string) => {
    setOpenModal(true)
    setModalState(state)

  }
  const closeModalHandle = () => {
    setOpenModal(false)
    setModalState(modalStateEnum.EMPTY)
    setModalData({})
  }



  const fetch_handle = async () => {
    setLoading(true)
    const fetched_data = await fetch_content_service({ table: 'products', language: '', selectParam: ',categories(category_name)' });
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

      const filteredData = allData.filter((elem) => elem.product_name.toLocaleLowerCase().includes(val.toLocaleLowerCase()))
      setDataList([...filteredData])
    }
  }


  useEffect(() => {
    fetch_handle()

  }, [])


  const modalInputChangeHandle = (key: string, value: string | number) => {
    setModalData((pre) => {
      return { ...pre, [key]: value }
    })
  }


  const modalSubmitHandle = async () => {
    setModalEventLoading(true)
    console.log(modalData)
    if (modalState === modalStateEnum.CREATE) {

      const { data: res_data, error } = await create_content_service({ table: 'products', language: '', post_data: modalData });
      if (error) {
        console.log(error.message);
        toast.error(error.message);
        // throw new Error(error.message);
      }
      if (res_data?.length) {
        toast.success('Created successfully');
        closeModalHandle()
        // dataList.push(res_data[0])
        // allData.push(res_data[0])
        // setAllData([...allData])
        // setDataList([...dataList])
      }
    }
    else {
      try {
        const postData = {
          product_id: +modalData.product_id,
          category_id: +modalData.category_id,
          product_name: modalData.product_name,
          price: +modalData.price,
          quantity_available: +modalData.quantity_available,
        }
        const res_data = await update_content_service({ table: 'products', language: '', post_data: postData, matchKey: 'product_id' });
        if (res_data?.length) {
          toast.success('Created successfully');
          closeModalHandle()
        }

      } catch (error: any) {

        if (error && error?.message) {
          toast.error(error?.message);
          // throw new Error(error.message);
        } else {
          toast.error('Something went wrong!');
        }
      }


    }
    setModalEventLoading(false)
  }



  const onClickHandle = async (id: number) => {
    const { error } = await delete_content_service({ table: 'products', keyByDelete: 'product_id', id })
    if (!error) {
      setDataList((elem) => elem.filter((data: any) => data.product_id !== id))
      setAllData((elem) => elem.filter((data: any) => data.product_id !== id))
      toast.success('Deleled successfully');
    }
    else if (error) {
      console.log(error.message)
      toast.error(error.message);
    }
  }



  const buttonClickActionHandle = (action: string, elem: any) => {
    console.log({
      action,
      elem
    })
    if (action === modalStateEnum.DELETE) {
      onClickHandle(elem.product_id)
    }
    else if (action === modalStateEnum.UPDATE) {
      setModalData(elem)
      openModalHandle(modalStateEnum.UPDATE)
    }

  }


  const sortHandle = (column: string) => {
    console.log(column)
    let sortedList: any = []
    if (column === 'category') {
      if (sortOrder === 1) {
        sortedList = dataList.sort((a, b) => a.categories.category_name.localeCompare(b.categories.category_name))
      } else {

        sortedList = dataList.sort((a, b) => b.categories.category_name.localeCompare(a.categories.category_name))
      }
    }
    else if (column === 'product_name') {
      if (sortOrder === 1) {
        sortedList = dataList.sort((a, b) => a.product_name.localeCompare(b.product_name))
      } else {

        sortedList = dataList.sort((a, b) => b.product_name.localeCompare(a.product_name))
      }

    }
    else {
      if (sortOrder === 1) {
        sortedList = dataList.sort((a, b) => a[column] - b[column])
      } else {

        sortedList = dataList.sort((a, b) => b[column] - a[column])
        
      }
    }

    setSortOrder((order)=> order === -1 ? 1 : -1)
    setDataList([...sortedList])


    setSortColumn(column)
  }

  return (
    <main className="w-full  h-full font-[500] text-[20px]">




      <div className='w-full min-h-[81.5dvh] h-[100%] overflow-auto py-2 px-2'>
        <div className='bg-[#D9DFE9] h-[100%]  col-span-2 rounded-md py-2   ' >

          <div className='space-y-6 px-3 pb-4 flex justify-between'>
            <div className='space-y-1'>
              <h1 className='text-lg font-bold'>
                Search by Product
              </h1>

              <div className='flex items-center gap-x-3'>

                <input onChange={onChangeHandle} type="text" placeholder="" className=' px-1 py-2 w-72 text-sm rounded-md focus:outline-none bg-white' />
                <button onClick={() => openModalHandle(modalStateEnum.CREATE)}>
                  <Image
                    className="w-9"
                    src={PlusIcon}
                    alt="Logo"
                  />
                </button>
              </div>


            </div>



            {/* <div>
              <HiMiniChevronUpDown size={30} />
            </div> */}



          </div>
          <div className='h-[1px] w-full bg-black' />

          <div className='px-3 pt-5'>
            {/* Table goes here */}

            <div className='flex items-center flex-1 font-semibold pr-5'>
              {tableHeader.map(({ label, align, can_sort, id }, index) => {

                return <h1 key={index} className={`flex-1 ${align || 'text-start'}  `}>
                  {label} {can_sort && <button onClick={() => sortHandle(id)} className='active:opacity-50'><PiCaretUpDownBold className={`inline ${sortColumn === id ? 'text-green-600' : 'text-gray-400/50'} hover:text-gray-600 active:text-gray-500 `} /></button>}
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
                        tableHeader.map((element, ind) => {
                          const { id, Render_Value, align } = element
                          const content = Render_Value ? <Render_Value clickHandle={(action: string) => buttonClickActionHandle(action, elem)} /> : elem[id]
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


      <Custom_Modal open_handle={() => openModalHandle(modalStateEnum.CREATE)} Title={`${modalState} Product`} loading={modalEventLoading} is_open={openModal} close_handle={closeModalHandle} create_new_handle={modalSubmitHandle} buttonLabel={modalState} Trigger_Button={<></>}>
        <div className="w-full grid grid-cols-2 gap-4">

          {
            requiredInputFields.map((elem) => {
              const { id, label, colSpan } = elem
              return id === 'category_id' ? <div className='col-span-2 space-y-2' >
                <Label htmlFor={id} value={label} className='font-bold' />
                <Select value={modalData[id]} onChange={(e: any) => modalInputChangeHandle(id, e.target.value)} id={id} required>
                  <option selected >{label}</option>
                  {categories.map((elem: any, index: any) => <option key={index} value={elem[id]}>{elem.category_name}</option>)}
                </Select>

              </div> : <div className={`${colSpan || 'col-span-2'}`}>
                <Input_Component value={modalData[id]} onChange={(e: string) => modalInputChangeHandle(id, e)} py='py-3' border='border-[1px] border-gray-300 rounded-md' label={label} />
              </div>
            })
          }



        </div>
      </Custom_Modal>


    </main>
  )
}

export default Products