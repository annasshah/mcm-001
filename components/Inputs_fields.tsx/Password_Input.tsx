'use client'
import React, { useState } from 'react'
import { IoIosEyeOff, IoMdEye } from 'react-icons/io'

export const Password_Input = ({Child_Input_Compionent} : {Child_Input_Compionent:any}) => {
    const [show_password, setShow_password] = useState(false)
    const toggle_password = () => {
        setShow_password(!show_password)
    }
    return (
        <div className="border-b-black border-b-2 flex items-center">

            <Child_Input_Compionent show_password={show_password}  />
            
            <span onClick={toggle_password} className="cursor-pointer">
                {show_password ? <IoIosEyeOff size={30} /> : <IoMdEye size={30} />}
            </span>
        </div>
    )
}
