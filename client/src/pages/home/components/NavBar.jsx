import React from "react";
import { NavLink } from "react-router-dom";
import { homeIcon } from "../../../other/icons";

//* className={({ isActive }) => (isActive ? "active-link" : undefined)}

const NavBar = () => {
  return (
    <nav className="home-navbar">
      <NavLink to="/" className="home-logotipo">
        CLICK LUNCH
      </NavLink>
      <section className="nav_options">
        <ul className="home-listnav">
          <li>
            <NavLink to="/" className="icon_navbar" activeClassName="active">
              <svg
                className="icon_nav"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path d={homeIcon} />
              </svg>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/aboutUs"
              className="icon_navbar"
              activeClassName="active"
            >
              <svg
                className="icon_nav"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
              >
                <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z" />
              </svg>
              Acerda de nosotros
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className="icon_navbar"
              activeClassName="active"
            >
              <svg
                className="icon_nav"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path d="M96 0C60.7 0 32 28.7 32 64V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H96zM208 288h64c44.2 0 80 35.8 80 80c0 8.8-7.2 16-16 16H144c-8.8 0-16-7.2-16-16c0-44.2 35.8-80 80-80zm-32-96a64 64 0 1 1 128 0 64 64 0 1 1 -128 0zM512 80c0-8.8-7.2-16-16-16s-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V80zM496 192c-8.8 0-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm16 144c0-8.8-7.2-16-16-16s-16 7.2-16 16v64c0 8.8 7.2 16 16 16s16-7.2 16-16V336z" />
              </svg>
              Contacto
            </NavLink>
          </li>
        </ul>
        <ul className="home-buttons-container">
          <li>
            <NavLink
              to="/auth"
              className={({ isActive, isPending }) =>
                [isActive ? "active_btn" : ""].join("home-login-button")
              }
              end
            >
              Iniciar Sesión
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/auth/register"
              className={({ isActive, isPending }) =>
                [isActive ? "active_btn" : ""].join("home-register-button")
              }
            >
              Registrarse
            </NavLink>
          </li>
          <i class="fa-solid fa-bars"></i>
        </ul>
      </section>
    </nav>
  );
};

export default NavBar;
