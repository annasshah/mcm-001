'use client'
import React, { FC, useEffect, useState } from 'react'
import { Button, Spinner } from 'flowbite-react';
import moment from 'moment';
import { delete_content_service, fetch_content_service } from '@/utils/supabase/data_services/data_services';
import { PiCaretUpDownBold } from 'react-icons/pi';
import { toast } from 'react-toastify';


interface DataListInterface {
    return_id: number;
    product_id: number;
    return_date: string; // ISO Date string format
    quantity: number;
    reason: string;
    sales_id: number;
    merge: boolean;
    saleshistory: {
        order_id: number;
        orders: {
            patient_id: number;
            pos: {
                firstname: string;
                lastname: string;
                phone: string;
                email: string;
            };
        };
    };
    products: {
        product_name: string;
        price: number;
        categories: {
            category_name: string;
        };
    };
}



// BFH793
// Marco Barfiled
// Order ID
// Return ID
// 20 - 10 - 2024
// 20 - 10 - 2024
// Patient name
// Patient ID
// 20 - 10 - 2024
// 20 - 10 - 2024
// Amount
// Patient Phone
// Expired.
// Patient Email
// Expired.
//     Reason

const detailsArray = (dataDetails: DataListInterface) => [
    {
        label: 'Order ID',
        value: dataDetails?.saleshistory?.order_id
    },
    {
        label: 'Return ID',
        value: dataDetails?.return_id
    },
    {
        label: 'Patient Name',
        value: `${dataDetails?.saleshistory?.orders?.pos?.firstname} ${dataDetails?.saleshistory?.orders?.pos?.lastname}`
    },
    {
        label: 'Patient ID',
        value: dataDetails?.saleshistory?.orders.patient_id
    },
    {
        label: 'Amount',
        value: dataDetails.quantity * dataDetails.products.price,
    },
    {
        label: 'Patient Phone',
        value: dataDetails?.saleshistory?.orders?.pos?.phone,
    },
    {
        label: 'Patient Email',
        value: dataDetails?.saleshistory?.orders?.pos?.email,
        col_span_02: true
    },
    {
        label: 'Reason',
        value: dataDetails.reason,
        col_span_02: true
    }
];


interface Props {
}




