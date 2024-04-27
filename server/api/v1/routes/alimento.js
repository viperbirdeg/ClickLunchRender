const router = require('express').Router();
const { addNewAlimento, getAllAlimentos, deleteOneAlimento, updateOneAlimento, getAllComentarios, getOneAlimento } = require('../controllers/alimento.controller');

router.post('/addAlimento', addNewAlimento);

router.get('/getAlimentos', getAllAlimentos);

router.delete('/deleteAlimento', deleteOneAlimento);

router.put('/updateAlimento', updateOneAlimento);

router.get('/getComentarios', getAllComentarios);

router.get('/getOneAlimento', getOneAlimento);

module.exports = router;