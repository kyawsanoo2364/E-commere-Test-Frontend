import React, { useState } from 'react'
import Role from '../common/role'
import {IoMdClose} from "react-icons/io"
import SummerApi from '../common'
import {toast} from "react-toastify"
import Loader from "react-spinners/ClipLoader"

const ChangeUserRole = ({
    name,
    email,
    role,
    onClose,
    _id,
    callFunc
}) => {
  
    const [userRole,setUserRole] = useState(role)
    const [loading,setLoading] = useState(false)
   
    const handleUserUpdate = async ()=>{
        setLoading(true)
        const fetchData = await fetch(SummerApi.updateUser.url,{
            method:SummerApi.updateUser.method,
            credentials:"include",
            headers:{
                "content-type":"application/json"
            },
            body:JSON.stringify({
                userId:_id,
                role:userRole
            })
        })
        const dataRes = await fetchData.json();
        if(dataRes.success){
            setLoading(false);
            toast.success(dataRes.message);
            callFunc()
        }

        if(dataRes.error){
            setLoading(false)
            toast.error(dataRes.message)
        }

        onClose();
    }
  return (
    <div className='fixed w-full h-full top-0 bottom-0 left-0 right-0 flex bg-[rgba(0,0,0,0.4)] justify-between items-center'>
        <div className='mx-auto bg-white w-full max-w-sm p-2 shadow-md'>
            <div>
                <button className='block ml-auto' onClick={onClose}><IoMdClose/></button>
            </div>
            <h1 className='text-lg font-semibold mb-2'>Change User Role</h1>
            <p>Name: {name}</p>
            <p>Email: {email}</p>
            <div className='flex justify-between items-center my-4'>
                <p>Role:</p>
                <select className='border rounded-sm hover:cursor-pointer' value={userRole} onChange={(e)=>setUserRole(e.target.value)}>
                    {Object.values(Role).map((el,index)=>{
                      
                        return (
                        <option key={index} value={el}>{el}</option>
                        )}
                    )}
                </select>
              
            </div>
            <button onClick={handleUserUpdate} className='mx-auto py-1 px-3 rounded-full bg-red-600 hover:bg-red-700 text-white my-3 items-center flex gap-2 ' disabled={loading}>
                {
                    loading && (
                        <Loader size={20} color='white'/>
                    )
                }  
                Change Role</button>
        </div>

    </div>
  )
}

export default ChangeUserRole