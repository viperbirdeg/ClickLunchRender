import React from "react";
import { baseUrl } from "../../../other/extras";
import axios from "axios";
import '../css/AddSaldo.css'

const AddSaldo = () => {
  const [usuario, setUsuario] = React.useState();

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
    api
      .put(`/updateSaldo`, {
        data: {
          saldo: credentials.saldo,
          idUser: credentials.idUser,
        },
      })
      .then((res) => {
        alert('Saldo actualizado correctamente');
        window.location.reload();
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  const handleChange = (e) => {
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
        <div className="add-saldo-form-container">
          <form onSubmit={handleSubmit} className="add-saldo-form">
            <div className="user-info">
              <div>Identifier : {usuario.id}</div>
              <div>Nombre de usuario : {usuario.nombre}</div>
              <div>Saldo actual : {usuario.saldo}</div>
            </div>

            {credentials.saldo && (
              <div className="credentials">
                Saldo a agregar : {credentials.saldo}
              </div>
            )}

            <label htmlFor="amount">Saldo a agregar</label>
            <input
              type="number"
              name="saldo"
              id="amount"
              onChange={handleChange}
            />
            <button type="submit">Add Saldo</button>
          </form>
          <button onClick={handleReturn}>Return</button>
        </div>
      )}
      {!usuario && (
        <form onSubmit={searchUser} className="search-user-form">
          <label>Id usuario</label>
          <input
            type="number"
            name="idUser"
            id="idUser"
            onChange={handleChange}
          />
          <button type="submit">Buscar</button>
        </form>
      )}
    </div>
  );
};

export default AddSaldo;
