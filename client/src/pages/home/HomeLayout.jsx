import React, { useState, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";

//*Importing self components
import NavBar from "./components/NavBar";
import "./home.css";
import Footer from "./components/Footer";
import axios from "axios";
import { baseUrl } from "../../other/extras";
import LoadingSpinner from './components/LoadingSpinne';

const HomeLayout = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const token = window.localStorage.getItem("token");
    if (!token) {
      setLoading(false);
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
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
        });
    }
    const handleNavigationStart = () => setLoading(true);
    const handleNavigationEnd = () => setLoading(false);
    handleNavigationStart();
    navigation.listen(handleNavigationEnd);
    return () => {
      navigation.unlisten(handleNavigationEnd);
    };
  }, [navigation]);


  if (loading) {
    return <LoadingSpinner />;
  }


  return (
    <div className="home-layout-container">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default HomeLayout;
