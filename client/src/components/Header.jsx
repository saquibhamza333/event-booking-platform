import React from 'react';
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header className='flex justify-between items-center p-6 text-white'>
     
      <nav>
        <ul className="flex font-semibold leading-tight text-white gap-3">
          <li className="flex gap-3">
            <NavLink to="/">HOME</NavLink>
            <span className='text-orange-500 font-extrabold'>/</span>
          </li>
          <li className="flex gap-3">
            <NavLink to="/about">GET A TICKET</NavLink>
            <span className='text-orange-500 font-extrabold'>/</span>
          </li>
          <li>
            <NavLink to="/about">ABOUT US</NavLink>
          </li>
        </ul>
      </nav>

      <div className="flex justify-center absolute left-1/2 transform -translate-x-1/2">
        <NavLink to="/">
          <h1 className="text-3xl font-extrabold tracking-widest text-orange-500 drop-shadow-lg text-center">
            SEAT<span className="text-white">SAVVY</span>
          </h1>
        </NavLink>
      </div>

   
      <button className='border-4 border-orange-500 text-white px-8 py-2 rounded-full font-bold cursor-pointer'>
        LOGIN
      </button>
    </header>
  );
}

export default Header;
