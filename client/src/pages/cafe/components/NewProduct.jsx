import React from "react";
import { baseUrl } from "../../../other/extras";
import axios from "axios";

const NewProduct = () => {
  const [credentials, setCredentials] = React.useState({
    nombre: "",
    descripcion: "",
    tiempopreparacion: 0,
    costo: 0,
    disponibilidad: 0,
  });

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      `Nombre : ${credentials.nombre} , descripcion : ${credentials.descripcion} , tiempopreparacion : ${credentials.tiempopreparacion} , costo : ${credentials.costo} , disponibilidad : ${credentials.disponibilidad}`
    );
    axios.post(`${baseUrl}/api/alimento/addAlimento`, {
      data:{
        nombre: credentials.nombre,
        descripcion: credentials.descripcion,
        tiempopreparacion: credentials.tiempopreparacion,
        costo: credentials.costo,
        disponibilidad: credentials.disponibilidad,
        idCaf : window.localStorage.getItem('idCafe')
      }
    }).then((response)=>{
      console.log(response.data)
    }).catch((error)=>{
      console.log(error)
    });
  };
  return (
    <div>
      NewProduct
      <form onSubmit={handleSubmit}>
        <div className="input-form-contaienr">
          Nombre :{" "}
          <input
            type="text"
            name="nombre"
            placeholder="Nombre"
            onChange={handleChange}
          />
        </div>
        <div className="input-form-contaienr">
          Descripcion :{" "}
          <input
            type="text"
            name="descripcion"
            placeholder="Descripcion"
            onChange={handleChange}
          />
        </div>
        <div className="input-form-contaienr">
          Tiempo de preparacion en minutos :{" "}
          <input
            type="number"
            name="tiempopreparacion"
            placeholder="Tiempo Preparacion"
            onChange={handleChange}
          />
        </div>
        <div className="input-form-contaienr">
          Precio en pesos mexicanos :{" "}
          <input
            type="number"
            name="costo"
            placeholder="Precio"
            onChange={handleChange}
          />
        </div>
        <div className="input-form-contaienr">
          Disponibilidad aproximada :{" "}
          <input
            type="number"
            name="disponibilidad"
            placeholder="Disponibilidad"
            onChange={handleChange}
          />
        </div>
        <div className="input-form-contaienr">
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
};

export default NewProduct;
