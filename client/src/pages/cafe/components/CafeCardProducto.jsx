import React from "react";
import { Link } from "react-router-dom";

import "../../client/css/CardProducto.css"
import fond_pro from "../../../imagenes/fondotarj5.jpg"

const CafeCardProducto = ({ id, nombre, costo, disponibilidad, url }) => {
  const route = `/cafe/editproduct/${id}`;

  return (
    <div className="card-producto">
      <img className="img_pro_bg" src={fond_pro} alt="Imagen no disponible" />
      <section className="info_capr">
        <section>
          <div className="name_procard">{nombre} </div>
          <div>Disponibilidad: {disponibilidad}</div>
        </section>
        <div className="pre_procard"><span>${costo}</span></div>
      </section>
      <img className="img_pro_card" src={url} alt="Imagen no disponible" />
      <section className="btns_capr" id="btn_edit_pro">
        <Link to={route} className="card-producto-link">
          Editar <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
          </svg>
        </Link>
      </section>
    </div>
  );
};

export default CafeCardProducto;
