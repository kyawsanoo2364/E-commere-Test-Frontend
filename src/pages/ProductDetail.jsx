import React, { useCallback, useContext, useEffect, useState } from "react";
import SummerApi from "../common";
import { useNavigate, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa6";
import { FaStarHalf } from "react-icons/fa6";
import displayMMKCurrency from "../helpers/displayMMKCurrency";
import VerticalProduct from "../components/VerticalProduct";
import CategoryWiseProduct from "../components/CategoryWiseProduct";
import addToCard from "../helpers/addToCard";
import Context from "../context";

const ProductDetail = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const productImageArrayListLoading = new Array(4).fill(null);
  const [activeImage, setActiveImage] = useState("");
  const [zoomImageCoordinate,setZoomImageCoordinate] = useState({x:0,y:0})
  const [isZoomImage,setIsZoomImage]=useState(false);
  const {fetchAddToCartProductCount} = useContext(Context)
  const navigate = useNavigate();

  const fetchDetails = async () => {
    setLoading(true);
    const fetchData = await fetch(SummerApi.getProductDetails.url(id));
    const dataRes = await fetchData.json();
    setLoading(false);
    setData(dataRes.data);
    setActiveImage(dataRes.data.productImage[0]);
  };

  useEffect(() => {
    fetchDetails();
  }, [id]);

  const handleZoomImage =useCallback((e)=>{
    const {left,top,width,height} = e.target.getBoundingClientRect();
    const x= (e.clientX - left) / width;
    const y=(e.clientY - top) / height;
    setZoomImageCoordinate({x,y});
  },[])

  const handleMouseEnterOnProductImage = (imgURL) => {
    setActiveImage(imgURL);
  };

  const handleAddToCart =async(e,id)=>{
    await addToCard(e,id);
     fetchAddToCartProductCount();
 }

 const handleBuyAddToCart =async(e,id)=>{
  await addToCard(e,id);
   fetchAddToCartProductCount();
   navigate("/cart")
}

  return (
    <div className="container mx-auto p-4">
      <div className="min-h-[200px] flex flex-col md:flex-row gap-4 ">
        <div className="h-96 flex flex-col lg:flex-row-reverse gap-4">
          {loading ? (
            <div className="h-[300px] w-[300px] lg:w-96 lg:h-96 bg-slate-200 animate-pulse"></div>
          ) : (
            <div className="h-[300px] w-[300px] lg:w-96 lg:h-96 bg-slate-200 relative ">
              <img
                src={activeImage}
                alt=""
                className="h-full w-full object-scale-down mix-blend-multiply"
                onMouseMove={handleZoomImage}
                onMouseEnter={()=>setIsZoomImage(true)}
                onMouseLeave={()=>setIsZoomImage(false)}
              />
              {/** Product Zoom */}
              {isZoomImage &&
              <div className="hidden lg:block absolute min-w-[400px] min-h-[400px] bg-slate-200 top-0 -right-[410px] overflow-hidden">
                <div className="w-full h-full mix-blend-multiply min-w-[400px] min-h-[400px] scale-125" style={{backgroundImage:`url(${activeImage})`,backgroundRepeat:"no-repeat",backgroundPosition:`${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y*100}%`}}></div>
              </div>
}
            </div>
              
          )}

          <div className="h-full">
            {loading ? (
              <div className="flex gap-2 lg:flex-col animate-pulse">
                {productImageArrayListLoading.map((p, index) => {
                  return (
                    <div
                      key={index}
                      className="w-20 h-20 bg-slate-200 rounded"
                    ></div>
                  );
                })}
              </div>
            ) : (
              <div className="flex gap-2 lg:flex-col items-center justify-center">
                {data.productImage.map((imgURL, index) => {
                  return (
                    <div
                      key={imgURL}
                      className="w-20 h-20 bg-slate-200 rounded"
                    >
                      <img
                        src={imgURL}
                        alt=""
                        className="w-full h-full object-scale-down mix-blend-multiply cursor-pointer"
                        onMouseEnter={() =>
                          handleMouseEnterOnProductImage(imgURL)
                        }
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
        {/**Details */}
        {loading ? (
          <div className="flex flex-col gap-2 animate-pulse">
            <p className="px-2 rounded-full bg-slate-200 h-4 w-16"></p>
            <h2 className="px-6 rounded-full bg-slate-200 h-4 w-64"></h2>
            <p className="bg-slate-200 h-4 w-36 rounded-full"></p>
            <div className="bg-slate-200 h-5 w-52 rounded-full"></div>
            <div className="flex gap-2 font-medium text-xl my-1">
              <p className="bg-slate-200 h-4 w-36 rounded-full"></p>
              <p className="bg-slate-200 h-4 w-36 rounded-full"></p>
            </div>
            <div className="flex align-center gap-2 my-2">
              <button className="bg-slate-200 px-4 py-2 min-w-[120px] font-medium"></button>
              <button className="border rounded bg-slate-200 h-8 px-4 py-2 min-w-[120px] font-medium"></button>
            </div>
            <div className="my-1 flex flex-col gap-2">
              <p className="bg-slate-200 h-4 w-32"></p>
              <p className="bg-slate-200 h-40 rounded w-80 md:w-[500px]"></p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <p className="bg-red-200 text-red-600 px-2 rounded-full w-fit">
              {data?.brandName}
            </p>
            <h2 className="text-2xl lg:text-4xl font-semibold">
              {data?.productName}
            </h2>
            <p className="capitalize text-slate-400">{data?.category}</p>
            <div className="flex gap-2 text-red-600 items-center">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStarHalf />
            </div>
            <div className="flex gap-2 font-medium text-xl my-1">
              <p className="text-red-600">
                {displayMMKCurrency(data?.sellingPrice)}
              </p>
              <p className="text-slate-400 line-through">
                {displayMMKCurrency(data?.price)}
              </p>
            </div>
            <div className="flex align-center gap-2 my-2">
              <button className="border text-red-600 border-red-600 rounded hover:bg-red-600 hover:text-white px-4 py-2 min-w-[120px] font-medium" onClick={(e)=>handleBuyAddToCart(e,data._id)}>
                Buy
              </button>
              <button className="border hover:bg-red-700 border-red-600 rounded text-white bg-red-600 px-4 py-2 min-w-[120px] font-medium" onClick={(e)=>handleAddToCart(e,data._id)}>
                Add To Cart
              </button>
            </div>
            <div className="my-1">
              <p className="text-slate-500 font-medium">Description: </p>
              <p className="text-ellipsis mt-1 line-clamp-4">
                {data?.description}
              </p>
            </div>
          </div>
        )}
      </div>
      {!loading &&
      <CategoryWiseProduct heading={"Recommend Products"} category={data?.category}/>
}
    </div>
  );
};

export default ProductDetail;
