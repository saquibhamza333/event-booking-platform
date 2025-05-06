import React from 'react';
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <div className="relative bg-[url('/andrew-kliatskyi-B_Z9jqassqE-unsplash.jpg')] bg-cover bg-center min-h-screen flex justify-center items-center overflow-hidden">
      {/* Signup Box */}
      <div className="bg-black/70 w-[400px] p-10 rounded-lg shadow-lg border-2 border-orange-500 text-white">
        <h2 className="text-3xl font-bold text-center mb-8">Create Account</h2>
        
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            className="p-3 rounded bg-white/10 border border-white placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="email"
            placeholder="Email"
            className="p-3 rounded bg-white/10 border border-white placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-3 rounded bg-white/10 border border-white placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
          <button
            type="submit"
            className="bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition duration-300 font-semibold"
          >
            Sign Up
          </button>
        </form>

        {/* Login Link */}
        <p className="text-sm text-center mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-orange-500 hover:underline font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
