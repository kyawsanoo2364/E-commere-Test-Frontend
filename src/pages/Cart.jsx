import React, { useContext, useEffect, useState } from 'react'
import SummerApi from '../common';
import Context from '../context';
import displayMMKCurrency from '../helpers/displayMMKCurrency';
import { MdDelete } from "react-icons/md";
import {useNavigate} from "react-router-dom"
import {loadStripe} from '@stripe/stripe-js';

const Cart = () => {
    const [data,setData] = useState([]);
    const [loading,setLoading] =useState(false);
    const {addToCartProductCount,fetchAddToCartProductCount} = useContext(Context);
    const loadingList = new Array(addToCartProductCount).fill(null);
    const totalQuantity = data.reduce((prev,curr)=>prev + curr.quantity,0);
    const totalPrice =data.reduce((prev,curr)=>prev +( curr?.productId?.sellingPrice * curr?. quantity),0);
    const navigate = useNavigate()
    

    const fetchData = async ()=>{
       
        const fetchRes = await fetch(SummerApi.addToCartProductView.url,{
            method:SummerApi.addToCartProductView.method,
            credentials:"include"
        })
        const dataRes = await fetchRes.json();
        if(dataRes.success){
            setData(dataRes.data);
        }
       
    }

    const increaseQuantity = async(id,qty)=>{
        const fetchRes = await fetch(SummerApi.updateProductCart.url,{
            method:SummerApi.updateProductCart.method,
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({id:id,quantity:qty+1}),
            credentials:"include"
        })
        const dataRes = await fetchRes.json();
        if(dataRes.success){
            fetchData();
         
        }
    }
    const decreaseQuantity = async(id,qty)=>{
        if(qty >= 2){
        const fetchRes = await fetch(SummerApi.updateProductCart.url,{
            method:SummerApi.updateProductCart.method,
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({id:id,quantity:qty-1}),
            credentials:"include"
        })
        const dataRes = await fetchRes.json();
        if(dataRes.success){
            fetchData();
        }
    }
    }

    const deleteCartProduct =async (id)=>{
        const fetchRes = await fetch(SummerApi.deleteProductCart.url,{
            method:SummerApi.deleteProductCart.method,
            credentials:"include",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({addToCartId:id})
        })
        const finishRes = await fetchRes.json();
        
        if(finishRes.success){
            fetchData()
            fetchAddToCartProductCount()
        }
    }

    const handleLoading = async ()=>{
        await fetchData()
    }

    useEffect(()=>{
        setLoading(true)
        handleLoading()
        setLoading(false)
    },[])

    const handlePayment =async()=>{
       // console.log(process.env.REACT_APP_STRIPE_PUBLIC_KEY)
        const stripePromise =await  loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);
        const fetchRes = await fetch(SummerApi.paymentCheckout.url,{
            method:SummerApi.paymentCheckout.method,
            credentials:"include",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                cartItems:data
            })
        
        })

        const dataRes = await fetchRes.json();
        if(dataRes?.id){
            stripePromise.redirectToCheckout({sessionId:dataRes.id})
        }       
    
    }

  return (
    <div className='container mx-auto min-h-[calc(100vh-100px)]'>
        <div className='text-center text-lg my-5'>
        {!loading && data.length === 0 && <div className='bg-white py-5'>No Data</div>}
        </div>
        <div className='flex gap-2 flex-col lg:flex-row h-full w-full lg:justify-between p-4'>
            <div className='w-full max-w-3xl'>
                {loading ? (
                    loadingList.map((el,i)=>{
                        return (
                            <div className='w-full my-2 h-32 bg-slate-200 animate-pulse' key={el+i}></div>
                        )
                    })
                   
                ):(
                    data.map((el,i)=>{
                        return (
                            <div className='w-full my-2 h-32 bg-white-200 border border-slate-300 grid grid-cols-[120px,1fr]' key={el+i}>
                                <div className='h-32 w-32 bg-slate-200 p-2'>
                                    <img src={el?.productId.productImage[0]} alt="" className='h-full w-full object-scale-down mix-blend-multiply'/>
                                </div>
                                <div className='px-4 py-2 relative'>
                                    <div className='absolute top-3 right-3 p-2 text-red-600 hover:bg-red-600 hover:text-white rounded-full cursor-pointer' onClick={()=>deleteCartProduct(el._id)}>
                                        <MdDelete/> 
                                    </div>
                                    <h2 className='text-lg text-ellipsis line-clamp-1'>{el.productId.productName}</h2>
                                    <p className="capitalize text-slate-500">{el.productId.category}</p>
                                    <div className='flex items-center justify-between'>
                                        <p className='text-red-600 font-medium text-lg'>{displayMMKCurrency(el?.productId?.sellingPrice)}</p>
                                        <p className='text-lg font-semibold'>{displayMMKCurrency(el?.productId?.sellingPrice * el.quantity)}</p>
                                    </div>
                                  
                                    <div className='flex gap-3 mt-1'>
                                        <button className='h-6 w-6 border border-red-600 text-red-600 flex justify-center items-center rounded hover:bg-red-600 hover:text-white' onClick={()=>decreaseQuantity(el?._id,el.quantity)}>-</button>
                                        <p>{el?.quantity}</p>
                                        <button className='h-6 w-6 border border-red-600 text-red-600 flex justify-center items-center rounded hover:bg-red-600 hover:text-white' onClick={()=>increaseQuantity(el?._id,el.quantity)}>+</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
            {/**Summary */}
            <div className='w-full max-w-sm'>
                {loading ? (
                    <div className='h-32 bg-slate-200 mt-5 lg:mt-0 w-full border border-slate-300 animate-pulse'>
                     
                    </div>
                ):(
 
                    <div className='h-32  mt-5 lg:mt-0 w-full bg-white'>
                      <h2 className='bg-red-600 text-white py-1 px-2'>Summary</h2>
                      <div className='flex justify-between gap-2 px-4 '>
                        <p>Quantity</p>
                         <p>{totalQuantity}</p>
                      </div>
                      <div className='flex justify-between gap-2 px-4 '>
                        <p>Total Price</p>
                        <p>{displayMMKCurrency(totalPrice)}</p>
                      </div>
                      <button className='bg-blue-600 text-white p-2 mt-3 w-full' onClick={()=>handlePayment()}>Payment</button>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default Cart