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
    <div className="cart-producto">
      {isLoading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {data && (
        <div>
          <div className="id">id : {data.id}</div>
          <div className="nombre">Nombre : {data.nombre}</div>
          <div className="descripcion">Descripcion : {data.descripcion}</div>
          <div className="costo">Costo : ${data.costo}</div>
          <div className="disponibilidad">
            Disponibilidad Aproximada : {data.disponibilidad}
          </div>
          <div className="estado">{data.estado}</div>
          <div className="id-Cafeteria">ID-Cafeteria : {data.id_cafeteria}</div>
          <div className="tiempo-preparacion">
            Tiempo de preparacion : {data.tiempo_preparacion} min
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderProduct;