import React from "react";
import { baseUrl } from "../other/extras";
import axios from "axios";

const Support = () => {
  const [numeroControl, setNumeroControl] = React.useState("");
  const [fechaOrigen, setFechaOrigen] = React.useState("");
  const [tipoTicket, setTipoTicket] = React.useState("soporte");
  const [prioridad, setPrioridad] = React.useState("1");
  const [usuarioReporto, setUsuarioReporto] = React.useState("");
  const [usuarioProcesando, setUsuarioProcesando] = React.useState("");
  const [fechaActualizacion, setFechaActualizacion] = React.useState("");
  const [descripcion, setDescripcion] = React.useState("");
  const [estatus, setEstatus] = React.useState("");

  React.useEffect(() => {
    // Generar número de control proceduralmente
    setNumeroControl("TCKT-" + Math.floor(Math.random() * 1000000));

    // Generar fecha de origen automáticamente
    const today = new Date();
    const formattedDate =
      today.getFullYear() +
      "-" +
      ("0" + (today.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + today.getDate()).slice(-2);
    setFechaOrigen(formattedDate);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const ticketData = {
      numeroControl,
      tipoTicket,
      prioridad,
      fechaOrigen,
      usuarioReporto,
      usuarioProcesando,
      fechaActualizacion,
      descripcion,
      estatus,
    };

    axios.post(`${baseUrl}/api/support/postTicket`,{
      data : ticketData
    }).then((res)=>{
      const response = res.data.message
      alert(response);
      window.location.reload();
    }).catch();
    console.log("Ticket Data:", ticketData);
    // Aquí puedes manejar el envío de datos, por ejemplo, hacer una petición a un servidor
  };

  return (
    <div>
      <h1>Formulario de Ticket</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="tipoTicket">Tipo de Ticket:</label>
          <select
            id="tipoTicket"
            value={tipoTicket}
            onChange={(e) => setTipoTicket(e.target.value)}
          >
            <option value="Error">Soporte</option>
            <option value="Sugerencia">Incidencia</option>
            <option value="Ayuda">Mejora</option>
          </select>
        </div>
        <div>
          <label htmlFor="descripcion">Descripción:</label>
          <textarea
            id="descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            rows="4"
            cols="50"
          ></textarea>
        </div>
        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Support;
