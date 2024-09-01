'use client'
import { Select_Dropdown } from '@/components/Select_Dropdown';
import React, { FC, useEffect, useState } from 'react'
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
import { currencyFormatHandle } from '@/helper/common_functions'
import { create_content_service } from '@/utils/supabase/data_services/data_services';
import { toast } from 'react-toastify';
// interface PatientDetailsInterface {
//     name: string;
//     phone_number: string;
//     email: string;
//     treatment_category: string;
// }

interface CartItemComponentInterface {
    data: CartArrayInterface,
    index: number;
    controllProductQtyHandle: (product_id: number, qty: number, price: number, index: number) => void
}
interface CartArrayInterface {
    product_id: number;
    quantity: number;
    product_name: string;
    category_name: string;
    category_id: number;
    price: number;
    quantity_available: number;
}


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


const grandTotalHandle = (ProductArray: CartArrayInterface[]) => {

    const totalQty = ProductArray.reduce((a, b) => a + b.quantity, 0)
    const totalAmount = ProductArray.reduce((a, b) => a + (b.quantity * b.price), 0)

    return { qty: totalQty, amount: currencyFormatHandle(totalAmount) }

}


const calcTotalAmount = (perItemAmount: number, qty: number) => {


    return currencyFormatHandle(perItemAmount * qty)

}

const CartItemComponent: FC<CartItemComponentInterface> = ({ data, controllProductQtyHandle, index }) => {

    const { product_name, category_name, quantity, quantity_available, product_id, price } = data


    const qtyHandle = (type: string) => {
        let newQty = quantity
        if (type === 'inc') {
            newQty += 1
        }
        else {
            newQty -= 1

        }
        controllProductQtyHandle(product_id, newQty, price, index)
    }

    return <div className='bg-[#AFB8C6] py-2 px-3 rounded-lg'>

        <div className='flex items-center '>
            <div className='flex-1 flex items-center space-x-4'>
                <div className='flex flex-col items-center text-[#121111] '><button onClick={() => qtyHandle('inc')} className='disabled:opacity-60' disabled={quantity_available === quantity}>
                    <IoIosArrowUp size={20} className=' text-primary_color' /></button>
                    <span className='block text-lg font-bold text-[#121111]'>{quantity}</span>
                    <button disabled={quantity === 0} className='disabled:opacity-60' onClick={() => qtyHandle('dec')} > <IoIosArrowDown size={20} className=' text-primary_color' /></button>
                </div>
                <dl>
                    <dt className='text-lg '>
                        {product_name}
                    </dt>

                    <dd className='text-[15px] text-gray-700'>
                        {category_name}
                    </dd>
                </dl>
            </div>
            <div className='flex items-center space-x-4'>
                <p className='font-bold text-[#121111] '>
                    {calcTotalAmount(price, quantity)}
                </p>

                <div>
                    <button>
                        <IoCloseOutline size={20} className=' text-primary_color' />
                    </button>
                </div>
            </div>


        </div>
    </div>
}


