import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Login from '../../pages/login/Login';
import Cards from '../../pages/cards/Cards';
import AddProduct from '../../pages/addProduct/AddProduct';
import Search from '../search/Search';
import { useSearch } from '../context/SearchContext';
import { useCart } from '../context/CardContext';
import { FaLuggageCart } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import { useSelector } from 'react-redux';
import { getPermissions } from '../../utils/UserPermission';

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { setSearchQuery } = useSearch();
  const { cartItems } = useCart();
  const navigate = useNavigate();

  // login
  const generatedImage = `https://avatar.iran.liara.run/username`;
  const isLogin = true;

  // permissions
  const permissions = getPermissions();

  // handle search suggestion
  const allSuggestions = useSelector(state => state.ProductData.ProductData)
    .flatMap(product => [product.name, product.category]);

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // navigation
  const handleOrders = () => navigate('/orders');
  const handleProfile = () => navigate('/profile');

  return (
    <nav className="w-full px-3 py-3 bg-headerBg shadow border-b">
      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-3">

        {/* Logo + Hamburger */}
        <div className="flex items-center justify-between w-full xl:w-auto">
          <h1 className="text-2xl font-bold text-headerHeading">Muse Market</h1>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsDropdownOpen(prev => !prev)}
            className="xl:hidden border border-headerBtnBorder px-3 py-2 rounded-primaryRadius text-headerTextColor hover:bg-headerHoverBtnBg hover:text-headerHoverBtnText"
          >
            <AiOutlineMenu />
          </button>
        </div>

        {/* Desktop Nav Links */}
        <div className="hidden xl:flex gap-3 items-center">
          <NavLink to="/" className={({ isActive }) => isActive ? 'text-headerHoverNavText px-2' : 'text-headerTextColor hover:text-headerHoverNavText px-2'}>Home</NavLink>
          <NavLink to="/products" className={({ isActive }) => isActive ? 'text-headerHoverNavText' : 'text-headerTextColor hover:text-headerHoverNavText'}>Product</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'text-headerHoverNavText px-2' : 'text-headerTextColor hover:text-headerHoverNavText px-2'}>About</NavLink>
          <NavLink to="/contact" className={({ isActive }) => isActive ? 'text-headerHoverNavText' : 'text-headerTextColor hover:text-headerHoverNavText'}>Contact</NavLink>
        </div>

        {/* Search Bar */}
        <div className="w-full xl:w-auto flex justify-center">
          <Search
            placeholder="Search..."
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full sm:w-[200px] md:w-[300px] lg:w-[400px] xl:w-[600px]"
            suggestions={[...new Set(allSuggestions)]}
          />
        </div>

        {/* Desktop Buttons */}
        <div className="hidden xl:flex gap-3">
          {!permissions.AddProduct && (
            <button
              onClick={() => setShowAddProduct(true)}
              className="text-headerTextColor border border-headerBtnBorder hover:bg-headerHoverBtnBg hover:text-headerHoverBtnText py-1 px-3 rounded-primaryRadius"
            >
              Add Product
            </button>
          )}
          <button
            onClick={handleOrders}
            className="text-headerTextColor border border-headerBtnBorder hover:bg-headerHoverBtnBg hover:text-headerHoverBtnText py-1 px-3 rounded-primaryRadius"
          >
            Orders
          </button>
          <button
            onClick={() => setShowCard(true)}
            className="relative flex items-center gap-1 text-headerBtnBorder border border-headerTextColor hover:bg-headerHoverBtnBg hover:text-headerHoverBtnText py-1 px-3 rounded-primaryRadius"
          >
            <FaLuggageCart />
            <span>Cart</span>
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-secondaryLite text-headerTextColor text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
          {isLogin ? (
            <button onClick={handleProfile}>
              <img
                src={generatedImage}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover border border-headerTextColor"
              />
            </button>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="text-headerTextColor border border-headerBtnBorder hover:bg-headerHoverBtnBg hover:text-headerHoverBtnText py-1 px-3 rounded-primaryRadius"
            >
              Log in
            </button>
          )}
        </div>
      </div>

      {/* Mobile Dropdown */}
      <div
        className={`xl:hidden overflow-hidden transition-all duration-500 ease-in-out ${isDropdownOpen ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0 mt-0"
          }`}
      >
        <div className="text-center space-y-2">
          <NavLink to="/" className="block text-headerTextColor hover:text-headerHoverNavText">Home</NavLink>
          <NavLink to="/products" className="block text-headerTextColor hover:text-headerHoverNavText">Product</NavLink>
          <NavLink to="/about" className="block text-headerTextColor hover:text-headerHoverNavText">About</NavLink>
          <NavLink to="/contact" className="block text-headerTextColor hover:text-headerHoverNavText">Contact</NavLink>

          {!permissions.AddProduct && (
            <button
              onClick={() => setShowAddProduct(true)}
              className="w-full text-headerTextColor hover:text-headerHoverNavText"
            >
              Add Product
            </button>
          )}
          <button
            onClick={handleOrders}
            className="w-full text-headerTextColor hover:text-headerHoverNavText"
          >
            Orders
          </button>
          <button
            onClick={() => setShowCard(true)}
            className="w-full flex items-center justify-center gap-2 text-headerTextColor hover:text-headerHoverNavText"
          >
            <FaLuggageCart />
            Cart
            {cartItemCount > 0 && (
              <span className="bg-secondaryLite text-headerTextColor text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
          {isLogin ? (
            <button
              onClick={handleProfile}
              className="w-full flex items-center justify-center gap-2 text-headerTextColor hover:text-headerHoverNavText"
            >
              <img
                src={generatedImage}
                alt="Profile"
                className="w-8 h-8 rounded-full object-cover border border-headerTextColor"
              /> YOU
            </button>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="w-full text-headerTextColor hover:text-headerHoverNavText"
            >
              Log in
            </button>
          )}
        </div>
      </div>


      {/* Modals */}
      <AddProduct isOpen={showAddProduct} onClose={() => setShowAddProduct(false)} />
      <Cards isOpen={showCard} onClose={() => setShowCard(false)} />
      <Login isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </nav>
  );
};

export default Header;
