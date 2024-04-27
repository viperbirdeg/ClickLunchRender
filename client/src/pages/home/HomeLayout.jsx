import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

//*Importing self components
import NavBar from "./components/NavBar";
import "./home.css";
import Footer from "./components/Footer";




const HomeLayout = () => {

  const navigation = useNavigate();
  React.useEffect(()=>{
    const rol = window.localStorage.getItem('rol');
    if(rol){
      if(rol === 'Cliente'){
        navigation('/client');
      }else if(rol === 'Cafeteria'){
        navigation('/cafe');
      }else{
        return
      }
    };
  }, []);

  return (
    <div className="home-layout-container">
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default HomeLayout;
