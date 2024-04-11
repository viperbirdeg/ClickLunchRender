const { pool } = require('../database/db.js');

const addNewAlimento = async (req, res) => {
  const client = await pool.connect();

  try {
    const data = req.body;
    const cafId = req.session.idUsuario;

    /**
     * {
     * idCafeteria : req.session.idUsuario,
     * nombre : "",
     * descripcion: "",
     * tiempopreparacion : integer, //Expresa los minutos que tarda
     * costo: integer,
     * disponibilidad:integer,
     * }
     */

    
  } catch (error) {

  }
}

const getAllAlimentos = () => {

}
const deleteOneAlimento = () => {

}
const updateOneAlimento = () => {

}
const getAllComentarios = () => {

}

module.exports = { addNewAlimento, getAllAlimentos, deleteOneAlimento, updateOneAlimento, getAllComentarios }