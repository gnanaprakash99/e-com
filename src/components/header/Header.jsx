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
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { setSearchQuery } = useSearch();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const products = useSelector(state => state.ProductData.ProductData);

  // login
  const isLogin = true;

  // permissions
  const permissions = getPermissions();

  // handle search suggestion
  const allSuggestions = useSelector(state => state.ProductData.ProductData)
    .flatMap(product => [product.name, product.category]);

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // navigation
  const handleOrders = () => {
    if (isLogin) {
      navigate("/orders");
      setIsDropdownOpen(false);
    } else {
      alert("Please login and try again");
    }
  };

  // search
  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      const query = e.target.value.trim();
      setSearchQuery(query);
      navigate("/products"); // always go to products page
    }
  };

  const handleProfile = () => navigate('/profile');

  return (
    <nav className="w-full px-1 pb-3 bg-headerBg shadow sticky top-0 z-50 ">
      <div className="flex flex-col xl:flex-row xl:items-center lg:pt-3 xl:justify-between gap-3">

        {/* Logo + Hamburger */}
        <div className="flex items-center p-3 justify-between w-full xl:w-auto">
          <h1 className="text-2xl font-bold text-headerHeading">Muse Market</h1>

          {/* Buttons */}
          <div className='flex text-xl gap-3'>
            <div className="flex xl:hidden items-center">
              <button
                onClick={() => setShowCard(true)}
                className="relative text-headerTextColor hover:bg-headerHoverBtnBg hover:text-headerHoverBtnText rounded-primaryRadius flex items-center gap-1"
              >
                <FaLuggageCart />
                Cart
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-3 bg-secondaryLite text-headerTextColor text-[10px] font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsDropdownOpen(prev => !prev)}
              className="xl:hidden rounded-primaryRadius text-headerTextColor hover:bg-headerHoverBtnBg hover:text-headerHoverBtnText"
            >
              <AiOutlineMenu />
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="w-full xl:w-auto flex justify-center">
          <Search
            placeholder="Search..."
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearchKeyDown}
            className="w-full sm:w-[200px] md:w-[300px] lg:w-[400px] xl:w-[600px]"
            suggestions={[...new Set(allSuggestions)]}
          />
        </div>

        {/* Buttons */}
        <div className="hidden xl:flex gap-3 items-center">
          {isLogin ? (
            <button
              onClick={handleProfile}
              className="flex items-center gap-2 text-headerTextColor border border-headerBtnBorder hover:bg-headerHoverBtnBg hover:text-headerHoverBtnText py-1 px-3 rounded-primaryRadius"
            >
              Account
            </button>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="text-headerTextColor border border-headerBtnBorder hover:bg-headerHoverBtnBg hover:text-headerHoverBtnText py-1 px-3 rounded-primaryRadius"
            >
              Log in
            </button>
          )}
          <button
            onClick={() => setShowCard(true)}
            className="text-headerTextColor border border-headerBtnBorder hover:bg-headerHoverBtnBg hover:text-headerHoverBtnText py-1 px-3 rounded-primaryRadius flex items-center gap-2"
          >
            <FaLuggageCart />
            Cart
            {cartItemCount > 0 && (
              <span className="bg-secondaryLite text-headerTextColor text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Dropdown */}
        <AnimatePresence>
          {isDropdownOpen && (
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "100%", opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.25, 0.8, 0.25, 1] }}
              className="fixed top-0 right-0 h-full w-3/4 ml-20 bg-pageBg rounded-l-2xl shadow-2xl flex flex-col z-50"
            >
              {/* Header */}
              <div className="bg-cardBg p-4 border-b flex justify-between items-center sticky top-0 z-10">
                <h2 className="text-lg font-semibold font-playfair text-headerTextColor">Menu</h2>
                <button
                  onClick={() => setIsDropdownOpen(false)}
                  className="text-mutedText hover:text-cancelButton transition"
                >
                  <IoClose size={26} />
                </button>
              </div>

              {/* Scrollable Nav */}
              <div className="flex-grow overflow-y-auto">
                <nav className="flex flex-col gap-3 px-6 py-6 font-playfair text-lg">
                  <NavLink
                    to="/"
                    className="py-2 text-headerTextColor hover:text-headerHoverNavText transition"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/products"
                    className="py-2 text-headerTextColor hover:text-headerHoverNavText transition"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Products
                  </NavLink>
                  <NavLink
                    to="/about"
                    className="py-2 text-headerTextColor hover:text-headerHoverNavText transition"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    About
                  </NavLink>
                  <NavLink
                    to="/contact"
                    className="py-2 text-headerTextColor hover:text-headerHoverNavText transition"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Contact
                  </NavLink>

                  {!permissions.AddProduct && (
                    <button
                      onClick={() => {
                        setShowAddProduct(true);
                        setIsDropdownOpen(false);
                      }}
                      className="py-2 text-left text-headerTextColor hover:text-headerHoverNavText transition"
                    >
                      Add Product
                    </button>
                  )}
                  <button
                    onClick={handleOrders}
                    className="py-2 text-left text-headerTextColor hover:text-headerHoverNavText transition"
                  >
                    Orders
                  </button>
                </nav>
              </div>

              {/* Footer Account/Login Button */}
              <div className="px-6 pb-6 pt-4 border-t bg-pageBg">
                {isLogin ? (
                  <button
                    onClick={() => {
                      handleProfile();
                      setIsDropdownOpen(false);
                    }}
                    className="w-full py-2 flex items-center justify-center text-headerTextColor border border-headerBtnBorder hover:bg-headerHoverBtnBg hover:text-headerHoverBtnText rounded-lg transition"
                  >
                    Account
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setShowLogin(true);
                      setIsDropdownOpen(false);
                    }}
                    className="w-full py-2 text-headerTextColor border border-headerBtnBorder hover:bg-headerHoverBtnBg hover:text-headerHoverBtnText rounded-lg transition"
                  >
                    Log in
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
      <div className='hidden xl:flex gap-3 pt-3 items-center justify-center sticky top-[64px] z-40 bg-pageBg'>
        <div className="flex overflow-x-auto whitespace-nowrap gap-2 px-4 scrollbar-hide">

          {/* Desktop Nav Links */}
          <div className="hidden xl:flex gap-3 items-center">
            <NavLink to="/" className={({ isActive }) => isActive ? 'text-headerHoverNavText px-2' : 'text-headerTextColor hover:text-headerHoverNavText px-2'}>Home</NavLink>
            <NavLink to="/products" className={({ isActive }) => isActive ? 'text-headerHoverNavText' : 'text-headerTextColor hover:text-headerHoverNavText'}>Product</NavLink>
            <NavLink to="/about" className={({ isActive }) => isActive ? 'text-headerHoverNavText px-2' : 'text-headerTextColor hover:text-headerHoverNavText px-2'}>About</NavLink>
            <NavLink to="/contact" className={({ isActive }) => isActive ? 'text-headerHoverNavText' : 'text-headerTextColor hover:text-headerHoverNavText'}>Contact</NavLink>
          </div>

          {/* Desktop Buttons */}
          <div className="hidden xl:flex gap-3 items-center">
            <button
              onClick={handleOrders}
              className="text-headerTextColor border border-headerBtnBorder hover:bg-headerHoverBtnBg hover:text-headerHoverNavText px-2 rounded-primaryRadius"
            >
              Orders
            </button>
            {!permissions.AddProduct && (
              <button
                onClick={() => setShowAddProduct(true)}
                className="text-headerTextColor border border-headerBtnBorder hover:bg-headerHoverBtnBg hover:text-headerHoverNavText rounded-primaryRadius"
              >
                Add Product
              </button>
            )}

          </div>
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
