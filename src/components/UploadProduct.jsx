import React, { useState } from 'react'
import {CgClose} from "react-icons/cg"
import productCategory from '../helpers/productCategory'
import {FaCloudUploadAlt} from "react-icons/fa"
import uploadImage from '../helpers/uploadImage'
import DisplayImage from './DisplayImage'
import Loader from "react-spinners/ClipLoader"
import { MdDelete } from "react-icons/md";
import SummerApi from '../common'
import {toast} from "react-toastify"

const UploadProduct = ({
    onClose,
    refetchData
}) => {
    const [loading,setLoading] = useState(false);
    const [showImageFull,setShowImageFull] = useState(false);
    const [viewImageUrl,setViewImageUrl] = useState("");
    const [data,setData] = useState({
        productName:"",
        brandName:"",
        productImage:[],
        category:"",
        description:"",
        price:"",
        sellingPrice:""
    })

    const handleChange =async (e)=>{
        const {name,value} = e.target;
        setData((prev)=>{
            return {
                ...prev,
                [name]:value
            }
        })
    }

    const handleUploadProductImage =async (e)=>{
        setLoading(true);
        const file = e.target.files[0];
        const uploadToCloudinary =await uploadImage(file);
        setData({...data,productImage:[...data.productImage,uploadToCloudinary.url]})
        setLoading(false);
    }

    const handleDeleteProductImage = async (index)=>{
       
        const newProductImage = [...data.productImage];
        newProductImage.splice(index,1)
        setData({...data,productImage:[...newProductImage]})
    }

    const hanldeSubmit=async(e)=>{
        e.preventDefault();
        const fetchData = await fetch(SummerApi.uploadProduct.url,{
            method:SummerApi.uploadProduct.method,
            credentials:"include",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify(data)
        })
        const resData = await fetchData.json();
        if(resData.success){
            toast.success(resData.message);
            onClose()
            refetchData()
        }

        if(resData.error){
            toast.error(resData.message);
        }
    }

  return (
    <div className='fixed bg-slate-400 bg-opacity-40 w-full h-full top-0 left-0 bottom-0 right-0 flex justify-center items-center '>
        <div className='bg-white w-full max-w-2xl py-2 px-5 max-h-[80%] h-full rounded overflow-hidden'>
            <div className='flex justify-between items-center bg-white p-3'>
                <h2 className='text-lg font-bold'>Upload Product</h2>
                <CgClose className='cursor-pointer w-fit' onClick={onClose}/>
            </div>
            <form className='grid gap-4 p-4 overflow-y-scroll pb-3 h-[90%]' onSubmit={hanldeSubmit}>
                <label htmlFor="productName">Product Name</label>
                <input type="text" id="productName" placeholder='Enter Product Name' value={data.productName} onChange={handleChange} className='p-2 rounded bg-slate-100 border' name='productName'/>
                <label htmlFor="brandName">Brand Name</label>
                <input type="text" id="brandName" placeholder='Enter Brand Name' value={data.brandName} onChange={handleChange} className='p-2 rounded bg-slate-100 border' name='brandName'/>

                <label htmlFor='category' className='mt-3'>Category</label>
                <select name="category" id="category" value={data.category} className='p-2 rounded bg-slate-100 border' onChange={handleChange}>
                    <option value="" >Select Category</option>
                    {productCategory.map((el,index)=><option value={el.value} key={el.value + index}>{el.label}</option>)}
                </select>

                <label htmlFor="productImage"className='mt-3'>Product Image</label>
                <label htmlFor="uploadImage">
                <div className='bg-slate-100 w-full h-32 border flex items-center justify-center cursor-pointer'>
                   <div className='text-slate-500 flex flex-col justify-center items-center gap-2'>
                        <FaCloudUploadAlt className='text-4xl'/>
                        <p>Upload Product Image</p>
                        <input type="file" id='uploadImage' className='hidden' onChange={handleUploadProductImage}/>
                   </div>
                </div>
                </label>
                <div className='flex gap-2'>
                    {data.productImage[0]? data.productImage.map((el,index)=><div className='relative group'>
                        <img src={el} alt={el} width={80} height={80} className='bg-slate-200 cursor-pointer' onClick={()=>{
                        setShowImageFull(true);
                        setViewImageUrl(el);
                    }} key={el+index} />

                        <div className='absolute bottom-1 right-1 text-white bg-red-500 rounded-full p-1 hidden cursor-pointer group-hover:block hover:bg-red-600' onClick={()=>handleDeleteProductImage(index)}>
                            <MdDelete/>
                        </div>

                    </div>  ): !loading ?
                    <p className='text-red-500 '>*Please upload image</p>:null
                    }
                    {loading && 
                        <div className='w-[80px] h-[80px] bg-slate-200 flex justify-center items-center'>
                            <Loader size={40} color='gray'/>
                        </div>
                    }
                  
                </div>

                <label htmlFor="price">Price</label>
                <input type="number" id="price" placeholder='Enter Price' value={data.price} onChange={handleChange} className='p-2 rounded bg-slate-100 border' name='price'/>

                <label htmlFor="sellingPrice">Selling Price</label>
                <input type="number" id="sellingPrice" placeholder='Enter Selling Price' value={data.sellingPrice} onChange={handleChange} className='p-2 rounded bg-slate-100 border' name='sellingPrice'/>

                <label htmlFor="description" className='mt-3'>Description</label>
                <textarea name="description" id="description" rows={3} className='h-32 bg-slate-100 p-2 resize-none' placeholder='Enter Product Description' value={data.description} onChange={handleChange}></textarea>

                <button className='w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700'>Upload Product</button>
             
            </form>
        </div>
        {
            showImageFull &&   <DisplayImage imageURL={viewImageUrl} onClose={()=>setShowImageFull(false)}/>
        }
      
    </div>
  )
}

export default UploadProduct