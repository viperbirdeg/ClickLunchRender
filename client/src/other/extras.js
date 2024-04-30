const baseUrl = 'http://localhost:3002'// "https://clicklunchrender.onrender.com"; //

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
  if (data == []) {
    window.localStorage.setItem("cafOrderId", [id]);
  } else {
    if (data[0] === id) {
      return
    }else{
      window.localStorage.setItem("restriction", true);
    }
  }
};

const deleteCafOrderId = () => {
  window.localStorage.removeItem("cafOrderId");
  window.localStorage.removeItem("restriction");
} 

module.exports = { baseUrl, getCart, deleteCafOrderId, setCafOrderId,};
