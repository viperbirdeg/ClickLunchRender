const { pool } = require("../database/db.js");

const getDatosPedido = async (req, res) => {
  const client = await pool.connect();

  try {
    /**
     * !Datos
     * ?{
     * ? idpedido : integer
     * ?}
     */
    const id = req.body.id;

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
    /**
     * !Datos
     * ?{
     * ? idpedido : integer
     * ?}
     */

    idPedido = req.body.idpedido;

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
     * ? }
     * */

    await client.query("BEGIN");

    const hora = now.toTimeString().split(" ")[0];
    const fecha = now.toISOString().split("T")[0];

    const idsAlimentos = req.body.idAlimentos;

    const idUsuario = req.session.idUsuario;

    const encabezadoResult = await client.query(
      'INSERT INTO clicklunch."Encabezado"(fecha_pedido, hora) VALUES ($1, $2) RETURNING id',
      [fecha, hora]
    );

    const idEncabezado = encabezadoResult.rows[0].id;

    const pedidoResult = await client.query(
      'INSERT INTO clicklunch."Pedido"(id_encabezado, id_usuario) VALUES ($1, $2) RETURNING id',
      [idEncabezado, idUsuario]
    );

    const idPedido = pedidoResult.rows[0].id;

    const result = await idsAlimentos.map(async (id, i) => {
      const alimentosResult = await client.query(
        'INSERT INTO clicklunch."Alimento"(id_pedido, id_alimento) VALUES ($1, $2) ',
        [idPedido, id]
      );
    });

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
      error: error,
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
};
