import React from "react";
import { Link } from "react-router-dom";

import "../css/Cafeteria.css"; // Import the CSS file
import caf from "../../../imagenes/cafeterias4.png"
import log from "../../../imagenes/logo-removebg-preview.png"

const Cafeteria = ({ id, nombre, email }) => {
  const route = `products/${id}`;
  return (
    <div className="cafeteria">
      <img className="log_caf" src={log} alt="" />
      <div className="caf_id">ID : {id}</div>
      <div className="caf_cont">
        <section className="data_caf">
          <div className="nombre_caf">{nombre}</div>
          <section>
            <div className="cont_caf"><svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
              <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
            </svg> <span>{email}</span></div>
            <span className="cont_pro">Productos: </span>
            <Link to={route} className="cafeteria-link">Visitar Cafeteria<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-bar-right" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8m-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5" />
            </svg></Link>
          </section>
        </section>
        <img className="data_caf_img" src={caf} alt="" />
      </div>
    </div>
  );
};

export default Cafeteria;