import React from "react";
import CartProducto from "./CartProducto";

import "../css/Cart.css"; // Import the CSS file
import axios from "axios";
import { baseUrl } from "../../../other/extras";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState();
  const [total, setTotal] = React.useState(0);
  const navigation = useNavigate();
  const carti = window.localStorage.getItem('totalCart');

  React.useEffect(() => {
    const storedCart = window.localStorage.getItem("cart");
    window.localStorage.removeItem("totalCart");
    if (storedCart) {
      setData(JSON.parse(storedCart));
    }
    setTotal(window.localStorage.getItem("totalCart")); 
  }, []);

  React.useEffect(() => {
    const storedCart = window.localStorage.getItem("cart");
    if (storedCart) {
      setData(JSON.parse(storedCart));
    }
  }, []);

  React.useEffect(() => {
    const totalCart = window.localStorage.getItem("totalCart");
    if (totalCart) {
      setTotal(parseInt(totalCart));
    }
  }, [carti]);

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
            idCafe: window.localStorage.getItem("idCafe"),
            cart: JSON.stringify(cart),
            fecha : fecha,
            hora : hora,
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
      <h2>Carrito</h2>
      {error && <div className="">{error}</div>}
      {data.length > 0 ? (
        <div>
          <div>Total : {total}</div>
          <ul>
            {data.map((item, key) => (
              <CartProducto key={key} id={item.id} />
            ))}
          </ul>
          <button onClick={handleSubmit}>Realizar pedido</button>
        </div>
      ) : (
        <h2>No hay productos en el carrito</h2>
      )}
    </div>
  );
};

export default Cart;
