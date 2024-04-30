import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import { baseUrl } from "../../../other/extras";
import OrderProduct from "./OrderProduct";

import "../css/Order.css"; 

const Order = ({ id, fecha_pedido, hora, id_cafeteria, estado }) => {
  fecha_pedido = (fecha_pedido.split('T'))[0];
  const [data, setData] = React.useState();
  const handleState = (e) => {
    axios
      .post(`${baseUrl}/api/pedido/getElementosPedido`, {
        data: {
          idPedido: id,
        },
      })
      .then(
        (response) => {
          setData(response.data.message);
        },
        (error) => {
          console.log(error);
        }
      )
      .catch((error) => {
        console.log(error);
      });
  };
  const handleDelete = () => {
    setData();
  };

  return (
    <ul className="order">
      <div className="order-header">
        <li>ID pedido : {id}</li>
        <li>fecha pedido : {fecha_pedido}</li>
        <li>hora : {hora}</li>
        <li>ID cafeteria : {id_cafeteria}</li>
        <li>estado : {estado}</li>
      </div>
      <div className="order-details">
        <button onClick={handleState}>Detalles</button>
      </div>
      {data ? (
        <div className="order-actions">
          <h2>Detalle del pedido</h2>
          {data.map((item, key) => {
            return (
              <OrderProduct className="order-product" 
              key={key}
              id={item.id_alimento} />
            );
          })}
          <button onClick={handleDelete}>ocultar</button>
        </div>
      ) : null}
    </ul>
  );
};

export default Order;
