import React from 'react'
import successGif from "../assest/success.gif"
import { Link } from 'react-router-dom'

const Success = () => {
  return (
    <div className='bg-slate-200 w-full max-w-md mx-auto flex flex-col justify-center items-center p-4 mt-3 rounded'>
        <img src={successGif} alt="" width={200} height={200} className='mix-blend-multiply'/>
        <p className='text-xl font-medium text-green-600'>Payment Successfully</p>
        <Link to={"/order"} className='border border-green-600 text-green-600 mt-3 rounded px-4 py-2 hover:bg-green-600 hover:text-white'>See Order</Link>
    </div>
  )
}

export default Success