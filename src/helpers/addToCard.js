import SummerApi from "../common";
import {toast} from "react-toastify"

const addToCard =async (e,id)=>{
    e?.preventDefault();
    const res = await fetch(SummerApi.addToCart.url,{
        method:SummerApi.addToCart.method,
        headers:{
            "content-type":"application/json",
        },
        credentials:"include",
        body:JSON.stringify({productId:id})
    })
    const resData = await res.json();
    if(resData.success){
        toast.success(resData.message)
    } 
    if(resData.error){
        toast.error(resData.message)
    }

    return resData;
}

export default addToCard;