const Orders = () => {


    const { categories } = useCategoriesClinica()
    const [selectedPatient, setSelectedPatient] = useState<any>(null)
    const { selectedCategory, products, getCategoriesByLocationId, loadingProducts, selectedProduct, selectProductHandle } = useProductsClinica()
    const [fetchingDataLoading, setfetchingDataLoading] = useState(true)
    const [cartArray, setCartArray] = useState<CartArrayInterface[]>([])
    const [productQty, setProductQty] = useState<number>(0)
    const [placeOrderLoading, setPlaceOrderLoading] = useState(false)


    const router = useRouter()

    const category_change_handle = (e: any) => {
        const value = e.target.value
        getCategoriesByLocationId(value)
        setProductQty(0)
    }

    const select_product_change_handle = (e: any) => {
        const value = e.target.value
        console.log(value)
        selectProductHandle(value)
        setProductQty(0)
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




    const quantityHandle = (qty: number) => {
        setProductQty(qty)

    }



    const addToCartHandle = () => {
        const findCategory: any = categories.find(({ category_id }: any) => +selectedProduct.category_id === +category_id)

        let addProduct: CartArrayInterface | null = null
        if (findCategory) {
            addProduct = {
                product_id: selectedProduct.product_id,
                product_name: selectedProduct.product_name,
                quantity: productQty,
                category_name: findCategory.category_name,
                category_id: findCategory.category_id,
                quantity_available: selectedProduct.quantity_available,
                price: selectedProduct.price,
            }
            if (addProduct) {
                cartArray.push(addProduct)
                setCartArray([...cartArray])
                selectProductHandle(0)
                setProductQty(0)
                getCategoriesByLocationId(0)
            }
        }
    }

    console.log(cartArray, selectedProduct)



    const controllProductQtyHandle = (product_id: number, qty: number, price: number, index: number) => {
        if (qty === 0) {
            cartArray.splice(index, 1)
        } else {
            cartArray[index].quantity = qty
            console.log({ product_id, qty })
        }
        setCartArray([...cartArray])

    }




    const placeOrderHandle = async () => {
        try {
            setPlaceOrderLoading(true);
    
            if (!selectedPatient) return;
    
            const { data, error }: any = await create_content_service({
                table: 'orders',
                post_data: { patient_id: selectedPatient.id },
            });
    
            if (error) throw new Error(error.message);
    
            if (data?.length) {
                const order_id = data[0].order_id;
    
                const post_data = cartArray.map((elem) => ({
                    order_id,
                    product_id: elem.product_id,
                    quantity_sold: elem.quantity,
                    total_price: elem.price * elem.quantity,
                }));
    
                const { data: order_created_data, error: order_created_error }: any = await create_content_service({
                    table: 'saleshistory',
                    post_data,
                    multiple_rows: true,
                });
    
                if (order_created_error) throw new Error(order_created_error.message);
    
                if (order_created_data.length) {
                    toast.success(`Order has been placed, order # ${order_id}`);
                    setCartArray([]);
                }
            }
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            setPlaceOrderLoading(false);
        }
    };
    
    



    return (
        <main className="w-full  h-full font-[500] text-[20px]">


            <div className='w-full min-h-[78dvh] h-[100%] py-2 px-2 grid grid-cols-3 gap-2'>
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
                                    <Select_Dropdown initialValue={0} value={selectedCategory} bg_color='#fff' start_empty={true} options_arr={categories.map(({ id, category_name }: any) => ({ id: id, label: category_name }))} required={true} on_change_handle={category_change_handle} label='Select Category' />
                                </div>
                                <div className='w-1/3'>
                                    {loadingProducts ? <div className='text-sm text-gray-400'>
                                        Loading Products...
                                    </div> : <Select_Dropdown initialValue={0} bg_color='#fff' start_empty={true}
                                        // @ts-ignore
                                        options_arr={products.map(({ product_id, product_name }: any) => ({ value: product_id, label: product_name }))}

                                        required={true} value={selectedProduct ? selectedProduct.product_id : 0} on_change_handle={select_product_change_handle} label='Select Product' />}
                                </div>



                                <div className='flex'>
                                    <Quantity_Field maxAvailability={selectedProduct ? selectedProduct.quantity_available : 0} quantity={productQty} quantityHandle={quantityHandle} />
                                </div>


                                <div className='flex'>
                                    <button disabled={!productQty} onClick={addToCartHandle} className='bg-[#8CB3F0] text-[#fff] font-bold py-3 px-9 rounded-md hover:opacity-80 active:opacity-50 disabled:opacity-60' type='submit'>
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
                            <p className='text-sm'>Order # --</p>
                        </div>

                        {/* <RxReload size={30} /> */}
                    </div>


                    <div className='overflow-auto h-[37.5vh] px-4 py-4'>

                        <div className='space-y-3 '>
                            {cartArray.map((data: CartArrayInterface, ind) => {
                                return <CartItemComponent index={ind} data={data} key={ind} controllProductQtyHandle={controllProductQtyHandle} />
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
                                        {grandTotalHandle(cartArray).amount}
                                    </p>
                                    <IoCloseOutline color='transparent' />
                                </div>
                            </div>


                            <div className={`flex justify-end `}>
                                <button onClick={placeOrderHandle} disabled={!cartArray.length} className='bg-[#11252C] w-44 py-1 px-3 text-white rounded-md disabled:opacity-75'>

                                    {placeOrderLoading ? <div className='h-12 flex justify-center items-center'>
                                        <CircularProgress size={25} color='secondary' />
                                    </div>
                                        : <div className='flex items-center justify-between'>
                                            <dl >
                                                <dt className='text-start'>
                                                    {grandTotalHandle(cartArray).amount}
                                                </dt>
                                                <dd className='text-sm font-normal'>
                                                    {grandTotalHandle(cartArray).qty} items
                                                </dd>
                                            </dl>

                                            <PiCaretCircleRightFill size={35} />
                                        </div>}
                                </button>
                            </div>


                        </div>

                    </div>
                </div>

            </div>

        </main>
    )
}

export default Orders