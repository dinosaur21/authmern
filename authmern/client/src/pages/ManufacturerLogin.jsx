import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import '../styles/Login.css';

const ManufacturerLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const businessEmail = e.target.businessEmail.value;
    const password = e.target.password.value;

    if (businessEmail.length > 0 && password.length > 0) {
      try {
        const response = await axios.post(
          'http://localhost:3000/api/v1/manufacturer/login',
          { businessEmail, password }
        );
        localStorage.setItem(
          'manufacturerAuth',
          JSON.stringify(response.data.token)
        );
        toast.success('Login successful');
        navigate('/manufacturer/dashboard');
      } catch (err) {
        toast.error(err.response?.data?.msg || err.message);
      }
    } else {
      toast.error('Please fill all inputs');
    }
  };

  return (
    <div className="login-container">
      <h2>Manufacturer Login</h2>
      <form onSubmit={handleLoginSubmit}>
        <input
          type="email"
          name="businessEmail"
          placeholder="Business Email"
          required
        />
        <div className="password-input">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have a manufacturer account?{' '}
        <Link to="/manufacturer/register">Register</Link>
      </p>
    </div>
  );
};

export default ManufacturerLogin;