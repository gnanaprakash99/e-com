import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Login from '../../pages/login/Login';
import Cards from '../../pages/cards/Cards';
import AddProduct from '../../pages/addProduct/AddProduct';
import Search from '../search/Search';
import { useSearch } from '../context/Context';

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [showCard, setShowCard] = useState(false);
  const { setSearchQuery } = useSearch();

  return (
    <nav className="flex flex-col lg:flex-row sm:flex-col sm:justify-between sm:items-center gap-4 px-6 py-4 bg-teritaryLite shadow border-b border-primaryborder">

      {/* Left: Logo + Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-6">
        <h1 className="text-2xl mr-6 font-bold text-green">Muse Market</h1>
        <div className="flex gap-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? 'text-primaryText'
                : 'text-secondaryText hover:text-primaryText'
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive
                ? 'text-primaryText'
                : 'text-secondaryText hover:text-primaryText'
            }
          >
            Product
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? 'text-primaryText'
                : 'text-secondaryText hover:text-primaryText'
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? 'text-primaryText'
                : 'text-secondaryText hover:text-primaryText'
            }
          >
            Contact
          </NavLink>
        </div>
      </div>

      {/* Center: Search */}
      <div className="w-full sm:w-auto">
        <Search
          placeholder="Search..."
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full sm:w-[300px] md:w-[400px] lg:w-[500px]"
        />
      </div>

      {/* Right: Action Buttons */}
      <div className="flex gap-4 flex-wrap sm:flex-nowrap">
        <button
          onClick={() => setShowAddProduct(true)}
          className="border border-primaryborder hover:bg-primaryborder py-1 px-3 rounded-primaryRadius"
        >
          Add Product
        </button>
        <button
          onClick={() => setShowCard(true)}
          className="border border-primaryborder hover:bg-primaryborder py-1 px-3 rounded-primaryRadius"
        >
          Card <span className="text-primaryText">0</span>
        </button>
        <button
          onClick={() => setShowLogin(true)}
          className="border border-primaryborder hover:bg-primaryborder py-1 px-3 rounded-primaryRadius"
        >
          Log in
        </button>
      </div>

      {/* Modals */}
      <AddProduct isOpen={showAddProduct} onClose={() => setShowAddProduct(false)} />
      <Cards isOpen={showCard} onClose={() => setShowCard(false)} />
      <Login isOpen={showLogin} onClose={() => setShowLogin(false)} />
    </nav>
  );
};

export default Header;
