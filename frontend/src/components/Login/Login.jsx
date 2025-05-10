import { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [loginFromData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleDataChange = (e) => {
    const { name, value } = e.target;

    setLoginFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const baseUrl = import.meta.env.VITE_API_URL;

  const loginUser = async () => {
    try {
      const res = await axios.post(`${baseUrl}/user/login`, loginFromData);

      console.log("user loggedin", res.data);
      localStorage.setItem("uid_token", res.data.token);

      toast.success("User Loggedin!");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();

    loginUser();

    setLoginFormData({
      email: "",
      password: "",
    });
  };

  return (
    <>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={loginFromData.email}
            onChange={(e) => handleDataChange(e)}
          />
        </label>
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            placeholder="********"
            value={loginFromData.password}
            onChange={(e) => handleDataChange(e)}
          />
        </label>
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;
