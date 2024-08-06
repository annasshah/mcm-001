import { Label, Select } from 'flowbite-react'
import React from 'react'

export const Input_Component_Appointment = ({ label, onChange, placeholder, type='text' }) => {
    return (
        <div className='w-full flex flex-1 items-center space-x-2'>
            <Label htmlFor="section" value={label} className='font-bold break-words' />
            <div className='border-[1px] border-[#CBD5E1] flex-1 rounded-lg'>
                <input
                    placeholder={placeholder}
                    onChange={(e) => onChange(e.target.value)}
                    type={type}
                    className={`w-full h-auto  rounded-lg py-3 px-3`}
                    id="section"
                />
            </div>
        </div>
    )
}
