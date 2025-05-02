import React, { useState } from "react";
import "./SignUp.css";
import image1 from "../../assets/logoImg.png";
import biCloudHaze2 from "../../assets/AuthSideImg.png";
import axios from "axios";
import { NavLink } from "react-router-dom";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: false,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    console.log(formData);

    // Simple validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("All fields are required.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Invalid email format.");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!formData.terms) {
      setError("You must accept the terms and conditions.");
      return;
    }

    try {
      const response = await axios.post(
        "https://ticketing-system-usx8.onrender.com/api/auth/register",
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
        }
      );

      if (response.status === 201) {
        setSuccess("Account created successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
          terms: false,
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div className="signUpContainer">
      <div className="left">
        <div className="topContainer">
          <div className="top">
            <img src={image1} alt="logo" />
            <h1>Hubly</h1>
          </div>
        </div>
        <div className="bottomContainer">
          <form className="signUpformContainer" onSubmit={handleSubmit}>
            <div className="topHeadContainer">
              <div className="topHeading">
                <p>Create an account</p>
                <NavLink to="/login">Sign in instead</NavLink>
              </div>
            </div>

            <div className="formFields">
              <div className="signUpFormGroup">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleChange}
                />
              </div>

              <div className="signUpFormGroup">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleChange}
                />
              </div>

              <div className="signUpFormGroup">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div className="signUpFormGroup">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div className="signUpFormGroup">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Re-enter password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
              <div className="checkboxGroup">
                <div className="innerDiv">
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    checked={formData.terms}
                    onChange={handleChange}
                  />
                  <label htmlFor="terms">
                    I agree to the terms and conditions
                  </label>
                </div>
              </div>
              <div className="signUpFormGroup signUpBtnContainer">
                <button type="submit" className="submitBtn">
                  Create an account
                </button>
              </div>
              {error && <p className="errorMsg">{error}</p>}
              {success && <p className="successMsg">{success}</p>}
            </div>
            <div className="bottomContent">
              This site is protected by reCAPTCHA and the Google Privacy Policy
              and Terms of Service apply.
            </div>
          </form>
        </div>
      </div>
      <div className="right">
        <img src={biCloudHaze2} alt="photo" />
      </div>
    </div>
  );
};

export default SignUp;
