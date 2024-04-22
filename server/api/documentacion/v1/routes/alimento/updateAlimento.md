# Ruta de 'update alimento'

## Ruta relativa './api/alimento/updateAlimento'

## Tipo de peticion 'PUT'

### >>> Objetivo <<<

-> Se busca actualizar algun alimento que se desee.

### >>> Valores de entrada <<<

-> Aqui se obtienen los campos a actualizar.

{
id : id
nombre : "varchar",
descripcion: "",
tiempopreparacion : integer, //Expresa los minutos que tarda
costo: integer,
}

-> Los campos se actualizan con respecto al id del alimento.

### >>> Proceso <<<

-> Se obtienen los datos y se realiza el query de update y retorna la respuesta.

### >>> Valores de salida <<<

-> En los valores '200 OK' de esta ruta se retorna un objeto json.

{
message : 'Se ha actualizado el alimento'
}

->

### >>> Respuesta de error <<<

{
estado : 404
message : 'No se ha encontrado el alimento a actualizar'
}
Significado: El alimento con ese id no se encontro.
Acción: Revisar que el alimento exista, en caso de que persista contactar con el desarrollador.

{
estado : 500
message : 'Ocurrio un error inesperado en el servidor'
}
Significado: No se pudo completar la peticion debido al servidor.
Acción: Contactar al desarrollador o gestor de la base de datos.
