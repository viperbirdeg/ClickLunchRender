import React, { useState } from "react";
import { Outlet, useNavigate, } from "react-router-dom";

//*Importing self components
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { baseUrl } from "../../other/extras";
import axios from "axios";
import LoadingSpinner from './components/LoadingSpinne';

import "./css/ClientLayout.css"; // Import the CSS file

const ClientLayout = () => {
  const navigation = useNavigate();
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = useState(true);

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
        setLoading(false);
      })
      .catch((error) => {
        navigation("/");
        setLoading(false);
      });
  }, [navigation]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="client-layout-container">
      <NavBar className="navbar" />
      {loading ?(
        <LoadingSpinner />
      ) : (
        <React.Fragment>
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
        </React.Fragment>
      )}

    </div>
  );
};

export default ClientLayout;
