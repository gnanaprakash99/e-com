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

  const handleOrders = () => {
    navigate('/orders');
  };

  return (
    <nav className="w-full px-3 py-3 bg-headerBg shadow border-b ">
      <div className=" gap-3 flex xl:flex-row sm:flex-col xl:items-center xl:justify-between">
        {/* Top Section: Logo + NavLinks + Hamburger */}
        <div className=" gap-3 flex sm:justify-evenly">
          <div className=" gap-3 flex sm:flex-col md:flex-row">
            {/* Logo */}
            <h1 className="text-2xl font-bold text-teritaryLite">Muse Market</h1>

            {/* Nav Links */}
            <div className=" gap-3 flex items-center">
              <NavLink to="/" className={({ isActive }) => isActive ? 'text-secondaryLite px-2' : 'text-headerTextColor hover:text-secondaryLite px-2'}>Home</NavLink>
              <NavLink to="/products" className={({ isActive }) => isActive ? 'text-secondaryLite' : 'text-headerTextColor hover:text-secondaryLite'}>Product</NavLink>
              <NavLink to="/about" className={({ isActive }) => isActive ? 'text-secondaryLite px-2' : 'text-headerTextColor hover:text-secondaryLite px-2'}>About</NavLink>
              <NavLink to="/contact" className={({ isActive }) => isActive ? 'text-secondaryLite ' : 'text-headerTextColor hover:text-secondaryLite'}>Contact</NavLink>
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          {isMobileMenu && (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(prev => !prev)}
                className="border border-headerTextColor px-3 py-2 rounded-primaryRadius text-headerTextColor hover:bg-headerButtonBg"
              >
                <AiOutlineMenu />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg border border-mutedText bg-headerBg ring-1 ring-black ring-opacity-5 z-50">
                  <div className="py-1">
                    {!permissions.AddProduct && (
                      <button
                        onClick={() => { setShowAddProduct(true); setIsDropdownOpen(false); }}
                        className="w-full text-left px-4 py-2 text-sm text-headerTextColor hover:bg-headerButtonBg"
                      >
                        Add Product
                      </button>
                    )}
                    <button
                      onClick={() => { handleOrders(); setIsDropdownOpen(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-headerTextColor hover:bg-headerButtonBg"
                    >
                      Orders
                    </button>
                    <button
                      onClick={() => { setShowCard(true); setIsDropdownOpen(false); }}
                      className="relative flex items-center gap-1 px-4 py-2 text-sm text-headerTextColor hover:bg-headerButtonBg w-full"
                    >
                      <FaLuggageCart />
                      <span>Cart</span>
                      {cartItemCount > 0 && (
                        <span className="ml-auto bg-secondaryLite text-headerTextColor text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                          {cartItemCount}
                        </span>
                      )}
                    </button>
                    <button
                      onClick={() => { setShowLogin(true); setIsDropdownOpen(false); }}
                      className="w-full text-left px-4 py-2 text-sm text-headerTextColor hover:bg-headerButtonBg"
                    >
                      Log in
                    </button>
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
          <div className="flex flex-wrap gap-3 justify-start sm:justify-end">
            {!permissions.AddProduct && (
              <button
                onClick={() => setShowAddProduct(true)}
                className="text-headerTextColor border border-headerTextColor hover:bg-headerButtonBg py-1 px-3 rounded-primaryRadius"
              >
                Add Product
              </button>
            )}

            <button
              onClick={handleOrders}
              className="text-headerTextColor border border-headerTextColor hover:bg-headerButtonBg py-1 px-3 rounded-primaryRadius"
            >
              Orders
            </button>

            <button
              onClick={() => setShowCard(true)}
              className="relative flex items-center gap-1 text-headerTextColor border border-headerTextColor hover:bg-headerButtonBg py-1 px-3 rounded-primaryRadius"
            >
              <FaLuggageCart />
              <span>Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-secondaryLite text-headerTextColor text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setShowLogin(true)}
              className="text-headerTextColor border border-headerTextColor hover:bg-headerButtonBg py-1 px-3 rounded-primaryRadius"
            >
              Log in
            </button>
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
