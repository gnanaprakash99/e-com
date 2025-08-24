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

  const handleProfile = () => navigate('/profile');

  return (
    <nav className="w-full px-1 pb-3 bg-headerBg shadow sticky top-0 z-50 ">
      <div className="flex flex-col xl:flex-row xl:items-center lg:pt-3 xl:justify-between gap-3">

        {/* Logo + Hamburger */}
        <div className="flex items-center justify-between w-full xl:w-auto">
          <h1 className="text-2xl font-bold text-headerHeading">Muse Market</h1>

          {/* Buttons */}
          <div className='flex gap-3'>
            <div className="flex xl:hidden items-center">
              <button
                onClick={() => setShowCard(true)}
                className="relative text-headerTextColor border border-headerBtnBorder hover:bg-headerHoverBtnBg hover:text-headerHoverBtnText rounded-primaryRadius flex items-center gap-1"
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
              className="xl:hidden border border-headerBtnBorder rounded-primaryRadius text-headerTextColor hover:bg-headerHoverBtnBg hover:text-headerHoverBtnText"
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
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                initial={{ x: "100%", opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: "100%", opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="bg-pageBg rounded-l-primaryRadius w-2/3 sm:w-1/2 max-h-full overflow-y-auto flex flex-col shadow-lg"
              >

                <div className="bg-cardBg p-4 border-b flex justify-end items-center">
                  <button
                    onClick={() => setIsDropdownOpen(false)}
                    className="text-mutedText hover:text-cancelButton"
                  >
                    <IoClose size={24} />
                  </button>
                </div>
                <div className="px-4 py-3 font-mono text-lg border-b">
                  <NavLink
                    to="/"
                    className="block text-headerTextColor hover:text-headerHoverNavText"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Home
                  </NavLink>
                  <NavLink
                    to="/products"
                    className="block text-headerTextColor hover:text-headerHoverNavText"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Product
                  </NavLink>
                  <NavLink
                    to="/about"
                    className="block text-headerTextColor hover:text-headerHoverNavText"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    About
                  </NavLink>
                  <NavLink
                    to="/contact"
                    className="block text-headerTextColor hover:text-headerHoverNavText"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Contact
                  </NavLink>

                  {!permissions.AddProduct && (
                    <button
                      onClick={() => { setShowAddProduct(true); setIsDropdownOpen(false); }}
                      className=" text-headerTextColor hover:text-headerHoverNavText"
                    >
                      Add Product
                    </button>
                  )}
                  <div>
                    <button
                      onClick={handleOrders}
                      className="text-headerTextColor hover:text-headerHoverNavText"
                    >
                      Orders
                    </button>
                  </div>
                  {isLogin ? (
                    <button
                      onClick={() => { handleProfile(); setIsDropdownOpen(false); }}
                      className="flex items-center text-headerTextColor border border-headerBtnBorder hover:bg-headerHoverBtnBg hover:text-headerHoverBtnText rounded-primaryRadius"
                    >
                      Account
                    </button>
                  ) : (
                    <button
                      onClick={() => { setShowLogin(true); setIsDropdownOpen(false); }}
                      className="text-headerTextColor border border-headerBtnBorder hover:bg-headerHoverBtnBg hover:text-headerHoverBtnText rounded-primaryRadius"
                    >
                      Log in
                    </button>
                  )}
                </div>
              </motion.div>
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
