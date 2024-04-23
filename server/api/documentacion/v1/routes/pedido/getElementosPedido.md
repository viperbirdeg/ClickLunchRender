# Ruta de 'obtener elementos del pedido'

## Ruta relativa './api/pedido/getElementosPedido'

## Tipo de peticion 'GET'

### >>> Objetivo <<<

-> Obtener los identificadores de todos los elementos que contiene el pedido.

### >>> Valores de entrada <<<

-> El unico valor que solicita esta ruta es el identificador del pedido.

{
  idPedido : id
}

-> 

### >>> Proceso <<<

-> Despues de crear la conexion y obtener los datos genera una peticion a los datos de la base de datos.

### >>> Valores de salida <<<

-> En los valores '200 OK' de esta ruta se retorna un objeto json que continee una lista de identificadores. 

{
  {id_pedido : id1,
    id_alimento : id2
  }, 
  {id_pedido : id1,
    id_alimento : id3
  }
  ...{id_pedido : id1,
    id_alimento : idN
  }
}

-> Todos ellos deben mantener el mismo id_pedido.

### >>> Respuesta de error <<<

{
estado : 404 
message : 'No se encontraron datos'
}
Significado : No hay alimentos dentro de este pedido.
Acción: Revisar la integridad de los datos, en caso de persistencia, contactar al desarrollador o al gestor de la base de datos.