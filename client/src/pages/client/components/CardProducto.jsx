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
      <div>Unidades Disponibles: {disponibilidad}</div>
      <div className="name_procard">{nombre}</div>
      <div className="pre_procard">${costo} </div>
      <Link to={route} className="card-producto-link">
        Detalles
      </Link>
    </div>
  );
};

export default CardProducto;
