import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import SummerApi from '../common'
import SearchVerticalProductCard from '../components/SearchVerticalProductCard'

const SearchProduct = () => {
    const query = useLocation()
    const [data,setData] = useState([]);
    const [loading,setLoading] = useState(true);
    
    const fetchData = async ()=>{
        setLoading(true);
        const fetchRes = await fetch(SummerApi.searchProduct.url+query.search);
        const dataRes = await fetchRes.json();
        setData(dataRes.data);
        setLoading(false);
    }

    useEffect(()=>{
        fetchData()
    },[query])

  return (
    <div className='container mx-auto p-4 justify-center'>
      
      <p>Search Result: {data.length}</p>
      {
        data.length === 0 && !loading && (
            <div className='text-lg text-center'>No Data Found!</div>
        )
      }
      {
        data.length !== 0 && (
            <SearchVerticalProductCard data={data} loading={loading}/>
        )
      }
    </div>
  )
}

export default SearchProduct