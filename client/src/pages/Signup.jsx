import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { z } from 'zod';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { loginSuccess } from '../redux/authSlice.js';

const signupSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({});
    setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      signupSchema.parse(formData);

      const res = await axios.post('http://localhost:5000/api/auth/register', formData);

      // Optional: auto-login user after signup
      dispatch(loginSuccess({
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
        user: res.data.user
      }));

      navigate('/');
    } catch (err) {
      if (err.issues) {
        const formattedErrors = {};
        err.issues.forEach((issue) => {
          formattedErrors[issue.path[0]] = issue.message;
        });
        setErrors(formattedErrors);
      } else {
        setServerError(err.response?.data?.message || 'Signup failed');
      }
    }
  };

  return (
    <div className="relative bg-[url('/andrew-kliatskyi-B_Z9jqassqE-unsplash.jpg')] bg-cover bg-center min-h-screen flex justify-center items-center overflow-hidden">
      <div className="bg-black/70 w-[400px] p-10 rounded-lg shadow-lg border-2 border-orange-500 text-white">
        <h2 className="text-3xl font-bold text-center mb-8">Create Account</h2>

        {serverError && <p className="text-red-400 text-center mb-4">{serverError}</p>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <input
              name="name"
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="p-3 w-full rounded bg-white/10 border border-white placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="p-3 w-full rounded bg-white/10 border border-white placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="p-3 w-full rounded bg-white/10 border border-white placeholder-white text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition duration-300 font-semibold"
          >
            Sign Up
          </button>
        </form>

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
