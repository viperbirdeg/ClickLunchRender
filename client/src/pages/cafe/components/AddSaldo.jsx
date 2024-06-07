import React from "react";
import { baseUrl } from "../../../other/extras";
import axios from "axios";
import "../css/AddSaldo.css";
import { desactivar, soloNumeros } from "../../../other/validation";
import imgu from "../../../imagenes/profile.png";

const AddSaldo = () => {
  const [usuario, setUsuario] = React.useState();
  const [isDisabled, setIsDisabled] = React.useState(false);

  const [credentials, setCredentials] = React.useState({
    saldo: null,
    idUser: null,
  });

  const [error, setError] = React.useState();

  // Extract the token to a separate variable
  const token = window.localStorage.getItem("token");

  // Create an Axios instance with default headers and base URL
  const api = axios.create({
    baseURL: `${baseUrl}/api/cafeteria`,
    headers: {
      Authorization: token,
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsDisabled(true);
    api
      .put(`/updateSaldo`, {
        data: {
          saldo: credentials.saldo,
          idUser: credentials.idUser,
        },
      })
      .then((res) => {
        alert("Saldo actualizado correctamente");
        window.location.reload();
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  const handleChange = (e) => {
    soloNumeros(e);
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  const searchUser = (e) => {
    e.preventDefault();
    if (!credentials.idUser) {
      return setError("Not User");
    } else {
      axios
        .post(`${baseUrl}/api/usuario/userPerId`, {
          data: {
            id: credentials.idUser,
          },
        })
        .then((res) => {
          setUsuario(res.data.message);
        })
        .catch((error) => {
          setError(error.response.data.message);
        });
      //setUsuario(credentials.idUser);
      setError(null);
    }
  };
  const handleReturn = (e) => {
    e.preventDefault();
    setUsuario(usuario ? false : true);
    setCredentials({
      saldo: null,
      idUser: null,
    });
    setError(null);
  };

  return (
    <div className="add-saldo-container">
      {error && <div className="error">{error}</div>}
      {usuario && (
        <div className="search-user-form">
          <form onSubmit={handleSubmit} className="search-user-form" id="search-user-form">
            <div className="nme_user_adds">{usuario.nombre}</div>
            <div className="user-info">
              <section>
                <img src={imgu} alt="Imagen no encontrada" />
                <div>#{usuario.id}</div>
              </section>
              <div>Saldo actual: ${usuario.saldo}</div>
            </div>

            {credentials.saldo && (
              <div className="credentials">
                Saldo a agregar : {credentials.saldo}
              </div>
            )}
            <span>Ingrese el saldo </span>
            <section className="inpt_agr_saldo">
              $ <input
                type="text"
                name="saldo"
                id="amount"
                onChange={handleChange}
              />
            </section>
            <section className="btns_agr_saldo">
              <button type="submit" disabled={isDisabled}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cash-coin" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M11 15a4 4 0 1 0 0-8 4 4 0 0 0 0 8m5-4a5 5 0 1 1-10 0 5 5 0 0 1 10 0" />
                  <path d="M9.438 11.944c.047.596.518 1.06 1.363 1.116v.44h.375v-.443c.875-.061 1.386-.529 1.386-1.207 0-.618-.39-.936-1.09-1.1l-.296-.07v-1.2c.376.043.614.248.671.532h.658c-.047-.575-.54-1.024-1.329-1.073V8.5h-.375v.45c-.747.073-1.255.522-1.255 1.158 0 .562.378.92 1.007 1.066l.248.061v1.272c-.384-.058-.639-.27-.696-.563h-.668zm1.36-1.354c-.369-.085-.569-.26-.569-.522 0-.294.216-.514.572-.578v1.1zm.432.746c.449.104.655.272.655.569 0 .339-.257.571-.709.614v-1.195z" />
                  <path d="M1 0a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h4.083q.088-.517.258-1H3a2 2 0 0 0-2-2V3a2 2 0 0 0 2-2h10a2 2 0 0 0 2 2v3.528c.38.34.717.728 1 1.154V1a1 1 0 0 0-1-1z" />
                  <path d="M9.998 5.083 10 5a2 2 0 1 0-3.132 1.65 6 6 0 0 1 3.13-1.567" />
                </svg> Añadir Saldo
              </button>
              <button type="button" onClick={handleReturn}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left-circle-fill" viewBox="0 0 16 16">
                <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0m3.5 7.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5z" />
              </svg> Regresar</button>
            </section>
          </form>
        </div>
      )}
      {!usuario && (
        <form onSubmit={searchUser} className="search-user-form">
          <label for="idUser">Para añadir saldo INGRESE EL ID DEL USUARIO</label>
          <section>
            #
            <input
              type="text"
              name="idUser"
              id="idUser"
              onChange={handleChange}
            />
          </section>
          <button type="submit">Buscar Usuario <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg></button>
        </form>
      )}
    </div>
  );
};

export default AddSaldo;
