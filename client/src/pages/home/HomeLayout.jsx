import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

//*Importing self components
import NavBar from "./components/NavBar";
import "./home.css";
import Footer from "./components/Footer";
import axios from "axios";
import { baseUrl } from "../../other/extras";

const HomeLayout = () => {
  const navigation = useNavigate();
  React.useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (!token) {
      return;
    } else {
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
          } else {
            window.localStorage.removeItem("token");
          }
        })
        .catch((error) => {});
    }
  }, [navigation]);

  return (
    <div className="home-layout-container">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default HomeLayout;
