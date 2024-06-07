import React, { useState, useEffect } from "react";
import {
  baseUrl,
  deleteCafOrderId,
  getCart,
  setCafOrderId,
  setTotalCart,
} from "../../../other/extras";
import axios from "axios";

import "../css/CartProducto.css"; // Import the CSS file

const CartProducto = ({ id }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${baseUrl}/api/alimento/getOneAlimento`, {
        params: {
          id: id,
        },
      })
      .then((response) => {
        setCafOrderId(response.data.message.id_cafeteria);
        setData(response.data.message);
        setTotalCart(response.data.message.costo);
      })
      .catch((error) => {
        if (!axios.isCancel(error)) {
          setError(error.message);
        }
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  const actionHandler = (e) => {
    e.preventDefault();
    const cart = getCart();
    const index = cart.findIndex((item) => item.id === id);

    let newCart;
    if (index !== -1) {
      newCart = [...cart.slice(0, index), ...cart.slice(index + 1)];
    } else {
      newCart = [...cart];
    }
    window.localStorage.setItem("cart", JSON.stringify(newCart));
    deleteCafOrderId();
    window.location.reload();
  };

  return (
    <div className="cart-producto">
      <div className="cart_pro_info">
        {isLoading && <p>Loading...</p>}
        {error && <p>{error.message}</p>}
        {data && (
          <div className="des_pro_cart">
            <div className="nombre">
              <img src={data.url} alt="" />
            </div>
            <div className="descripcion">
              <span>{data.nombre}</span>
              <section>{data.descripcion}</section>
            </div>
            <div className="tiempo-preparacion">
              {data.tiempo_preparacion} min
            </div>
            <div className="disponibilidad">{data.disponibilidad}</div>
            <div className="costo">${data.costo}</div>
            <div className="estado">{data.estado}</div>
            <div className="id">id : {data.id}</div>
            <div className="id-Cafeteria">
              ID-Cafeteria : {data.id_cafeteria}
            </div>
          </div>
        )}
      </div>
      <button className="elim_carr" onClick={actionHandler}>
        <svg
          className="elim_svg"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="#ee6107"
          viewBox="0 0 16 16"
        >
          <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5" />
        </svg>
      </button>
    </div>
  );
};

export default CartProducto;
