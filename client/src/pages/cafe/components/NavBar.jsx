import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {

  const handleClick = (e) => {
    e.preventDefault();

    window.localStorage.removeItem('token');
    window.localStorage.removeItem('rol');
    window.localStorage.removeItem('id');
    window.localStorage.removeItem('cart');
    window.location.reload();

    return
  }

  return (
    <div>
      <p>NavBar</p>
      <NavLink to="orders">Pedidos</NavLink>
      <button onClick={handleClick}>LogOut</button>
    </div>
  );
};
export default NavBar