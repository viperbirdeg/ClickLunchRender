const { pool } = require("../database/db.js");

const addNewAlimento = async (req, res) => {
  const client = await pool.connect();

  try {
    const data = req.body.data;
    //*Obtener informacion
    const nombre = data.nombre;
    const descripcion = data.descripcion;
    const tiempopreparacion = data.tiempopreparacion;
    const costo = data.costo;
    const disponibilidad = data.disponibilidad;
    const cafId = data.idCaf || 2;
    const url = data.url;

    //*Iniciar transacción
    await client.query("BEGIN");

    const dataResult = await client.query(
      `INSERT INTO clicklunch."Alimento"(nombre,descripcion,tiempo_preparacion,costo,disponibilidad,id_cafeteria,url) VALUES ($1,$2,$3,$4,$5,$6,$7) RETURNING id`,
      [
        nombre,
        descripcion,
        tiempopreparacion,
        costo,
        disponibilidad,
        cafId,
        url,
      ]
    );

    //*Terminar transacción
    await client.query("COMMIT");

    //*Devolver datos
    if (dataResult.rowCount > 0) {
      const response = await datosAlimento(dataResult.rows[0].id);
      return res.status(response.estado).json({ message: response.message });
    }
    res.status(400).json({ message: "No se ha podido agregar el alimento" });
  } catch (error) {
    //*Manejar errores cancelando operacion
    await client.query("ROLLBACK");
    return res.status(500).json({
      message: "No se ha podido agregar el almento",
      error: error.message,
    });
  } finally {
    //*Liberar la bd
    client.release();
  }
};

const getAllAlimentos = async (req, res) => {
  //*Conexion con la bd
  const client = await pool.connect();

  try {
    //*Busqueda en la bd
    const vistaResult = await client.query(
      `SELECT * FROM clicklunch."Alimentos_vw"`
    );
    if (vistaResult.rowCount > 0) {
      //*Retorno de datos
      return res.status(200).json({
        estado: 200,
        message: vistaResult.rows,
      });
    }
    //!Retorno de error
    return res
      .status(404)
      .json({ message: "No se ha podido obtener los alimentos" });
  } catch (error) {
    //!Manejo de errores
    return res.status(500).json({
      message: "Ocurrio un error inesperado en el servidor",
      error: error,
    });
  } finally {
    //todo: Liberar la bd
    client.release();
  }
};
const getOneAlimento = async (req, res) => {
  //*Conexion con la bd
  const client = await pool.connect();

  try {
    const id = req.query.id;

    const alimentoResult = await datosAlimento(id);

    if (alimentoResult) {
      //*Retorno de datos
      return res.status(200).json(alimentoResult);
    }
    //!Retorno de error
    return res
      .status(404)
      .json({ message: "No se ha podido obtener el alimento a" });
  } catch (error) {
    //!Manejo de errores
    return res.status(500).json({
      message: "Ocurrio un error inesperado en el servidor",
      error: error.message || error,
    });
  } finally {
    //todo: Liberar la bd
    client.release();
  }
};

const deleteOneAlimento = async (req, res) => {
  //*Conexion con la bd
  const client = await pool.connect();

  try {
    /**
     * ?{
     * ?  id = integer
     * ?}
     */
    console.log(req.body.id)
    const id = req.body.id;
    //*Busqueda en la bd
    const vistaResult = await client.query(
      `UPDATE clicklunch."Alimento" SET isactive = false WHERE "id" = ($1)`,
      [id]
    );
    if (vistaResult.rowCount > 0) {
      //*Retorno de datos
      return res.status(200).json({ message: "Se ha eliminado el alimento" });
    }
    //!Retorno de error
    return res
      .status(404)
      .json({ message: "No se ha podido eliminar el alimento" });
  } catch (error) {
    //!Manejo de errores
    return res.status(500).json({
      message: "Ocurrio un error inesperado en el servidor",
      error: error.message,
    });
  } finally {
    //todo: Liberar la bd
    client.release();
  }
};
const updateOneAlimento = async (req, res) => {
  //*Conexion con la bd
  const client = await pool.connect();

  try {
    /**
     *? {
     *? idCafeteria : req.session.idUsuario,
     *? nombre : "",
     *? descripcion: "",
     *? tiempopreparacion : integer, //Expresa los minutos que tarda
     *? costo: integer,
     *? disponibilidad:integer,
     *? }
     */
    const data = req.body;

    const foodResult = await client.query(
      `UPDATE FROM clicklunch."Alimentos" SET (nombre = $1, descripcion = $2, costo = $3, tiempopreparacion = $4) WHERE id = $5`,
      [
        data.nombre,
        data.descripcion,
        data.costo,
        data.tiempopreparacion,
        data.id,
      ]
    );

    if (foodResult.rowCount > 0) {
      //*Retorno de datos
      return res.status(200).json({ message: "Se ha actualizado el alimento" });
    }
    //!Retorno de error
    return res
      .status(404)
      .json({ message: "No se ha encontrado el alimento a actualizar" });
  } catch (err) {
    //!Manejo de errores
    return res.status(500).json({
      message: "Ocurrio un error inesperado en el servidor",
      error: err,
    });
  } finally {
    //todo: Liberar la bd
    client.release();
  }
};
//!Alerta la siguiente funcion se encuentra en fase de construccion
const getAllComentarios = async (req, res) => {
  //*Conexion con la bd
  const client = await pool.connect();

  try {
    //*Obtne los datos
    const idAlimento = req.body.id;

    const comentsResult = await client.query(
      `SELECT * FROM clicklunch."Comentarios_vw" WHERE id_alimento = '$1'`,
      [idAlimento]
    );

    if (comentsResult.rowCount > 0) {
      return res.status(200).json({ message: comentsResult.rows });
    }
    //!Retorno de error
    return res
      .status(404)
      .json({ message: "No se ha podido obtener los comentarios" });
  } catch (error) {
    //!Manejo de errores
    return res.status(500).json({
      message: "Ocurrio un error inesperado en el servidor",
      error: error,
    });
  } finally {
    //todo: Liberar la bd
    client.release();
  }
};

const datosAlimento = async (id) => {
  //*Conexion con la db
  const client = await pool.connect();

  try {
    //*Busqueda en la db
    const vistaResult = await client.query(
      `SELECT * FROM clicklunch."Alimentos_vw" WHERE "id" = ($1)`,
      [id]
    );
    if (vistaResult.rowCount > 0) {
      //*Retorno de datos
      return {
        estado: 200,
        message: vistaResult.rows[0],
      };
    }
    //!Retorno de error
    return {
      estado: 404,
      message: "No se ha podido obtener el alimento",
    };
  } catch (error) {
    //!Manejo de errores
    return {
      estado: 500,
      message: "Ocurrio un error inesperado en el servidor",
    };
  } finally {
    //todo: Liberar la bd
    client.release();
  }
};

module.exports = {
  addNewAlimento,
  getAllAlimentos,
  deleteOneAlimento,
  updateOneAlimento,
  getAllComentarios,
  getOneAlimento,
};
