import React from 'react'
import { Link } from 'react-router-dom'
import CancelGif from "../assest/cancel.gif"

const Cancel = () => {
  return (
    <div className='bg-slate-200 w-full max-w-md mx-auto flex flex-col justify-center items-center p-4 mt-3 rounded'>
    <img src={CancelGif} alt="" width={200} height={200} className='mix-blend-multiply'/>
    <p className='text-xl font-medium text-red-600'>Payment Cancel</p>
    <Link to={"/cart"} className='border border-red-600 text-red-600 mt-3 rounded px-4 py-2 hover:bg-red-600 hover:text-white capitalize'>Go to cart</Link>
</div>
  )
}

export default Cancel