
const baseUrl = 'https://clicklunchrender.onrender.com';

const getCart = () => {
  const cart = window.localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

module.exports = { baseUrl, getCart };
