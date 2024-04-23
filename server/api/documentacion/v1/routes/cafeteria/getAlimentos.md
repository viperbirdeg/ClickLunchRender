# Ruta de 'obtener alimentos'

## Ruta relativa './api/alimento/getAlimentosCafeteria'

## Tipo de peticion 'GET'

### >>> Objetivo <<<

-> Obtener las totalidad de las cafeterias

### >>> Valores de entrada <<<

-> Esta ruta tiene de valores de entrada un email.

{
  "email" : "varchar"
}

->

### >>> Proceso <<<

-> Despues de realizar la conexion, realiza la busqueda y finaliza regresando los datos.

### >>> Valores de salida <<<

-> En los valores '200 OK' de esta ruta se retorna un arreglo de objetos json con la estructura siguiente.

{
id : id,
nombre : 'varchar',
descripcion : 'varchar',
tiempo_preparacion : integer,
costo : integer,
disponibilidad : integer,
estado : boolean,
id_cafeteria : id 
}
->

### >>> Respuesta de error <<<

{
estado : 404
message : ' No se ha encontrado la cafeteria'
}
Significado: El email no existe dentro de la base de datos.
Acción: Revisar la integridad de los datos, en caso de persistencia, comunicarse con el desarrollador o el gestor de la base de datos.

{
estado: 500 
message: 'Ocurrio un error inesperado en el servidor'
}
Significado: El servidor no pudo realizar la peticion de consulta a la base de datos.
Accion: Revisar la integridad del servidor, en caso de persistencia, comunicarse con el desarrollador o gestor de la base de datos.

{
estado: 404 
message: 'Esta cafeteria no ha registrado alimentos'
}
Significado: La cafeteria no tieene registrados aliementos.
Accion: Revisar la integridad de los datos, en caso de persistencia, comunicarse con el desarrollador o gestor de la base de datos.

