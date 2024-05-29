import React from "react";
import "../css/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <p>© Hi-Stern. All rights reserved. ❤️</p>
      <ul className="footer-links">
        <li>
          <a href="/cafe">Privacy Policy</a>
        </li>
        <li>
          <a href="/cafe">Terms of Service</a>
        </li>
        <li>
          <a href="/cafe">Contact Us</a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;