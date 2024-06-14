import axios from "axios";
import React from "react";
import { baseUrl } from "../../../other/extras";
import Order from "./Order";

import "../css/Orders.css";

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
      })
      .catch((err) => {});
  }, []);

  return (
    <div className="orders">
      <div class="nv_line"></div>
      <h1 className="orders-header">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-basket3-fill"
          viewBox="0 0 16 16"
        >
          <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM2.468 15.426.943 9h14.114l-1.525 6.426a.75.75 0 0 1-.729.574H3.197a.75.75 0 0 1-.73-.574z" />
        </svg>{" "}
        Pedidos realizados
      </h1>
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
