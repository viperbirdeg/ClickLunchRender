
const baseUrl = 'http://localhost:3002'// 'https://clicklunchrender.onrender.com'; //    

const getCart = () => {
  const cart = window.localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

module.exports = { baseUrl, getCart };
 