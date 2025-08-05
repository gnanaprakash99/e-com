import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Login from '../../pages/login/Login';
import Cards from '../../pages/cards/Cards';
import AddProduct from '../../pages/addProduct/AddProduct';
import Search from '../search/Search';
import { useSearch } from '../context/SearchContext';
import { useCart } from '../context/CardContext';
import { FaLuggageCart } from "react-icons/fa";
import Orders from '../../pages/orders/Orders';

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const { setSearchQuery } = useSearch();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  // Total items in cart
  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // navigate order page
  const handleOrders = () => {
    navigate('/orders');
  }

  return (
    <nav className="flex flex-col lg:flex-row sm:flex-col sm:justify-between sm:items-center gap-4 px-6 py-4 bg-headerBg shadow border-b border-primaryborder">
      {/* Logo and Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-6">
        <h1 className="text-2xl mr-6 font-bold text-teritaryLite">Muse Market</h1>
        <div className="flex gap-6">
          <NavLink to="/" className={({ isActive }) => isActive ? 'text-secondaryLite' : 'text-headerTextColor hover:text-secondaryLite'}>Home</NavLink>
          <NavLink to="/products" className={({ isActive }) => isActive ? 'text-secondaryLite' : 'text-headerTextColor hover:text-secondaryLite'}>Product</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'text-secondaryLite' : 'text-headerTextColor hover:text-secondaryLite'}>About</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'text-secondaryLite' : 'text-headerTextColor hover:text-secondaryLite'}>Contact</NavLink>
        </div>
      </div>

      {/* Search */}
      <div className="w-full sm:w-auto">
        <Search
          placeholder="Search..."
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-[300px] md:w-[400px] lg:w-[500px]"
        />
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 flex-wrap sm:flex-nowrap">
        <button
          onClick={() => setShowAddProduct(true)}
          className="text-headerTextColor bg-headerButtonBg hover:bg-headerHoverButtonBg py-1 px-3 rounded-primaryRadius"
        >Add Product</button>

        <button
          onClick={handleOrders}
          className="text-headerTextColor bg-headerButtonBg hover:bg-headerHoverButtonBg py-1 px-3 rounded-primaryRadius"
        >Orders</button>

        <button
          onClick={() => setShowCard(true)}
          className="relative flex items-center gap-1 text-headerTextColor bg-headerButtonBg hover:bg-headerHoverButtonBg py-1 px-3 rounded-primaryRadius"
        >
          <FaLuggageCart />
          <span >Cart</span>

          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-secondaryLite text-headerTextColor text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
              {cartItemCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setShowLogin(true)}
          className="text-headerTextColor bg-headerButtonBg hover:bg-headerHoverButtonBg py-1 px-3 rounded-primaryRadius"
        >Log in</button>
      </div>

      {/* Modals */}
      <AddProduct isOpen={showAddProduct} onClose={() => setShowAddProduct(false)} />
      <Cards isOpen={showCard} onClose={() => setShowCard(false)} />
      <Login isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </nav>
  );
};

export default Header;
