import React from "react";
import { baseUrl } from "../../../other/extras";
import axios from "axios";
import { NavLink } from "react-router-dom";
import bloc from "../../../imagenes/bloc.png";
import note from "../../../imagenes/note.png";
import f from "../../../imagenes/food.png";
import f1 from "../../../imagenes/f1.png";
import f2 from "../../../imagenes/f2.png";
import f3 from "../../../imagenes/f3.png";
import f4 from "../../../imagenes/f4.png";

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
              <div className="cont_pedido">
                {data.map(
                  (item, index) =>
                    item.estado === "En espera" && (
                      <div className="ped_esp">
                        <img src={bloc} className="img_bloc" />
                        <img src={note} className="img_note" />
                        <div className="info_pe">
                          <section className="id_pedido">#{item.id}</section>
                          <section className="fech_pedido">Efectuado el: {item.fecha_pedido.split("T")[0]} a las {item.hora}</section>
                          <section className="est_pedido">{item.estado}</section>
                          <section className="cost_pedido">${item.costo_total}</section>
                          <NavLink className="btn_ap" to={`/cafe/order/${item.id}`}>
                            Atender orden <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                              <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                            </svg>
                          </NavLink>
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
            <div className="pedido">
              <h2>Pedidos en Proceso</h2>
              <div className="cont_pedido">
                {data.map(
                  (item, index) =>
                    item.estado === "Procesando" && (
                      <div className="ped_esp">
                        <img src={f} className="img_f" />
                        <img src={f1} className="img_f1 f" />
                        <img src={f2} className="img_f2 f" />
                        <img src={f3} className="img_f3 f" />
                        <img src={f4} className="img_f4 f" />
                        <div className="info_pp">
                          <section className="id_pedido">#{item.id}</section>
                          <section className="fech_pedido">Efectuado el: {item.fecha_pedido.split("T")[0]} a las {item.hora}</section>
                          <section className="est_pedido">{item.estado}</section>
                          <section className="cost_pedido">${item.costo_total}</section>
                          <NavLink className="btn_ap" to={`/cafe/order/${item.id}`}>
                            Continuar con la Orden <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                              <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                            </svg>
                          </NavLink>
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
            <div className="pedido">
              <h2>Pedidos Cancelados</h2>
              <div className="cont_pedido">
                {data.map(
                  (item, index) =>
                    item.estado === "Cancelado" && (
                      <div className="ped_esp">
                        <div className="info_pc">
                          <section className="id_pedido">#{item.id}</section>
                          <section className="fech_pedido">Efectuado el: {item.fecha_pedido.split("T")[0]} a las {item.hora}</section>
                          <section className="est_pedido">{item.estado}</section>
                          <section className="cost_pedido">${item.costo_total}</section>
                          <NavLink className="btn_ap" to={`/cafe/order/${item.id}`}>
                            Detalles <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                              <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                            </svg>
                          </NavLink>
                        </div>
                      </div>
                    )
                )}
              </div>
            </div>
            <div className="pedido">
              <h2>Pedidos Finalizados </h2>
              <div className="cont_pedido">
                {data.map(
                  (item, index) =>
                    item.estado === "Finalizado" && (
                      <div className="ped_esp">
                        <div className="info_pf">
                          <section className="id_pedido">#{item.id}</section>
                          <section className="fech_pedido">Efectuado el: {item.fecha_pedido.split("T")[0]} a las {item.hora}</section>
                          <section className="est_pedido">{item.estado}</section>
                          <section className="cost_pedido">${item.costo_total}</section>
                          <NavLink className="btn_ap" to={`/cafe/order/${item.id}`}>
                            Detalles <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
                              <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                            </svg>
                          </NavLink>
                        </div>
                      </div>
                    )
                )}
              </div>
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
