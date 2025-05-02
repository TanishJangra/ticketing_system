import React, { useState } from "react";
import image1 from "../../assets/logoImg.png";
import biCloudHaze2 from "../../assets/AuthSideImg.png";
import "./Login.css";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    console.log(loginData);

    // Simple validation
    if (!loginData.email || !loginData.password) {
      setError("All fields are required.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      setError("Invalid email format.");
      return;
    }

    if (loginData.password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          email: loginData.email,
          password: loginData.password,
        }
      );

      if(response.status === 200) {
        setSuccess("Login successful!");
        setLoginData({ email: "", password: "" });
        navigate("/app/dashboard");
      } else {
        setError("Login failed. Please try again.");
      }

      console.log("Login successful:", response.data);
      localStorage.setItem("token", response.data.token);

    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      setError("Login failed. Please try again.");
      alert("Error: " + (error.response?.data?.message || "Login failed"));
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
          <form onSubmit={handleSubmit} className="signUpformContainer">
            <div className="topHeadContainer">
              <div className="topHeading">
                <p>Sign in to your Plexify</p>
              </div>
            </div>
            <div className="formFields">
              <div className="signUpFormGroup">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="Enter Email"
                  value={loginData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="signUpFormGroup">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter password"
                  value={loginData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="signUpFormGroup signUpBtnContainer">
                <button type="submit" className="submitBtn">
                  Log In
                </button>
              </div>
              {error && <p className="errorMsg">{error}</p>}
              {success && <p className="successMsg">{success}</p>}
            </div>
            <div className="contentDiv">
              <div className="content">
                <p>Don't have an account?</p>
                <NavLink to="/signup">Sign Up</NavLink>

              </div>
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

export default Login;
