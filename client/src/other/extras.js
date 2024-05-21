const baseUrl = "http://localhost:3002"; //"https://clicklunchrender.onrender.com";//

const getCart = () => {
  const cart = window.localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
};

const getCafOrder = () => {
  const cafOrder = window.localStorage.getItem("cafOrderId");
  return cafOrder ? JSON.parse(cafOrder) : [];
};

const setCafOrderId = (id) => {
  const data = getCafOrder();
  if (data.length === 0) {
    window.localStorage.setItem("cafOrderId", [JSON.stringify([id])]);
  } else {
    if (data[0] === id) {
      return;
    } else {
      window.localStorage.setItem("restriction", true);
    }
  }
};

const getTotalCart = () => {
  const totalCart = window.localStorage.getItem("totalCart");
  return totalCart ? JSON.parse(totalCart) : 0;
};

const setTotalCart = (total) => {
  const Total = parseInt(total);
  const totalCart = getTotalCart();
  window.localStorage.setItem("totalCart", totalCart + Total);
};

const deleteCafOrderId = () => {
  window.localStorage.removeItem("cafOrderId");
  window.localStorage.removeItem("restriction");
};

module.exports = {
  baseUrl,
  getCart,
  deleteCafOrderId,
  setCafOrderId,
  setTotalCart,
  getTotalCart,
};
