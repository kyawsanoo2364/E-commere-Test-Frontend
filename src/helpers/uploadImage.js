const url =`https://api.cloudinary.com/v1_1/dglzvgamz/image/upload`

const uploadImage =async(image)=>{
    const formData = new FormData();
    formData.append("file",image);
    formData.append("upload_preset","mern_product")
    const fetchRes = await fetch(url,{
        method:"post",
        body:formData
    })

    return fetchRes.json()
}

export default uploadImage;