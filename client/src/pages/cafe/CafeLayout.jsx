import React from "react";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import { Outlet, useNavigate } from "react-router-dom";
import { baseUrl } from "../../other/extras";
import axios from "axios";

const CafeLayout = () => {

  const navigation = useNavigate();
  const [data, setData] = React.useState([]);

  React.useEffect(()=>{
    axios.get(`${baseUrl}/api/usuario/authUser`,{
      headers: {
        Authorization: `${localStorage.getItem('token')}`
      }
    }).then((res)=>{
      setData(res.data.message);
      if(res.data.message.rol !== 'Cafeteria'){
        navigation("/");
      };
    }).catch((error)=>{
      navigation('/');
    });
  },[navigation]);

  return (
    <div className="client-layout-container">
      <NavBar />
      <Outlet />
      <Footer 
        key={data.id}
        id={data.id}
        nombre={data.nombre}
        saldo={data.saldo}
        email={data.email}
        rol={data.rol}
      />
    </div>
  );
};


export default CafeLayout;
