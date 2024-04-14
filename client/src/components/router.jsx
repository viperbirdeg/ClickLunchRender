import React from "react";
import { Route, Routes } from "react-router";

//*Importing self components
//?Home components
import HomeLayout from "../pages/home/HomeLayout.jsx";
import Inicio from "../pages/home/components/Inicio.jsx";
import AboutUs from './../pages/home/components/AboutUs';
import Contacts from './../pages/home/components/Contacts';

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
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
};

export default Router;
