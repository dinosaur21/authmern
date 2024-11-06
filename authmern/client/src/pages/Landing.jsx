import React from 'react'
import "../styles/Landing.css";
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div className='landing-main'>
      <h1>SignIn/SignUp</h1>
      <p>Welcome to BioBit!</p>
      <div className="landing-buttons-container">
        <div className="user-buttons">
          <h3>For Users</h3>
          <Link to="/login" className="landing-login-button">Login</Link>
          <Link to="/register" className="landing-register-button">Register</Link>
        </div>
        <div className="manufacturer-buttons">
          <h3>For Manufacturers</h3>
          <Link to="/manufacturer/login" className="landing-manufacturer-login-button">Manufacturer Login</Link>
          <Link to="/manufacturer/register" className="landing-manufacturer-register-button">Register as Manufacturer</Link>
        </div>
      </div>
    </div>
  )
}

export default Landing