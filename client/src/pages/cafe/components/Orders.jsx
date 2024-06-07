import React from "react";
import { baseUrl } from "../../../other/extras";
import axios from "axios";
import { NavLink } from "react-router-dom";
import bloc from "../../../imagenes/bloc.png";
import note from "../../../imagenes/note.png";

const Orders = () => {
  const [data, setData] = React.useState([]);

  //const route = `/cafe/order/${data.id}`;

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
    <div className="orders" id="orders_cafe">
      <h1 className="orders-header">Pedidos</h1>
      <div className="orders-list">
        {data ? (
          <div className="list_order_pedidos">
            <div className="pedido">
              <h2>Pedido(s) en espera</h2>
              {data.map(
                (item, index) =>
                  item.estado === "En espera" && (
                    <div className="ped_esp">
                      <img src={bloc} className="img_bloc"/>
                      <img src={note} className="img_note"/>
                      <div>
                        <section className="id_pedido">#{item.id}</section>
                        <section className="fech_pedido">Pedido efectuado el: {item.fecha_pedido.split("T")[0]} a las {item.hora}</section>
                        <section className="est_pedido">{item.estado}</section>
                        <section>${item.costo_total}</section>
                        <NavLink to={`/cafe/order/${item.id}`}>
                          Atender orden
                        </NavLink>
                      </div>
                    </div>
                  )
              )}
            </div>
            <div className="pedido">
              <h1>Pedidos procesandoce</h1>
              {data.map(
                (item, index) =>
                  item.estado === "Procesando" && (
                    <ul>
                      <li>pedido : {item.id_cafeteria * 1000000 + item.id}</li>
                      <li>id : {item.id}</li>
                      <li>fecha :{item.fecha_pedido.split("T")[0]}</li>
                      <li>hora : {item.hora}</li>
                      <li>estado : {item.estado}</li>
                      <li>costo : {item.costo_total}</li>
                      <NavLink to={`/cafe/order/${item.id}`}>
                        Continuar atendiendo
                      </NavLink>
                      <hr />
                    </ul>
                  )
              )}
            </div>
            <div className="pedido">
              <h1>Pedidos Cancelados</h1>
              {data.map(
                (item, index) =>
                  item.estado === "Cancelado" && (
                    <ul>
                      <li>pedido : {item.id_cafeteria * 1000000 + item.id}</li>
                      <li>id : {item.id}</li>
                      <li>fecha :{item.fecha_pedido.split("T")[0]}</li>
                      <li>hora : {item.hora}</li>
                      <li>estado : {item.estado}</li>
                      <li>costo : {item.costo_total}</li>
                      <NavLink to={`/cafe/order/${item.id}`}>
                        Detalles
                      </NavLink>
                      <hr />
                    </ul>
                  )
              )}
            </div>
            <div className="pedido">
              <h1>Pedidos Finalizados </h1>
              {data.map(
                (item, index) =>
                  item.estado === "Finalizado" && (
                    <ul>
                      <li>pedido : {item.id_cafeteria * 1000000 + item.id}</li>
                      <li>id : {item.id}</li>
                      <li>fecha :{item.fecha_pedido.split("T")[0]}</li>
                      <li>hora : {item.hora}</li>
                      <li>estado : {item.estado}</li>
                      <li>costo : {item.costo_total}</li>
                      <NavLink to={`/cafe/order/${item.id}`}>
                        Detalles
                      </NavLink>
                      <hr />
                    </ul>
                  )
              )}
            </div>
          </div>
        ) : (
          <p>No hay ordenes activas</p>
        )}
      </div>
    </div>
  );
};

export default Orders;
