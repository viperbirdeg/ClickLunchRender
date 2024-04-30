
const baseUrl = 'https://clicklunchrender.onrender.com'; // 'http://localhost:3002'//

const getCart = () => {
  const cart = window.localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

module.exports = { baseUrl, getCart };
