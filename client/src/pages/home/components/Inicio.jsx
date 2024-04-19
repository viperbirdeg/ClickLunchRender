import React from "react";

//*Import self components
import logo from "../../../imagenes/logo-removebg-preview.png";

const textSections = Array.from({ length: 10 }, (_, i) => (
  <section key={i} className="home-text">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua.
  </section>
));

const Inicio = () => {
  return (
    <div className="home-container">
      <h1 className="home-title"> Click Lunch </h1>
      <img src={logo} alt="ClickLunchLogo" className="home-logo" />
      {textSections}
    </div>
  );
};

export default Inicio;
