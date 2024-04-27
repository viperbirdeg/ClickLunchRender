import React from "react";
import { Link } from "react-router-dom";

const Cafeteria = ({ id, nombre, email }) => {
  const route = `products/${id}`
  return (
    <div>
      <div>{id}</div>
      <div>{nombre}</div>
      <div>{email}</div>
      <Link to={route} >Seleccionar</Link>
    </div>
  );
};

export default Cafeteria;
