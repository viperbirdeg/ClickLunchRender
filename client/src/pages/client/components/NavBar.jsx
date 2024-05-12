import React from "react";
import { NavLink } from "react-router-dom";

import "../css/NavBar.css"; // Import the CSS file
import logo from '../../../imagenes/logo-removebg-preview.png'

const NavBar = () => {
  const handleClick = (e) => {
    e.preventDefault();

    window.localStorage.removeItem("token");
    window.localStorage.removeItem("rol");
    window.localStorage.removeItem("id");
    window.localStorage.removeItem("cart");
    window.location.reload();
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <NavLink to='' end>Inicio</NavLink>
      <NavLink to="/client/orders" className="navbar-link" end='true' >
        Pedidos
      </NavLink>
      <NavLink to="/client/cart" className="navbar-link" end='true'>
        Carrito
      </NavLink>
      <NavLink to='/client/profile' className='navbar-link' end='true'>
        Perfil
      </NavLink>
      <button onClick={handleClick} className="navbar-button" end='true' >
        LogOut
      </button>
    </nav>
  );
};

export default NavBar;