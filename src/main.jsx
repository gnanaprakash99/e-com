import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import store from './store/Store.js';
import { SearchProvider } from './components/context/SearchContext.jsx';
import { CartProvider } from './components/context/CardContext.jsx'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <SearchProvider>
      <CartProvider>
        <StrictMode>
          <App />
        </StrictMode>
      </CartProvider>
    </SearchProvider>
  </Provider>,
)
