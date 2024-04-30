import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

//*Importing self components
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { baseUrl } from "../../other/extras";
import axios from "axios";

import "./css/ClientLayout.css"; // Import the CSS file

const ClientLayout = () => {
  const navigation = useNavigate();
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    axios
      .get(`${baseUrl}/api/usuario/authUser`, {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setData(res.data.message);
        if (res.data.message.rol !== "Cliente") {
          navigation("/");
        }
      })
      .catch((error) => {
        navigation("/");
      });
  }, [navigation]);

  return (
    <div className="client-layout-container">
      <NavBar className="navbar" />
      <div className="outlet">
        <Outlet />
      </div>
      <div className="footer">
        <Footer
          key={data.id}
          id={data.id}
          nombre={data.nombre}
          saldo={data.saldo}
          email={data.email}
          rol={data.rol}
        />
      </div>
    </div>
  );
};

export default ClientLayout;
