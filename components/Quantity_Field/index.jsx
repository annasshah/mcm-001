import { Label, Select } from 'flowbite-react'
import React, { useState } from 'react'
import { AiFillPlusCircle } from "react-icons/ai";
import { AiFillMinusCircle } from "react-icons/ai";


export const Quantity_Field = () => {
    const [quantity, setQuantity] = useState(0)
    const handlePlusClick = () => {
        setQuantity(quantity + 1)
    }
    const handleMinusClick = () => {
        if (quantity > 0) setQuantity(quantity - 1)
    }
    return (
        <div className='w-28'>
            <Label htmlFor="quantity" value="Quantity" className='font-bold' />
            <div className='bg-white py-1 px-3 rounded-lg flex items-center'>
                <p className='flex-1'>{quantity}</p>
                <div>
                    <AiFillPlusCircle className='cursor-pointer text-gray-600 ' onClick={handlePlusClick} />
                    <AiFillMinusCircle className={`cursor-pointer text-gray-600  ${quantity === 0 && "opacity-60"} `} onClick={handleMinusClick} />
                </div>
            </div>
        </div>
    )
}
