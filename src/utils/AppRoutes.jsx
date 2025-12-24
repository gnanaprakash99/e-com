import MainPage from '../pages/MainPage'
import About from '../pages/about/About'
import Contact from '../pages/contact/Contact'
import Profile from '../pages/profile/Profile'
import PaymentAddress from '../pages/summaryPage/PaymentMethod'
import FinalSummary from '../pages/summaryPage/FinalSummary'
import SummaryAddress from '../pages/summaryPage/SummaryAddress'
import ProductSummaryPage from '../pages/summaryPage/ProductSummaryPage'
import Carts from '../pages/cards/Carts'
import BrandedLoader from '../components/loader/BrandedLoader'
import React, { Suspense, lazy } from "react";
import ResetPassword from '../pages/resetPassword/ResetPassword'
import PrivacyPolicy from '../components/footer/PrivacyPolicy'
import TermsConditions from '../components/footer/TermsConditions'

// Lazy loaded pages
const Home = lazy(() => import("../pages/home/Home"));
const Products = lazy(() => import("../pages/products/Products"));
const ProductCarouselView = lazy(() => import("../components/productCarousel/ProductCarouselView"));
const Selectedcategory = lazy(() => import("../components/categoryBar/Selectedcategory"));
const Orders = lazy(() => import("../pages/orders/Orders"));
const SummaryPage = lazy(() => import("../pages/summaryPage/SummaryPage"));

const AppRoutes = [
  {
    path: "/",
    element: <MainPage />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<BrandedLoader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "products",
        element: (
          <Suspense fallback={<BrandedLoader />}>
            <Products />
          </Suspense>
        ),
      },
      {
        path: "productView",
        element: (
          <Suspense fallback={<BrandedLoader />}>
            <ProductCarouselView />
          </Suspense>
        ),
      },
      {
        path: "selectedCategory",
        element: (
          <Suspense fallback={<BrandedLoader />}>
            <Selectedcategory />
          </Suspense>
        ),
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
        path: "cart",
        element: <Carts />
      },
      {
        path: "orders",
        element: (
          <Suspense fallback={<BrandedLoader />}>
            <Orders />
          </Suspense>
        ),
      },
      {
        path: "checkout",
        element: (
          <Suspense fallback={<BrandedLoader />}>
            <SummaryPage />
          </Suspense>
        ),
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
      {
        path: "/reset-password",
        element: <ResetPassword />,
      },
      {
        path: "/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "/terms-conditions",
        element: <TermsConditions />,
      },
    ]
  },
  {
    path: "*",
    element: <div>404 Not Found Page</div>
  }
]

export default AppRoutes
