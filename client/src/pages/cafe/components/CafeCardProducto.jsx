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
    </div>
  );
};

export default CafeCardProducto;
