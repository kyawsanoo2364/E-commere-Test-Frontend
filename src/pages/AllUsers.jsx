import React, { useEffect, useState } from 'react'
import SummerApi from '../common'
import { toast } from 'react-toastify';
import moment from "moment"
import {MdModeEdit} from "react-icons/md"
import ChangeUserRole from '../components/ChangeUserRole';

const AllUsers = () => {
    const [allUser,setAllUser] = useState([]);
    const [showUpdateUserPanel,setShowUpdateUserPanel] = useState(false);
    const [updateUser,setUpdateUser] = useState({
        email:"",
        name:"",
        role:"",
        _id:""
    });

    const fetchAllUser = async()=>{
        const fetchData = await fetch(SummerApi.allUser.url,{
            method:SummerApi.allUser.method,
            credentials:"include"
        });
        const dataRes = await fetchData.json();

        if(dataRes.success){
            setAllUser(dataRes.data);
        }
        if(dataRes.error){
            toast.error(dataRes.message);
        }
    }

    useEffect(()=>{
        fetchAllUser()
    },[])

  return (
    <div className='mt-3 mx-2'>
        <table className='w-full userTable'>
            <thead >
                <tr className='bg-black'>
                    <th>Sr.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Created Date</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
               
                    {
                        allUser && allUser.length > 0 && allUser.map((el,index)=>{
                            return <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{el.name}</td>
                                <td>{el.email}</td>
                                <td>{el.role}</td>
                                <td>{moment(el.createdAt).format("lll")}</td>
                                <td>
                                    <button className='bg-green-100 p-2 rounded-full hover:cursor-pointer hover:bg-green-500 hover:text-white' onClick={()=>{
                                        setUpdateUser(el);
                                        setShowUpdateUserPanel(true);
                                    }}>
                                        <MdModeEdit/>
                                    </button>
                                </td>
                           </tr>
                        })
                    }
                
            </tbody>
        </table>
        {
            showUpdateUserPanel && (
                <ChangeUserRole onClose={()=>setShowUpdateUserPanel(false)} name={updateUser.name} email={updateUser.email} role={updateUser.role} _id={updateUser._id} callFunc={fetchAllUser}/>
            )
        }
       
    </div>
  )
}

export default AllUsers