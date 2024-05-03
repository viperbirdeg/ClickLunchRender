import React from "react";
import { Link } from "react-router-dom";

import "../css/CardProducto.css"; // Import the CSS file

const CardProducto = ({ id, nombre, costo, disponibilidad, url }) => {
  const route = `/client/product/${id}`;
  return (
    <div className="card-producto">
      <div>
        {" "}
        <img src={url} alt="Imagen no disponible" />
      </div>
      <div>ID : {id}</div>
      <div>Nombre : {nombre}</div>
      <div>Costo : ${costo} </div>
      <div> Disponibilidad aproximada : {disponibilidad} productos</div>
      <Link to={route} className="card-producto-link">
        Detalles
      </Link>
    </div>
  );
};

export default CardProducto;
