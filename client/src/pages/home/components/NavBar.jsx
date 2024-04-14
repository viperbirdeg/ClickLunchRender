import React from "react";
import { NavLink } from "react-router-dom";

//* className={({ isActive }) => (isActive ? "active-link" : undefined)}

const NavBar = () => {
  return (
    <nav className="home-navbar">
      <NavLink to='/' className="home-logotipo">CLICK LUNCH</NavLink>
      <ul>
        <li>
          <NavLink to="" activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="aboutUs" activeClassName="active">
            Acerda de nosotros
          </NavLink>
        </li>
        <li>
          <NavLink to="contact" activeClassName="active">
            Contacto
          </NavLink>
        </li>
      </ul>
      <ul>
        <li>
          <NavLink
            to="#"
            activeClassName="active"
            className="home-login-button"
          >
            Login
          </NavLink>
        </li>
        <li>
          <NavLink
            to="#"
            activeClassName="active"
            className="home-register-button"
          >
            Registrarse
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
