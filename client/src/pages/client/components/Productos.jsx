import axios from 'axios';
import React from 'react'
import { useParams } from 'react-router-dom';
import { baseUrl } from '../../../other/extras';
import Producto from './Product';
import CardProducto from './CardProducto';

const Productos = () => {
  const props = useParams();
  const [data, setData] = React.useState([]);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    axios
      .get(`${baseUrl}/api/cafeteria/getAlimentosCafeteria`, {
        params: {
          id: props.id
        }
      })
      .then((response) => {
        console.log(response);
        setData(response.data.message);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);
  return (

    
    <div>
      <h1>Productos</h1>
      {error && <p>No se han encontrado alimentos en esta cafeteria</p>}
      {data.map((item) => (
        <CardProducto 
          key={item.id}
          id={item.id}
          nombre={item.nombre}
          costo={item.costo}
          disponibilidad={item.disponibilidad}
          />
      ))}
    </div>
  )
}

export default Productos