const router = require('express').Router();
const { addNewCafeteria, getAllCafeterias, getOneCafeteria, deleteOneCafeteria, getAlimentosCafeteria, getPedidosCafeteria } = require('../controllers/cafeteria.controller');

router.post('/addNewCafeteria', addNewCafeteria);

router.get('/getAllCafeterias', getAllCafeterias);

router.get('/getOneCafeteria', getOneCafeteria);

router.delete('/deleteOneCafeteria', deleteOneCafeteria);

router.get('/getAlimentosCafeteria', getAlimentosCafeteria);

router.post('/getPedidosCafe', getPedidosCafeteria);

module.exports = router;