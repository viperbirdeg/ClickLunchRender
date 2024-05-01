import React from "react";
import CartProducto from "./CartProducto";

import "../css/Cart.css"; // Import the CSS file
import axios from "axios";
import { baseUrl } from "../../../other/extras";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  
  const [data, setData] = React.useState([]);
  const [error, setError]  = React.useState();
  const navigation = useNavigate();

  React.useEffect(() => {
    const storedCart = window.localStorage.getItem("cart");
    if (storedCart) {
      setData(JSON.parse(storedCart));
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const restriction = window.localStorage.getItem("restriction");
    if (restriction) {
      return setError(
        "No puede realizar pedidos a dos cafeterias distintas a la vez"
      );
    } else {
      alert("No hay");
      const cart = data.map((item) => {return({id : item.id})});
      console.log(cart);
      axios.post(`${baseUrl}/api/pedido/addNewPedido`, {
        data : {
          idUsuario : window.localStorage.getItem("id"),
          idCafe : window.localStorage.getItem("idCafeteria"),
          cart : JSON.stringify(cart)
        }
      }).then((res)=>{
        console.log(res.data);
        window.localStorage.removeItem('cart');
        window.localStorage.removeItem('cafOrderId');
        navigation('/client/orders');
      }).catch((error)=>{
        setError('idk ', error.message);
      });
    }
  };
  return (
    <div className="cart">
      <h2>Carrito</h2>
      {error && <div className="">{error}</div>}
      {data.length > 0 ? (
        <div>
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
