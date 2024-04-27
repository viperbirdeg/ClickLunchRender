const baseUrl = 'http://localhost:3002';

const addToCart = (id) => {
  if(!window.localStorage.getItem('cart')){
    window.localStorage.setItem('cart', JSON.stringify([]));
  }else {
    let cart = JSON.parse(window.localStorage.getItem('cart'));
    cart.push(id);
    window.localStorage.setItem('cart', JSON.stringify(cart));
  }
} 

module.exports = { baseUrl, addToCart}