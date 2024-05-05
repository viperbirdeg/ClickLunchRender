import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  esCorreoElectronico,
  esContrasenaValida,
} from "../../../other/validation.js";
import axios from "axios";
//import { ReCAPTCHA } from "react-google-recaptcha";
import logo from "../../../imagenes/logo-removebg-preview.png";
import { baseUrl } from "../../../other/extras.js";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  //const [captcha, setCaptcha] = useState();
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
    if (!credentials.email || !credentials.password) {
      return alert("Todos los campos son obligatorios");
    }
    if (!esCorreoElectronico(credentials.email)) {
      return alert("El correo electronico es invalido");
    }
    if (!esContrasenaValida(credentials.password)) {
      return alert("La contraseña es invalida");
    }
    if (/*captcha || */ true) {
      try {
        axios
          .post(`${baseUrl}/api/usuario/login`, {
            data: {
              email: credentials.email,
              password: credentials.password,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              if (res.data.rol === "Cliente") {
                window.localStorage.setItem("id", res.data.id);
                window.localStorage.setItem("rol", res.data.rol);
                window.localStorage.setItem("token", res.data.token);
                navigation("/client");
              } else if (res.data.rol === "Cafeteria") {
                window.localStorage.setItem("id", res.data.id);
                window.localStorage.setItem("rol", res.data.rol);
                window.localStorage.setItem("token", res.data.token);
                window.localStorage.setItem("idCafe", res.data.idCafe);
                navigation("/cafe");
              }
            } else {
              return setError("Contraseña Incorrecta");
            }
          })
          .catch((error) => {
            console.log(error)
            return setError(error.message || error.response.data.message);
          });
      } catch (error) {
        return setError("Invalid login");
      }
    } else {
      return alert("Ingresa el captcha");
    }
  };

  return (
    <div className="login-container">
      <div className="login-img-container">
        <img className="login-logo-img" src={logo} alt="Logo" />
      </div>
      <div className="IDK font">
        <span className="login-text">Iniciar Sesión</span>
        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="login-error">{error}</div>}
          <div className="login-form-input-container">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-envelope" viewBox="0 0 16 16">
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z" />
            </svg>
            <input
              type="email"
              name="email"
              className="login-form-input-email"
              placeholder="correoprueba@xxxxx.xxx"
              required
              onChange={handleChange}
            />
          </div>
          <div className="login-form-input-container">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-lock" viewBox="0 0 16 16">
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1" />
            </svg>
            <input
              type="password"
              name="password"
              className="login-form-input-password"
              placeholder="Contraseña123."
              required
              onChange={handleChange}
            />
          </div>
          <button className="login-button-submit">Iniciar sesión</button>
        </form>
        <span className="register-link">
          ¿No tienes cuenta?
          <NavLink to="/auth/register" className="register-link_txt">Registrate</NavLink>
        </span>
        {/*
        <div className="">
          <p>ó</p>
        </div>

        <button
          onClick={() => {
            if (captcha) {
            } else {
              alert("Ingrese el captcha");
            }
          }}
          className="google-button"
        >
          <div className="google-container">
            <img
              className="google-img"
              src="https://i.ibb.co/xJRLWfJ/gugulnobg-removebg-preview.png"
              alt="google-logo, idk"
            />
            Iniciar sesión con Google
          </div>
        </button>
        <ReCAPTCHA
          sitekey="6LdfsbEpAAAAAIjUfDtKWVnjqnUlqBwg_ArAb5nz"
          onChange={setCaptcha}
        /> */}
      </div>
    </div>
  );
};

export default Login;
