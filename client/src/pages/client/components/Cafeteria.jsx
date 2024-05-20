import React from "react";
import { Link } from "react-router-dom";

import "../css/Cafeteria.css"; // Import the CSS file

const Cafeteria = ({ id, nombre, email }) => {
  const route = `products/${id}`;
  return (
    <div className="cafeteria">
      <div>ID : {id}</div>
        <svg className="svg_neg" xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px"><path d="M160-720v-80h640v80H160Zm0 560v-240h-40v-80l40-200h640l40 200v80h-40v240h-80v-240H560v240H160Zm80-80h240v-160H240v160Zm-38-240h556-556Zm0 0h556l-24-120H226l-24 120Z" /></svg>
      <div className="caf_cont">
        <section className="data_caf">
          <div className="nombre_caf">{nombre}</div>
          <div className="cont_caf">{email}</div>
          <Link to={route} className="cafeteria-link">
            Seleccionar
          </Link>
        </section>
      </div>
    </div>
  );
};

export default Cafeteria;