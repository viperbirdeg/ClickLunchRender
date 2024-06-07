import React from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../../other/extras";
import axios from "axios";

import "../../client/css/Product.css";

const EditProduct = () => {
  const props = useParams();
  const [data, setData] = React.useState({});
  const [error, setError] = React.useState(null);
  const [onEdit, setOnEdit] = React.useState(false);

  React.useEffect(() => {
    axios
      .get(`${baseUrl}/api/alimento/getOneAlimento`, {
        params: {
          id: props.id,
        },
      })
      .then((response) => {
        setData(response.data.message);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, [props]);

  const handleChange = (e) => {
    e.preventDefault();
    setOnEdit(!onEdit);
  };

  return (
    <div className="producto">
      {error && <p>{error.message}</p>}
      {!onEdit ? (
        <div>
          <div className="img-container">
            <img
              src={
                data.url ||
                "https://t3.ftcdn.net/jpg/04/60/01/36/360_F_460013622_6xF8uN6ubMvLx0tAJECBHfKPoNOR5cRa.jpg"
              }
              alt="Loading..."
            />
          </div>
          <div className="id"> id : {data.id}</div>
          <div className="nombre">Nombre : {data.nombre}</div>
          <div className="descripcion">Descripcion : {data.descripcion}</div>
          <div className="costo">Costo : ${data.costo}</div>
          <div className="disponibilidad">
            Disponibilidad Aproximada : {data.disponibilidad}
          </div>
          <div className="estado">{data.estado}</div>
          <div className="id-Cafeteria">ID-Cafeteria : {data.id_cafeteria}</div>
          <div className="tiempo-preparacion">
            Tiempo de preparacion : {data.tiempo_preparacion} min
          </div>
          <div className="id-Cafeteria">ID-Cafeteria : {data.id_cafeteria}</div>
          {/**<button onClick={handleChange}>Editar alimento</button> */}
        </div>
      ) : (
        <p>
          Editing
          <button onClick={handleChange}>Cancelar edicion</button>
        </p>
      )}
    </div>
  );
};

export default EditProduct;
