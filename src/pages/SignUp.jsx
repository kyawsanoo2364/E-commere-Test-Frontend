import React, { useState } from "react";
import LoginIcon from "../assest/signin.gif";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import ImageToBase64 from "../helpers/ImageToBase64";
import SummerApi from "../common";
import { toast } from "react-toastify";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword,setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profilePic:""
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    if(data.password !== data.confirmPassword){
      console.log("Invalid Password!")
      return;
    }

    const responseData = await fetch(SummerApi.signup.url,{
      headers:{
        "content-type":"application/json"
      },
      method:SummerApi.signup.method,
      body:JSON.stringify(data)
    })

    const dataApi = await responseData.json();
    if(dataApi.success){
      toast.success(dataApi.message);
      navigate("/login")
    }
    if(dataApi.error){
      toast.error(dataApi.message)
    }

  };

  const handleUploadPic =async (e)=>{
    const file = e.target.files[0]; 
    const image = await ImageToBase64(file);
    setData({...data,profilePic:image})
  }

  return (
    <section id="signup">
      <div className="mx-auto container p-4">
        <div className="w-full max-w-sm bg-white mx-auto p-2 py-3">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full">
            <div>
            <img src={data.profilePic || LoginIcon} alt="Login Icon" />
            </div>
            <form >
              <label>
                <div className="bg-slate-200 text-xs pt-2 pb-4 cursor-pointer text-center absolute bottom-0 w-full opacity-80">
                  Upload Photo
                </div>
                <input type="file" onChange={handleUploadPic} className="hidden" />
              </label>
             
            </form>
           
          </div>

          <form className="pt-6 flex flex-col gap-3" onSubmit={handleSubmit}>
            <div className="grid">
              <label>Name</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="text"
                  name="name"
                  value={data.name}
                  onChange={handleChange}
                  placeholder="Enter your name"
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
                <div></div>
              </div>
            </div>
            <div className="grid">
              <label>Email</label>
              <div className="bg-slate-100 p-2">
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className="w-full h-full outline-none bg-transparent"
                />
                <div></div>
              </div>
            </div>
            <div className="mt-3">
              <label>Password</label>
              <div className="bg-slate-100 p-2 flex items-center">
                <input
                  name="password"
                  value={data.password}
                  onChange={handleChange}
                  required
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your pasword"
                  className="w-full h-full outline-none bg-transparent"
                />

                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {!showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
            <div className="mt-3">
              <label>Confirm Password</label>
              <div className="bg-slate-100 p-2 flex items-center">
                <input
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleChange}
                  required
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Enter your pasword"
                  className="w-full h-full outline-none bg-transparent"
                />

                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {!showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
            <button className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-full w-[150px] hover:scale-110 mx-auto transition-all block mt-6 duration-200">
              Sign up
            </button>
          </form>
          <p className="my-5">
            Already have an account?{" "}
            <Link
              className="hover:text-red-700 hover:underline"
              to={"/login"}
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
