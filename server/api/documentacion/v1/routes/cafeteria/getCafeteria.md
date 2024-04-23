# Ruta de 'obtener cafeteria'

## Ruta relativa './api/cafeteria/getOneCafeteria'

## Tipo de peticion 'GET'

### >>> Objetivo <<<

-> Obtener una cafeteria con base en un email identificador.

### >>> Valores de entrada <<<

->  El valor que obtiene como entrada es el email.

{
 "email" : "varchar" 
}

-> 

### >>> Proceso <<<

-> Obtiene como identificador el email y realiza la busqueda.

### >>> Valores de salida <<<

-> En los valores '200 OK' de esta ruta se retorna un objeto json con la cafeteria.

{
"id": id,
"nombre": "varchar",
"email": "varchar",
"rol": "Cafeteria",
"token": "varchar"
}

-> 

### >>> Respuesta de error <<<

{
estado : 404 
message : 'No se ha encontrado la cafeteria'
}
Significado: No se encontro un usuario con ese indentificador.
Acción: Revisar la integridad de los datos o consultar al desarrollador o gestor de la base de datos.

{
estado : 500 
message : 'Ocurrio un error inesperado en el servidor'
}
Significado: El servidor no realizo la peticion.
Acción: Revisar la integridad del servidor o comunicarse con el desarrollador o gestor de la base de datos.