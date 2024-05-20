import axios from "axios";
import React from "react";
import { baseUrl } from "../../../other/extras";
import "../css/Profile.css";

const Profile = () => {
  const [edit, setEdit] = React.useState(false);
  const [data, setData] = React.useState({});
  const [buttonText, setButtonText] = React.useState("Eliminar cuenta");
  const [first, setFirst] = React.useState(false);

  const handleDelete = (e) => {
    e.preventDefault();
    setFirst(!first);
    setButtonText(
      buttonText === "Eliminar cuenta"
        ? "Cancelar eliminacion"
        : "Eliminar cuenta"
    );
  };

  const handleFirst = (e) => {
    e.preventDefault();
    axios
      .delete(`${baseUrl}/api/usuario/deleteUsuario`)
      .then((res) => {
        if (res.statusCode === 200) {
          window.localStorage.removeItem("token");
          window.localStorage.removeItem("rol");
          window.localStorage.removeItem("id");
          window.localStorage.removeItem("cart");
          window.location.reload();
        }
      })
      .catch((error) => {
        console.log(error)
      });
    alert("Eliminando");
  };

  const handleEdit = (e) => {
    e.preventDefault();
    setEdit(!edit);
  };

  React.useEffect(() => {
    axios
      .post(`${baseUrl}/api/usuario/userPerId`, {
        data: {
          id: window.localStorage.getItem("id"),
        },
      })
      .then((res) => {
        console.log(res);
        setData(res.data.message);
        console.log(res.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="profile-container">
      <h1>Profile</h1>
      {!edit && (
        <div className="profile-info">
          <h2>Información de la cuenta</h2>
          <div className="ul-info-container">
            <ul>
              <li>
                <span>Identificador:</span>
              </li>
              <li>
                <span>Nombre:</span>
              </li>
              <li>
                <span>Saldo:</span>{" "}
              </li>
              <li>
                <span>Correo:</span>
              </li>
              <li>
                <span>Rol:</span>
              </li>
            </ul>
            <ul className="center">
              <li>
                <span>{data.id}</span>
              </li>
              <li>
                <span>{data.nombre}</span>
              </li>
              <li>
                <span>{data.saldo}</span>
              </li>
              <li>
                <span>{data.email}</span>
              </li>
              <li>
                <span>{data.rol}</span>
              </li>
            </ul>
          </div>
          <div className="edit-button-container">
            <button className="edit-button" onClick={handleEdit}>
              Editar campos
            </button>
          </div>
        </div>
      )}
      {edit && (
        <div className="profile-info">
          <h2>Editar Información de la cuenta no disponible</h2>
          <div className="edit-button-container">
            <button className="edit-button" onClick={handleEdit}>
              Regresar
            </button>
          </div>
        </div>
      )}
      <button className="delete-account-button" onClick={handleDelete}>
        {buttonText}
      </button>
      {first && (
        <div>
          <section className="confirmation-text">
            De verdad desea eliminar la cuenta?
          </section>
          <button className="delete-account-button" onClick={handleFirst}>
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
