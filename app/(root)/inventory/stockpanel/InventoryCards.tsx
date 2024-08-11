import React from 'react'

const InventoryCards = () => {
    return (
        <div className='py-3 space-x-20 my-5 flex flex-1 items-center'>
            <div className='px-5 py-3 rounded-lg bg-[#EFEFEF] flex-1'>
                <h1 className='text-5xl'>131</h1>
                <h4 className='text-base'>Products</h4>
            </div>
            <div className='px-5 py-3 rounded-lg bg-[#EFEFEF] flex-1'>
                <h1 className='text-5xl'>12</h1>
                <h4 className='text-base'>Total Categories</h4>
            </div>
            <div className='px-5 py-3 rounded-lg bg-[#EFEFEF] flex-1'>
                <h1 className='text-5xl'>$750,169</h1>
                <h4 className='text-base'>Stock Value</h4>
            </div>
            <div className='px-5 py-3 rounded-lg bg-[#EFEFEF] flex-1'>
                <h1 className='text-5xl'>20%</h1>
                <h4 className='text-base'>low stock alerts</h4>
            </div>
        </div>
    )
}

export default InventoryCards
