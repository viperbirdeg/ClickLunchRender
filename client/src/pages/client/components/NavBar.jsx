import React from "react";
import { NavLink } from "react-router-dom";

import "../css/NavBar.css"; // Import the CSS file

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
      <p>NavBar</p>
      <NavLink to='' end>Inicio</NavLink>
      <NavLink to="/client/orders" className="navbar-link" end>
        Pedidos
      </NavLink>
      <NavLink to="/client/cart" className="navbar-link" end>
        carrito
      </NavLink>
      <button onClick={handleClick} className="navbar-button" end >
        LogOut
      </button>
    </nav>
  );
};

export default NavBar;