import React from "react";
import { NavLink } from "react-router-dom";
import { baseUrl } from "../../../other/extras";
import axios from "axios";

const NavBar = () => {

  const handleClick = (e) => {
    e.preventDefault();

    window.localStorage.removeItem('token');
    window.localStorage.removeItem('rol');
    window.localStorage.removeItem('id');
    window.localStorage.removeItem('cart');
    window.location.reload();
  }

  return (
    <div>
      <p>NavBar</p>
      <NavLink to="/client/cart">carrito</NavLink>
      <button onClick={handleClick}>LogOut</button>
    </div>
  );
};

export default NavBar;
