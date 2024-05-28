import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../../other/extras";
import CardProducto from "./CardProducto";

import "../css/Productos.css"; // Import the CSS file

const Productos = () => {
  const props = useParams();
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState();

  React.useEffect(() => {
    axios
      .get(`${baseUrl}/api/cafeteria/getAlimentosCafeteria`, {
        params: {
          id: props.id,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setData(response.data.message);
        } else if (response.status === 204) {
          setError("No se han registrado alimentos en esta cafeteria");
        } else {
          setError(response.data.message);
        }
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [props]);

  return (
    <div className="text">
      <div className="nv_line"></div>
      <h1>Lista de Productos de "Negocio"</h1>
      <div className="productos">
        {error == null ? ( // undefined == null
          data.map((item) => (
            <CardProducto
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

export default Productos;
