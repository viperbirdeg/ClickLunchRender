import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { soloNumeros } from "../../../other/validation";
import axios from "axios";
import { baseUrl } from "../../../other/extras";
import emailjs from "emailjs-com";

const Verify = () => {
  const props = useParams();
  const [credentials, setCredentials] = React.useState({
    email: props.email,
    verifyCode: "",
  });
  const navigation = useNavigate();
  const [error, setError] = React.useState("");
  const [emailSent, setEmailSent] = React.useState(false);

  React.useEffect(() => {
    if (!emailSent) {
      const formData = {
        to_email: props.email, // Replace with actual email address
        message: "154897", // Replace with actual verification code
      };

      const sendVerificationEmail = async () => {
        emailjs.send(
          "service_w2djd3a", // Tu ID de servicio de EmailJS
          "template_nr8lxsb", // Tu ID de plantilla de EmailJS
          formData,
          'oiTcnJRVXipwzH8FL',
          (error, result) => {
            if (error) {
              console.error("Error al enviar correo electrónico:", error);
            } else {
              console.log("Correo electrónico enviado correctamente");
              setEmailSent(true);
            }
          }
        );
      };

      sendVerificationEmail();
    }
  }, [props.email]);

  const handleChange = (e) => {
    setError("");
    soloNumeros(e);
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const handleClick = (e) => {
    e.preventDefault();
    axios
      .post(`${baseUrl}/api/usuario/verify`, {
        data: {
          email: credentials.email,
          verifyCode: credentials.verifyCode,
        },
      })
      .then((res) => {
          navigation("/auth");
      })
      .catch((error) => {
        setError(error.response.data.message);
      });
  };

  return (
    <div>
      <h1>Verificacion para {props.email}</h1>
      <section>
        Ingrese el codigo de verificacion enviado al correo registrado
      </section>
      <input
        type="text"
        placeholder="XXXXXX"
        onChange={handleChange}
        name="verifyCode"
      />
      {error && <h1>{error}</h1>}
      <button onClick={handleClick}>Enviar</button>
    </div>
  );
};
export default Verify;
