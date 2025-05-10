import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const baseUrl = import.meta.env.VITE_API_URL;

  const signupUser = async () => {
    try {
      const res = await axios.post(`${baseUrl}/user/signup`, formData);

      console.log("user signedUp successfully", res?.data);
      localStorage.setItem("uid_token", res.data.token);
      toast.success("Loggedin Successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.confirm_password === formData.password) {
      signupUser();
    }

    console.log(formData);
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          Full name:
          <input
            type="text"
            name="username"
            placeholder="Enter your name"
            value={formData.username}
            onChange={(e) => handleChange(e)}
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={(e) => handleChange(e)}
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            placeholder="********"
            value={formData.password}
            onChange={(e) => handleChange(e)}
          />
        </label>
        <label htmlFor="confirm_password">
          Confirm Password:
          <input
            type="password"
            name="confirm_password"
            placeholder="********"
            value={formData.confirm_password}
            onChange={(e) => handleChange(e)}
          />
        </label>
        <button>Create Account</button>
      </form>
    </>
  );
};

export default Signup;
