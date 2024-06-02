const { getDatosPedido, getElementosPedido, addNewPedido, postRutaAdicional, getPedidosCliente } = require('../controllers/pedido.controller');

const router = require('express').Router(); 
//!Las acciones referidas al pedido se encuentran en produccion!
router.post('/getDatosPedido', getDatosPedido);

router.post('/getElementosPedido', getElementosPedido);

router.post('/addNewPedido', addNewPedido);

router.post('/alterarEstadoPedido', postRutaAdicional);

router.post('/getPedidosCliente', getPedidosCliente);

module.exports = router; 