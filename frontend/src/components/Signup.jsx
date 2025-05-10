import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

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
      localStorage.setItem("uid_token", res.data.token);
      setLoading(false);
      toast.success("Loggedin Successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.log(error?.response?.data);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.confirm_password === formData.password) {
      setLoading(true);
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
        {!loading ? (
          <button>Create Account</button>
        ) : (
          <div className="spinner"></div>
        )}
      </form>
    </>
  );
};

export default Signup;
