import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../../imagenes/logo-removebg-preview.png";
import "../css/NavBar.css";

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
      <ul className="navbar-links">
        <li>
          <NavLink to="/cafe" end="true">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="orders" end="true">
            Pedidos
          </NavLink>
        </li>
        <li>
          <NavLink to="addProduct" end="true">
            Agregar Alimento
          </NavLink>
        </li>
        <li>
          <NavLink to="addSaldo" end="true">
            Agregar Saldo
          </NavLink>
        </li>
      </ul>
      <button onClick={handleClick} className="navbar-logout">
        LogOut
      </button>
    </nav>
  );
};

export default NavBar;