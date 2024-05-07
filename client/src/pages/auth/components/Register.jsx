import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  esContrasenaValida,
  esCorreoElectronico,
} from "../../../other/validation";
import axios from "axios";
import { baseUrl } from "../../../other/extras";
import logo from "../../../imagenes/logo-removebg-preview.png";
import { emailIcon, passwordIcon, userIcon } from "../../../other/icons";

const Register = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    passwordConfirm: "",
    username: "",
  });
  const usertype = 'client';

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
              navigation("/auth");
            } else {
              return setError("Invalid login 01");
            }
          })
          .catch((error) => {
            return setError(error.response.data.message);
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
              navigation("/auth");
            } else {
              return setError(res.data.message);
            }
          })
          .catch((error) => {
            return setError(error.response.data.message);
          });
      } catch (error) {
        return setError(error.response.data.message);
      }
    } else {
      return alert("Ingresa el captcha");
    }
  };

  return (
    <div className="register-container font">
      <div className="register-form-container">
        <span className="register-text">Registro</span>
        <form className="register-form" onSubmit={handleSubmit}>
          {error && <div className="login-error">{error}</div>}
          <div className="register-form-input-container">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
              <path d={userIcon} />
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
              <path d={emailIcon} />
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
              <path d={passwordIcon} />
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
              <path d={passwordIcon} />
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
