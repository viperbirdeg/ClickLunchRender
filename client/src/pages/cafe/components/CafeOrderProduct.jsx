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
  const [enabled, setEnabled] = React.useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    const text = e.target.value;

    setEnabled(false);

    axios
      .post(`${baseUrl}/api/pedido/alterarEstadoPedido`, {
        data: {
          idPedido: props.id,
          estado: text,
        },
      })
      .then((value) => {
        console.log(value);
        window.location.reload();
      }).catch((error) => {
        console.log(error)
      });
  };

  const Boton = ({ type }) => {
    if (type === 1) {
      return (
        <div>
          <button onClick={handleSubmit} value={3} enabled={enabled}>
            Cancelar
          </button>
          <button onClick={handleSubmit} value={2} enabled={enabled}>
            Iniciar
          </button>
        </div>
      );
    } else if (type === 2) {
      return (
        <div>
          <button onClick={handleSubmit} value={3} enabled={enabled}>
            Cancelar
          </button>
          <button onClick={handleSubmit} value={4} enabled={enabled}>
            Marcar Finalizado
          </button>
        </div>
      );
    } else if (type === 3) {
      return <></>;
    }
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
            setEnvio(3);
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
        (error) => { }
      )
      .catch((error) => { });
  }, [props]);

  return (
    <div className="seg_order">
      {isLoading ? <h1>Informacion cargando</h1> : <div></div>}
      <h1>Seguimiento de la Orden</h1>
      {data ? (
        <div className="inf_seg">
          <div className="ids_seg">
            <section>N° Pedido: #{data.id}</section>
            <section>N° Cliente: #{data.id_cliente}</section>
          </div>
          <div className="dts_seg">
            <section>
              <section>ESTADO : {data.estado}</section>
              <section>Pedido Efectuado el: {data.fecha_pedido.split("T")[0]} a las {data.hora}</section>
            </section>
            <section>
              <section className="total_seg">TOTAL: ${data.costo_total}</section>
            </section>
          </div>
        </div>
      ) : (
        <h1>NO</h1>
      )}

      {elemenstData ? (
        <div id="seg_cont_pro">
          {elemenstData.map((item, index) => {
            return <TarjetaAlimentoPedido key={index} id={item.id_alimento} />;
          })}
        </div>
      ) : (
        <div>No hay elementos</div>
      )}
      {error && <h2>error: {error}</h2>}
      <Boton type={envio} />
    </div>
  );
};

export default CafeOrderProduct;
