import React, { useState } from 'react';
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import ProfileSidebar from './ProfileSidebar';

const Header = () => {
  const { accessToken, user } = useSelector((state) => state.auth);
  const [showSidebar, setShowSidebar] = useState(false);
  console.log(`header ${user?.role}`)

  const toggleSidebar = () => {
    setShowSidebar(prev => !prev);
  };

  return (
    <>
      <header className='flex justify-between items-center p-6 text-white relative'>
        {/* Nav */}
        <nav>
          <ul className="flex font-semibold leading-tight text-white gap-3">
            <li className="flex gap-3">
              <NavLink to="/">HOME</NavLink>
              <span className='text-orange-500 font-extrabold'>/</span>
            </li>
            <li className="flex gap-3">
              <NavLink to="/events">GET A TICKET</NavLink>
              <span className='text-orange-500 font-extrabold'>/</span>
            </li>
            <li>
              <NavLink to="/about">ABOUT US</NavLink>
            </li>
          </ul>
        </nav>

        {/* Logo */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <NavLink to="/">
            <h1 className="text-3xl font-extrabold tracking-widest text-orange-500 drop-shadow-lg text-center">
              SEAT<span className="text-white">SAVVY</span>
            </h1>
          </NavLink>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {user?.role === 'admin' && (
            <Link to="/admin">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full font-bold">
                Admin Panel
              </button>
            </Link>
          )}

          {accessToken ? (
            <FaUserCircle
              onClick={toggleSidebar}
              className="text-3xl text-orange-400 hover:text-white cursor-pointer"
            />
          ) : (
            <Link to="/login">
              <button className='border-4 border-orange-500 text-white px-8 py-2 rounded-full font-bold cursor-pointer'>
                LOGIN
              </button>
            </Link>
          )}
        </div>
      </header>

      <ProfileSidebar isOpen={showSidebar} onClose={toggleSidebar} />
    </>
  );
};

export default Header;
