import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import "./ProtectedRoute.css";

const ProtectedRoute = ({ children }) => {
  const [auth, setAuth] = useState(null);

  const baseUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await axios.get(`${baseUrl}/user/profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("uid_token")}`,
          },
        });
        localStorage.setItem("username", res.data?.data?.username);
        setAuth(true);
      } catch (error) {
        console.log(error);
        setAuth(false);
      }
    };

    verifyUser();
  }, []);

  if (auth === null)
    return (
      <>
        <div className="spinner"></div>
      </>
    );
  if (auth === false) return <Navigate to="/" />;
  return children;
};

export default ProtectedRoute;
