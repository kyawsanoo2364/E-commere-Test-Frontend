import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryProduct from '../helpers/fetchCategoryProduct';
import displayMMKCurrency from '../helpers/displayMMKCurrency';
import { FaAngleLeft } from "react-icons/fa6";
import { FaAngleRight } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import addToCard from '../helpers/addToCard';
import Context from '../context';


const HorizontalProduct = ({category,heading}) => {
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(true);
    const loadingList = new Array(13).fill(null)
    const scrollElement = useRef()
    const {fetchAddToCartProductCount} = useContext(Context);

    const fetchData = async ()=>{
        setLoading(true);
        const resData = await fetchCategoryProduct(category);
        setLoading(false)
        setData(resData.data)
    }

    useEffect(()=>{
        fetchData();
    },[])

    const scrollRight = ()=>{
        scrollElement.current.scrollLeft +=300
    }

    const scrollLeft = ()=>{
        scrollElement.current.scrollLeft -=300
    }

    const handleAddToCart =async (e,id)=>{
       await addToCard(e,id);
        fetchAddToCartProductCount();
    }

  return (
    <div className='container mx-auto px-4 my-6 relative'>
        <h1 className='text-2xl font-semibold py-2'>{heading}</h1>
        <div className='flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all' ref={scrollElement}>
        <button className='bg-white p-1 rounded-full absolute left-0 text-lg hidden md:block' onClick={scrollLeft}><FaAngleLeft/></button>
        <button className='bg-white p-1 rounded-full absolute right-0 text-lg hidden md:block' onClick={scrollRight}><FaAngleRight/></button>

        {
        loading ? (
         loadingList.map((d,index)=>{
            return (
                <div key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white shadow-sm rounded-sm flex animate-pulse'>
                <div className='bg-slate-200 h-full p-2 min-w-[120px] md:min-w-[145px]'>
                    
                </div>
                <div className='p-4 grid w-full'>
                    <h1 className='font-medium my-1 text-base md:text-lg text-ellipsis line-clamp-1  bg-slate-200 rounded-full '></h1>
                    <p className='capitalize text-slate-500 bg-slate-200 mt-1 rounded-full h-4'></p>
                    <div className='flex gap-0.5 '>
                        <p className=' text-red-600 h-3 bg-slate-200 w-full rounded-full'></p>
                        <p className=' bg-slate-200 h-3 w-full rounded-full'></p>
                    </div>
                    <button className=' px-6 text-white rounded-full  py-0.5 bg-slate-200'></button>
                </div>
               
            </div>
            )
        })
        ): data.map((d,index)=>{
            return (
                <Link to={`product/${d._id}`} key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white shadow-sm rounded-sm flex'>
                <div className='bg-slate-200 h-full p-2 max-w-[120px] md:max-w-[145px]'>
                    <img src={d.productImage[0]} alt="" className='h-full object-scale-down hover:scale-110 transition-all' />
                </div>
                <div className='p-4 grid'>
                    <h1 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1'>{d.productName}</h1>
                    <p className='capitalize text-slate-500'>{d?.category}</p>
                    <div className='flex gap-0.5'>
                        <p className='font-medium text-red-600 text-sm'>{displayMMKCurrency(d?.sellingPrice)}</p>
                        <p className='text-slate-500 text-sm     line-through'>{displayMMKCurrency(d?.price)}</p>
                    </div>
                    <button className='bg-red-600 px-6 text-white rounded-full text-sm hover:bg-red-700 py-0.5 ' onClick={(e)=>handleAddToCart(e,d?._id)}>Add To Cart</button>
                </div>
               
            </Link>
            )
        })
        }
       
     </div>
    </div>
  )
}

export default HorizontalProduct