import React from "react";
import { baseUrl } from "../../../other/extras";
import axios from "axios";
import '../css/NewProduct.css'
import caf from "../../../imagenes/morales.png"
import { soloLetrasNormales, soloNumeros } from "../../../other/validation";

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

  const fileInputRef = React.useRef(null);

  const handleChangeNumerico = (e) => {
    soloNumeros(e);
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleChange = (e) => {
    soloLetrasNormales(e);
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
              window.location.reload();
            })
            .catch((error) => {
              alert("Ocurrio un error inesperado en el servidor");
            });
        } else return alert("No se cargo la imagen");
      })
      .catch((error) => {
        alert("No se ha podido añadir la imagen");
      });
  };

  const handleSvgClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="producto_cont" id="producto_contAA">
      <form onSubmit={handleSubmit} className="producto">
        <section className="img_cont_pro">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            className="bi bi-image"
            viewBox="0 0 16 16"
            onClick={handleSvgClick}
          >
            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
            <path d="M2.002 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2zm12 1a1 1 0 0 1 1 1v6.5l-3.777-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12V3a1 1 0 0 1 1-1z" />
          </svg>
          <div className="input-form-container">
            <input
              id="file"
              type="file"
              accept="image/png, image/jpeg, image/jpg"
              onChange={handleSelectFile}
              ref={fileInputRef}
              style={{ display: 'none' }}
              multiple={false}
            />
            {imagina && (
              <div className="img-container" id="img_cont_agrpro">
                <img src={imagina} alt="" />
              </div>
            )}
          </div>
        </section>
        <section className="text_desc_pro">
          <img className="fond_pro" src={caf} alt="Imagen no encontrada" />
          <div className="input-form-contaienr">
            Nombre del Nuevo Producto:{" "}
            <input
              type="text"
              name="nombre"
              placeholder="Nombre"
              onChange={handleChange}
            />
          </div>
          <div className="input-form-contaienr">
            Agregue una descripsión de su producto:{" "}
            <input
              type="text"
              name="descripcion"
              placeholder="Descripcion"
              onChange={handleChange}
            />
          </div>
          <div className="input-form-contaienr">
            Tiempo de preparacion en minutos (Solo Números):{" "}
            <section>
              <input
                type="text"
                name="tiempopreparacion"
                placeholder="Tiempo Preparacion"
                onChange={handleChangeNumerico}
              />
              min
            </section>
          </div>
          <div className="input-form-contaienr">
            Precio del producto en pesos mexicanos (Solo Números):{" "}
            <section>
              $
              <input
                type="text"
                name="costo"
                placeholder="Precio"
                onChange={handleChangeNumerico}
              />
            </section>
          </div>
          <div className="input-form-contaienr">
            Disponibilidad aproximada en unidades (Solo Números):{" "}
            <section>
              <input
                type="text"
                name="disponibilidad"
                placeholder="Disponibilidad"
                onChange={handleChangeNumerico}
              />
              Unidades.
            </section>
          </div>
          <div className="input-form-contaienr" id="inp_btn">
            <input type="submit" value="Agregar nuevo Producto" />
          </div>
        </section>
      </form>
    </div>
  );
};

export default NewProduct;
