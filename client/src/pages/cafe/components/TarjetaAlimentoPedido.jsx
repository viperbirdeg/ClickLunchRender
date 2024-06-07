import axios from "axios";
import React from "react";
import { baseUrl } from "../../../other/extras";

const TarjetaAlimentoPedido = ({ id }) => {
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    axios
      .get(`${baseUrl}/api/alimento/getOneAlimento`, {
        params: {
          id: id,
        },
      })
      .then((response) => {
        console.log(response.data.message);
        setData(response.data.message);
      })
      .catch((error) => {
        if (!axios.isCancel(error)) {
          setError(error.message);
        }
      })
      .finally(() => setIsLoading(false));
  }, [id]);

  return (
    <div className="cart-producto" id="cart-producto">
      {isLoading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      {data && (
        <div className="des_pro_cart" id="des_pro_cart">
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
        </div>
      )}
      {}
    </div>
  );
};

export default TarjetaAlimentoPedido;
