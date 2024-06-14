import React from "react";
import { Link } from "react-router-dom";

import "../../client/css/CardProducto.css";
import fond_pro from "../../../imagenes/fondotarj5.jpg";
import { baseUrl } from "../../../other/extras";
import axios from "axios";

const CafeCardProducto = ({ id, nombre, costo, disponibilidad, url }) => {
  const handleDelete = (e) => {
    e.preventDefault();
    axios
      .delete(`${baseUrl}/api/alimento/deleteAlimento`, {
        data: {
          id: id,
          text: "text",
        },
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((error) => {});
  };
  return (
    <div className="card-producto">
      <img className="img_pro_bg" src={fond_pro} alt="Imagen no disponible" />
      <section className="info_capr">
        <section>
          <div className="name_procard">{nombre} </div>
          <div>Disponibilidad: {disponibilidad}</div>
          <button onClick={handleDelete}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
            >
              <path d="M6 18L18 6M6 6L18 18" />
            </svg>
            Eliminar
          </button>
        </section>
        <div className="pre_procard">
          <span>${costo}</span>
        </div>
      </section>
      <img className="img_pro_card" src={url} alt="Imagen no disponible" />
    </div>
  );
};

export default CafeCardProducto;
