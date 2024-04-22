# Ruta de 'alimento obtener'

## Ruta relativa './api/alimento/getAlimentos'

## Tipo de peticion 'GET'

### >>> Objetivo <<<

-> Con esta ruta se busca obtener todos los alimentos existentes, a diferencia de la ruta 'getAlimentos' de cafeteria que solo se centra en las de una cafeteria.

### >>> Valores de entrada <<<

-> Esta ruta no tiene valores de entrada .

{
}

->

### >>> Proceso <<<

-> Primero inicia el cliente y hace la peticion y con los datos regresa la respuesta.

### >>> Valores de salida <<<

-> En los valores '200 OK' de esta ruta se retorna una lista de objetos con la siguiente estructura.

{
  id : id
  nombre : varchar
  descripcion : varchar
  tiempo_preparacion : integer
  costo : varchar
  disponibilidad : integer
  estado : boolean
  id_cafeteria : idCafeteria
}

-> El tiempo de preparacion es un entero que expresa los minutos aproximados que tardara el producto en estar listo, el costo se espera expresado en entero, y la disponibilidad la catidad aproximada de productos disponibles.

### >>> Respuesta de error <<<

{
estado : 404
message : 'No se ha podido obtener los alimentos'
}
Significado: La vista no contiene datos de ningun alimento.
Acción: En caso de estar seguro que contiene datos la vista, consultar con el desarrollador o el gestor de la base de datos.

{
estado : 500
message : 'Ocurrio un error inesperado en el servidor'
}
Significado: No se pudo completar la peticion.
Acción: Comunicarse con el desarrollador.

