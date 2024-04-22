# Ruta de 'usuario getUsuario'

## Ruta relativa './api/usuario/userData'

## Tipo de peticion 'GET'

### >>> Objetivo <<<

-> Esta rurta nos dara la informacion de un usuario en especifico.

### >>> Valores de entrada <<<

-> Esta ruta tinee un valor de entrada de un objeto.

{
"email" : "varchar"
}

-> Este dato permite identificar al usuario.

### >>> Proceso <<<

-> Hace una peticion a la base de datos utilizando la funcion interna y posteriormente regresa la respuesta.

### >>> Valores de salida <<<

-> En un estado de respuesta '200 OK' la repuesta esperada es un objeto de usuario
{
"id": id,
"nombre": "varchar",
"saldo": integer,
"email": "varchar",
"token": "varchar",
"rol": "varchar"
}

### >>> Respuesta de error <<<

<-Relacionados a la busqueda->
{
estado : 404
message : 'Hubo problemas encontrando el usuario'
}
Significado: El usuario se ingreso correctamente, pero al momento de hacer la busqueda
la cantidad de columnas que se retornan como afectadas es nula.
Accion: Revisar los datos de ingreso, en caso de estar seguro que los datos son correctos
comunicarse con el creador de la v1 'Hi-Stern Victor Perez'.

{
estado : 500
message : 'Ocurrio un error inesperado en el servidor'
}
Significado: Los datos se intentaron buscar, sin embargo, no se ha podido por problemas de
conexion o de la base de datos.
Accion: Revisar conexiones con la base de datos y que esta se encuentre en operacion.
