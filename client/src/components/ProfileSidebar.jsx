import React from 'react';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlice';

const ProfileSidebar = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    onClose();
  };

  return (
    <div className={`fixed top-0 right-0 h-full w-64 bg-black text-white z-50 transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
      <div className="p-4 flex justify-between items-center border-b border-orange-500">
        <h2 className="text-lg font-bold">My Account</h2>
        <button onClick={onClose}>
          <FaTimes className="text-xl hover:text-orange-500" />
        </button>
      </div>

      <ul className="flex flex-col p-4 gap-4">
        <Link to="/profile" onClick={onClose}>
          <li className="hover:text-orange-500">🧑 My Profile</li>
        </Link>
        <Link to="/my-bookings" onClick={onClose}>
          <li className="hover:text-orange-500">🎟️ My Bookings</li>
        </Link>
        <li className="hover:text-orange-500 cursor-pointer" onClick={handleLogout}>
          🚪 Logout
        </li>
      </ul>
    </div>
  );
};

export default ProfileSidebar;
