import React from "react";
import { NavLink } from "react-router-dom";
import logo from '../../../imagenes/logo-removebg-preview.png'

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
      <p><img src={logo} alt="none" /></p>
      <NavLink to="orders">Pedidos</NavLink>
      <NavLink to='addProduct'>Agregar Alimento</NavLink>
      <button onClick={handleClick}>LogOut</button>
    </div>
  );
};
export default NavBar