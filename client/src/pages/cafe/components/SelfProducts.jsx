import axios from "axios";
import React from "react";
import { baseUrl } from "../../../other/extras";
import CafeCardProducto from "./CafeCardProducto";

const SelfProducts = () => {
  const [error, setError] = React.useState();
  const [data, setData] = React.useState([]);

  const id = window.localStorage.getItem("idCafe");
  React.useEffect(() => {
    axios
      .get(`${baseUrl}/api/cafeteria/getAlimentosCafeteria`, {
        params: {
          id: id,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setData(response.data.message);
        } else if (response.status === 204) {
          setError("No se han registrado alimentos");
          console.log(response);
        } else {
          setError(response.data.message);
        }
      })
      .catch((error) => {
        setError(error.message);
        console.log(error)
      });
  }, [id]);

  return (
    <div className="items-container">
      <h1>Productos</h1>
      <div className="productos">
        {!error ? (
          data.map((item) => (
            <CafeCardProducto
              key={item.id}
              id={item.id}
              nombre={item.nombre}
              costo={item.costo}
              disponibilidad={item.disponibilidad}
              url={
                item.url
                  ? item.url
                  : "https://t3.ftcdn.net/jpg/04/60/01/36/360_F_460013622_6xF8uN6ubMvLx0tAJECBHfKPoNOR5cRa.jpg"
              }
            />
          ))
        ) : (
          <p>{error}</p>
        )}
      </div>
    </div>
  );
};

export default SelfProducts;
