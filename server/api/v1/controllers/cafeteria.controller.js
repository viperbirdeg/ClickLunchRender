const { pool } = require('../database/db.js');

const addNewCafeteria = async () => {

  //Conexion con la bd
  const client = await pool.connect();

  //Intentar insercion
  try {
    //Iniciar operacion
    await client.query('BEGIN');

    const data = await req.body;
    //Obtener data
    /**
     * {
     *  email : "",
     *  name : "",
     *  password :""
     * }
     */
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
        message: 'Correo ya registrado'
      });
    }
    const validacionUsuario = await client.query(
      `SELECT * FROM clicklunch."UsuarioInfo" WHERE nombre = $1`,
      [cafeteriaName]
    );
    if (validacionUsuario.rowCount > 0) {
      return res.status(409).json({
        message: 'Nombre de usuario ya registrado',
      });
    }

    //Inserciones
    const passwordResult = await client.query(
      `INSERT INTO clicklunch."Token"(token) VALUES ($1) RETURNING id`,
      [hashedPassword]
    );
    const idPassword = passwordResult.rows[0].id;
    const userResult = await client.query(
      `INSERT INTO clicklunch."Usuario"(nombre, email, id_token, rol) VALUES ($1,$2,$3,$4)`,
      [username, email, idPassword, rol]
    );
    const cafeteriaResult = await client.query(
      `INSERT INTO clicklunch."Cafeteria"(nombre) VALUES ($1)`,
      [username]
    );

    //Terminar y confirmar operacion
    await client.query('COMMIT');

    //Devolver datos
    if (cafeteriaResult.rowCount > 0) {
      const response = await datosCafeteria(email);
      return res.status(response.estado).json({ message: response.message });
    }
    return res.status(404).json({
      message: 'Hubo problemas encontrando la cafeteria'
    });

  } catch (error) {
    //Manejar errores cancelando operacion
    await client.query('ROLLBACK');
    return res.status(500).json({
      message: 'Hubo problema registrando la cafeteria'
    });
  } finally {
    //Liberar la bd
    client.release();
  }
}

const getAllCafeterias = () => {

}

const getOneCafeteria = () => {

}

const deleteOneCafeteria = () => {

}

const getAlimentosCafeteria = () => {

}

const datosCafeteria = async email => {
  //Conexion con la bd
  const client = await pool.connect();

  //Intentar busqueda
  try {

    //Busqueda en la bd
    const vistaResult = await client.query(
      `SELECT * FROM clicklunch."Cafeterias_vw" WHERE "email" = ($1)`,
      [email]
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
      message: 'Ocurrio un error inesperado en el servidor',
    };

  } finally {
    //Liberar la bd 
    client.release();
  }
}

module.exports = { addNewCafeteria, getAllCafeterias, getOneCafeteria, deleteOneCafeteria, getAlimentosCafeteria }