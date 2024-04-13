const { pool } = require("../database/db.js");

const getDatosPedido = async () => {
  const client = await pool.connect();
};

const getElementosPedido = () => {
  let now = new Date();
  console.log("La fecha actual es", now);
  console.log(now.toISOString());

  var dat = new Date(); //Obtienes la fecha
  var dat2 = Date.parse(dat); //Lo parseas para transformarlo
  console.log("dat: ", dat);
  console.log("data: ", dat2);
};

const addNewPedido = async (req, res) => {
  //* Conexion con la base de datos
  //const client = await pool.connect();

  try {
    /**
     * ? {
     * ?
     * ? }
     * */
  } catch (error) {
  } finally {
  }
};

const postRutaAdicional = () => {};

module.exports = {
  getDatosPedido,
  getElementosPedido,
  addNewPedido,
  postRutaAdicional,
};
