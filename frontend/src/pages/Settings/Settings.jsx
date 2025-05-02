import React, { useState, useEffect } from "react";
import "./Settings.css";
import axios from "axios";

const Settings = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { firstName, lastName, email } = res.data;
        setFormData((prev) => ({
          ...prev,
          firstName,
          lastName,
          email,
        }));
      } catch (err) {
        console.error("Failed to fetch profile", err);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, lastName, email, password, confirmPassword } = formData;

    if (password && password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // Or use cookie
      await axios.put(
        "http://localhost:5000/api/users/profile",
        { firstName, lastName, email, password },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Profile updated successfully");
    } catch (err) {
      console.error("Failed to update profile", err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="settingsContainer">
      <div className="header">
        <p>Settings</p>
      </div>
      <div className="settingsBox">
        <div className="head">
          <p>Edit Profile</p>
        </div>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="inputBox">
              <label htmlFor="Firstname">First name</label>
              <input
                type="text"
                name="Firstname"
                id="Firstname"
                value={formData.firstName}
                onChange={handleChange}
              />
            </div>
            <div className="inputBox">
              <label htmlFor="Lastname">Last name</label>
              <input type="text" name="Lastname" id="Lastname" value={formData.lastName}
              onChange={handleChange} />
            </div>
            <div className="inputBox">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="inputBox">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="inputBox">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <div className="saveBtn">
              <button type="submit">Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Settings;
