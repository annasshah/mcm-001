import { Label, Select } from 'flowbite-react'
import React from 'react'

export const Select_Dropdown = ({options_arr, on_change_handle, required, value='',label , start_empty, bg_color= '#D9D9D9', initialValue = '' || 0}:any) => {
    return (
        <div className='w-full'>
            {label && <Label htmlFor="section" value={label} className='font-bold' />}
            <Select value={value}  className='w-full h-auto' onChange={on_change_handle} style={{ backgroundColor:bg_color  }} id="section" required={required}>
                {start_empty && <option selected value={initialValue}>{label}</option>}
                {options_arr.map(({value,label,selected, disabled}:any, ind:number)=><option key={ind} disabled={disabled || false} selected={selected || false} value={value}>{label}</option>)}
            </Select>
        </div>
    )
}
