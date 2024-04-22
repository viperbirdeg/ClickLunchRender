# Ruta de 'eliminar cafeteria'

## Ruta relativa './api/cafeteria/deleteOneCafeteria'

## Tipo de peticion 'DELETE'

### >>> Objetivo <<<

-> A pesar de los dicho no se elimina la cafeteria, sino mas bien , se vuelve inaccessibles los datos y se mantienen en la base de datos.

### >>> Valores de entrada <<<

-> Esta ruta recibe como entrada el corro que sirve para encontrar al usuario dentro de la base de datos.

{
  email : 'varchar'
}

->

### >>> Proceso <<<

-> Despues de crear la conexion y obtener los datos, inicia una transaccion, posteriormente las peticiones y finaliza con las respuestas.

### >>> Valores de salida <<<

-> En los valores '200 OK' de esta ruta se retorna un objeto json

{
  message : 'Cafeteria eliminada de forma correcta'
}

->

### >>> Respuesta de error <<<

{
estado :404
message : 'Cafeteria no encontrada'
}
Significado: El correo no coincide con ninguna cafeteria dentro de la base de datos.
Acción: Revisar los datos enviados, en caso de persistencia, comunicarse con el desarrollador o gestor de la base de datos.

{
estado : 500
message : 'Ocurrio un error eliminando la cafeteria'
}
Significado: El servidor no proceso los datos y se cancelo la transaccion.
Acción: Revisar la integridad del servidor y de la base de datos, en caso de persistencia, comunicarse con el desarrollador o gestor de la base de datos.
