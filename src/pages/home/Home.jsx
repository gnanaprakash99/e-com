import React from 'react'
import CategoryBar from '../../components/categoryBar/CategoryBar'
import BannerCarousel from '../../components/bannerCarousel/BannerCarousel'
import ProductCarousel from '../../components/productCarousel/ProductCarousel'

const Home = () => {
  return (
    <>
      <CategoryBar />
      <BannerCarousel />
      <ProductCarousel />
    </>
  )
}

export default Home
