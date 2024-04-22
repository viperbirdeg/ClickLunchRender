# Ruta de 'alimento eliminar'

## Ruta relativa './api/alimento/deleteAlimento'

## Tipo de peticion 'DELETE'

### >>> Objetivo <<<

-> Esta ruta tiene como objetivo volver inaccesible un alimento de la  base de datos, sin embargo  mantiene los datos en la base de datos.

### >>> Valores de entrada <<<

-> Esta ruta tiene como valores de entrada.

{
  id : id
}

-> Este valor ayuda a indentificar cual elemento eliminar

### >>> Proceso <<<

-> Crea un cliente, obtiene el id, establece el estado en falso haciendo inaccesible de nuevo el alimento, retorna una respuesta.

### >>> Valores de salida <<<

-> En los valores '200 OK' de esta ruta se retorna un objeto json

{
  message : 'Se ha eliminado el alimento'
}

-> 

### >>> Respuesta de error <<<

{
estado : 400
message : 'Mo se ha podido eliminar el alimento'
}
Significado: Se ejecuto la query pero no afecto a ninguna tabla
Acción: Comunicarse con el gestor de la base de datos o el desarrollador

{
estado : 500
message : 'Ocurrio un error inesperado en el servidor'
}
Significado: El servidor no pudo procesar la query
Acción: Comunicarse con el gestor de la base de datos o el desarrollador