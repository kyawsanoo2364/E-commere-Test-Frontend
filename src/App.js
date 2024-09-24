import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummerApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';

function App() {
  const dispatch = useDispatch();
  const [addToCartProductCount,setAddToCartProductCount] = useState(0);
  
  const fetchUserData = async ()=>{
    try{
      const res = await fetch(SummerApi.current_user.url,{
        method:SummerApi.current_user.method,
        credentials:"include"
      })
      const data = await res.json()
      if(data.success){
        dispatch(setUserDetails(data.data));
      }
    } catch(e){
      console.log(e)
    }
  }

  const fetchAddToCartProductCount = async ()=>{
    try{
      const res = await fetch(SummerApi.addToCartCount.url,{
        method:SummerApi.addToCartCount.method,
        credentials:"include"
      })
      const data = await res.json()
      if(data.success){
       setAddToCartProductCount(data.data.count);
      }
    } catch(e){
      console.log(e)
    }
  }

  useEffect(()=>{
    fetchUserData()
    fetchAddToCartProductCount()
  },[])

  return (
  <>
  <Context.Provider value={{fetchUserData,addToCartProductCount,fetchAddToCartProductCount}}>
    <Header/>
    <ToastContainer position='top-center'/>
    <main className='min-h-[calc(100vh-130px)] pt-16'>
    <Outlet/>
    </main>
    
    <Footer/>
    </Context.Provider>
  </>
  );
}

export default App;
