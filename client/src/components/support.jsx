import React from "react";
import { baseUrl } from "../other/extras";
import axios from "axios";

const Support = () => {
  const [fechaOrigen, setFechaOrigen] = React.useState("");
  const [tipoTicket, setTipoTicket] = React.useState("soporte");
  const [usuarioReporto, setUsuarioReporto] = React.useState();
  const [descripcion, setDescripcion] = React.useState("");

  React.useEffect(() => {
    setUsuarioReporto(window.localStorage.getItem("id"));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const now = new Date();

    const fecha = now.toISOString().split("T")[0];

    axios
      .post(`${baseUrl}/api/support/postTicket`, {
        data: {
          ticket_type: tipoTicket,
          id_user: usuarioReporto,
          description: descripcion,
          origin_date: fecha,
        },
      })
      .then((res) => {
        const response = res.data.message;
        alert(response);
        window.location.reload();
      })
      .catch();
    // Aquí puedes manejar el envío de datos, por ejemplo, hacer una petición a un servidor
  };

  return (
    <div className="form_support">
      <h1>Formulario de Ticket</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="tipoTicket">Tipo de Ticket:</label>
          <select
            id="tipoTicket"
            value={tipoTicket}
            onChange={(e) => setTipoTicket(e.target.value)}
          >
            <option value="2">Error</option>
            <option value="1">Sugerencia</option>
            <option value="3">Apoyo</option>
          </select>
        </div>
        <div>
          <label htmlFor="descripcion">Descripción del problema:</label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          ></textarea>
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Support;
