import axios from "axios";
import React from "react";
import { baseUrl } from "../../../other/extras";
import Order from "./Order";

import '../css/Orders.css'

const Orders = () => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    axios
      .post(`${baseUrl}/api/pedido/getPedidosCliente`, {
        data: {
          idUsuario: window.localStorage.getItem("id"),
        },
      })
      .then((res) => {
        setData(res.data.message);
        console.log(res)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="orders">
      <h1 className="orders-header">Pedidos realizados</h1>
      <div className="orders-list">
        {data ? (
          data.map((item, index) => (
            <Order
              key={index}
              id={item.id}
              fecha_pedido={item.fecha_pedido}
              hora={item.hora}
              id_cafeteria={item.id_cafeteria}
              estado={item.estado}
              costo_total={item.costo_total}
            />
          ))
        ) : (
          <p>No hay ordenes registradas</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
