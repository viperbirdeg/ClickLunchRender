const { pool } = require("../database/db.js");
const datosAlimento = require("../controllers/alimento.controller.js");

const getDatosPedido = async (req, res) => {
  const client = await pool.connect();

  try {
    const id = req.body.idPedido;

    const dataPedido = await client.query(
      'SELECT * FROM clicklunch."Pedido_vw" WHERE id = $1',
      [id]
    );

    if (dataPedido.rowCount > 0) {
      return res.status(200).json({
        message: dataPedido.rows,
      });
    } else {
      return res.status(404).json({
        message: "No se encontraron datos",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Ocurrio un error inesperado en el servidor",
      error: error,
    });
  } finally {
    client.release();
  }
};

const getElementosPedido = async (req, res) => {
  const client = await pool.connect();

  try {
    idPedido = req.body.data.idPedido;

    const dataPedido = await client.query(
      'SELECT * FROM clicklunch."Alimentos_Pedido_vw" WHERE id_pedido = $1',
      [idPedido]
    );

    if (dataPedido.rowCount > 0) {
      return res.status(200).json({
        message: dataPedido.rows,
      });
    } else {
      return res.status(404).json({
        message: "No se encontraron datos",
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Ocurrio un error inesperado en el servidor",
      error: error,
    });
  } finally {
    client.release();
  }
};

const addNewPedido = async (req, res) => {
  //* Conexion con la base de datos
  const client = await pool.connect();

  try {
    /**
     * ? {
     * !Encabezado
     * ? fechapedido : new Date().toISOString();
     * ? hora : new Date().toTimeString();
     * ! Usuario
     * ? Id usuario : no pide
     * ! pedido
     * ? nadaa
     * ! alimentos
     * ? idAlimentos : {lista de id's}
     * ? }wd
     * */

    await client.query("BEGIN");

    const now = new Date();
    //const hora = now.toTimeString().split(" ")[0];
    //const fecha = now.toISOString().split("T")[0];

    const idsAlimentos = JSON.parse(req.body.data.cart);
    const idUsuario = req.body.data.idUsuario;
    const idCafe = req.body.data.idCafe;
    const fecha = req.body.data.fecha;
    const hora = req.body.data.hora;

    const saldoResult = await client.query(
      'SELECT saldo FROM clicklunch."UsuarioInfo" WHERE id = $1',
      [idUsuario]
    );

    console.log('saldo:' , saldoResult.rows[0].saldo);

    var preciototal = 0;
    for (let i = 0; i < idsAlimentos.length; i++) {
      const alimentosResult = await client.query(
        'SELECT costo FROM clicklunch."Alimentos_vw" WHERE id = $1',
        [idsAlimentos[i].id]
      );
      preciototal += alimentosResult.rows[0].costo;
      console.log('costo' ,alimentosResult.rows[0].costo);
      console.log('preciototal', preciototal)
    }

    if (saldoResult.rows[0].saldo < preciototal) {
      return res.status(403).json({
        message: "Saldo insuficiente",
      });
    }

    const newSaldo = parseInt(saldoResult.rows[0].saldo) - parseInt(preciototal);
    
    const updateResult = await client.query(
      `UPDATE clicklunch."Usuario" SET saldo = $1 WHERE id = $2`,
      [newSaldo, idUsuario]
    );

    const encabezadoResult = await client.query(
      'INSERT INTO clicklunch."Encabezado"(fecha_pedido, hora) VALUES ($1, $2) RETURNING id',
      [fecha, hora]
    );

    const idEncabezado = encabezadoResult.rows[0].id;

    const pedidoResult = await client.query(
      'INSERT INTO clicklunch."Pedido"(id_encabezado, id_usuario, id_cafeteria, costo_total) VALUES ($1, $2, $3, $4) RETURNING id',
      [idEncabezado, idUsuario, idCafe, preciototal]
    );

    const idPedido = pedidoResult.rows[0].id;

    let result = [];

    for (let i = 0; i < idsAlimentos.length; i++) {
      const alimentosResult = await client.query(
        'INSERT INTO clicklunch."pedido_alimento"(id_pedido, id_alimento) VALUES ($1, $2) ',
        [idPedido, idsAlimentos[i].id]
      );
      result.push("a");
    }

    client.query("COMMIT");

    if (result.length === idsAlimentos.length) {
      return res.status(200).json({ message: "El pedido se esta procesando" });
    } else {
      return res
        .status(400)
        .json({ message: "Hubo problemas generando el pedido" });
    }
  } catch (error) {
    client.query("ROLLBACK");
    return res.status(500).json({
      message: "Ocurrio un error inesperado en el servidor",
      error: error.message,
    });
  } finally {
    client.release();
  }
};

const getPedidosCliente = async (req, res) => {
  //* Conexion con la base de datos
  const client = await pool.connect();

  try {
    const data = req.body.data;

    const id = data.idUsuario;

    const result = await client.query(
      'SELECT * FROM clicklunch."Pedido_vw" WHERE id_cliente = $1',
      [id]
    );

    if (result.rowCount > 0) {
      return res.status(200).json({
        message: result.rows,
      });
    }
    return res.status(204).json({
      message: "No se encontraron datos",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Ocurrio un error inesperado en el servidor",
      error: error.message,
    });
  } finally {
    client.release();
  }
};

const postRutaAdicional = () => {};

module.exports = {
  getDatosPedido,
  getElementosPedido,
  addNewPedido,
  postRutaAdicional,
  getPedidosCliente,
};
