import React, { useContext, useState } from 'react'
import LoginIcon from "../assest/signin.gif"
import {FaEye,FaEyeSlash} from "react-icons/fa"
import {Link, useNavigate} from "react-router-dom"
import SummerApi from '../common'
import {toast} from "react-toastify"
import Context from '../context'


const Login = () => {
    const [showPassword,setShowPassword] = useState(false);
    const {fetchUserData,fetchAddToCartProductCount} = useContext(Context);
    const navigate = useNavigate()
    const [data,setData] = useState({
        email:"",
        password:""
    });

    const handleChange = (e)=>{
        setData({...data,[e.target.name]:e.target.value});
    }

    const handleSubmit=async (e)=>{
        e.preventDefault()
        try{
          
            const dataRes = await fetch(SummerApi.signin.url,{
                body:JSON.stringify(data),
                headers:{
                    "content-type":"application/json"
                },
                method:SummerApi.signin.method,
                credentials:"include",
              
            })

            const dataFromServer = await dataRes.json();
    
            if(dataFromServer.success){
                toast.success(dataFromServer.message)
                navigate("/")
                fetchUserData() 
                fetchAddToCartProductCount()
            }
            if(dataFromServer.error){
                toast.error(dataFromServer.message)
            }
        } catch(e){
            console.log(e)
        }
      


    }

    return (
    <section id="login">
        <div className='mx-auto container p-4 h-[calc(100vh-100px)]'>
            <div className='w-full max-w-sm bg-white mx-auto p-2 py-3'>
                <div className='w-20 h-20 mx-auto '>
                    <img src={LoginIcon} alt="Login Icon"/>
                </div>

                <form className='pt-6 flex flex-col' onSubmit={handleSubmit}>
                    <div className='grid'>
                        <label>Email</label>
                        <div className='bg-slate-100 p-2'>
                        <input type="email" name="email" value={data.email} onChange={handleChange} placeholder='Enter your email' className='w-full h-full outline-none bg-transparent' />
                        <div>

                        </div>
                        </div> 
                    </div>
                    <div className='mt-3'>
                        <label>Password</label>
                        <div className='bg-slate-100 p-2 flex items-center'>
                        <input name="password" value={data.password} onChange={handleChange} type={showPassword ? "text":"password"} placeholder='Enter your pasword' className='w-full h-full outline-none bg-transparent'/>

                        <div className='cursor-pointer text-xl' onClick={()=>setShowPassword(!showPassword)}>
                            {
                                !showPassword ? (
                                    <FaEyeSlash/>
                                ) :(
                                    <FaEye/>
                                )
                            }
                        </div>
                        </div> 
                        <Link to={"/forgot-password"} className='ml-auto w-fit block hover:underline hover:text-red-600'>
                            Forgot Password?
                        </Link>
                    </div>
                    <button className='px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-[150px] hover:scale-110 mx-auto transition-all block mt-6 duration-200'>Login</button>
                </form>
                <p className='my-5'>Don't have account? <Link className='hover:text-red-700 hover:underline' to={"/sign-up"}>Sign Up</Link></p>
            </div>
        </div>
    </section>
)
}

export default Login