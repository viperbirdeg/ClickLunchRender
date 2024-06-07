import React from "react";
import { Link } from "react-router-dom";

import "../css/CardProducto.css"; // Import the CSS file
import fond_pro from "../../../imagenes/fondotarj5.jpg"
import { getCart } from "../../../other/extras";

const CardProducto = ({ id, nombre, costo, disponibilidad, url }) => {

  const handleChange = (e) => {
    e.preventDefault();
    const cart = getCart();
    cart.push({ id: id });
    alert("Producto agregado");
    return window.localStorage.setItem("cart", JSON.stringify(cart));
  };


  const route = `/client/product/${id}`;
  return (
    <div className="card-producto">
      <img className="img_pro_bg" src={fond_pro} alt="Imagen no disponible" />
      <section className="info_capr">
        <section>
          <div className="name_procard">{nombre}</div>
          <div>Disponibilidad: {disponibilidad}</div>
        </section>
        <div className="pre_procard"><span>${costo}</span></div>
      </section>
      {" "}
      <img className="img_pro_card" src={url} alt="Imagen no disponible" />
      <section className="btns_capr">
        <button onClick={handleChange} className="btn_agrcarr">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag-plus" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M8 7.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V12a.5.5 0 0 1-1 0v-1.5H6a.5.5 0 0 1 0-1h1.5V8a.5.5 0 0 1 .5-.5" />
            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z" />
          </svg>
        </button>
        <Link to={route} className="card-producto-link">
          Más Detalles<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
            <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
          </svg>
        </Link>
      </section>
    </div>
  );
};

export default CardProducto;
