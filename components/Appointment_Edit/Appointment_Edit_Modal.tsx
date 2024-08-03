'use client'
import React, { FC, useState } from 'react'
import { Custom_Modal } from '../Modal_Components/Custom_Modal'
import ScheduleDateTime, { DayTimings } from './ScheduleDateTime'
import moment from 'moment'
import { Appointment, LocationInterface } from '@/app/(root)/appoinments/page'
import { update_appointment_service } from '@/utils/supabase/data_services/data_services'
import { toast } from 'react-toastify'

interface Appointment_Edit_Modal_Props {
    location_data: LocationInterface;
    appointment_details: Appointment
}

export const Appointment_Edit_Modal: FC<Appointment_Edit_Modal_Props> = ({ location_data, appointment_details }) => {

    const [openModal, setOpenModal] = useState<boolean>(false)
    const [LoadingUpdate, setLoadingUpdate] = useState(false)
    const [isDateSelected, setIsDateSelected] = useState(false)
    const [isTimeSelected, setIsTimeSelected] = useState(false)
    const [selectedVal, setselectedVal] = useState('')


    const create_content_handle = async () => {
        setLoadingUpdate(true)

        if (selectedVal) {
            const { error, data } = await update_appointment_service(appointment_details.id,selectedVal)
            if (!error) {
                toast.success('Updated successfully');
                // Update appointment time slot in the database
                console.log('Updating appointment time slot')
                console.log(data)
                setOpenModal(false)
            }

        }
        setLoadingUpdate(false)

    }

    const openModalHandle = () => {
        setOpenModal(true)
    }
    const closeModalHandle = () => {
        setOpenModal(false)
    }


    const selectDateTimeSlotHandle = (date: Date | '', time?: string | '') => {
        if (date && time) {
            const formated_date = moment(date).format('DD-MM-YYYY')

            const createSlotForDB = `${appointment_details.location_id}|${formated_date} - ${time}`
            console.log({ createSlotForDB })
            setselectedVal(createSlotForDB)
        } else {
            setselectedVal('')

        }

        if (date) {
            setIsDateSelected(true)

        }

        if (time) {
            setIsTimeSelected(true)
        }
    }



    return (
        <Custom_Modal disabled={!isDateSelected || !isTimeSelected} Trigger_Button={<button onClick={openModalHandle} className="border-text_primary_color flex-1 text-text_primary_color border-2 active:opacity-60 rounded-md px-4 py-1 ml-2 hover:bg-text_primary_color_hover">Edit</button>} create_new_handle={create_content_handle} open_handle={openModalHandle} close_handle={closeModalHandle} is_open={openModal} Title='Update Appointment Time Slot' buttonLabel='Update' loading={LoadingUpdate} >
            <div className='grid grid-cols-1 gap-4'>

                <ScheduleDateTime selectDateTimeSlotHandle={selectDateTimeSlotHandle} data={location_data} />



            </div>

        </Custom_Modal>
    )
}
