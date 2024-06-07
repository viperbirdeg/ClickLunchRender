import React from "react";
import mision from "../../../imagenes/mision.png";
import vision from "../../../imagenes/vision.png";
import obj1 from "../../../imagenes/obj1.png";
import obj2 from "../../../imagenes/obj2.png";
import obj3 from "../../../imagenes/obj3.png";

const AboutUs = () => {
  return (
    <div className="About_us">
      <div>
        <img src={mision} alt="" />
        <section>
          <span>Misión</span>
          <span>Buscamos ser líderes en el desarrollo de soluciones de software innovando para contribuir en el desarrollo tecnológico de México. Nuestro compromiso es proporcionar productos de vanguardia que impulsen las transformaciones digitales de las empresas y así mejorar la vida de las personas.</span>
        </section>
      </div>
      <div>
        <section>
          <span>Visión</span>
          <span> Impulsar la industria de la tecnología en México, destacando para así poder expandir el alcance de nuestros proyectos por el país, y a su vez estos proyectos tengan impacto activo en la población.</span>
        </section>
        <img src={vision} alt="" />
      </div>
      <span className="tt_obj">OBJETIVOS</span>
      <section className="cont_obj">
        <section>
          <img src={obj1} alt="" />
          <span>Posicionarnos como referente en el mercado tecnológico de México.</span>
        </section>
        <section>
          <img src={obj2} alt="" />
          <span>Desarrollar un software que tenga impacto activo en las problemáticas, principalmente mexicanas.</span >
        </section>
        <section>
          <img src={obj3} alt="" />
          <span>Expandir nuestra presencia a nivel nacional e internacional.</span>
        </section>
      </section>
      <span className="tt_obj">Valores</span>
      <section className="val_cont">
        <section>
          <span>Innovación constante</span>
          <span>Creemos en la búsqueda continua de nuevas ideas y soluciones para mejorar constantemente nuestros productos y servicios; así poder fomentar la creatividad y el pensamiento innovador.</span>
        </section>
        <section>
          <span>Aprendizaje continuo</span>
          <span> Nos esforzamos por mantenernos actualizados con las últimas tecnologías y mejores prácticas de la industria para modernizar constantemente nuestras habilidades y conocimientos.</span>
        </section>
        <section>
          <span>Transparencia</span>
          <span>Creemos en la honestidad y en compartir información de manera clara y oportuna.</span>
        </section>
      </section>
      <span className="tt_obj">Políticas</span>
      <section className="pol_cont">
        <span className="pol">
          - Comprometimiento  con proyectos en desarrollo para poder ofrecer la mayor calidad posible.
          <br />
          - Estar a la vanguardia de las últimas tendencias tecnológicas y metodologías ágiles para proporcionar soluciones creativas y efectivas.
        </span>
      </section>
    </div>
  );
};

export default AboutUs;
