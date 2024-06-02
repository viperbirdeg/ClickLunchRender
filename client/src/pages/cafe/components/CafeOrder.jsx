import axios from 'axios';
import React from 'react'
import { baseUrl } from '../../../other/extras';
import CafeOrderProduct from './CafeOrderProduct';

const CafeOrder = ({id, fecha_pedido, hora, estado, costo_total, id_cliente}) => {

  fecha_pedido = fecha_pedido.split("T")[0];
  const [data, setData] = React.useState();
  const handleState = (e) => {
    axios
     .post(`${baseUrl}/api/pedido/getElementosPedido`, {
        data: {
          idPedido: id,
        },
      })
     .then(response => {
      setData(response.data.message);
     },(error)=>{
      console.log(error)
     }).catch((error) => {
      console.log(error)
     });
  }
  const handleDelete = () =>{
    setData();
  }
  return (
    <ul className='order'>
      <div className='order-header'>
        <li>ID pedido: {id}</li>
        <li>fecha pedido : {fecha_pedido}</li>
        <li>hora : {hora}</li>
        <li>estado : {estado}</li>
        <li>costo : ${costo_total}</li>
        <li>ID cliente : {id_cliente}</li>
      </div>
      <div className='order-details'>
        <button onClick={handleState}>Detalles</button>
      </div>
      {data ? (
        <div className='order-actions'>
          <h2>Detalles del pedido</h2>
          {data.map((item,key) => {
            return (
              <CafeOrderProduct
                className='order-product'
                key={key}
                id={item.id_alimento}
              />
            );
          })}
          <button onClick={handleDelete}>Ocultar</button>
        </div>
      ) : null}
    </ul>
  )
}

export default CafeOrder