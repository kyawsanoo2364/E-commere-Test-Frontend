import React, { useEffect, useState } from 'react'
//desktop Images
import img1 from "../assest/banner/img1.webp"
import img2 from "../assest/banner/img2.webp"
import img3 from "../assest/banner/img3.jpg"
import img4 from "../assest/banner/img4.jpg"
import img5 from "../assest/banner/img5.webp"

//mobile images 
import img1Mobile from "../assest/banner/img1_mobile.jpg"
import img2Mobile from "../assest/banner/img2_mobile.webp"
import img3Mobile from "../assest/banner/img3_mobile.jpg"
import img4Mobile from "../assest/banner/img4_mobile.jpg"
import img5Mobile from "../assest/banner/img5_mobile.png"

import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";

const BannerProduct = () => {
    const [currentImage,setCurrentImage] = useState(0)
    const desktopImages = [
        img1,
        img2,
        img3,
        img4,
        img5
    ]

    const mobileImages=[
        img1Mobile,img2Mobile,img3Mobile,img4Mobile,img5Mobile
    ]

    const nextImage = ()=>{
        if(currentImage < desktopImages.length - 1){
            setCurrentImage(prev=>prev+1);
        } else {
            setCurrentImage(0)
        }
    }

    const prevImage = ()=>{
        if(currentImage !== 0 ){
            setCurrentImage(prev=>prev-1);
        } else {
            setCurrentImage(desktopImages.length - 1)
        }
    }

    useEffect(()=>{
        const interval = setInterval(()=>{
         nextImage()
        },5000)

        return ()=>clearInterval(interval)
    },[currentImage])


  return (
    <div className='container mx-auto px-4'>
        <div className='w-full h-56 md:h-80 bg-slate-200 rounded overflow-hidden relative'>
            <div className='absolute w-full h-full flex items-center justify-between z-10 text-2xl'>
                <button className='bg-white p-1 rounded-full' onClick={prevImage}><FaAngleLeft/></button>
                <button className='bg-white p-1 rounded-full' onClick={nextImage}><FaAngleRight/></button>
            </div>
            {/** Desktop and tablet version */}
            <div className='hidden md:flex w-full h-full'>
            {desktopImages.map((img,index)=>{
                return (
                    <div className='min-h-full min-w-full h-full w-full transition-all' key={index} style={{transform:`translateX(-${currentImage * 100}%)`}}>
                    <img src={img} alt='' className='h-full w-full object-cover'/>
                </div>
                )
            })}
            </div>    

            {/**mobile version */}
            <div className='flex md:hidden w-full h-full'>
            {mobileImages.map((img,index)=>{
                return (
                    <div className='min-h-full min-w-full h-full w-full transition-all' key={index} style={{transform:`translateX(-${currentImage * 100}%)`}}>
                    <img src={img} alt='' className='h-full w-full'/>
                </div>
                )
            })}
            </div>  
        </div>
    </div>
  )
}

export default BannerProduct