import axios from "axios";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { baseUrl, getCart } from "../../../other/extras";
import fond_pro from "../../../imagenes/fondotarj.jpg";

import "../css/Product.css";

const Producto = () => {
  const props = useParams();
  const [data, setData] = React.useState({});
  const [error, setError] = React.useState(null);
  const [value, setValue] = useState(1);

  const solo10 = (e) => {
    e.preventDefault();
    let value = e.target.value;
    e.target.value = value.replace(/^[0-9]{0,2}$/g, "");
  };

  const handleChande = (e) => {
    solo10(e);
    setValue(Number(e.target.value));
  };

  const decrementValue = () => {
    if (value <= 1) {
      setValue(1);
    } else {
      setValue(value - 1);
    }
  };
  const incrementValue = () => {
    if (value >= 10) {
      setValue(10);
    } else {
      setValue(value + 1);
    }
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
    for (let i = 0; i < value; i++) {
      cart.push({ id: data.id });
    }
    if (value === 1) {
      alert("Producto agregado");
    } else {
      alert("Productos agregado");
    }
    return window.localStorage.setItem("cart", JSON.stringify(cart));
  };

  return (
    <div className="producto_cont">
      <div className="nv_line"></div>
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
        </section>
        <section className="text_desc_pro">
          <img className="fond_pro" src={fond_pro} alt="Imagen no encontrada" />
          <div id="nombre">{data.nombre}</div>
          <div className="nombre_cafeteria">Nombre de la Cafeteria</div>
          <hr />
          <div className="descripcion">{data.descripcion}</div>
          <hr />
          <div className="tiempo-preparacion">
            Tiempo de preparacion : {data.tiempo_preparacion} min
          </div>
          <div className="disponibilidad">
            Unidades Disponibles: {data.disponibilidad}
          </div>
          <hr />
          <div className="estado">{data.estado}</div>
          <div className="opc_product">
            <section className="opc_product_btns">
              <section className="cant_cont">
                <span>Cantidad: </span>
                <input
                  type="number"
                  name=""
                  id=""
                  value={value}
                  onChange={handleChande}
                  disabled={true}
                />
                <svg
                  onClick={decrementValue}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-dash-circle-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1z" />
                </svg>
                <svg
                  onClick={incrementValue}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-plus-circle-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                </svg>
              </section>
              <button onClick={handleChange}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-cart-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                </svg>{" "}
                Añadir al Carrito
              </button>
            </section>
            <div className="costo">${data.costo}</div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Producto;
