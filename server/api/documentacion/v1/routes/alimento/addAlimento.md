# Ruta de 'alimentos agregar'

## Ruta relativa './api/alimento/addAlimento'

## Tipo de peticion 'POST'

### >>> Objetivo <<<

-> Esta ruta tiene como objetivo agregar alimentos por parte de una cafeteria.

### >>> Valores de entrada <<<

-> Esta ruta acepta los siguientes valores para agregar.

{
idCafeteria : req.session.idUsuario,
nombre : "varchar",
descripcion: "varchar",
tiempopreparacion : integer, //Expresa los minutos que tarda
costo: integer,
disponibilidad:integer,
}

-> El id de la cafeteria se obtiene de forma nata y requiere por tanto de un usuario de una cafeteria ingresando, el tiempo de preparacion es un entero que expresa los minutos aproximados que tardara el producto en estar listo, el costo se espera expresado en entero, y la disponibilidad la catidad aproximada de productos disponibles.

### >>> Proceso <<<

-> Despues de obtener la informacion se inicia una transaccion y se hacen las querys necesarias, para terminar la transaccion en caso de que no haya errores y retorna los datos del producto.

### >>> Valores de salida <<<

-> En los valores '200 OK' de esta ruta se retorna un objeto json.

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

->

### >>> Respuesta de error <<<

{
estado : 404
message : 'No se ha podido obtener el alimento'
}
Significado: No se encontro en la base de datos ningun alimento con el id dado.
Acción: Revisar el id dado y en caso de estar seguro estar registrado consultar al gestor de la base de datos.

{
estado : 500
message : 'Ocurrio un error inesperado en el servidor'
}
Significado: Hubo error creando la consulta a la base de datos.
Acción: Consultar al desarrollador o al gestor de la base de datos.

{
estado : 400
message : 'No se ha podido agregar el alimento'
}
Significado: Hubo errores insertando el alimento o no se encontro.
Acción: Revisar los datos ingresados en caso de continuar comunicarse con el desarrollador o gestor de la base de datos.

{
estado : 500
message : 'No se ha podido agregar el alimento'
}
Significado: Ocurrio un error en la insercion de la base de datos.
Acción: Revisar los datos y en caso de estar seguro estar registrado consultar al gestor de la base de datos.



