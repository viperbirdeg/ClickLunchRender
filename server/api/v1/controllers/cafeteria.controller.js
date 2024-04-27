const { pool } = require("../database/db.js");
const bcrypt = require('bcrypt');

const addNewCafeteria = async (req, res) => {
  //Conexion con la bd
  const client = await pool.connect();

  //Intentar insercion
  try {
    //Iniciar operacion
    await client.query("BEGIN");

    const data = await req.body;
    //Obtener data
    const email = data.email;
    const cafeteriaName = data.name;
    const hashedPassword = await bcrypt.hash(data.password, 12);
    const rol = 1;

    //Valida que no este registrado
    const validacionResult = await client.query(
      `SELECT * FROM clicklunch."UsuarioInfo" WHERE email = $1`,
      [email]
    );
    if (validacionResult.rowCount > 0) {
      return res.status(409).json({
        message: "Correo ya registrado",
      });
    }
    const validacionUsuario = await client.query(
      `SELECT * FROM clicklunch."UsuarioInfo" WHERE nombre = $1`,
      [cafeteriaName]
    );
    if (validacionUsuario.rowCount > 0) {
      return res.status(409).json({
        message: "Nombre de usuario ya registrado",
      });
    }

    //Inserciones
    const passwordResult = await client.query(
      `INSERT INTO clicklunch."Token"(token) VALUES ($1) RETURNING id`,
      [hashedPassword]
    );
    const idPassword = passwordResult.rows[0].id;
    const userResult = await client.query(
      `INSERT INTO clicklunch."Usuario"(nombre, email, id_token, id_rol) VALUES ($1,$2,$3,$4)`,
      [cafeteriaName, email, idPassword, rol]
    );
    const cafeteriaResult = await client.query(
      `INSERT INTO clicklunch."Cafeteria"(nombre) VALUES ($1) RETURNING id`,
      [cafeteriaName]
    );

    //Terminar y confirmar operacion
    await client.query("COMMIT");

    //Devolver datos
    if (cafeteriaResult.rowCount > 0) {
      const response = await datosCafeteria(cafeteriaResult.rows[0].id);
      return res.status(response.estado).json({ message: response.message });
    }
    return res.status(404).json({
      message: "Hubo problemas encontrando la cafeteria",
    });
  } catch (error) {
    //Manejar errores cancelando operacion
    await client.query("ROLLBACK");
    return res.status(500).json({
      message: "Hubo problema registrando la cafeteria",
      error : error.message
    });
  } finally {
    //Liberar la bd
    client.release();
  }
};

const getAllCafeterias = async (req, res) => {
  //Conexion con la bd
  const client = await pool.connect();

  //Intentar busqueda
  try {
    //Busqueda en la bd
    const vistaResult = await client.query(
      'SELECT * FROM clicklunch."Cafeterias_vw"'
    );

    //Retorno de datos
    return res.status(200).json({ message: vistaResult.rows });
  } catch (error) {
    //Manejo de errores
    return res.status(500).json("Ocurrio un error inesperado en el servidor");
  } finally {
    //Liberar la bd
    client.release();
  }
};

const getOneCafeteria = async (req, res) => {
  /**
   * Formato data
   * {
   *  email:""
   * }
   */
  //Obtener identificador
  const id = req.body.id;

  //Buscar los datos
  const cafeteriaDatos = await datosCafeteria(id);

  //Retornar datos
  return res.status(cafeteriaDatos.estado).json({
    message: userDatos.message,
  });
};

const deleteOneCafeteria = async (req, res) => {
  //Crear cliente de db
  const client = await pool.connect();

  try {
    //Iniciar transaccion
    await client.query("BEGIN");

    //Obtener informacion
    const data = await req.body;
    const email = data.email;
    const datos = await datosCafeteria(email).nombre;
    //Volver invisible en la base de datos
    const deleteResult = await client.query(
      `UPDATE clicklunch."Usuario" SET estado = false WHERE email = $1`,
      [email]
    );
    const delCafeteriaResult = await client.query(
      `UPDATE clicklunch."Cafeteria" SET estado = false WHERE nombre = $1`,
      [datos]
    );

    //Terminar transaccion
    await client.query("COMMIT");

    //Devolver basado en el resultado
    if (deleteResult.rowCount > 0 && delCafeteriaResult.rowCount > 0) {
      return res.status(200).json({message : 'Cafeteria eliminada de forma correcta'});
    } else {
      return res.status(404).json({message : 'Cafeteria no encontrada'});
    }
  } catch (error) {
    //Revertir insercion debido a error
    await client.query("ROLLBACK");
    return res.status(500).json({
      message: "Ocurrio un error eliminando la cafeteria",
    });
  } finally {
    //Liberar la db
    client.release();
  }
};

const getAlimentosCafeteria = async (req, res) => {
  const client = await pool.connect();

  try {
    const id = req.query.id;
    console.log();
    console.log(id);
    const alimentosResult = await client.query(
      `SELECT * FROM clicklunch."Alimentos_vw" WHERE id_cafeteria = $1`,
      [id]
    );

    if (alimentosResult.rowCount > 0) {
      return res.status(200).json({
        message: alimentosResult.rows,
      });
    }
    return res.status(404).json({
      message: "Esta cafeteria no ha registrado alimentos",
    });
  } catch (error) {
    //Manejar errores
    return res.status(500).json({
      message: "Ocurrio un error inesperado en el servidor",
      error: error,
    });
  } finally {
    //Liberar db
    client.release();
  }
};

const getPedidosCafeteria = async (req,res) => {
  /*
  !const client = await pool.connect();
  !try {
  !  const email = req.session.email;
  !  const id = await datosCafeteria(email);
  !}
  */
}

const datosCafeteria = async (id) => {
  //Conexion con la bd
  const client = await pool.connect();

  //Intentar busqueda
  try {
    //Busqueda en la bd
    const vistaResult = await client.query(
      `SELECT * FROM clicklunch."Cafeterias_vw" WHERE "id" = ($1)`,
      [id]
    );
    if (vistaResult.rowCount > 0) {
      //Retorno de datos
      const userDatos = vistaResult.rows[0];
      return {
        estado: 200,
        message: userDatos,
      };
    }
    //Retorno error
    return {
      estado: 404,
      message: `No se ha encontrado la cafeteria`,
    };
  } catch (error) {
    //Manejo de errores
    return {
      estado: 500,
      message: "Ocurrio un error inesperado en el servidor",
    };
  } finally {
    //Liberar la bd
    client.release();
  }
};

module.exports = {
  addNewCafeteria,
  getAllCafeterias,
  getOneCafeteria,
  deleteOneCafeteria,
  getAlimentosCafeteria,
};
