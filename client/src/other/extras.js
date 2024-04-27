require('dotenv').config();

const baseUrl = process.env.BASE_URL;

const getCart = () => {
  const cart = window.localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

module.exports = { baseUrl, getCart };
