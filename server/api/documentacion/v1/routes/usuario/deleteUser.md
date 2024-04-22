# Ruta de 'usuario delete'

## Ruta relativa './api/usuario/deleteUsuario'

### >>> Objetivo <<<

-> Esta ruta a pesar de su nombre, realmente no se encarga de eliminarlo mas bien, inhabilita la cuenta y ya no se puede utilizar, pero los datos de esta continuan en la base de datos.

### >>> Valores de entrada <<<

-> El dato necesario para realizar la busqueda es el email.
{
"email": "varchar"
}

### >>> Proceso <<<

-> Primero se encarga de revisar que exista el usuario, y posteriormente establece el estado de la cuenta a falso, permitiendo que esta cuenta no pueda utilizares mas, para finalizar regresando una respuesta.

### >>> Valores de salida <<<

-> En un estado de respuesta '200 OK' se espera un resultado de.

{
message : 'Usuario eliminado de forma correcta'
}

### >>> Respuesta de error <<<

-> En un error se encuentran las siguientes posibles respuestas
<-Relacionados a la busqueda->
{
estado : 404
message : 'Usuario no encontrado'
}
Significado: El usuario que se intento eliminar no se encuentra.
Accion: Revisar los datos de ingreso, en caso de estar seguro que los datos son correctos comunicarse con el creador de la v1 'Hi-Stern Victor Perez'.

{
estado : 500
message : 'Hubo problema eliminando al usuario'
}
Significado: Los datos se intentaron buscar, sin embargo, no se ha podido por problemas de conexion o de la base de datos.
Accion: Revisar conexiones con la base de datos y que esta se encuentre en operacion o comunicarse con el encargado de esta.
