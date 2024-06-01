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
      .get(`${baseUrl}/api/pedido/getDatosPedido`, {
        params: {
          id: props.id,
        },
      })
      .then((response) => {
        setData(response.data.message);
        setIsLoading(false);
      })
      .catch((error) => {
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
