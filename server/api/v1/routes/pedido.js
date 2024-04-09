const { getDatosPedido, getElementosPedido, addNewPedido, postRutaAdicional } = require('../controllers/pedido.controller');

const router = require('express').Router(); 

router.get('/getDatosPedido', getDatosPedido);

router.get('/getElementosPedido', getElementosPedido);

router.post('/addNewPedido', addNewPedido);

router.post('/postRutaAdicional', postRutaAdicional);

module.exports = router;