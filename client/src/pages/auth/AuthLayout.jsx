import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../home/components/NavBar";
import './auth.css';

const AuthLayout = () => {
  return (
    <div className="auth-container">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
