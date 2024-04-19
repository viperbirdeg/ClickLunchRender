import React from "react";
import { Route, Routes } from "react-router";

//*Importing self components
//?Home components
import HomeLayout from "../pages/home/HomeLayout.jsx";
import Inicio from "../pages/home/components/Inicio.jsx";
import AboutUs from './../pages/home/components/AboutUs';
import Contacts from './../pages/home/components/Contacts';
import AuthLayout from './../pages/auth/AuthLayout';
import Login from './../pages/auth/components/Login';
import Register from './../pages/auth/components/Register';

//?Client components

//?Cafeteria components

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<HomeLayout />}>
        <Route index path="" element={<Inicio />} />
        <Route path="aboutUs" element={<AboutUs />} />
        <Route path="contact" element={<Contacts />} />

      </Route>
      <Route path="/auth" element={<AuthLayout />}>
        <Route index path="" element={<Login />}/>
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
};

export default Router;
