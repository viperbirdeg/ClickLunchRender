import axios from "axios";
import React from "react";
import { useParams } from "react-router-dom";
import { baseUrl } from "../../../other/extras";
import TarjetaAlimentoPedido from "./TarjetaAlimentoPedido";

const CafeOrderProduct = () => {
  const props = useParams();
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [elemenstData, setELementsData] = React.useState(null);
  const [envio, setEnvio] = React.useState(1);

  const Boton = () => {
    return <div></div>;
  };

  React.useEffect(() => {
    axios
      .post(`${baseUrl}/api/pedido/getDatosPedido`, {
        data: {
          idPedido: props.id,
        },
      })
      .then((response) => {
        setData(response.data.message[0]);
        switch (response.data.message[0].estado) {
          case "En espera":
            setEnvio(1);
            break;
          case "Procesando":
            setEnvio(2);
            break;
          case "Cancelado":
            setEnvio(3);
            break;
          case "Finalizado":
            setEnvio(4);
            break;
          default:
            break;
        }
        setIsLoading(false);
      })
      .catch((error) => {
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
        (error) => {}
      )
      .catch((error) => {});
  }, [props]);

  return (
    <div>
      {isLoading ? <h1>Informacion cargando</h1> : <div></div>}
      <h1>CafeOrderProduct</h1>
      {data ? (
        <ul>
          <li>ID pedido : {data.id}</li>
          <li>ID cliente : {data.id_cliente}</li>
          <li>FECHA DEL PEDIDO : {data.fecha_pedido.split("T")[0]}</li>
          <li>HORA : {data.hora}</li>
          <li>COSTO TOTAL : {data.costo_total}</li>
          <li>ESTADO : {data.estado}</li>
        </ul>
      ) : (
        <h1>NO</h1>
      )}

      {elemenstData ? (
        <div>
          {elemenstData.map((item, index) => {
            return <TarjetaAlimentoPedido key={index} id={item.id_alimento} />;
          })}
        </div>
      ) : (
        <div>No hay elementos</div>
      )}
      {error && <h2>error: {error}</h2>}
      {envio}
    </div>
  );
};

export default CafeOrderProduct;
