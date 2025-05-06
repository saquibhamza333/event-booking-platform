import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
});

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({}); 
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  try {
    loginSchema.parse(formData);
    console.log("Form is valid:", formData);
    // handle login logic here
  } catch (err) {
    if (err.issues) {
      const formattedErrors = {};
      err.issues.forEach((issue) => {
        formattedErrors[issue.path[0]] = issue.message;
      });
      setErrors(formattedErrors);
    }
  }
};


  return (
    <div className="relative bg-[url('/andrew-kliatskyi-B_Z9jqassqE-unsplash.jpg')] bg-cover bg-center min-h-screen flex justify-center items-center overflow-hidden">
      <div className="bg-black/70 w-[400px] p-10 rounded-lg shadow-lg border-2 border-orange-500 text-white">
        <h2 className="text-3xl font-bold text-center mb-8">Login</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
