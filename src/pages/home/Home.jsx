import React from 'react'
import CategoryBar from '../../components/categoryBar/CategoryBar'
import BannerCarousel from '../../components/bannerCarousel/BannerCarousel'
import HomeIntro from './HomeIntro'
import TopSelling from './TopSelling'
import HomePageProducts from './HomePageProducts'

const Home = () => {
  return (
    <>
      <BannerCarousel />
      <CategoryBar />
      <HomeIntro />
      <TopSelling />
      <HomePageProducts />
    </>
  )
}

export default Home
