import React from 'react'
import CategoryProductList from '../components/CategoryProductList'
import BannerProduct from '../components/BannerProduct'
import HorizontalProduct from '../components/HorizontalProduct'
import VerticalProduct from '../components/VerticalProduct'

const Home = () => {
  return (
    <div>
      <CategoryProductList/>
      <BannerProduct/>
      <HorizontalProduct category={"airpodes"} heading={"Top's Airpodes"}/>
      <HorizontalProduct category={"watches"} heading={"Popular's Watches"}/>
      <VerticalProduct category={"mobiles"} heading={"Mobiles"}/>
      <VerticalProduct category={"Mouse"} heading={"Mouses"}/>
      <VerticalProduct category={"televisions"} heading={"Televisions"}/>
      <VerticalProduct category={"camera"} heading={"Camera & Photography"}/>
      <VerticalProduct category={"earphones"} heading={"Wired Earphones"}/>
      <VerticalProduct category={"speakers"} heading={"Bluetooth Speakers"}/>
      <VerticalProduct category={"refrigerator"} heading={"Refrigerators"}/>
      <VerticalProduct category={"trimmers"} heading={"Trimmers"}/>
    </div>
  )
}

export default Home