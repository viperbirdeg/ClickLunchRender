import React from "react";

//*Import self components
import logo from "../../../imagenes/logo-removebg-preview.png";

const Inicio = () => {
  return (
    <div className="home-container">
      <img src={logo} alt="ClickLunchLogo" className="home-logo" />
      <section className="home-text">
        <h1 className="home-title"> ¡¡¡BIENVENIDO A CLICK LUNCH!!! </h1>
        <span className="home-text-desc">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus dolor voluptate, quod enim saepe aliquid illo voluptatibus modi iste similique ullam ex. Nesciunt neque pariatur cum quis! Aperiam, architecto unde!. Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis dolorum dicta ullam, voluptatem rerum rem aspernatur fugiat exercitationem, cum, maiores excepturi facilis porro ipsam sed! Error hic quaerat excepturi in. Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquam sint adipisci voluptate alias officiis tempore deserunt quibusdam nemo amet rerum, voluptatibus incidunt laboriosam tenetur totam atque asperiores debitis omnis odit!
        </span>
      </section>
    </div>
  );
};

export default Inicio;
