'use client'
import { Select_Dropdown } from '@/components/Select_Dropdown';
import React, { useEffect, useState } from 'react'
import { Quantity_Field } from '@/components/Quantity_Field';
import { RxReload } from "react-icons/rx";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { IoCloseOutline } from "react-icons/io5";
import { Select } from 'flowbite-react';
import { PiCaretCircleRightFill } from "react-icons/pi";
import { useCategoriesClinica } from '@/hooks/useCategoriesClinica';
import { useProductsClinica } from '@/hooks/useProductsClinica';
import { useRouter } from 'next/navigation';
import { CircularProgress } from '@mui/material';

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
        label: 'Name:',
        render_value: (val: any) => `${val.firstname} ${val.lastname}`,
    },
    {
        key: 'phone',
        label: 'Phone Number:'
    },
    {
        key: 'email',
        label: 'Email:'
    },
    {
        key: 'treatmenttype',
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

const Orders = () => {

   
    const { categories } = useCategoriesClinica()
    const { selectedCategory, products, getCategoriesByLocationId , loadingProducts, selectedProduct, selectProductHandle} = useProductsClinica()
    const [selectedPatient, setSelectedPatient] = useState(null)
    const [fetchingDataLoading, setfetchingDataLoading] = useState(true)

    const router = useRouter()

    const category_change_handle = (e:any) => {
        const value = e.target.value
        getCategoriesByLocationId(value)
    }

    const select_product_change_handle = (e:any) => {
        const value = e.target.value
        selectProductHandle(value)
    }


    useEffect(() => {
        setfetchingDataLoading(true)
        const storedData = localStorage.getItem('@pos-patient') || null

        if (storedData) {
            const data = JSON.parse(storedData)
            setSelectedPatient(data)
        }

        setTimeout(() => {
            setfetchingDataLoading(false)
        }, 2000)

    }, [router])





    return (
        <main className="w-full  h-full font-[500] text-[20px]">


            <div className='w-full min-h-[81.5dvh] h-[100%] py-2 px-2 grid grid-cols-3 gap-2'>
                <div className='bg-[#B8C8E1] h-[100%]  col-span-2 rounded-md py-2   ' >

                    <span>
                        <div className='space-y-6 px-3 py-4'>
                            <h1 className='text-xl font-bold'>
                                Patients Details
                            </h1>
                            {fetchingDataLoading ? <div className='w-full flex flex-col  justify-center h-full space-y-3'>
                                <CircularProgress size={24} />
                                <h1 className='text-sm text-gray-400'>Fetching patient details</h1>
                            </div> :
                                <div className='text-lg space-y-4'>
                                    {selectedPatient ? render_details.map(({ label, key, render_value }, ind) => {
                                        const extracted_val = render_value ? render_value(selectedPatient) : selectedPatient[key]
                                        return <dl key={ind} className='grid grid-cols-4 space-x-5'>
                                            <dt>{label}</dt>
                                            <dd className='font-normal'>{extracted_val}</dd>
                                        </dl>
                                    }) : <div><h1 className='text-red-600'>No Selected Patient found!</h1></div>}
                                </div>}

                        </div>
                        <div className='h-[1px] w-full bg-black' />

                        <div className='space-y-6 px-3 py-4'>
                            <h1 className='text-xl font-bold'>
                                Product Details
                            </h1>


                            <div className='space-y-6'>
                                <div className='w-1/3'>
                                    <Select_Dropdown initialValue={0} value={selectedCategory} bg_color='#fff' start_empty={true} options_arr={categories.map(({ id, category_name }) => ({ id: id, label: category_name }))} required={true} on_change_handle={category_change_handle} label='Select Category' />
                                </div>
                                <div className='w-1/3'>
                                    {loadingProducts ? <div className='text-sm text-gray-400'>
                                        Loading Products...
                                    </div> : <Select_Dropdown initialValue={0} bg_color='#fff' start_empty={true}
                                        // @ts-ignore
                                        options_arr={products.map(({ product_id, product_name }) => ({ id: product_id, label: product_name }))}

                                        required={true} value={selectedProduct} on_change_handle={select_product_change_handle} label='Select Product' />}
                                </div>



                                <div className='flex'>
                                    <Quantity_Field />
                                </div>


                                <div className='flex'>
                                    <button className='bg-[#8CB3F0] text-[#fff] font-bold py-3 px-9 rounded-md hover:opacity-80 active:opacity-50' type='submit'>
                                        Add to cart
                                    </button>
                                </div>


                            </div>

                        </div>
                    </span>

                </div>

                <div className='bg-[#B8C8E1] h-[100%] rounded-md overflow-hidden flex flex-col' >

                    <div className='px-4 py-4 bg-[#e9e9e980] border-b-[1px] border-b-[#817B7B] flex items-center'>
                        <div className='flex-1'>
                            <h1 className='text-xl '>
                                Cart Items
                            </h1>
                            <p className='text-sm'>Order # 14651</p>
                        </div>

                        <RxReload size={30} />
                    </div>


                    <div className='overflow-auto h-[100%] px-4 py-4'>

                        <div className='space-y-3 '>
                            {Array(0).fill(null).map((val, ind) => {
                                return <div key={ind} className='bg-[#AFB8C6] py-2 px-3 rounded-lg'>

                                    <div className='flex items-center '>
                                        <div className='flex-1 flex items-center space-x-4'>
                                            <div className='flex flex-col items-center text-[#121111] '>
                                                <IoIosArrowUp size={20} className=' text-primary_color' />
                                                <span className='block text-lg font-bold text-[#121111]'>2</span>
                                                <IoIosArrowDown size={20} className=' text-primary_color' />
                                            </div>
                                            <dl>
                                                <dt className='text-lg '>
                                                    Office Visit
                                                </dt>

                                                <dd className='text-[15px] text-gray-700'>
                                                    Procedures
                                                </dd>
                                            </dl>
                                        </div>
                                        <div className='flex items-center space-x-4'>
                                            <p className='font-bold text-[#121111] '>
                                                $0
                                            </p>

                                            <div>
                                                <IoCloseOutline size={20} className=' text-primary_color' />
                                            </div>
                                        </div>


                                    </div>
                                </div>
                            })}
                        </div>


                    </div>


                    <div className='bg-[#FFFFFF80]'>

                        <div className='py-3 px-4 border-t-[1px] border-t-[#817B7B] space-y-3'>
                            <div className='flex items-center'>
                                <h1 className='text-lg flex-1'>
                                    Promo code
                                </h1>
                                <Promo_Input />
                            </div>
                            <div className='flex items-center'>
                                <h1 className='text-lg flex-1'>
                                    Payment method
                                </h1>
                                <Payment_Method_Select />
                            </div>

                        </div>
                        <div className='py-3 px-4 border-t-[1px] border-t-[#817B7B] space-y-3'>
                            <div className='flex items-center'>
                                <h1 className='text-lg flex-1'>
                                    Discount
                                </h1>
                                <div className='flex items-center space-x-1'>
                                    <p className='text-start'>
                                        nill
                                    </p>
                                    <IoCloseOutline />
                                </div>
                            </div>

                            <div className='flex items-center'>
                                <h1 className='text-lg flex-1'>
                                    Sub total
                                </h1>
                                <div className='flex items-center space-x-1'>
                                    <p className='text-start'>
                                        $0
                                    </p>
                                    <IoCloseOutline color='transparent' />
                                </div>
                            </div>


                            <div className='flex justify-end'>
                                <div className='bg-[#11252C] w-44 py-1 px-3 text-white rounded-md flex items-center justify-between'>
                                    <dl  >
                                        <dt>
                                            $0
                                        </dt>
                                        <dd className='text-sm font-normal'>
                                            0 items
                                        </dd>
                                    </dl>

                                    <PiCaretCircleRightFill size={35} />
                                </div>
                            </div>


                        </div>

                    </div>
                </div>

            </div>

        </main>
    )
}

export default Orders