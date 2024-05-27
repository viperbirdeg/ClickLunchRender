import axios from "axios";
import React from "react";
import { baseUrl } from "../../../other/extras.js";
import Cafeteria from "./Cafeteria.jsx";

import "../css/HomeClient.css"; // Import the CSS file

const HomeClient = () => {
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(`${baseUrl}/api/cafeteria/getAllCafeterias`, {})
      .then((response) => {
        setData(response.data.message);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  return (
    <div>
      <div className="presentation_cafe">
        <span>Se Bienvenidx a Click Lunch!</span>
        <span className="tt_is">Descubre, Aparta, Ordena y Disfruta.</span>
        <span>Bienvenidx a ClickLunch, la plataforma web que transforma la experiencia de descubrir y disfrutar deliciosos productos de cafeterías locales. Nuestro objetivo es ofrecerte una manera fácil y rápida de acceder a tus bebidas y comidas favoritas sin complicaciones.</span>
        <a href="#Negocios"><button className="expl_caf">Empezar a explorar <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-circle-fill" viewBox="0 0 16 16">
          <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293z" />
        </svg></button></a>
      </div>
      <h1 className="text">Cafeterias disponibles</h1>
      <div className="home-client" id="Negocios">
        {error && <p>Error: {error}</p>}
        {data.map((cafeteria) => (
          <Cafeteria
            key={cafeteria.id}
            id={cafeteria.id}
            nombre={cafeteria.nombre}
            email={cafeteria.email}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeClient;
