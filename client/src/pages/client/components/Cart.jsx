import React from "react";
import CartProducto from "./CartProducto";

import "../css/Cart.css"; // Import the CSS file

const Cart = () => {
  const storedCart = window.localStorage.getItem("cart");
  const [data, setData] = React.useState([]);

  React.useEffect(() =>{
    if (storedCart) {
      setData(JSON.parse(storedCart));
    } 
  }, [storedCart]);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("No hay");
    console.log(data);
  };

  return (
    <div className="cart">
      <h2>Carrito</h2>
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
