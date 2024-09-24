import React,{useEffect} from 'react'
import { useSelector } from 'react-redux'
import { FaRegCircleUser } from 'react-icons/fa6';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import role from '../common/role';

const AdminPanel = () => {
    const navigate = useNavigate()
    const user = useSelector((state)=>state?.user?.user);

    useEffect(()=>{
        if(user?.role !== role.ADMIN){
            navigate("/")
        }
    },[user])

  return (
    <div className='h-[calc(100vh-135px)] md:flex hidden'>
        <aside className='w-full min-h-full max-w-60 bg-white shadow-lg mt-1'>
            <div className='h-32 flex items-center justify-center mt-5'>
             <div className='flex justify-center flex-col items-center'>
                <div className='text-5xl cursor-pointer' >
                {user?.profilePic ? (
                    <img src={user.profilePic} alt={user?.name} className='w-20 h-20 rounded-full'/>
                ) :(
                    <FaRegCircleUser/>
                )}
                
                </div>
                <p className='text-lg font-semibold mt-2 capitalize'>{user?.name}</p>
                <p className='text-sm'>{user?.role}</p>
            </div>
            
             </div>
                 {/* navigation */}
                 <div>
                    <nav className='grid mt-2'>
                        <Link to={"all-users"} className='px-4 py-2 hover:bg-slate-100'>All Users</Link>
                        <Link to={"products"} className='px-4 py-2 hover:bg-slate-100'>product</Link>
                    </nav>
                </div>
        </aside>
        <main className='w-full h-full'>
            <Outlet/>
        </main>
    </div>
  )
}

export default AdminPanel