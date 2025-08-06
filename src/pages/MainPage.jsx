import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import RouteChangeHandler from '../components/RouteChangeHandler';

const MainPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <RouteChangeHandler />
      <Header />
      <main className="flex-grow bg-pageBg">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainPage;
