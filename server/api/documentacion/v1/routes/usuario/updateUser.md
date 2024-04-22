# Ruta de 'usuario update'

## Ruta relativa './api/usuario/updateUser'

## Tipo de peticion 'PUT'

### >>> Objetivo <<<

-> Esta ruta tiene como objetivo actualizar los datos de los usuarios que lo deseen o requieran

### >>> Valores de entrada <<<

-> Toma como valores de entrada solo los datos que va a actualizar

{
"email" : "varchar",
"name" : "varchar",
"password" : "varchar"
}

### >>> Proceso <<<

-> Primero es necesario verificar los datos ingresados que sean correctos, posteriormente pasa a la fase de actualizacion

### >>> Valores de salida <<<

-> En un estado de respuesta '200 OK' el valor regresado sera.

{
message: 'Cambio realizado de manera correcta'
}

### >>> Respuesta de error <<<

{
estado : 500
message : 'Hubo problema registrando al usuario'
}
Significado: El servidor a tenido algun problema al momento de actualizar la informacion
Acción: Contactar con el dessarrollador.
