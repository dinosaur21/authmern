// ManufacturerRegister.jsx
import React, { useEffect, useState } from "react";
import Image from "../assets/image.png";
import Logo from "../assets/logo.png";
import GoogleSvg from "../assets/icons8-google.svg";
import { FaEye } from "react-icons/fa6";
import { FaEyeSlash } from "react-icons/fa6";
import "../styles/Register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ManufacturerRegister = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [token, setToken] = useState(
    JSON.parse(localStorage.getItem("manufacturerAuth")) || ""
  );

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    let companyName = e.target.companyName.value;
    let registrationNumber = e.target.registrationNumber.value;
    let businessEmail = e.target.businessEmail.value;
    let address = e.target.address.value;
    let password = e.target.password.value;
    let confirmPassword = e.target.confirmPassword.value;

    if (
      companyName.length > 0 &&
      registrationNumber.length > 0 &&
      businessEmail.length > 0 &&
      address.length > 0 &&
      password.length > 0 &&
      confirmPassword.length > 0
    ) {
      if (password === confirmPassword) {
        const formData = {
          companyName,
          registrationNumber,
          businessEmail,
          address,
          password,
        };
        try {
          const response = await axios.post(
            "http://localhost:3000/api/v1/manufacturer/register",
            formData
          );
          toast.success("Manufacturer Registration successful");
          navigate("/manufacturer/login");
        } catch (err) {
          toast.error(err.response?.data?.msg || err.message);
        }
      } else {
        toast.error("Passwords don't match");
      }
    } else {
      toast.error("Please fill all inputs");
    }
  };

  useEffect(() => {
    if (token !== "") {
      toast.success("You are already logged in");
      navigate("/manufacturer/dashboard");
    }
  }, []);

  return (
    <div className="register-main">
      <div className="register-left">
        <img src={Image} alt="" />
      </div>
      <div className="register-right">
        <div className="register-right-container">
          <div className="register-logo">
            <img src={Logo} alt="" />
          </div>
          <div className="register-center">
            <h2>Welcome to BioBit!</h2>
            <p>Please enter your manufacturer details</p>
            <form onSubmit={handleRegisterSubmit}>
              <input
                type="text"
                placeholder="Company Name"
                name="companyName"
                required={true}
              />
              <input
                type="text"
                placeholder="Registration Number"
                name="registrationNumber"
                required={true}
              />
              <input
                type="email"
                placeholder="Business Email"
                name="businessEmail"
                required={true}
              />
              <input
                type="text"
                placeholder="Business Address"
                name="address"
                required={true}
              />
              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                  required={true}
                />
                {showPassword ? (
                  <FaEyeSlash
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                ) : (
                  <FaEye
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                )}
              </div>
              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  required={true}
                />
                {showPassword ? (
                  <FaEyeSlash
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                ) : (
                  <FaEye
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  />
                )}
              </div>
              <div className="register-center-buttons">
                <button type="submit">Register as Manufacturer</button>
                <button type="button">
                  <img src={GoogleSvg} alt="" />
                  Register with Google
                </button>
              </div>
            </form>
          </div>
          <p className="login-bottom-p">
            Already have a manufacturer account?{" "}
            <Link to="/manufacturer/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ManufacturerRegister;