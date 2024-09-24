import React, { useContext, useEffect, useState } from 'react'
import fetchCategoryProduct from '../helpers/fetchCategoryProduct';
import displayMMKCurrency from '../helpers/displayMMKCurrency';
import { Link } from 'react-router-dom';
import scrollTop from '../helpers/scrollTop';
import addToCard from '../helpers/addToCard';
import Context from '../context';


const CategoryWiseProduct = ({category,heading}) => {
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(true);
    const loadingList = new Array(13).fill(null)
    const {fetchAddToCartProductCount} = useContext(Context)
   

    const fetchData = async ()=>{
        setLoading(true);
        const resData = await fetchCategoryProduct(category);
        setLoading(false)
        setData(resData.data)
    }

    useEffect(()=>{
        fetchData();
    },[])

    const handleAddToCart =async(e,id)=>{
        await addToCard(e,id);
         fetchAddToCartProductCount();
     }
 

  
  return (
    <div className='container mx-auto px-4 my-6 relative'>
        <h1 className='text-2xl font-semibold py-2'>{heading}</h1>
       <div className=' flex items-center justify-center'>

        <div className='mt-4 grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 overflow-x-scroll scrollbar-none transition-all'>
        {loading ? (
           loadingList.map((d,index)=>{
            return (
                <div key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white shadow-sm rounded-sm animate-pulse'>
                <div className='bg-slate-200 h-40 p-2 w-full flex justify-center items-center'>
                   
                </div>
                <div className='p-4 grid gap-3'>
                    <h1 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 bg-slate-200 rounded-full p-2'></h1>
                    <p className='capitalize text-slate-500 bg-slate-200 p-2 rounded-full'></p>
                    <div className='flex gap-0.5'>
                        <p className='bg-slate-200 p-1 w-full rounded-full'></p>
                        <p className='bg-slate-200 p-1 w-full rounded-full'></p>
                    </div>
                    <button className='bg-slate-200 px-6 text-white rounded-full text-sm  py-2 '></button>
                </div>
               
            </div>
            )
        })
        ):(
data.map((d,index)=>{
    return (
        <Link to={`/product/${d._id}`} key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white shadow-sm rounded-sm ' onClick={scrollTop}>
        <div className='bg-slate-200 h-40 p-2 w-full flex justify-center items-center'>
            <img src={d.productImage[0]} alt="" className='border-none h-full object-scale-down hover:scale-110 transition-all mix-blend-multiply' />
        </div>
        <div className='p-4 grid gap-3'>
            <h1 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1'>{d.productName}</h1>
            <p className='capitalize text-slate-500'>{d?.category}</p>
            <div className='flex gap-0.5'>
                <p className='font-medium text-red-600'>{displayMMKCurrency(d?.sellingPrice)}</p>
                <p className='text-slate-500     line-through'>{displayMMKCurrency(d?.price)}</p>
            </div>
            <button className='bg-red-600 px-6 text-white rounded-full text-sm hover:bg-red-700 py-2 ' onClick={(e)=>handleAddToCart(e,d?._id)}>Add To Cart</button>
        </div>
       
    </Link>
    )
})
        )}
       
     </div>
     </div>
    </div>
  )
}

export default CategoryWiseProduct