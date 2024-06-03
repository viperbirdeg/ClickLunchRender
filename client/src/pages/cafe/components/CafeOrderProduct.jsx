import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../../other/extras";

const CafeOrderProduct = () => {
  const props = useParams();
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [elemenstData, setELementsData] = React.useState(null);

  React.useEffect(() => {
    axios
      .post(`${baseUrl}/api/pedido/getDatosPedido`, {
        data: {
          idPedido: props.id,
        },
      })
      .then((response) => {
        console.log(response);
        setData(response.data.message[0]);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
    axios
      .post(`${baseUrl}/api/pedido/getElementosPedido`, {
        data: {
          idPedido: props.id,
        },
      })
      .then(
        (response) => {
          setELementsData(response.data.message);
        },
        (error) => {
          console.log(error);
        }
      )
      .catch((error) => {
        console.log(error);
      });
  }, [props]);

  return (
    <div>
      {isLoading ? <h1>Informacion cargando</h1> : <div></div>}
      <h1>CafeOrderProduct</h1>
      <h2>id: {props.id}</h2>
      <ul>
        <li></li>
      </ul>
      <h3>data: {JSON.stringify(data)}</h3>
      <h3>Elements data : {JSON.stringify(elemenstData)}</h3>
      {error && <h2>error: {error}</h2>}
      <h2>isLoading: {isLoading}</h2>
    </div>
  );
};

export default CafeOrderProduct;
