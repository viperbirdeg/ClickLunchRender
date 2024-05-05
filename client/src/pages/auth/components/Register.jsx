import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  esContrasenaValida,
  esCorreoElectronico,
} from "../../../other/validation";
import axios from "axios";
import { baseUrl } from "../../../other/extras";
import logo from "../../../imagenes/logo-removebg-preview.png";

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
    <div className="register-container font">
      <div className="register-form-container">
        <span className="register-text">Registro</span>
        <section className="d-none">
          <span className="titlecontainer">Register: {usertype}</span>
          <button onClick={handleUsertype}>Register</button>
        </section>
        <form className="register-form" onSubmit={handleSubmit}>
          {error && <div className="login-error">{error.message}</div>}
          <div className="register-form-input-container">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
            </svg>
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
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
            </svg>
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
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-lock" viewBox="0 0 16 16">
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1" />
            </svg>
            <input
              type="password"
              name="password"
              className="register-form-input-password"
              placeholder="XXXXXXX123$"
              required
              onChange={handleChange}
            />
          </div>
          <div className="register-form-input-container">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-lock" viewBox="0 0 16 16">
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1" />
            </svg>
            <input
              type="password"
              name="passwordConfirm"
              className="register-form-input-password"
              placeholder="XXXXXXX123$"
              required
              onChange={handleChange}
            />
          </div>
          <button className="register-button-submit">Registrar</button>
        </form>
        <span className="register-link">
          ¿Ya tienes una cuenta?
          <NavLink to="/auth" className="register-link_txt">Inicia Sesión</NavLink>
        </span>
      </div>
      <div className="reg-img-container">
        <img className="login-logo-img log_reg" src={logo} alt="Logo" />
      </div>
    </div>
  );
};

export default Register;
