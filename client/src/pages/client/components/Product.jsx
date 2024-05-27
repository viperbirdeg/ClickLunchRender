import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { baseUrl, getCart } from "../../../other/extras";

import "../css/Product.css";

const Producto = () => {
  const props = useParams();
  const [data, setData] = React.useState({});
  const [error, setError] = React.useState(null);
  const [value, setValue] = useState(1);
  const decrementValue = () => {
    if (value === 1) {
      setValue(1);
    } else {
      setValue(value - 1);
    }
  };
  const incrementValue = () => {
    setValue(value + 1);
  };

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
    alert("Producto agregado");
    return window.localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <div className="producto">
      {error && <p>{error.message}</p>}
      <section className="img_cont_pro">
        <div className="img_container">
          <img
            src={
              data.url ||
              "https://t3.ftcdn.net/jpg/04/60/01/36/360_F_460013622_6xF8uN6ubMvLx0tAJECBHfKPoNOR5cRa.jpg"
            }
            alt="Loading..."
          />
        </div>
        <section className="cant_cont">
          <span>Cantidad: </span>
          <input type="number" name="" id="" value={value} onChange={(e) => setValue(Number(e.target.value))} />
          <svg onClick={decrementValue} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-dash-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1z" />
          </svg>
          <svg onClick={incrementValue} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
          </svg>
        </section>
        <button onClick={handleChange}>Añadir al Carrito</button>
      </section>
      <section className="text_desc_pro">
        <div className="id">id : {data.id}</div>
        <div className="nombre">{data.nombre}</div>
        <div className="descripcion">{data.descripcion}</div>
        <div className="costo">Precio: ${data.costo}</div>
        <div className="disponibilidad">
          Unidades Disponibles: {data.disponibilidad}
        </div>
        <div className="estado">{data.estado}</div>
        <div className="id-Cafeteria">ID - Cafeteria : {data.id_cafeteria}</div>
        <div className="tiempo-preparacion">
          Tiempo de preparacion : {data.tiempo_preparacion} min
        </div>
      </section>
    </div>
  );
};

export default Producto;
