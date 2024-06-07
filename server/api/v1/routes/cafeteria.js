const router = require('express').Router();
const { addNewCafeteria, getAllCafeterias, getOneCafeteria, deleteOneCafeteria, getAlimentosCafeteria, getPedidosCafeteria, updateSaldo } = require('../controllers/cafeteria.controller');

router.post('/addNewCafeteria', addNewCafeteria);

router.get('/getAllCafeterias', getAllCafeterias);

router.post('/getOneCafeteria', getOneCafeteria);

router.delete('/deleteOneCafeteria', deleteOneCafeteria);

router.get('/getAlimentosCafeteria', getAlimentosCafeteria);

router.post('/getPedidosCafe', getPedidosCafeteria);

router.put('/updateSaldo', updateSaldo);

module.exports = router;