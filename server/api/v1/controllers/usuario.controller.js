const { SignJWT, jwtVerify } = require("jose");
const { pool } = require("../database/db.js");
const bcrypt = require("bcrypt");

//?Usado para mandar registros
const postNewUser = async (req, res) => {
  //Conexion con la bd
  const client = await pool.connect();

  //Intentar insercion
  try {
    //Iniciar operacion
    await client.query("BEGIN");

    //obtener data
    const data = await req.body.data;

    const email = data.email;
    const username = data.name;
    const hashedPassword = await bcrypt.hash(data.password, 12);

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
      [username]
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
      `INSERT INTO clicklunch."Usuario"(nombre, email, id_token) VALUES ($1,$2,$3) RETURNING id`,
      [username, email, idPassword]
    );

    //Terminar y confirmar operacion
    await client.query("COMMIT");

    //Devolver datos
    if (userResult.rowCount > 0) {
      const response = await datosUsuario(userResult.rows[0].id);
      return res.status(response.estado).json({ message: response });
    }
    res.status(404).json({
      message: "Hubo problemas encontrando el usuario",
    });
  } catch (error) {
    //Manejar errores cancelando operacion
    await client.query("ROLLBACK");
    return res.status(500).json({
      message: "Hubo problema registrando al usuario",
      error: error,
    });
  } finally {
    //Liberar la bd
    client.release();
  }
};

//?Usado para inicios de sesion
const postLogin = async (req, res) => {
  //Conexion con la bd
  const client = await pool.connect();

  //Intentar proceso
  try {
    //Obtener data

    const data = await req.body.data;

    const email = data.email;

    //Validar existencia
    const validacionResult = await client.query(
      `SELECT * FROM clicklunch."UsuarioInfo" WHERE email = $1`,
      [email]
    );
    if (validacionResult.rowCount == 0) {
      return res.status(404).json({
        message: "Usuarios no registrado",
      });
    }

    //Validar igualdad
    const datos = validacionResult.rows[0];
    if (await bcrypt.compare(data.password, datos.token)) {
      //Generar la sesion

      try {
        const information = { id: datos.id, rol: datos.rol };
        const jwtConstructor = new SignJWT(information);
        const encoder = new TextEncoder();
        const jwt = await jwtConstructor
          .setProtectedHeader({ alg: "HS256", typ: "JWT" })
          .setIssuedAt()
          .setExpirationTime("2h")
          .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));

        if (datos.rol === "Cafeteria") {
          datingins = await client.query(
            'SELECT * FROM clicklunch."Cafeteria" WHERE nombre = $1',
            [datos.nombre]
          );
          return res.status(200).json({
            token: jwt,
            id: datos.id,
            rol: datos.rol,
            idCafe: datingins.rows[0].id,
          });
        } else {
          return res.status(200).json({
            token: jwt,
            id: datos.id,
            rol: datos.rol,
          });
        }
      } catch (err) {
        return res.sendStatus(401).json({ message: err.message });
      }
    }
    return res.status(401).json({ message: "Contraseña incorrecta" });
  } catch (error) {
    //Manejar errores
    return res.status(500).json({
      message: "Ocurrio un error inesperado en login",
      error: error.message,
    });
  } finally {
    //Liberar la bd
    client.release();
  }
};

//?Usado para eliminar sesion
const postLogout = (req, res) => {
  res.clearCookie("token");
  res.end();
};

const updateOneUser = async (req, res) => {
  //Conexion con la bd
  const client = await pool.connect();

  //Intentar insercion
  try {
    //Iniciar operacion
    await client.query("BEGIN");

    //obtener data
    const data = await req.body;
    const email = data.email;
    const username = data.name;
    const newToken = await bcrypt.hash(data.password, 12);

    //Cambio de contraseña
    const id = await client.query(
      `SELECT (id_token) FROM clicklunch."Usuarios" WHERE email = $1`,
      [email]
    );

    const validacionResult = await client.query(
      `UPDATE clicklunch."Token" set token = $1 WHERE id = $2`,
      [newToken, id.rows[0].idtoken]
    );

    //Terminar y confirmar operacion
    await client.query("COMMIT");

    return res
      .status(200)
      .json({ message: "Cambio realizado de manera correcta" });
  } catch (error) {
    //Manejar errores cancelando operacion
    await client.query("ROLLBACK");
    return res.status(500).json({
      message: "Hubo problema registrando al usuario",
      error: error,
    });
  } finally {
    //Liberar la bd
    client.release();
  }
};

