'use client'
import React, { useEffect, useState } from 'react'
import { Select, Spinner } from 'flowbite-react';
import { HiMiniChevronUpDown } from "react-icons/hi2";
import moment from 'moment';
import Image from 'next/image';
import PlusIcon from "@/assets/images/Logos/plus-icon.png"
import { Action_Button } from '@/components/Action_Button';
import { create_content_service, delete_content_service, fetch_content_service } from '@/utils/supabase/data_services/data_services';
import { toast } from 'react-toastify';
import { Custom_Modal } from '@/components/Modal_Components/Custom_Modal';
import { Input_Component } from '@/components/Input_Component';

interface DataListInterface {
  [key: string]: any; // This allows dynamic property access
}


const tableHeader = [
  {
    id: 'category_id',
    label: 'Category ID'
  },
  {
    id: 'category_name',
    label: 'Name',
    align: 'text-center'
  },
  {
    id: 'actions',
    label: 'Action',
    align: 'text-end',
    Render_Value: ({ val, onClickHandle, isLoading }: { val?: string, onClickHandle?: () => void, isLoading?: boolean }) => {

      return <Action_Button isLoading={isLoading} onClick={onClickHandle} label='Delete' bg_color='bg-[#FF6363]' />

    }

  },
]

const modalStateEnum = {
  CREATE: "Create",
  UPDATE: "Update",
  EMPTY: ""
}

const Categories = () => {
  const [dataList, setDataList] = useState<DataListInterface[]>([])
  const [allData, setAllData] = useState<DataListInterface[]>([])
  const [loading, setLoading] = useState(true)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const [modalEventLoading, setModalEventLoading] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [modalData, setModalData] = useState<DataListInterface>({})
  const [modalState, setModalState] = useState('')


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
    const fetched_data = await fetch_content_service({ table: 'categories', language: '' });
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

      const filteredData = allData.filter((elem) => elem.category_name.toLocaleLowerCase().includes(val.toLocaleLowerCase()))
      setDataList([...filteredData])
    }
  }


  useEffect(() => {
    fetch_handle()

  }, [])


  const onClickHandle = async (id: number) => {
    const { error } = await delete_content_service({ table: 'categories', keyByDelete: 'category_id', id })
    if (!error) {
      setDataList((elem) => elem.filter((data: any) => data.category_id !== id))
      setAllData((elem) => elem.filter((data: any) => data.category_id !== id))
      toast.success('Deleled successfully');
    }
    else if (error) {
      console.log(error.message)
      toast.error(error.message);
    }



  }



  const createNewHandle = async () => {

    setModalEventLoading(true)
    const { data: res_data, error } = await create_content_service({ table: 'categories', language: '', post_data: modalData });
    if (error) {
      console.log(error.message);
      toast.error(error.message);
      // throw new Error(error.message);
    }




    if (res_data?.length) {
      toast.success('Created successfully');
      closeModalHandle()
      dataList.push(res_data[0])
      allData.push(res_data[0])
      setAllData([...allData])
      setDataList([...dataList])
    }

    setModalEventLoading(false)
  }
  const modalInputChangeHandle = (key: string, value: string) => {
    setModalData((pre) => {
      return { ...pre, [key]: value }
    })
  }



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

                <input  onChange={onChangeHandle} type="text" placeholder="" className=' px-1 py-2 w-72 text-sm rounded-md focus:outline-none bg-white' />
                <button onClick={() => openModalHandle(modalStateEnum.CREATE)} >
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
                  <h1>No Category is available</h1> </div> : <div className='space-y-5'>

                  {dataList.map((elem: DataListInterface, index) => {
                    const even_row = (index + 1) % 2
                    return <div key={index} className={`cursor-pointer hover:bg-text_primary_color hover:text-white flex items-center flex-1 font-semibold ${even_row ? 'bg-[#B8C8E1]' : 'bg-white'}  px-3 py-4 rounded-md`}>
                      {
                        tableHeader.map(({ id, Render_Value, align }, ind) => {
                          const content = Render_Value ? <Render_Value isLoading={deleteLoading} onClickHandle={() => onClickHandle(elem.category_id)} /> : elem[id]
                          return <h1 key={ind} className={`flex-1 ${align || 'text-start'}  `}>
                            {content}
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


      <Custom_Modal open_handle={() => openModalHandle(modalStateEnum.CREATE)} Title={`${modalState} Category`} loading={modalEventLoading} is_open={openModal} close_handle={closeModalHandle} create_new_handle={createNewHandle} buttonLabel={modalState} Trigger_Button={<></>}>
        <Input_Component value={modalData['category_name']}  onChange={(e: string) => modalInputChangeHandle('category_name', e)} py='py-3' border='border-[1px] border-gray-300 rounded-md' label='Category' />
      </Custom_Modal>


    </main >
  )
}

export default Categories