'use client'
import React, { useEffect, useState } from 'react'
import { Button, Select, Spinner } from 'flowbite-react';
import { HiMiniChevronUpDown } from "react-icons/hi2";
import moment from 'moment';
import Image from 'next/image';
import PlusIcon from "@/assets/images/Logos/plus-icon.png"
import { Action_Button } from '@/components/Action_Button';
import { create_content_service, delete_content_service, fetch_content_service } from '@/utils/supabase/data_services/data_services';
import { toast } from 'react-toastify';
import { Custom_Modal } from '@/components/Modal_Components/Custom_Modal';
import { Input_Component } from '@/components/Input_Component';
import TableComponent from '@/components/TableComponent';
import { CiSearch } from 'react-icons/ci';
import { CircularProgress } from '@mui/material';
import { useLocationClinica } from '@/hooks/useLocationClinica';

interface DataListInterface {
  [key: string]: any; // This allows dynamic property access
}


const tableHeader = [
  {
    id: 'category_id',
    label: 'Category ID',
    align: 'text-start',
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
    component: true,
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
  const [activeDeleteId, setActiveDeleteId] = useState(0)

  const { locations, set_location_handle, selected_location } = useLocationClinica({ defaultSetFirst: true })



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
    setActiveDeleteId(id)
  }


  const deleteHandle = async () => {
    setDeleteLoading(true)
    const { error } = await delete_content_service({ table: 'categories', keyByDelete: 'category_id', id: activeDeleteId })
    if (!error) {
      setDataList((elem) => elem.filter((data: any) => data.category_id !== activeDeleteId))
      setAllData((elem) => elem.filter((data: any) => data.category_id !== activeDeleteId))
      setActiveDeleteId(0)
      toast.success('Deleled successfully');
    }
    else if (error) {
      console.log(error.message)
      toast.error(error.message);
    }
    setDeleteLoading(false)
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

  const select_location_handle = (val: React.ChangeEvent<HTMLSelectElement>) => {
    const value = val.target.value

    set_location_handle(value)
  }



  return (
    <main className="w-full  h-full font-[500] text-[20px]">


      {/* <div className={`bg-[#EFEFEF] h-[81dvh] col-span-2 rounded-md py-2 px-3`}>
        <div className='space-y-6 px-3 py-4 flex justify-between'>
          <div className='flex items-center space-x-3 px-1 py-1 w-72 text-sm rounded-sm bg-white'>
            <CiSearch size={22} color='gray' />
            <input onChange={onChangeHandle} type="text" placeholder={''} className='px-1 focus:outline-none placeholder-gray-400 text-sm font-light' />
          </div>

          <button onClick={() => openModalHandle(modalStateEnum.CREATE)} >
            <Image
              className="w-7"
              src={PlusIcon}
              alt="Logo"
            />
          </button>

        </div>



        <div className='px-2 pt-5'>
          <div className='pb-3 flex text-base text-[#71717A] items-center flex-1 font-normal border-b-2 border-b-[#E4E4E7]'>
            {tableHeader.map(({ label, align, flex }: any, index: number) => (
              <h1 key={index} className={`${flex ? flex : 'flex-[4]'} ${align || 'text-center'}`}>
                {label}
              </h1>
            ))}
          </div>

          <div className={`mb-4 h-[65dvh] overflow-y-auto`}>
            {loading ? (
              <div className='h-full w-full flex items-center justify-center'>
                <CircularProgress />
              </div>
            ) : (
              dataList.map((elem: DataListInterface, index: number) => (
                <div key={index} className={`hover:bg-[#d0d0d0] flex items-center flex-1 text-base py-5 border-b-2 border-b-[#E4E4E7]`}>
                  {tableHeader.map(({ id, Render_Value, align }: any, ind) => {
                    const content = Render_Value ? <Render_Value isLoading={deleteLoading} onClickHandle={() => onClickHandle(elem.category_id)} /> : elem[id]
                    return <h1 key={ind} className={`flex-1 ${align || 'text-start'}  `}>
                      {content}
                    </h1>

                  })}
                </div>
              ))
            )}
          </div>
        </div>
      </div> */}





      {/* <TableComponent
        tableHeight='h-[80dvh]'
        tableBodyHeight='h-[56dvh]'
        tableHeader={tableHeader}
        loading={loading}
        dataList={dataList}
        searchInputplaceholder="Search by product id"
        searchHandle={onChangeHandle}
        RightSideComponent={() =>
          <button onClick={() => openModalHandle(modalStateEnum.CREATE)} >
            <Image
              className="w-7"
              src={PlusIcon}
              alt="Logo"
            />
          </button>

        }
      /> */}




      <div className='w-full min-h-[81.5dvh] h-[100%] overflow-auto py-2 px-2'>
        <div className=' h-[100%]  col-span-2 rounded-md py-2   ' >

          <div className=' px-3 flex justify-between'>
            <div className='space-y-1'>

              <div className='flex items-center w-full justify-between gap-x-3'>

                <input onChange={onChangeHandle} type="text" placeholder="Search by Category" className=' block px-1 py-3 w-72 text-sm rounded-md focus:outline-none bg-white' />
                <button className='block' onClick={() => openModalHandle(modalStateEnum.CREATE)} >
                  <Image
                    className="w-9"
                    src={PlusIcon}
                    alt="Logo"
                  />
                </button>
              </div>




            </div>


              <div >
                <Select onChange={select_location_handle} defaultValue={selected_location} style={{ backgroundColor: '#D9D9D9' }} id="locations" required>
                  {locations.map((location: any, index: any) => <option key={index} value={location.id}>{location.title}</option>)}
                </Select>

              </div>

          </div>

          <div className='px-3 pt-5'>

            <div className='pb-3 flex text-base text-[#71717A] items-center flex-1 font-normal border-b-2 border-b-[#E4E4E7]'>
              {tableHeader.map(({ label, align }, index) => {

                return <h1 key={index} className={`flex-1 ${align || 'text-start'}  `}>
                  {label}
                </h1>
              })}
            </div>


            <div className='mt-3 mb-4 space-y-5 h-[60dvh] overflow-y-auto'>

              <>
                {loading ? <div className="h-full w-full flex items-center justify-center">
                  <Spinner size='xl' />


                </div> : dataList.length === 0 ? <div className="flex h-full flex-1 flex-col justify-center items-center">
                  <h1>No Category is available</h1> </div> : <div className='space-y-5'>

                  {dataList.map((elem: DataListInterface, index) => {
                    const even_row = (index + 1) % 2
                    return <div key={index} className={`hover:bg-[#d0d0d0] flex items-center flex-1 text-base border-b-2 border-b-[#E4E4E7]  px-3 py-4 rounded-md`}>
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


      <Custom_Modal open_handle={() => openModalHandle(modalStateEnum.CREATE)} Title={`${modalState} Category`} loading={modalEventLoading} is_open={openModal} close_handle={closeModalHandle} create_new_handle={createNewHandle} buttonLabel={modalState} Trigger_Button={null}>
        <Input_Component value={modalData['category_name']} onChange={(e: any) => modalInputChangeHandle('category_name', e)} py='py-3' border='border-[1px] border-gray-300 rounded-md' label='Category' />
      </Custom_Modal>



      {activeDeleteId ? <div className='fixed bg-black/75 h-screen w-screen top-0 left-0 right-0 bottom-0 z-20'>
        <div className='flex justify-center items-center w-full h-full'>

          <div className='bg-white w-full max-w-xl px-4 py-3 rounded-lg'>

            <h1 className='font-bold text-xl text-black mb-5'>Confirmation</h1>
            <p className='text-lg'>Do you really want to delete this category</p>
            <p className='text-sm'>Remember All of the associated products will also be deleted with the category</p>


            <div className='mt-4 flex items-center space-x-3 justify-end'>
              <Button disabled={deleteLoading} onClick={() => setActiveDeleteId(0)} color="gray">Cancel</Button>
              <Button isProcessing={deleteLoading} color="failure" onClick={deleteHandle}>
                Delete
              </Button>
            </div>


          </div>
        </div>

      </div> : null}


    </main >
  )
}

export default Categories