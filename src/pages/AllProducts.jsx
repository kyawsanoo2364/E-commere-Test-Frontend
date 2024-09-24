import React, { useEffect, useState } from 'react'
import UploadProduct from '../components/UploadProduct';
import SummerApi from '../common';
import AdminProductCard from '../components/AdminProductCard';

const AllProducts = () => {
  const [showUploadProduct,setShowUploadProduct] = useState(false);
  const [allProduct,setAllProduct] = useState([]);
  const fetchAllProduct = async ()=>{
    const fetchData = await fetch(SummerApi.getAllProduct.url);
    const dataRes = await fetchData.json();

    setAllProduct(dataRes.data);
  }

  useEffect(()=>{
    fetchAllProduct();
    
  },[])
 
  return (
    <div>
      <div className='bg-white py-2 px-4 m-2 flex justify-between'>
        <h2 className='text-lg font-bold'>All Product</h2>
        <button onClick={()=>setShowUploadProduct(true)} className='border rounded-full py-1 px-4 border-red-600 text-red-600 hover:bg-red-600 hover:text-white'>Upload Product</button>
      </div>
      {/** Upload Product Component */}
      {
        showUploadProduct && <UploadProduct refetchData={fetchAllProduct} onClose={()=>setShowUploadProduct(false)}/>
      }
      {/** all product lists */}
      <div className='flex items-center py-4 px-4 gap-5 flex-wrap w-full h-[calc(100vh-200px)] overflow-y-scroll'>
        {allProduct.map((el,index)=>{
          return (
            <AdminProductCard key={index} data={el} fetchData={fetchAllProduct}/>
          )
        })}
      </div>
    </div>

  )
}

export default AllProducts