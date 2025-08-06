import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useCategory } from './context/CategoryContext';

const RouteChangeHandler = () => {
    const location = useLocation();
    const { setSelectedCategory } = useCategory();

    // Reset category on every route change
    useEffect(() => {
        setSelectedCategory('');
    }, [location.pathname]);

    return null;
};

export default RouteChangeHandler;
