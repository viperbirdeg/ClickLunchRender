import axios from "axios";
import React, { useState } from "react";
import { baseUrl } from "../../../other/extras";
import OrderProduct from "./OrderProduct";

import "../css/Order.css";

const Order = ({
  id,
  fecha_pedido,
  hora,
  id_cafeteria,
  estado,
  costo_total,
  nombre,
}) => {
  const [isActive, setIsActive] = useState(false);
  fecha_pedido = fecha_pedido.split("T")[0];
  const [data, setData] = React.useState();
  const [nombreCaf, setNombreCaf] = React.useState("Loading");

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
        }
      )
      .catch((error) => {
      });
    setIsActive(!isActive);
  };
  const handleDelete = () => {
    setData();
    setIsActive(!isActive);
  };

  const seleccionar_estado = () => {
    switch (estado) {
      case "En espera":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#ff9511"
            class="bi bi-dash-circle-dotted"
            viewBox="0 0 16 16"
          >
            <path d="M8 0q-.264 0-.523.017l.064.998a7 7 0 0 1 .918 0l.064-.998A8 8 0 0 0 8 0M6.44.152q-.52.104-1.012.27l.321.948q.43-.147.884-.237L6.44.153zm4.132.271a8 8 0 0 0-1.011-.27l-.194.98q.453.09.884.237zm1.873.925a8 8 0 0 0-.906-.524l-.443.896q.413.205.793.459zM4.46.824q-.471.233-.905.524l.556.83a7 7 0 0 1 .793-.458zM2.725 1.985q-.394.346-.74.74l.752.66q.303-.345.648-.648zm11.29.74a8 8 0 0 0-.74-.74l-.66.752q.346.303.648.648zm1.161 1.735a8 8 0 0 0-.524-.905l-.83.556q.254.38.458.793l.896-.443zM1.348 3.555q-.292.433-.524.906l.896.443q.205-.413.459-.793zM.423 5.428a8 8 0 0 0-.27 1.011l.98.194q.09-.453.237-.884zM15.848 6.44a8 8 0 0 0-.27-1.012l-.948.321q.147.43.237.884zM.017 7.477a8 8 0 0 0 0 1.046l.998-.064a7 7 0 0 1 0-.918zM16 8a8 8 0 0 0-.017-.523l-.998.064a7 7 0 0 1 0 .918l.998.064A8 8 0 0 0 16 8M.152 9.56q.104.52.27 1.012l.948-.321a7 7 0 0 1-.237-.884l-.98.194zm15.425 1.012q.168-.493.27-1.011l-.98-.194q-.09.453-.237.884zM.824 11.54a8 8 0 0 0 .524.905l.83-.556a7 7 0 0 1-.458-.793zm13.828.905q.292-.434.524-.906l-.896-.443q-.205.413-.459.793zm-12.667.83q.346.394.74.74l.66-.752a7 7 0 0 1-.648-.648zm11.29.74q.394-.346.74-.74l-.752-.66q-.302.346-.648.648zm-1.735 1.161q.471-.233.905-.524l-.556-.83a7 7 0 0 1-.793.458zm-7.985-.524q.434.292.906.524l.443-.896a7 7 0 0 1-.793-.459zm1.873.925q.493.168 1.011.27l.194-.98a7 7 0 0 1-.884-.237zm4.132.271a8 8 0 0 0 1.012-.27l-.321-.948a7 7 0 0 1-.884.237l.194.98zm-2.083.135a8 8 0 0 0 1.046 0l-.064-.998a7 7 0 0 1-.918 0zM4.5 7.5a.5.5 0 0 0 0 1h7a.5.5 0 0 0 0-1z" />
          </svg>
        );
        break;
      case "Procesando":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#05849b"
            class="bi bi-clock"
            viewBox="0 0 16 16"
          >
            <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
            <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
          </svg>
        );
        break;
      case "Cancelado":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#ff0000"
            class="bi bi-x-circle"
            viewBox="0 0 16 16"
          >
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
          </svg>
        );
        break;
      case "Finalizado":
        return (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="#34c30a"
            class="bi bi-check2-circle"
            viewBox="0 0 16 16"
          >
            <path d="M2.5 8a5.5 5.5 0 0 1 8.25-4.764.5.5 0 0 0 .5-.866A6.5 6.5 0 1 0 14.5 8a.5.5 0 0 0-1 0 5.5 5.5 0 1 1-11 0" />
            <path d="M15.354 3.354a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
          </svg>
        );
        break;
    }
  };

  return (
    <div className="order">
      <div className="inf_gen_order">
        <section className="order_svg">{seleccionar_estado()}</section>
        <div className="order_info">
          <div className="order_pr_info">
            <span className="estado_pr_info">{estado}</span>
            <section className="dts_info_order">
              <span>
                Pedido efectuado el:{" "}
                <span>
                  {" "}
                  {fecha_pedido} a las {hora}
                </span>
              </span>
              <span>
                N° de pedido: <span> {id}</span>
              </span>
            </section>
          </div>
          <hr />
          <div className="order_vm">
            <div className="order-header">
              <span>ID cafeteria : {nombreCaf}</span>
            </div>
            <div className="order-details">
              <span>Total : ${costo_total}</span>
              <span
                id="txt_btn_msmn"
                className={isActive ? "btn_nver" : "btn_ver"}
              >
                Mostrar Lista de Pedido
                <button onClick={handleState}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    class="bi bi-caret-down"
                    viewBox="0 0 16 16"
                  >
                    <path d="M3.204 5h9.592L8 10.481zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659" />
                  </svg>
                </button>
              </span>
              <span
                id="txt_btn_msmn"
                className={isActive ? "btn_ver2" : "btn_nver"}
              >
                Ocultar Lista
                <button onClick={handleDelete}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    class="bi bi-caret-up-fill"
                    viewBox="0 0 16 16"
                  >
                    <path d="m7.247 4.86-4.796 5.481c-.566.647-.106 1.659.753 1.659h9.592a1 1 0 0 0 .753-1.659l-4.796-5.48a1 1 0 0 0-1.506 0z" />
                  </svg>
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
      {data ? (
        <div className="order-actions">
          <section className="Text_cart" id="Text_cart">
            <span>Producto</span>
            <span>Detalles</span>
            <span>Tiempo de Preparación</span>
            <span>Unidades Disponibles</span>
            <span>Precio</span>
          </section>
          {data.map((item, key) => {
            return (
              <OrderProduct
                className="order-product"
                key={key}
                id={item.id_alimento}
              />
            );
          })}
        </div>
      ) : null}
    </div>
  );
};

export default Order;
