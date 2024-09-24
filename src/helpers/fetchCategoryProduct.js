const { default: SummerApi } = require("../common")

const fetchCategoryProduct = async (category)=>{
    const fetchData= await fetch(SummerApi.getCategoryWiseProduct.url,{
        method:SummerApi.getCategoryWiseProduct.method,
        headers:{
            "content-type":"application/json"
        },
        body:JSON.stringify({category:category})
    })

    const resData = await fetchData.json();
    return resData;
}

export default fetchCategoryProduct