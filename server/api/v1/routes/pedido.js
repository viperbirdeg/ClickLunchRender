const { getDatosPedido, getElementosPedido, addNewPedido, postRutaAdicional, getPedidosCliente } = require('../controllers/pedido.controller');

const router = require('express').Router(); 
//!Las acciones referidas al pedido se encuentran en produccion!
router.get('/getDatosPedido', getDatosPedido);

router.post('/getElementosPedido', getElementosPedido);

router.post('/addNewPedido', addNewPedido);

router.post('/postRutaAdicional', postRutaAdicional);

router.post('/getPedidosCliente', getPedidosCliente);

module.exports = router; 