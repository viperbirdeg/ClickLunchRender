import React from "react";
import "../css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>© Hi-Stern.Todos los derechos reservados. ❤️</p>
      <ul className="footer-links">
        <li>
          <a href="/cafe">Politicas de privacidad</a>
        </li>
        <li>
          <a href="/cafe">Terminos de servicio</a>
        </li>
        <li>
          <a href="/cafe">Contactos</a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;