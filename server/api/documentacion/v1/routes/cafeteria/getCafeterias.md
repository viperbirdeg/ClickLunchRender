# Ruta de 'obtener cafeterias'

## Ruta relativa './api/cafeteria/getAllCafeterias'

## Tipo de peticion 'GET'

### >>> Objetivo <<<

-> Obtener las totalidad de las cafeterias

### >>> Valores de entrada <<<

-> Esta ruta no tiene valores de entrada

{

}

->

### >>> Proceso <<<

-> Despues de realizar la conexion, realiza la busqueda y finaliza regresando los datos.

### >>> Valores de salida <<<

-> En los valores '200 OK' de esta ruta se retorna un arreglo de objetos json con la estructura siguiente.

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
estado : 400
message : 'Ocurrio un error inesperado en el servidor'
}
Significado : El servidor rechazo la peticion.
Acción: Revisar la integridad del servidor y basse de datos.
