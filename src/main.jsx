import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './index.css'
import App from './App.jsx'
import store from './store/Store.js';
import { SearchProvider } from './components/context/SearchContext.jsx';
// import { CartProvider } from './components/context/CardContext.jsx'
import { CategoryProvider } from './components/context/CategoryContext.jsx';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <SearchProvider>
        {/* <CartProvider> */}
          <CategoryProvider>
            <StrictMode>
              <App />
              <ToastContainer position="top-right" autoClose={3000} />
            </StrictMode>
          </CategoryProvider>
        {/* </CartProvider> */}
      </SearchProvider>
    </Provider>
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)
