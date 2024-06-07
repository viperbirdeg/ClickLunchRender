import React, { useState } from "react";
import CartProducto from "./CartProducto";

import "../css/Cart.css"; // Import the CSS file
import axios from "axios";
import { baseUrl } from "../../../other/extras";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [isActive, setIsActive] = useState(false);
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState();
  const [total, setTotal] = React.useState(0);
  const navigation = useNavigate();

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  React.useEffect(() => {
    const storedCart = window.localStorage.getItem("cart");
    window.localStorage.removeItem("totalCart");
    if (storedCart) {
      setData(JSON.parse(storedCart));
    }
    setTotal(window.localStorage.getItem("totalCart"));
  }, []);
  React.useEffect(() => {

  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const restriction = window.localStorage.getItem("restriction");
    if (restriction) {
      return setError(
        "No puede realizar pedidos a dos cafeterias distintas a la vez"
      );
    } else {
      const cart = data.map((item) => {
        return { id: item.id };
      });
      const now = new Date();
      const fecha = now.toISOString().split("T")[0];
      const hora = now.toTimeString().split(" ")[0];
      axios
        .post(`${baseUrl}/api/pedido/addNewPedido`, {
          data: {
            idUsuario: window.localStorage.getItem("id"),
            idCafe: window.localStorage.getItem("cafOrderId"),
            cart: JSON.stringify(cart),
            fecha: fecha,
            hora: hora,
          },
        })
        .then((res) => {
          window.localStorage.removeItem("totalCart");
          window.localStorage.removeItem("cart");
          window.localStorage.removeItem("cafOrderId");
          navigation("/client/orders");
        })
        .catch((error) => {
          setError(`${error.response.data.message}`);
        });
    }
  };
  return (
    <div className="cart">
      <div class="nv_line"></div>
      <div className="cont_cart_gen">
        <div className="div_cart_tt">
          <section className={isActive ? 'btn_main_ttcart2' : 'btn_main_ttcart'} onClick={handleToggle}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
              <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
            </svg>
          </section>
          <section className={isActive ? 'cart_tot2' : 'cart_tot'}>
            <section className="txt_cart_tot">
              <span className="cart_tot_tt">Detalles del Pedido</span>
              <section className="det_ped">
                <span className="total_cart_txt"> Total: <span className="total_cart">${total}</span></span>
              </section>
              <span> Productos solicitados: </span>
            </section>
            <button className="reliz_pedido" onClick={handleSubmit}>Realizar pedido</button>
          </section>
        </div>
        <div className={isActive ? 'cont_cart2' : 'cont_cart'}>
          <span className="cart_text"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cart-fill" viewBox="0 0 16 16">
            <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
          </svg> <hr /> Tú Carrito de Compras</span>
          {error && <div className="">{error}</div>}
          {data.length > 0 ? (
            <section className="Carrito_cont">
              <section className="Text_cart">
                <span>Producto</span>
                <span>Detalles</span>
                <span>Tiempo de Preparación</span>
                <span>Unidades Disponibles</span>
                <span>Precio</span>
                <span></span>
              </section>
              <ul className="Productos" id="Productos">
                {data.map((item, key) => (
                  <CartProducto key={key} id={item.id} />
                ))}
              </ul>
            </section>
          ) : (
            <h2>No hay productos en el carrito</h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
