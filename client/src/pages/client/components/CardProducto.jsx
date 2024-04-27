import React from "react";
import { Link } from "react-router-dom";

const CardProducto = ({ id, nombre, costo, disponibilidad }) => {
  const route = `/client/product/${id}`;

  return (
    <div>
      <div>ID - {id}</div>
      <div>Nombre: {nombre}</div>
      <div>Costo: ${costo}</div>
      <div>Disponibilidad aproximada: {disponibilidad}</div>
      <Link to={route}>Ver</Link>
    </div>
  );
};

export default CardProducto;
