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
import { emailIcon, passwordIcon } from "../../../other/icons.js";
import LoadingSpinner from "./LoadingSpinne.jsx";

const Login = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  //const [captcha, setCaptcha] = useState();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigate();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!credentials.email || !credentials.password) {
      setLoading(false);
      return alert("Todos los campos son obligatorios");
    }
    if (!esCorreoElectronico(credentials.email)) {
      setLoading(false);
      return alert("El correo electronico es invalido");
    }
    if (!esContrasenaValida(credentials.password)) {
      setLoading(false);
      return alert("La contraseña es invalida");
    }
    if (/*captcha || */ true) {
      try {
        axios
          .post(`${baseUrl}/api/usuario/searchVerifyList`, {
            data: {
              email: credentials.email,
            },
          })
          .then((res) => {
            if (res.status === 200) {
              navigation(`/auth/verify/${credentials.email}`);
            }
          })
          .catch((value) => {
            console.log(value);
          });
        axios
          .post(`${baseUrl}/api/usuario/login`, {
            data: {
              email: credentials.email,
              password: credentials.password,
            },
          })
          .then((res) => {
            setLoading(false);
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
            setLoading(false);
            console.log(error);
            return setError(error.response.data.message || error.message);
          });
      } catch (error) {
        setLoading(false);
        return setError("Registro invalido");
      }
    } else {
      return alert("Ingresa el captcha");
    }
  };

  return (
    <div className="login-container">
      {loading && <LoadingSpinner />}
      <div className="login-img-container">
        <img className="login-logo-img" src={logo} alt="Logo" />
      </div>
      <div className="IDK font">
        <span className="login-text">Iniciar Sesión</span>
        <form className="login-form" onSubmit={handleSubmit}>
          {error && <div className="login-error">{error}</div>}
          <div className="login-form-input-container">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              class="bi bi-envelope"
              viewBox="0 0 16 16"
            >
              <path d={emailIcon} />
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              class="bi bi-lock"
              viewBox="0 0 16 16"
            >
              <path d={passwordIcon} />
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
          <NavLink to="/auth/register" className="register-link_txt">
            Registrate
          </NavLink>
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