//?Usado para obtener todos los usuarios
const getAllUsers = async (req, res) => {
  //Conexion con la bd
  const client = await pool.connect();

  //Intentar busqueda
  try {
    //Busqueda en db
    const vistaResult = await client.query(
      `SELECT * FROM clicklunch."UsuarioInfo"`
    );

    //Retorno de datos
    return res.status(200).json({ message: vistaResult });
  } catch (error) {
    //Manejo de errores
    return res.status(500).json({
      message: "Ocurrio un error inesperado en el servidor",
      error: error,
    });
  } finally {
    //Liberar la bd
    client.release();
  }
};

//?Usado para obtener un usuario a partir de un identificador
const getOneUser = async (req, res) => {
  //Obtener identificador
  const id = req.query.id;

  //Buscar sus datos
  const userDatos = await datosUsuario(id);

  //Retornar datos
  return res.status(userDatos.estado).json({
    message: userDatos.message,
  });
};

//?Verificaciones
const authOneUser = async (req, res) => {
  const { authorization } = req.headers;

  const data = await authToken(authorization);

  if (data.status === 200) {
    return res.status(data.status).json(data.user);
  } else return res.status(data.status).json({ message: data.message });
};

//?Eliminar un usuario cambiando su estado a false
const deleteOneUsuario = async (req, res) => {
  //Crear cliente de db
  const client = await pool.connect();

  try {
    //Iniciar transaccion
    await client.query("BEGIN");

    //Obtener informacion
    const data = await req.body.data;
    const email = data.email;

    //Volver invisible en la base de datos
    const deleteResult = await client.query(
      `UPDATE clicklunch."Usuario" SET estado = false WHERE email = $1`,
      [email]
    );

    //Terminar transaccion
    await client.query("COMMIT");

    //Devolver basado en el resultado
    if (deleteResult.rowCount > 0) {
      return res.status(200).json({
        message: "Usuario eliminado de forma correcta",
      });
    } else {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }
  } catch (error) {
    //Revertir insercion debido a error
    await client.query("ROLLBACK");
    return res.status(500).json({
      message: "Hubo problema eliminando al usuario",
      error: error,
    });
  } finally {
    //Liberar la db
    client.release();
  }
};

const getUserPerId = async (req, res) => {
  const id = req.body.data.id;

  const userDatos = await datosUsuario(id);

  return res.status(userDatos.estado).json({
    message: userDatos.message,
  });
};

//?Funcion interna de obtencion de usuarios
const datosUsuario = async (id) => {
  //Conexion con la bd
  const client = await pool.connect();

  //Intentar busqueda
  try {
    //Busqueda en db
    const vistaResult = await client.query(
      `SELECT * FROM clicklunch."UsuarioInfo" WHERE "id" = ($1)`,
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
      message: `No se ha encontrado el usuario`,
    };
  } catch (error) {
    //Manejo de errores
    return {
      estado: 500,
      message: "Ocurrio un error inesperado en el servidor",
      error: error,
    };
  } finally {
    //Liberar la bd
    client.release();
  }
};

const authToken = async (token) => {
  if (!token) {
    return {
      status: 401,
      message: "No cuenta con autorizacion",
    };
  }

  try {
    const encoder = new TextEncoder();
    const { payload } = await jwtVerify(
      token,
      encoder.encode(process.env.JWT_PRIVATE_KEY)
    );
    const user = await datosUsuario(payload.id);
    if (!user.message.id) {
      return {
        status: 401,
        message: "No cuenta con autorizacion",
      };
    }
    return {
      status: 200,
      message: "Autorizacion correcta",
      user: user,
    };
  } catch (err) {
    return { status: 401, message: "error", error: err.message };
  }
};

//Exportaciones
module.exports = {
  postNewUser,
  postLogin,
  postLogout,
  updateOneUser,
  getAllUsers,
  getOneUser,
  authOneUser,
  deleteOneUsuario,
  authToken,
  datosUsuario,
  getUserPerId,
};
