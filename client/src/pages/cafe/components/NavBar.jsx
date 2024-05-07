import React from "react";
import { NavLink } from "react-router-dom";
import logo from '../../../imagenes/logo-removebg-preview.png'
import '../css/NavBar.css'

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
      <div className="img-container"><img src={logo} alt="none" className=""/></div>
      <NavLink to="/cafe" end="true">Home</NavLink>
      <NavLink to="orders" end="true">Pedidos</NavLink>
      <NavLink to='addProduct' end="true">Agregar Alimento</NavLink>
      <NavLink to='addSaldo' end="true">Agregar Saldo</NavLink>
      <button onClick={handleClick}>LogOut</button>
    </div>
  );
};
export default NavBar