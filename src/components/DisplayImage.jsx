import React from 'react'
import {CgClose} from "react-icons/cg"

const DisplayImage = ({onClose,imageURL}) => {
  return (
    <div className='flex fixed top-0 bottom-0 left-0 right-0 justify-center items-center bg-gray-600 bg-opacity-50'>
        <div >
            <div className='max-h-[80%] max-w-md bg-white relative rounded'>
                 <div className='absolute top-4 right-4 text-lg cursor-pointer' onClick={onClose}>
                    <CgClose/>
                 </div>
                <img src={imageURL} className='w-full h-full ' alt={imageURL}/>
            </div>
        </div>
      
    </div>
  )
}

export default DisplayImage