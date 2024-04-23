# Ruta de 'añadir pedido'

## Ruta relativa './api/pedido/addNewPedido'

## Tipo de peticion 'POST'

### >>> Objetivo <<<

-> Esta ruta tiene como objetivo añadir un pedido hecho por un usuario.

### >>> Valores de entrada <<<

-> La mayoria de los datos dentro de esta ruta son creados dentro de la ruta, solo tiene que ingresar una lista de alimentos para poder agregarlos.

{

  idAlimentos : { id : id1, id : id2 , ...}
}

-> Datos inferidos

{
  fechapedido,
  hora,
  idUsuario,
} 

### >>> Proceso <<<

-> Despues de obtener los datos y hacer la conexion, inicia una transaccion para posteriormente iniciar la insercion de datos, iniciando con encabezado, despues el identificador del pedido, y para finalizar los alimentos del pedido.

### >>> Valores de salida <<<

-> En los valores '200 OK' de esta ruta se retorna un objeto json

{
  message : "El pedido se esta procesando
}

-> 

### >>> Respuesta de error <<<

{
estado : 400
message : 'Hubo problemas generando el pedido'
}
Significado: Se realizo todo el proceso pero no se afectaron tablas de la base de datos. 
Acción: Contactar con el desarrollador o gestor de la base de datos.

{
estado : 500
message : 'Ocurrio un error inesperado en el servidor'
}
Significado: El servidor no termino de procesar la solicitud. 
Acción: Revisar la integridad del servidor , en caso de persistencia, contactar con el desarrollador o el gestor de la base de datos.
