# Ruta de 'usuario getUsuarios'

## Ruta relativa './api/usuario/usersData'

## Tipo de peticion 'GET'

### >>> Objetivo <<<

-> Esta rurta nos dara la informacion de todos los usuarios registrados.

### >>> Valores de entrada <<<

-> Esta ruta no tiene valores de entrada

### >>> Proceso <<<

-> Hace una peticion a la base de datos a la vista especificada y posteriormente regresa la respuesta.

### >>> Valores de salida <<<

-> En un estado de respuesta '200 OK' la repuesta esperada es una lista de usuarios [El formato de los usuarios de la lista se puede consultar en 'getUser']

### >>> Respuesta de error <<<

{
estado : 500
message : 'Ocurrio un error inesperado en el servidor'
error : mensaje de error
}
Significado: Ocurrio un error que puede en la base de datos que impide el retorno de datos.
Acción: Contactar con el gestor de la bse de datos o desarrollador.
