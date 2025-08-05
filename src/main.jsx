import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import store from './store/Store.js';
import { SearchProvider } from './components/context/Context.jsx';

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <SearchProvider>
      <StrictMode>
        <App />
      </StrictMode>
    </SearchProvider>
  </Provider>,
)
