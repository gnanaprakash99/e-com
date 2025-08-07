import { useState, useEffect } from 'react';
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
  const [isMobileMenu, setIsMobileMenu] = useState(false);

  // login
  const generatedImage = `https://avatar.iran.liara.run/username`;
  const isLogin = true

  // permissions
  const permissions = getPermissions();

  // handle search suggestion
  const allSuggestions = useSelector(state => state.ProductData.ProductData)
    .flatMap(product => [product.name, product.category]);

  // handle UI design
  useEffect(() => {
    const handleResize = () => {
      setIsMobileMenu(window.innerWidth <= 1024);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  // order page navigation
  const handleOrders = () => {
    navigate('/orders');
  };

  // profile page navigation
  const handleProfile = () => {
    navigate('/profile');
  };

  return (
    <nav className="w-full px-3 py-3 bg-headerBg shadow border-b ">
      <div className=" gap-3 flex xl:flex-row sm:flex-col xl:items-center xl:justify-between">
        {/* Top Section: Logo + NavLinks + Hamburger */}
        <div className=" gap-3 flex sm:justify-evenly">
          <div className=" gap-3 flex sm:flex-col md:flex-row">
            {/* Logo */}
            <h1 className="text-2xl font-bold text-headerHeading">Muse Market</h1>

            {/* Nav Links */}
            <div className=" gap-3 flex items-center">
              <NavLink to="/" className={({ isActive }) => isActive ? 'text-headerHoverNavText px-2' : 'text-headerTextColor hover:text-headerHoverNavText px-2'}>Home</NavLink>
              <NavLink to="/products" className={({ isActive }) => isActive ? 'text-headerHoverNavText' : 'text-headerTextColor hover:text-headerHoverNavText'}>Product</NavLink>
              <NavLink to="/about" className={({ isActive }) => isActive ? 'text-headerHoverNavText px-2' : 'text-headerTextColor hover:text-headerHoverNavText px-2'}>About</NavLink>
              <NavLink to="/contact" className={({ isActive }) => isActive ? 'text-headerHoverNavText ' : 'text-headerTextColor hover:text-headerHoverNavText'}>Contact</NavLink>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          {isMobileMenu && (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(prev => !prev)}
                className="border border-headerBtnBorder px-3 py-2 rounded-primaryRadius text-headerTextColor hover:bg-headerHoverBtnBg hover:text-headerHoverBtnText"
              >
                <AiOutlineMenu />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg border border-mutedText bg-headerBg ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1">
                    {!permissions.AddProduct && (
                      <button
                        onClick={() => { setShowAddProduct(true); setIsDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2 text-sm text-headerTextColor hover:bg-headerHoverBtnBg hover:text-headerHoverBtnText transition duration-300 ease-in-out transform hover:scale-[1.03]"
                      >
                        Add Product
                      </button>
                    )}
                    <button
                      onClick={() => { handleOrders(); setIsDropdownOpen(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-headerTextColor hover:bg-headerHoverBtnBg hover:text-headerHoverBtnText transition duration-300 ease-in-out transform hover:scale-[1.03]"
                    >
                      Orders
                    </button>
                    <button
                      onClick={() => { setShowCard(true); setIsDropdownOpen(false); }}
                      className="relative flex items-center gap-1 px-4 py-2 text-sm text-headerTextColor hover:bg-headerHoverBtnBg hover:text-headerHoverBtnText w-full transition duration-300 ease-in-out transform hover:scale-[1.03]"
                    >
                      <FaLuggageCart />
                      <span>Cart</span>
                      {cartItemCount > 0 && (
                        <span className="ml-auto bg-secondaryLite text-headerTextColor text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                          {cartItemCount}
                        </span>
                      )}
                    </button>
                    {isLogin && isMobileMenu ? (
                      <button
                        onClick={() => { handleProfile(); setIsDropdownOpen(false); }}
                        className="w-full flex items-center gap-3 font-semibold text-left px-3 py-1 text-sm text-headerTextColor hover:bg-headerHoverBtnBg hover:text-headerHoverBtnText transition duration-300 ease-in-out transform hover:scale-[1.03]"
                      >
                        <img
                          src={generatedImage}
                          alt="Profile"
                          className="w-8 h-8 rounded-full object-cover border border-headerTextColor"
                        /> YOU
                      </button>
                    ) : (
                      <button
                        onClick={() => { setShowLogin(true); setIsDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2 text-sm text-headerTextColor hover:bg-headerHoverBtnBg hover:text-headerHoverBtnText transition duration-300 ease-in-out transform hover:scale-[1.03]"
                      >
                        Log in
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Search Bar */}
        <div className=" flex justify-center">
          <Search
            placeholder="Search..."
            onChange={(e) => setSearchQuery(e.target.value)}
            className=" sm:w-[50px] md:w-[400px] lg:w-[500px] xl:w-[600px]"
            suggestions={[...new Set(allSuggestions)]}
          />
        </div>

        {/* Buttons - Only show on lg and above */}
        {!isMobileMenu && (
          <div className="flex gap-3 justify-start sm:justify-end">
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
            {isLogin && !isMobileMenu ? (
              <button
                onClick={handleProfile}
                className=" text-left px-3 py-1 text-sm text-headerTextColor "
              >
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
        )}
      </div>

      {/* Modals */}
      <AddProduct isOpen={showAddProduct} onClose={() => setShowAddProduct(false)} />
      <Cards isOpen={showCard} onClose={() => setShowCard(false)} />
      <Login isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </nav>
  );
};

export default Header;
