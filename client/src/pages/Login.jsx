import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { z, ZodError } from 'zod';
import { loginSuccess } from '../redux/authSlice.js';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }).nonempty({ message: 'Email is required' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }).nonempty({ message: 'Password is required' }),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      loginSchema.parse(formData);

      const res = await axios.post('http://localhost:5000/api/auth/login', formData);
console.log(res.data)

      dispatch(loginSuccess({
        accessToken: res.data.accessToken,
        refreshToken: res.data.refreshToken,
        user: res.data.user
      }));
      

      toast.success("Login successful!");
      navigate('/');
    } catch (err) {
      if (err instanceof ZodError) {
        const formattedErrors = {};
        err.errors.forEach(issue => {
          formattedErrors[issue.path[0]] = issue.message;
        });
        setErrors(formattedErrors);
      } else {
        toast.error(err.response?.data?.message || 'Login failed');
      }
    }
  };

  return (
    <div className="relative bg-[url('/andrew-kliatskyi-B_Z9jqassqE-unsplash.jpg')] bg-cover bg-center min-h-screen flex justify-center items-center overflow-hidden">
      <div className="bg-black/70 w-[400px] p-10 rounded-lg shadow-lg border-2 border-orange-500 text-white">
        <h2 className="text-3xl font-bold text-center mb-8">Login</h2>

        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <div>
            <input
              name="email"
              type="text"
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
            Login
          </button>
        </form>

        <p className="text-sm text-center mt-6">
          Don’t have an account?{' '}
          <Link to="/signup" className="text-orange-500 hover:underline font-semibold">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
