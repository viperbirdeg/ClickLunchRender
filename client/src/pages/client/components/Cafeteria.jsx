import React from "react";
import { Link } from "react-router-dom";

import "../css/Cafeteria.css"; // Import the CSS file

const Cafeteria = ({ id, nombre, email }) => {
  const route = `products/${id}`;
  return (
    <div className="cafeteria">
      <div>ID : {id}</div>
      <div>Nombre : {nombre}</div>
      <div>Contacto : {email}</div>
      <Link to={route} className="cafeteria-link">
        Seleccionar
      </Link>
    </div>
  );
};

export default Cafeteria;