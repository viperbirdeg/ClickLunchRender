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
     * ? fechapedido : no pide
     * ? hora : no pide
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
    const hora = now.toTimeString().split(" ")[0];
    
    const fecha = now.toISOString().split("T")[0];


    const idsAlimentos = JSON.parse(req.body.data.cart);
    const idUsuario = req.body.data.idUsuario;
    const idCafe = req.body.data.idCafe;

    const encabezadoResult = await client.query(
      'INSERT INTO clicklunch."Encabezado"(fecha_pedido, hora) VALUES ($1, $2) RETURNING id',
      [fecha, hora]
    );

    const idEncabezado = encabezadoResult.rows[0].id;

    const pedidoResult = await client.query(
      'INSERT INTO clicklunch."Pedido"(id_encabezado, id_usuario, id_cafeteria) VALUES ($1, $2, $3) RETURNING id',
      [idEncabezado, idUsuario, idCafe]
    );

    const idPedido = pedidoResult.rows[0].id;

    let result = []

    for (let i = 0; i < idsAlimentos.length; i++) {
      const alimentosResult = await client.query(
        'INSERT INTO clicklunch."pedido_alimento"(id_pedido, id_alimento) VALUES ($1, $2) ',
        [idPedido, idsAlimentos[i].id]
      );
      result.push('a');
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
