import { Label, Select } from 'flowbite-react'
import React from 'react'

export const Input_Component = ({label}) => {
    return (
        <div className='w-full'>
            {label && <Label htmlFor="section" value={label} className='font-bold' />}
            <input
                type="text"
                className='w-full h-auto p-3 rounded-lg bg-white py-2 px-3'
                id="section"
            />
        </div>
    )
}
