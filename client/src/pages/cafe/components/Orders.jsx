import React from 'react'
import { baseUrl } from '../../../other/extras';
import axios from 'axios';

const Orders = () => {

  React.useEffect(() => {

    axios.post(`${baseUrl}/api/cafeteria/getPedidosCafe`, {
      data : {
        id : window.localStorage.getItem('idCafe')
      }
    }).then();
  }, []);

  return (
    <div>Orders</div>
  )
}

export default Orders