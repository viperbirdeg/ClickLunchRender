import axios from "axios";
import React from "react";
import { baseUrl } from "../../../other/extras";
import "../css/Profile.css";
import perfil from "../../../imagenes/profile.png"

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
        setData(res.data.message);;
      })
      .catch((error) => {
      });
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-info">
        <section className="tarj_prof"></section>
        <img className="img_prof" src={perfil} alt="" />
        <div className="tarj_txt_prof">
          {!edit && (
            <div className="info-container">
              <span className="id_user_perf">#{data.id}</span>
              <section className="nom_rol_user_perf">
                <span className="rol_user_perf">Soy un {data.rol}</span>
                <span className="hol_user_perf">Hola!, soy {data.nombre}</span>
              </section>
              <section className="info_user_perf">
                <span>
                  <svg className="mon_icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8m5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0" />
                    <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195z" />
                    <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083q.088-.517.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1z" />
                    <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 6 6 0 0 1 3.13-1.567" />
                  </svg>Saldo: ${data.saldo}
                </span>
                <span>
                  <svg className="corr_icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
                  </svg>Correo: {data.email}
                </span>
              </section>
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
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
              <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0" />
            </svg>{buttonText}
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
      </div>
    </div>
  );
};

export default Profile;
