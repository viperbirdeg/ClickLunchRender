import React, { useState, useEffect } from "react";
import { baseUrl } from "../../../other/extras";
import axios from "axios";

import "../css/CartProducto.css"; // Import the CSS file

const OrderProduct = ({ id }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const source = axios.CancelToken.source();

    axios
      .get(`${baseUrl}/api/alimento/getOneAlimento`, {
        cancelToken: source.token,
        params: {
          id: id,
        },
      })
      .then((response) => {
        setData(response.data.message);
      })
      .catch((error) => {
        if (!axios.isCancel(error)) {
          setError(error.message);
        }
      })
      .finally(() => setIsLoading(false));

    return () => {
      source.cancel();
    };
  }, [id]);

  return (
    <div className="cart-producto" id="cart-producto">
      {isLoading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {data && (
        <div className="des_pro_cart" id="des_pro_cart">
          <div className="nombre"><img src={data.url} alt="" /></div>
          <div className="descripcion"><span>{data.nombre}</span><section>{data.descripcion}</section></div>
          <div className="tiempo-preparacion">{data.tiempo_preparacion} min</div>
          <div className="disponibilidad">{data.disponibilidad}</div>
          <div className="costo">${data.costo}</div>
        </div>
      )}
    </div>
  );
};

export default OrderProduct;