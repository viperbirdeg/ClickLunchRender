import React from "react";

const Footer = ({ id, nombre, saldo, email, rol }) => {
  return (
    <footer>
      <ul>
      <li>id : {id}</li>
      <li>nombre : {nombre}</li>
      <li>saldo : {saldo}</li>
      <li>email : {email}</li>
      <li>rol : {rol}</li>
     </ul>
    </footer>
  );
};

export default Footer;
