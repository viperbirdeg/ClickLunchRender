import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import NavBar from "../home/components/NavBar";
import './auth.css';
import axios from "axios";
import { baseUrl } from "../../other/extras";

const AuthLayout = () => {

  const navigation = useNavigate();
  React.useEffect(() => {
    const token = window.localStorage.getItem("token");

    if (!token) return;
    axios
      .get(`${baseUrl}/api/usuario/authUser`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        if (res.data.message.rol === "Cliente") {
          navigation("/client");
        } else if (res.data.message.rol === "Cafeteria") {
          navigation("/cafe");
        }
      })
      .catch((error) => {
        
        console.log(error)
        //navigation('/');
      });
  }, [navigation]);

  return (
    <div className="auth-container">
      <NavBar />
      <Outlet />
    </div>
  );
};

export default AuthLayout;
