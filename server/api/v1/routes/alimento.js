const router = require('express').Router();
const { addNewAlimento, getAllAlimentos, deleteOneAlimento, updateOneAlimento, getAllComentarios } = require('../controllers/alimento.controller');

router.post('/addAlimento', addNewAlimento);

router.get('/getAlimentos', getAllAlimentos);

router.delete('/deleteAlimento', deleteOneAlimento);

router.put('/updateAlimento', updateOneAlimento);

router.get('/getComentarios', getAllComentarios);

module.exports = router;