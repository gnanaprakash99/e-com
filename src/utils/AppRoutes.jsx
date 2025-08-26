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
import PaymentAddress from '../pages/summaryPage/PaymentMethod'
import FinalSummary from '../pages/summaryPage/FinalSummary'
import Selectedcategory from '../components/categoryBar/Selectedcategory'
import SummaryAddress from '../pages/summaryPage/SummaryAddress'
import ProductSummaryPage from '../pages/summaryPage/ProductSummaryPage'

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
        path: "productView",
        element: <ProductCarouselView />
      },
      {
        path: "selectedCategory",
        element: <Selectedcategory />
      },
      {
        path: "about",
        element: <About />
      },
      {
        path: "contact",
        element: <Contact />
      },

      // need to make private routes for these
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "orders",
        element: <Orders />
      },
      {
        path: "checkout",
        element: <SummaryPage />
      },
      {
        path: "product",
        element: <ProductSummaryPage />
      },
      {
        path: "address",
        element: <SummaryAddress />
      },
      {
        path: "payment",
        element: <PaymentAddress />
      },
      {
        path: "finalSummaryPage",
        element: <FinalSummary />
      },
    ]
  },
  {
    path: "*",
    element: <div>404 Not Found Page</div>
  }
]

export default AppRoutes
