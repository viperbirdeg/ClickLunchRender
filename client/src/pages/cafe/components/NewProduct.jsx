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
  const [file, setFile] = React.useState(null);
  const [imagina, setImagina] = React.useState(null);
  const [res, setRes] = React.useState(null);

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  React.useEffect(() => {
    if (imagina) {
      setRes(null);
    }
  }, [imagina]);

  const handleSelectFile = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        setImagina(e.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
      setFile(e.target.files[0]);
    } else {
      setImagina(null);
      setFile(null);
      setRes(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("my_file", file);
    axios
      .post(`${baseUrl}/upload`, data)
      .then((res) => {
        if (res.data.secure_url) {
          axios
            .post(`${baseUrl}/api/alimento/addAlimento`, {
              data: {
                nombre: credentials.nombre,
                descripcion: credentials.descripcion,
                tiempopreparacion: credentials.tiempopreparacion,
                costo: credentials.costo,
                disponibilidad: credentials.disponibilidad,
                idCaf: window.localStorage.getItem("idCafe"),
                url: res.data.secure_url,
              },
            })
            .then((response) => {
              alert("Alimento correctamente agregado");
            })
            .catch((error) => {
              alert("No se ha podido completar la solicitud");
            });
        } else return alert("No se ha podido completar la solicitud");
      })
      .catch((error) => {
        alert("No se ha podido completar la solicitud");
      });
  };
  return (
    <div>
      Agregar aliment
      <form onSubmit={handleSubmit}>
        <div className="input-form-container">
          <input
            id="file"
            type="file"
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleSelectFile}
            multiple={false}
          />
          {imagina && (
            <div>
              <img src={imagina} alt="" />
            </div>
          )}
        </div>
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
