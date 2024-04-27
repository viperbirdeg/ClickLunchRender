import React from "react";
import CartProducto from "./CartProducto";

const Cart = () => {
  const storedCart = window.localStorage.getItem("cart");
  let data;

  if (storedCart) {
    data = JSON.parse(storedCart);
  } else {
    return <div>No items in the cart.</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('No hay');
  };

  return (
    <div>
      {JSON.stringify(data[0])}
      <ul>
        {data.map((item, key) => (
          <CartProducto key={key} id={item.id} />
        ))}
      </ul>

      <button onClick={handleSubmit}>Realizar pedido</button>
    </div>
  );
};

export default Cart;
