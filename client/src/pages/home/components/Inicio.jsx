import React from "react";

//*Import self components
import logo from "../../../imagenes/logo-removebg-preview.png";

const Inicio = () => {
  return (
    <div className="home-container">
      <h1 className="home-title"> Click Lunch </h1>
      <img src={logo} alt="ClickLunchLogo" className="home-logo" />
    </div>
  );
};

export default Inicio;
