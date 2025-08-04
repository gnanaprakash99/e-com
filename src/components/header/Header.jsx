import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Login from '../../pages/login/Login';
import Cards from '../../pages/cards/Cards';
import AddProduct from '../../pages/addProduct/AddProduct';

const Header = () => {
    const [showLogin, setShowLogin] = useState(false);
    const [showAddProduct, setshowAddProduct] = useState(false);
    const [showCard, setshowCard] = useState(false);

    return (
        <nav className="flex justify-between items-center px-6 py-4 bg-teritaryLite shadow border-b-[1px] border-primaryborder">
            <div>
                <h1 to="/" className="text-2xl font-bold text-green">
                    Muse Market
                </h1>
            </div>
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
            <div className=''>
                {/* adding new product  */}
                <button
                    onClick={() => setshowAddProduct(true)}
                    className='border-[1px] border-primaryborder hover:bg-primaryborder mr-5 py-1 px-2  rounded-primaryRadius '
                >
                    add Product
                </button>

                {/* card items  */}
                <button
                    onClick={() => setshowCard(true)}
                    className='border-[1px] border-primaryborder hover:bg-primaryborder mr-5 py-1 px-2  rounded-primaryRadius '
                >
                    Card <span className='text-primaryText'>0</span>
                </button>

                {/* login button  */}
                <button
                    onClick={() => setShowLogin(true)}
                    className='border-[1px] border-primaryborder hover:bg-primaryborder mr-5 py-1 px-2 rounded-primaryRadius'
                >
                    Log in
                </button>
            </div>
            
            {/*  model  */}
            <AddProduct isOpen={showAddProduct} onClose={() => setshowAddProduct(false)} />
            <Cards isOpen={showCard} onClose={() => setshowCard(false)} />
            <Login isOpen={showLogin} onClose={() => setShowLogin(false)} />
        </nav>
    );
};

export default Header;
