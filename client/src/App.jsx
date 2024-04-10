import React, { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch('https://clicklunchrender.onrender.com/api/usuario/usersData', {
      method: 'GET'
    })
      .then((response) => {
        return response.json();
      })
      .then((datos) => {
        setData(datos.message.rows);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      {!data ? 'Loading...' : <pre>{JSON.stringify(data, null,2)}</pre>}
    </div>
  );
}

export default App;