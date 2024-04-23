# Ruta de 'obtener datos pedido'

## Ruta relativa './api/pedido/getDatosPedido'

## Tipo de peticion 'GET'

### >>> Objetivo <<<

->  Esta ruta tiene como objetivo que a partir de un identificador obtener los datos correspondientes a ese pedido.

### >>> Valores de entrada <<<

-> El unico valor de entrada de esta ruta es un identificador unico para obtener los datos de ese pedido. 

{
  idPedido : id
}

-> 

### >>> Proceso <<<

-> Despues de obtener los datos y realizar la conexion realiza una consulta a la base de datos y finaliza regresando los datos correspondientes.

### >>> Valores de salida <<<

-> En los valores '200 OK' de esta ruta se retorna un objeto json.

{
  nombre: 'varchar'
  email: 'varchar'
  fecha_pedido: "AAAA-MM-DD"
  hora : "HH:MM:SS"
  id : id
}

-> 

### >>> Respuesta de error <<<

{
estado : 404
message : 'No se encontraron datos'
}
Significado: No existen pedidos registrados con ese identificador.
Acción: Revisar integridad de los datos, en caso de persistencia, contactar con el desarrollador o gestor de la base de datos.