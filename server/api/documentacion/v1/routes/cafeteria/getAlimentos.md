# Ruta de 'obtener alimentos'

## Ruta relativa './api/alimento/getAllCafeterias'

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
"id": 3,
"nombre": "Cafeteria de arsenio01",
"email": "Cafeteriadearsenio01@gmail.com",
"rol": "Cafeteria",
"token": "$2b$12$l8rE9FbpBuYh1Tiseq01G.JpgWURdMqwUqw2.oNfk5GoqnQBrRc3."
}
->

### >>> Respuesta de error <<<

{
estado :
message : ''
}
Significado:
Acción:
