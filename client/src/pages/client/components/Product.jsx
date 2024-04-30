import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { baseUrl, getCart } from "../../../other/extras";

import '../css/Product.css'

const Producto = () => {
  const props = useParams();
  const [data, setData] = React.useState({});
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(`${baseUrl}/api/alimento/getOneAlimento`, {
        params: {
          id: props.id,
        },
      })
      .then((response) => {
        setData(response.data.message);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [props]);

  const handleChange = (e) => {
    e.preventDefault();
    const cart = getCart();
    cart.push({ id: data.id });
    alert('Producto agregado')
    return window.localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <div className="producto">
      {error && <p>{error.message}</p>}
      <div className="id">id : {data.id}</div>
      <div className="nombre">Nombre : {data.nombre}</div>
      <div className="descripcion">Descripcion : {data.descripcion}</div>
      <div className="costo">Costo : ${data.costo}</div>
      <div className="disponibilidad">
        Disponibilidad Aproximada : {data.disponibilidad}
      </div>
      <div className="estado">{data.estado}</div>
      <div className="id-Cafeteria">ID - Cafeteria{data.id_cafeteria}</div>
      <div className="tiempo-preparacion">
        Tiempo de preparacion : {data.tiempo_preparacion} min
      </div>
      <button onClick={handleChange}>Add to cart</button>
      
    </div>
  );
};

export default Producto;
