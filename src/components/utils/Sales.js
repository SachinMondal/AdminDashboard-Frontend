import React from 'react'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
const Sales = () => {
    return (
        <div className=' h-[2rem] w-full m-3  rounded-md'>
            <div className='flex justify-between'>
                <h5 className='text-gray-500 text-sm'>Sale Overview</h5>
                <h2 className='text-green-500 text-lg font-bold'>+18%</h2>
            </div>
            <h1 className='text-gray-500 text-left text-2xl font-extrabold'>$42.5k</h1>
            <div className='flex justify-between mt-6'>
                <h5 className='text-blue-500 text-sm'>
                    <ShoppingCartOutlinedIcon />
                    <span className='text-gray-500 '>Order</span>
                    <div className='mt-4 text-left '>
                        <h3 className='text-lg text-gray-700 font-bold'>62.5%</h3>
                        <h4 className='text-sm text-gray-500 '>5.02</h4>
                    </div>
                </h5>
                <h2 className='text-blue-500 text-sm'>
                    <span className='text-gray-500 '>Visits</span>
                    <LinkOutlinedIcon style={{ rotate: "145deg" }} />
                    <div className='mt-4 text-right '>
                        <h3 className='text-lg text-gray-700 font-bold'>62.5%</h3>
                        <h4 className='text-sm text-gray-500 '>5.02</h4>
                    </div>
                </h2>

            </div>
            <div className="border border-blue-500 mt-4 rounded-lg h-[1rem] w-full relative">
                <div className='bg-blue-500 absolute h-full rounded-lg' style={{ width: '50%' }}></div>
            </div>

        </div>
    )
}

export default Sales
