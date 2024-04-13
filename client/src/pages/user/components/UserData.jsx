import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const baseUrl = "http://localhost:3002"

const UserData = () => {
  const [userData, setUserData] = React.useState(null);

  const navigation = useNavigate();

  React.useEffect(() => {
    axios.get(`${baseUrl}/api/usuario/authUser`)
    .then((response) => {
    if (response.status === 200 /*&& response.rol === "Cliente"*/) {
        setUserData(response.data);
      }
    }).catch((error) => {
        return navigation("/home");
    });
  });

  return (
    <div className="Data-Container">
      <h1>User Data:</h1>
      <section className="Data">
        {!userData ? "Loading data..." : JSON.stringify(userData)}
      </section>
    </div>
  );
};

export default UserData;
