import React from "react";

//*Import self components
import logo from "../../../imagenes/logo-removebg-preview.png";

const Inicio = () => {
  return (
    <div className="home-container">
      <section className="home-text">
        <span></span>
        <h1 className="home-title"> Tu almuerzo en un click </h1>
        <span className="home-text-desc">
        ClickLunch es una aplicación innovadora que transforma la experiencia de los estudiantes a la hora de pedir sus alimentos. Con ClickLunch, los estudiantes pueden anticipar sus pedidos, evitando la necesidad de hacer largas filas y ahorrando tiempo valioso. Esta app no solo optimiza el proceso de compra, sino que también permite a los usuarios elegir entre una variedad de opciones de menú con solo unos pocos clics. Gracias a ClickLunch, disfrutar de una comida rápida y sin esperas se convierte en una realidad, mejorando la comodidad y eficiencia en el día a día estudiantil.
        </span>
      </section>
    </div>
  );
};

export default Inicio;
