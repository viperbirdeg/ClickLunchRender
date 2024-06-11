const { pool } = require("../database/db.js");

const postTicket = async (req, res) => {
  const client = await pool.connect();

  const data = req.body.data;

  /** Needed
   * ticket_type : ticket_type,
   * idUsuario : idUsuario,
   * Descripcion : description,
   * fechaOrigen : origin_date
   */
  const ticket_type = data.ticket_type;
  const id_user = data.id_user;
  const description = data.description;
  const origin_date = data.origin_date;

  try {
    const ticketResult = await client.query(
      'INSERT INTO clicklunch."Ticket"(id_tickettipe,usuario_reporta,descripcion,fecha_origen) VALUES ($1,$2,$3,$4)',
      [ticket_type, id_user, description, origin_date]
    );

    if (ticketResult.rowCount >= 0) {
      return res.status(200).json({ message: "Ticket correctamente enviado" });
    }
    return res.status(400).json({ message: "Ocurrio un error inesperado" });
  } catch (error) {
    return res.status().json({ message: error.message });
  } finally {
    client.release();
  }
};

module.exports = {
  postTicket,
};
