import React, { useState,useEffect } from 'react'
import SummerApi from '../common';
import { Link } from 'react-router-dom';

const CategoryProductList = () => {
    const [categoryProduct,setCategoryProduct] = useState([]);
    const [loading,setLoading] = useState(false);
    const categoryLoading = new Array(13).fill(null);

    const fetchCategoryProduct = async()=>{
        setLoading(true);
        const fetchData = await fetch(SummerApi.getCategoryProduct.url);
        const dataRes = await fetchData.json();
        setCategoryProduct(dataRes.data);
        setLoading(false);
    }

    useEffect(()=>{
        fetchCategoryProduct()
    },[])

  return (
    <div className='container mx-auto p-4'>
       <div className='flex items-center justify-between gap-4 overflow-scroll scrollbar-none'>
            {
                loading ? (
                    categoryLoading.map((l,index)=>{
                        return (
                            <div key={index} className='md:w-20 md:h-20 w-16 h-16 rounded-full p-4 px-8 bg-slate-200 animate-pulse'></div>
                        )
                    })
                   
                ):
              (  categoryProduct.map((product,index)=>{
                    return (
                        <Link to={"/category-product?category="+product.category} key={index} className='cursor-pointer'>
                            <div className='md:w-20 md:h-20 w-16 h-16 rounded-full overflow-hidden p-4 bg-slate-200  flex items-center justify-center'>
                                <img src={product.productImage[0]} alt={product.category} className='object-scale-down h-full mix-blend-multiply hover:scale-125 transition-all'/>
                            </div>
                            <p className='text-center text-sm md:text-base capitalize'>{product?.category}</p>
                        </Link>
                    )
                }))
            }
       </div>
        </div>
  )
}

export default CategoryProductList