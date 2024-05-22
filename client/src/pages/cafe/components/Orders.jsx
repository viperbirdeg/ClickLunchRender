import React from "react";
import { baseUrl } from "../../../other/extras";
import axios from "axios";

const Orders = () => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    axios
      .post(`${baseUrl}/api/cafeteria/getPedidosCafe`, {
        data: {
          idCafe: window.localStorage.getItem("idCafe"),
        },
      })
      .then((res) => {
        setData(res.data.message);
        console.log(res.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="orders">
      <h1 className="orders-header">Pedidos activos</h1>
      <div className="orders-list">
        {data ? (
          data.map((item, index) => (
            <ul>
              <li>pedido : {item.id_cafeteria + '00' + index}</li>
              <li>id : {item.id}</li>
              <li>fecha :{item.fecha_pedido}</li>
              <li>hora : {item.hora}</li>
              <li>estado : {item.estado}</li>
              <li>costo : {item.costo_total}</li>
              <hr/>
            </ul>
          ))
        ) : (
          <p>No hay ordenes activas</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
