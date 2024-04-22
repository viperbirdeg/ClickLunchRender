# Ruta de 'obtener comentarios'

## Ruta relativa './api/alimento/getComentarios'

## Tipo de peticion 'GET'

### >>> Objetivo <<<

-> Esta ruta tiene como objetivo obtener los comentarios de un producto.

### >>> Valores de entrada <<<

-> El unico valor que recibe es un identificador de el alimento.

{
  idAlimento = integer;
}

-> 

### >>> Proceso <<<

-> Despues de hacer la conexion y obtener los datos se  reliza la peticion y finaliza retornando la respuesta.

### >>> Valores de salida <<<

-> En los valores '200 OK' de esta ruta se retorna una lista objetos json.

{
  id : id
  puntuacion : integer 1-5
  comentario : varchar
  estado : boolean
  id_alimento : idalimento
}

-> La puntuacion es un numero entero entre 1 y 5 esperando que se reseñe como estrellas, el estado representa si esta activo o no. 

### >>> Respuesta de error <<<

{
estado : 404
message : 'No se ha podido obtener los comentarios'
}
Significado: No hay comentarios disponibles.
Acción: Revisar que existan, en caso que si existan consultar al desarrollador o gestor de base de datos.