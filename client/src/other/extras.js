const baseUrl = "https://clicklunchrender.onrender.com"; //'http://localhost:3002'//  

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
  console.log(id);
  console.log(data);
  if (data.length === 0) {
    console.log("Mensaje 1 mdf")
    window.localStorage.setItem("cafOrderId", [JSON.stringify([id])]);
  } else {
    if (data[0] === id) {
      console.log("IDK MTF")
      return
    }else{
      console.log(data[0]);
      console.log(id);
      console.log(data[0] === id);
      console.log("Mensaje 2 mdf")
      window.localStorage.setItem("restriction", true);
    }
  }
};

const deleteCafOrderId = () => {
  window.localStorage.removeItem("cafOrderId");
  window.localStorage.removeItem("restriction");
} 

module.exports = { baseUrl, getCart, deleteCafOrderId, setCafOrderId,};
