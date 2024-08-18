import { Label } from 'flowbite-react'
import React from 'react'

// export const Input_Component = ({label, bg_color= 'bg-white', border = '', py='py-2', onChange, value='', placeholder='', type='text'}) => {
//     return (
//         <div className='w-full space-y-2'>
//             {label && <Label htmlFor="section" value={label} className='font-bold' />}
//             <div className={`${border}`}>
//             <input
//                 value={value}
//                 onChange={(e)=>onChange(e.target.value)}
//                 type={type}
//                 placeholder={placeholder}
//                 className={`w-full h-auto p-3 rounded-lg ${bg_color} ${py} px-3`}
//                 id="section"
//             />
//             </div>
//         </div>
//     )
// }


export const Input_Component = ({
    label,
    bg_color = 'bg-white',
    border = '',
    py = 'py-2',
    onChange,
    value = '',
    placeholder = '',
    type = 'text'
}) => {
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
