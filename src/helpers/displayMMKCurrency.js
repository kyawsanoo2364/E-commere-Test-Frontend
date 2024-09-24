const displayMMKCurrency = (num)=>{
    const formatter = new Intl.NumberFormat("my-MM",{
        style:"currency",
        currency:"mmk",
       
    })

    return formatter.format(num);
}

export default displayMMKCurrency;