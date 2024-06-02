import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../../other/extras";

const CafeOrderProduct = () => {
  const props = useParams();
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    axios
      .post(`${baseUrl}/api/pedido/getDatosPedido`, {
        data: {
          idPedido: props.id,
        },
      })
      .then((response) => {
        console.log(response)
        setData(response.data.message);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  }, [props]);

  return (
    <div>
    {isLoading ? (<h1>Informacion cargando</h1>) : <div></div>}
      <h1>CafeOrderProduct</h1>
      <h2>id: {props.id}</h2>
      <h3>data: {JSON.stringify(data)}</h3>
      {error && <h2>error: {error}</h2>}
      <h2>isLoading: {isLoading}</h2>
    </div>
  );
};

export default CafeOrderProduct;
