import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  esContrasenaValida,
  esCorreoElectronico,
} from "../../../other/validation";
import axios from "axios";
import { baseUrl } from "../../../other/extras";

const Register = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    username: "",
  });

  const [usertype, setUsertype] = useState("client");

  const [error, setError] = useState("");
  const navigation = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password || !credentials.username) {
      return alert("Todos los campos son obligatorios");
    }
    if (!esCorreoElectronico(credentials.email)) {
      return alert("El correo electronico es invalido");
    }
    if (!esContrasenaValida(credentials.password)) {
      return alert("La contraseña es invalida");
    }
    if (!esContrasenaValida(credentials.username)) {
      return alert("El usuario es invalido");
    }

    if (usertype === "client") {
      try {
        axios
          .post(`${baseUrl}/api/usuario/register`, {
            data: {
              email: credentials.email,
              password: credentials.password,
              name: credentials.username,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              console.log(res.data);
              /*window.localStorage.setItem("id", res.data.id);
              window.localStorage.setItem("rol", res.data.rol);
              window.localStorage.setItem("token", res.data.token);
              */
              navigation("/auth");
            } else {
              return setError("Invalid login");
            }
          })
          .catch((error) => {
            return setError("Invalid login");
          });
      } catch (error) {
        return setError("Invalid login");
      }
    } else if (usertype === "cafe") {
      try {
        axios
          .post(`${baseUrl}/api/cafeteria/addNewCafeteria`, {
            data: {
              email: credentials.email,
              password: credentials.password,
              name: credentials.username,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              console.log(res.data);
              /*window.localStorage.setItem("id", res.data.id);
              window.localStorage.setItem("rol", res.data.rol);
              window.localStorage.setItem("token", res.data.token);
              */
              navigation("/auth");
            } else {
              return setError("Invalid login");
            }
          })
          .catch((error) => {
            return setError("Invalid login");
          });
      } catch (error) {
        return setError("Invalid login");
      }
    } else {
      return alert("Ingresa el captcha");
    }
  };

  const handleUsertype = (e) => {
    e.preventDefault();
    return usertype === "client" ? setUsertype("cafe") : setUsertype("client");
  };

  return (
    <div className="register-container">
      <div className="img-container"></div>
      <div className="register-form-container">
        <span className="titlecontainer">Register</span>
        {/*<span>{usertype}</span>
        <button onClick={handleUsertype}>Register</button>*/}
        <form className="register-form" onSubmit={handleSubmit}>
          {error && <div className="login-error">{error.message}</div>}
          <div className="register-form-input-container">
            <input
              type="text"
              name="username"
              className="register-form-input-user"
              placeholder="username"
              required
              onChange={handleChange}
            />
          </div>
          <div className="register-form-input-container">
            <input
              type="email"
              name="email"
              className="register-form-input-email"
              placeholder="correoprueba@xxxxx.xxx"
              required
              onChange={handleChange}
            />
          </div>
          <div className="register-form-input-container">
            <input
              type="password"
              name="password"
              className="register-form-input-password"
              placeholder="XXXXXXX123$"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <input
              type="password"
              name="passwordConfirm"
              className="register-form-input-password"
              placeholder="XXXXXXX123$"
              required
              onChange={handleChange}
            />
          </div>
          <button className="register-button-submit">
            <div className="register-submit">Registrar</div>
          </button>
        </form>
      </div>
      <div className="img-container"></div>
    </div>
  );
};

export default Register;
