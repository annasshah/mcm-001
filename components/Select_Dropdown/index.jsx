import { Label, Select } from 'flowbite-react'
import React from 'react'

export const Select_Dropdown = ({options_arr, on_change_handle, required, value='',label , start_empty }) => {
    return (
        <div className='w-full'>
            <Label htmlFor="section" value={label} className='font-bold' />
            <Select value={value}  className='w-full h-auto' onChange={on_change_handle} style={{ backgroundColor: '#D9D9D9' }} id="section" required={required}>
                {start_empty && <option disabled selected value=''>{label}</option>}
                {options_arr.map(({value,label,selected, disabled}, ind)=><option key={ind} disabled={disabled || false} selected={selected || false} value={value}>{label}</option>)}
            </Select>
        </div>
    )
}