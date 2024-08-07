import { Label, Select } from 'flowbite-react'
import React from 'react'

export const Input_Component = ({label, bg_color= 'bg-white', border = '', py='py-2', onChange, value=''}) => {
    return (
        <div className='w-full space-y-2'>
            {label && <Label htmlFor="section" value={label} className='font-bold' />}
            <div className={`${border}`}>
            <input
                value={value}
                onChange={(e)=>onChange(e.target.value)}
                type="text"
                className={`w-full h-auto p-3 rounded-lg ${bg_color} ${py} px-3`}
                id="section"
            />
            </div>
        </div>
    )
}
