import React, { useContext, useState } from "react";
import Logo from "./logo";
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummerApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import role from "../common/role";
import Context from "../context";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const context = useContext(Context);
  const [menuDisplay, setMenuDisplay] = useState(false);
  const navigate = useNavigate();
  const searchQuery = useLocation();
  const searchUrl = new URLSearchParams(searchQuery.search);
  const q = searchUrl.getAll("q");
  const [search,setSearch] = useState(q)

  const handleLogout = async () => {
    const fetchData = await fetch(SummerApi.logout.url, {
      method: "get",
      credentials: "include",
    });
    const data = await fetchData.json();
    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/")
    }
    if (data.error) {
      toast.error(data.message);
    }
  };

  const handleSearch = (e)=>{
    const {value}= e.target;
    setSearch(value);
    if(value){
      navigate(`/search?q=${value}`)
    } else {
      navigate("/search")
    }
  }

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="container mx-auto h-full">
        <div className=" flex items-center  px-2 md:px-4 justify-between w-full">

      
        <Link to={"/"} className="curosr-pointer">
          <Logo w={90} h={50} />
        </Link>
        <div className="hidden md:flex w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-2">
          <input
            type="text"
            placeholder="Search Products..."
            className="w-full outline-none "
            onChange={handleSearch}
            value={search}
          />
          <div className="min-w-[50px] h-8 bg-red-600 text-white text-lg flex justify-center items-center rounded-r-full">
            <GrSearch />
          </div>
        </div>
        <div className="flex items-center gap-4 ">
          {/* user icons and cart */}
          {user?._id && (
            <div className="relative flex justify-center group">
              <div
                className="text-3xl cursor-pointer"
                onClick={() => setMenuDisplay(!menuDisplay)}
              >
                {user?.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt={user.name}
                    className="md:w-10 md:h-10 w-7 h-7 rounded-full"
                  />
                ) : (
                  <FaRegCircleUser />
                )}
              </div>
              {menuDisplay && user?.role === role.ADMIN && (
                <div className="h-fit absolute bottom-0 top-10 bg-white p-4 shadow-lg rounded hidden md:block">
                  <nav>
                    <Link
                      to={"admin-panel"}
                      className="whitespace-nowrap hover:bg-slate-100 p-2"
                      onClick={() => setMenuDisplay(!menuDisplay)}
                    >
                      Admin Panel
                    </Link>
                  </nav>
                </div>
              )}
            </div>
          )}
        {user?._id && (<Link to={"/cart"} className="text-2xl cursor-pointer relative">
            <span>
              <FaShoppingCart />
            </span>
            <div className="bg-red-600 w-5 h-5 text-white flex items-center justify-center rounded-full absolute -top-2 -right-3">
              <p className="text-sm">{context?.addToCartProductCount}</p>
            </div>
          </Link>)}
          

          <div className="">
            {user?._id ? (
              <button
                onClick={handleLogout}
                className="px-3 py-1 bg-red-600 rounded-full text-white hover:bg-red-700 text-sm md:text-base"
              >
                Logout
              </button>
            ) : (
              <Link
                to={"/login"}
                className="px-3 py-1 bg-red-600 rounded-full text-white hover:bg-red-700 sm:text-sm "
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
      </div>
    </header>
  );
};

export default Header;
