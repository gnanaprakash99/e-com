import React from 'react'
import MainPage from '../pages/MainPage'
import Home from '../pages/home/Home'
import Login from '../pages/login/Login'
import Products from '../pages/products/Products'
import About from '../pages/about/About'
import Contact from '../pages/contact/Contact'
import ProductCarouselView from '../components/productCarousel/ProductCarouselView'
import SummaryPage from '../pages/summaryPage/SummaryPage'
import Orders from '../pages/orders/Orders'
import Profile from '../pages/profile/Profile'

const AppRoutes = [
  {
    path: "/",
    element: <MainPage />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "products",
        element: <Products />
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "contact",
        element: <Contact />
      },
      {
        path: "orders",
        element: <Orders />
      },
      {
        path: "productView",
        element: <ProductCarouselView />
      },
      {
        path: "checkout",
        element: <SummaryPage />
      },
      {
        path: "profile",
        element: <Profile />
      },
    ]
  },
  {
    path: "*",
    element: <div>404 Not Found Page</div>
  }
]

export default AppRoutes
