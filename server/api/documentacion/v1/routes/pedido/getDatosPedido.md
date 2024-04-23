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

-> En los valores '200 OK' de esta ruta se retorna un objeto json

{
  
}

-> 

### >>> Respuesta de error <<<

{
estado : 
message : ''
}
Significado:
Acción: