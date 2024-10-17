import { Label } from 'flowbite-react'
import React from 'react'

// Define props interface for the Input_Component
interface InputComponentProps {
    label?: string;
    bg_color?: string;
    border?: string;
    py?: string;
    onChange: (value:any) => void; // Accepting both string and boolean for value
    value?: string | boolean; // value can be string or boolean
    placeholder?: string;
    type?: string;
    min?: string; // Keep as string to match HTML input attributes
    max?: string;
  }


export const Input_Component:React.FC<InputComponentProps> = ({
    label,
    bg_color = 'bg-white',
    border = '',
    py = 'py-2',
    onChange,
    value = '',
    placeholder = '',
    type = 'text',
    min = '',
    max = ''
}) => {
    console.log({ min, max })
    
    return (
        <div className='w-full space-y-2'>
            {label && <Label htmlFor="section" value={label} className='font-bold' />}
            <div className={type !== 'boolean' ? `${border}` : ''}>
                {['boolean', 'radio'].includes(type) ? (
                    <div className={`flex space-x-4 ${py}`}>
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="booleanRadio"
                                value="true"
                                checked={value === true}
                                onChange={() => onChange(true)}
                                className={`rounded-full ${bg_color} w-[25px] h-[25px] !border-solid !border-[2px] !border-gray-300`}
                            />
                            <span>True</span>
                        </label>
                        <label className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="booleanRadio"
                                value="false"
                                checked={value === false}
                                onChange={() => onChange(false)}
                                className={`rounded-full ${bg_color} w-[25px] h-[25px] !border-solid !border-[2px] !border-gray-300`}
                            />
                            <span>False</span>
                        </label>
                    </div>
                ) : (
                    <input
                        min={min}
                        max={100}
                        // @ts-ignore
                        value={value}
                        onChange={(e) => onChange(e.target.value)}
                        type={type}
                        placeholder={placeholder}
                        className={`w-full h-auto p-3 rounded-lg ${bg_color} ${py} px-3`}
                        id="section"
                    />
                )}
            </div>
        </div>
    );
};