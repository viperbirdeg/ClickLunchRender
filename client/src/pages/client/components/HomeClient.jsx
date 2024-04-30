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
      <h1 className="text">Cafeterias disponibles</h1>
      <div className="home-client">
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
