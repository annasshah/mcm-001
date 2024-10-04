import { Label, Select } from 'flowbite-react'
import React from 'react'

interface OptionArrayInterface {
    value: string | number;
    label: string | number;
    selected?: boolean;
    disabled?: boolean;

}
interface Props {
    options_arr: OptionArrayInterface[]
    on_change_handle?: (e: any) => void;
    required?: boolean;
    value?: string | number;
    label?: string
    start_empty?: boolean
    bg_color?: string
    initialValue?: string | number;
}

export const Select_Dropdown = ({ options_arr, on_change_handle, required, value = '', label, start_empty = false, bg_color = '#D9D9D9', initialValue = '' || 0 }: Props) => {
    return (
        <div className='w-full'>
            {label && <Label htmlFor="section" value={label} className='font-bold' />}
            <Select value={value} className='w-full h-auto' onChange={on_change_handle} style={{ backgroundColor: bg_color }} id="section" required={required}>
                {start_empty && <option selected value={initialValue}>{label}</option>}
                {options_arr.map(({ value, label, selected, disabled }: any, ind: number) => <option key={ind} disabled={disabled || false} selected={selected || false} value={value}>{label}</option>)}
            </Select>
        </div>
    )
}
