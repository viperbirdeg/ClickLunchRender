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
import ClientLayout from "../pages/client/ClientLayout.jsx";
import HomeClient from "../pages/client/components/HomeClient.jsx";
import Producto from "../pages/client/components/Product.jsx";
import Productos from "../pages/client/components/Productos.jsx";
import Cart from "../pages/client/components/Cart.jsx";
import CafeLayout from "../pages/cafe/CafeLayout.jsx";
import HomeCafe from "../pages/cafe/components/HomeCafe.jsx";
import Orders from "../pages/cafe/components/Orders.jsx";
import ClientOrders from './../pages/client/components/Orders';
import NewProduct from './../pages/cafe/components/NewProduct';
import AddSaldo from "../pages/cafe/components/AddSaldo.jsx";

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
      <Route path="/client" element={<ClientLayout/>} >
        <Route index path="" element={<HomeClient/>}/>
        <Route path="products/:id" element={<Productos/>}/>
        <Route path="product/:id" element={<Producto/>}/>
        <Route path="cart" element={<Cart/>}/>
        <Route path="orders" element={<ClientOrders/>}/>
      </Route>
      <Route path="/cafe" element={<CafeLayout/>}>
        <Route index path="" element={<HomeCafe/>} />
        <Route path="orders" element={<Orders/>}/>
        <Route path="addProduct" element={<NewProduct/>}/>
        <Route path="addSaldo" element={<AddSaldo/>}/>
      </Route>
      <Route path="*" element={<h1>404 Not Found</h1>} />
    </Routes>
  );
};

export default Router;
