import { CircularProgress } from '@mui/material';
import React, { ChangeEventHandler, DetailedHTMLProps, InputHTMLAttributes, JSXElementConstructor, ReactElement } from 'react'
import { CiSearch } from 'react-icons/ci';

interface TableHeaderInterface {
    label: string;
    align?: string;
    flex?: string;
    id: string;
    render_value: (val: string, elem: any, openModal?: (orderDetails: DataListInterface) => void) => React.ReactNode
}

interface Props {
    tableHeader: TableHeaderInterface[] | any[];
    loading?: boolean;
    dataList: any[];
    openModal?: (orderDetails: DataListInterface) => void;
    tableBodyHeight?: string;
    tableHeight?: string;
    searchHandle?: (e: any) => void;
    searchInputplaceholder?: string;
    RightSideComponent?: () => React.ReactNode;
}

interface DataListInterface {
    [key: string]: any; // This allows dynamic property access
}

const TableComponent: React.FC<Props> = ({ tableHeader, loading, dataList, openModal, tableBodyHeight = 'h-[67dvh]', tableHeight = 'h-[82dvh]', searchHandle, searchInputplaceholder, RightSideComponent }) => {
    return (

        <div className={`bg-[#EFEFEF] ${tableHeight} col-span-2 rounded-md py-2 px-3`}>
            <div className='space-y-6 px-3 py-4 flex justify-between'>
                <div className='flex items-center space-x-3 px-1 py-1 w-72 text-sm rounded-sm bg-white'>
                    <CiSearch size={22} color='gray' />
                    <input onChange={searchHandle} type="text" placeholder={searchInputplaceholder} className='px-1 focus:outline-none placeholder-gray-400 text-sm font-light' />
                </div>

                {RightSideComponent ? <RightSideComponent /> : null}

            </div>



            <div className='px-2 pt-5'>
                <div className='pb-3 flex text-base text-[#71717A] items-center flex-1 font-normal border-b-2 border-b-[#E4E4E7]'>
                    {tableHeader.map(({ label, align, flex }, index: number) => (
                        <h1 key={index} className={`${flex ? flex : 'flex-[4]'} ${align || 'text-center'}`}>
                            {label}
                        </h1>
                    ))}
                </div>

                <div className={`mb-4 ${tableBodyHeight} overflow-y-auto`}>
                    {loading ? (
                        <div className='h-full w-full flex items-center justify-center'>
                            <CircularProgress />
                        </div>
                    ) : (
                        dataList.map((elem: DataListInterface, index: number) => (
                            <div key={index} className={`hover:bg-[#d0d0d0] flex items-center flex-1 text-base py-5 border-b-2 border-b-[#E4E4E7]`}>
                                {tableHeader.map(({ id, render_value, align, flex }, ind) => {
                                    const content = render_value ? render_value(elem[id], elem, openModal) : elem[id];
                                    return (
                                        <h1 key={ind} className={`${flex ? flex : 'flex-[4]'} ${align || 'text-center'}`}>
                                            {content}
                                        </h1>
                                    );
                                })}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>

    )
}

export default TableComponent



