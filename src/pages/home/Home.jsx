import React from 'react'
import CategoryBar from '../../components/categoryBar/CategoryBar'
import BannerCarousel from '../../components/bannerCarousel/BannerCarousel'
import HomeIntro from './HomeIntro'
import HomeProducts from './HomeProducts'
import TopSelling from './TopSelling'

const Home = () => {
  return (
    <>
      <BannerCarousel />
      <CategoryBar />
      <HomeIntro />
      <TopSelling />
      <HomeProducts />
    </>
  )
}

export default Home
