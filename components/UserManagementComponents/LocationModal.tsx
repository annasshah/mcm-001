import { Modal } from '@mui/material'
import { MdArrowBackIos } from "react-icons/md";
import React, { useState } from 'react'
import { useLocationClinica } from '@/hooks/useLocationClinica';
import { RiCheckboxBlankFill, RiCheckboxBlankLine } from "react-icons/ri";
import { LuChevronDown } from "react-icons/lu";


const LocationModal = () => {
    const [open, setOpen] = useState(false);

    const [selectedLocationlist, setselectedLocationlist] = useState<number[]>([])

    const { locations } = useLocationClinica()


    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const onChangeHandle = () => {

    }
    const addNewHandle = () => {

    }

    const selectLocationHandle = (id: number, add: boolean) => {
        if (add) {
            // Remove the location ID if it's already in the list
            setselectedLocationlist((prev) => [...prev, id]);
        } else {
            setselectedLocationlist((prev) => prev.filter((locationId) => locationId !== id));
            // Add the location ID to the list if it's not already there
        }
    };

    return (

        <div>
            <button
                onClick={handleOpen}
                className="border-[1px] w-full border-gray-300  text-start px-3 py-2 text-gray-500 rounded-md"
            >
                <div className='flex items-center justify-between'>
                    <span>
                        Select Locations
                    </span>
                    <LuChevronDown />

                </div>
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="date-range-modal-title"
                aria-describedby="date-range-modal-description"
            >
                <div className='w-full h-full  flex justify-center items-center ' >
                    <div className='bg-white rounded-md px-4 py-5 min-w-[650px] h-[450px]'>
                        <div className='flex items-center space-x-2'>
                            <button onClick={handleClose}>
                                <MdArrowBackIos />
                            </button>
                            <h2 id="date-range-modal-title" className='font-bold'>Locations ({selectedLocationlist.length + 1} Selected)</h2>
                        </div>

                        <div className='flex flex-col w-full space-y-4 flex-1 mt-4'>
                            <div className='h-[380px] overflow-y-auto space-y-3    '>



                                {
                                    locations.map(({ title, id }: any) => {
                                        const isAddedList = selectedLocationlist.includes(id)
                                        return <button key={id} onClick={() => selectLocationHandle(id, !isAddedList)} className='border-[1px] w-full border-gray-300 rounded-lg py-3 px-2 flex items-center space-x-4'>
                                            <div>
                                                {isAddedList ? <RiCheckboxBlankFill color='green' /> : <RiCheckboxBlankLine color='lightgray' />}

                                            </div>
                                            <h1 key={id}>
                                                {title}
                                            </h1>
                                        </button>
                                    })
                                }



                            </div>

                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default LocationModal