const Returns: FC<Props> = () => {




    const [dataList, setDataList] = useState<DataListInterface[]>([])
    const [allData, setAllData] = useState<DataListInterface[]>([])
    const [dataDetails, setDataDetails] = useState<DataListInterface | null>(null)
    const [loading, setLoading] = useState(true)
    const [deleteLoading, setDeleteLoading] = useState(false)


    const [sortOrder, setSortOrder] = useState(-1)
    const [sortColumn, setSortColumn] = useState('')

    const onChangeHandle = (e: any) => {
        const val = e.target.value
        if (val === '') {
            setDataList([...allData])

        }
        else {

            const filteredData = allData.filter((elem) => {
                const concatName = elem.products.product_name
                return concatName.toLocaleLowerCase().includes(val.toLocaleLowerCase())
            })
            setDataList([...filteredData])
        }
    }

    const detailsViewHandle = (param_data: DataListInterface) => {

        setDataDetails(param_data)
    }



    const fetch_handle = async () => {
        setLoading(true)
        // @ts-ignore
        const fetched_data: any = await fetch_content_service({ table: 'returns', selectParam: ',saleshistory(order_id, orders(patient_id,  pos(firstname,lastname,phone,email))),products(product_name, price, categories(category_name))' });
        setDataList(fetched_data)
        setAllData(fetched_data)
        setLoading(false)


    }

    useEffect(() => {
        fetch_handle()
    }, [])






    const sortHandle = (column: 'name' | 'order_id' | 'date' | 'category' | 'return_id') => {
        let sortedList: DataListInterface[] = [];

        if (column === 'name') {
            sortedList = dataList.sort((a, b) => {
                const aConcatName = `${a.saleshistory.orders.pos.firstname} ${a.saleshistory.orders.pos.lastname}`;
                const bConcatName = `${b.saleshistory.orders.pos.firstname} ${b.saleshistory.orders.pos.lastname}`;

                return sortOrder === 1
                    ? aConcatName.localeCompare(bConcatName)
                    : bConcatName.localeCompare(aConcatName);
            });
        }
        else if (column === 'order_id') {
            sortedList = dataList.sort((a, b) =>
                sortOrder === 1
                    ? a.saleshistory.order_id - b.saleshistory.order_id
                    : b.saleshistory.order_id - a.saleshistory.order_id
            );
        }
        else if (column === 'date') {
            sortedList = dataList.sort((a, b) =>
                sortOrder === 1
                    ? new Date(a.return_date).getTime() - new Date(b.return_date).getTime()
                    : new Date(b.return_date).getTime() - new Date(a.return_date).getTime()
            );
        }
        else if (column === 'category') {
            sortedList = dataList.sort((a, b) => {
                const aCategory = a.products.categories.category_name;
                const bCategory = b.products.categories.category_name;

                return sortOrder === 1
                    ? aCategory.localeCompare(bCategory)
                    : bCategory.localeCompare(aCategory);
            });
        }
        else {
            sortedList = dataList.sort((a, b) =>
                sortOrder === 1
                    ? a.return_id - b.return_id
                    : b.return_id - a.return_id
            );
        }

        setSortOrder((prevOrder) => (prevOrder === -1 ? 1 : -1));
        setDataList([...sortedList]);
        setSortColumn(column);
    };


    const discardHandle = async () => {
        setDeleteLoading(true)
        const { error } = await delete_content_service({ table: 'returns', keyByDelete: 'return_id', id:  dataDetails?.return_id! })
        if (!error) {
            setDataList((elem) => elem.filter((data: any) => data.return_id !== dataDetails?.return_id!))
            setAllData((elem) => elem.filter((data: any) => data.return_id !== dataDetails?.return_id!))
            setDataDetails(null)
            toast.success('Return has been discarded');
        }
        else if (error) {
            console.log(error.message)
            toast.error(error.message);
        }
        setDeleteLoading(false)
    }



    return (
        <main className="w-full  h-full font-[500] text-[20px]">

            <div className='flex justify-between items-center px-4 py-4 space-x-2'>
                <h1 className='text-xl font-bold'>
                    Returns
                </h1>

            </div>


            <div className='w-full min-h-[80.5dvh] h-[100%] py-2 px-2 grid grid-cols-3 gap-2'>
                <div className='bg-[#EFEFEF] h-[100%]  col-span-2 rounded-md py-2   ' >

                    <div className='space-y-6 px-3 pb-4 flex justify-between'>
                        <div>
                            <input onChange={onChangeHandle} type="text" placeholder="Product Name  " className=' px-2 py-3 w-72 text-sm rounded-md focus:outline-none mt-2' />
                        </div>






                    </div>
                    <div className='h-[1px] w-full bg-black' />

                    <div className='px-3 pt-5'>
                        {/* Table goes here */}

                        <div className='flex items-center flex-1 font-semibold'>
                            <h1 className='flex-1 text-start'>
                                Return ID <button onClick={() => sortHandle('return_id')} className='active:opacity-50'>
                                    <PiCaretUpDownBold className={`inline ${sortColumn === 'return_id' ? 'text-green-600' : 'text-gray-400/50'} hover:text-gray-600 active:text-gray-500 `} />
                                </button>
                            </h1>
                            <h1 className='flex-1 text-center'>
                                Order ID <button onClick={() => sortHandle('order_id')} className='active:opacity-50'>
                                    <PiCaretUpDownBold className={`inline ${sortColumn === 'order_id' ? 'text-green-600' : 'text-gray-400/50'} hover:text-gray-600 active:text-gray-500 `} />
                                </button>
                            </h1>
                            <h1 className='flex-1 text-center'>
                                Product <button onClick={() => sortHandle('date')} className='active:opacity-50'>
                                    <PiCaretUpDownBold className={`inline ${sortColumn === 'date' ? 'text-green-600' : 'text-gray-400/50'} hover:text-gray-600 active:text-gray-500 `} />
                                </button>
                            </h1>
                            <h1 className='flex-1 text-end'>
                                Category <button onClick={() => sortHandle('category')} className='active:opacity-50'>
                                    <PiCaretUpDownBold className={`inline ${sortColumn === 'category' ? 'text-green-600' : 'text-gray-400/50'} hover:text-gray-600 active:text-gray-500 `} />
                                </button>
                            </h1>
                        </div>








                        <div className='mt-5 h-[60dvh] overflow-y-scroll space-y-5'>
                            {loading ? <div className="flex h-full flex-1 flex-col justify-center items-center">
                                <Spinner size='xl' />
                            </div> :
                                dataList.length > 0 ? dataList.map((elem) => {
                                    const { return_id, saleshistory: { order_id }, products: { product_name, categories: { category_name } } } = elem
                                    return <div key={return_id} onClick={() => detailsViewHandle(elem)} className='cursor-pointer hover:bg-gray-500 hover:text-white flex items-center flex-1 font-semibold bg-white px-3 py-4 rounded-md '>
                                        <h1 className='ms-4 flex-1 text-start'>
                                            {return_id}
                                        </h1>
                                        <h1 className='flex-1 text-center'>
                                            {order_id}
                                        </h1>
                                        <h1 className='flex-1 text-center'>
                                            {product_name}
                                        </h1>
                                        <h1 className='flex-1 text-end me-4'>
                                            {category_name}
                                        </h1>
                                    </div>
                                }) : <div className="flex h-full flex-1 flex-col justify-center items-center">
                                    <h1>
                                        No patient found!
                                    </h1>
                                </div>}
                        </div>
                    </div>


                </div>

                <div className='bg-[#EFEFEF] h-[100%] rounded-md overflow-hidden flex flex-col' >

                    <div className='px-4 py-4  border-b-[1px]'>
                        <h1 className='text-2xl  font-bold w-full'>
                            Details
                        </h1>
                    </div>

                    {/* Right side content goes here */}


                    {dataDetails && <div className='overflow-auto px-4 py-4 grid grid-cols-2 gap-6'>

                        {detailsArray(dataDetails).map((detail, index) => (
                            <dl className={`${detail.col_span_02 ? 'col-span-2' : ''}`} key={index}>
                                <dd className='text-[17px]'>{detail.value}</dd>
                                <dt className='text-sm text-[#707070]'>{detail.label}</dt>
                            </dl>
                        ))}





                        <div className='col-span-2 flex items-center space-x-5'>

                            <Button disabled={deleteLoading} onClick={discardHandle} className='flex-1' color="gray" >
                                Discard
                            </Button>
                            <Button className='flex-1' color="success">
                                Merge
                            </Button>
                        </div>






                    </div>}





                </div>

            </div>


        </main>
    )
}

export default Returns