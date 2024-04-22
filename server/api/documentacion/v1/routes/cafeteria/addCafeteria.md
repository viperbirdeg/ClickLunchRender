# Ruta de 'añadir cafeteria'

## Ruta relativa './api/cafeteria/addNewCafeteria'

## Tipo de peticion 'POST'

### >>> Objetivo <<<

-> Esta ruta tiene como objetivo añadir un usuario con rol cafeteria.

### >>> Valores de entrada <<<

-> Esta ruta recibe cono objeto json los siguientes parametros.

{
email : 'varchar',
name : 'varchar',
password : 'varchar'
}

->

### >>> Proceso <<<

-> Inicia la transaccion, establece el rol en '1', hace validaciones, hace inserciones, confirma la transaccion, retorna respuesta.

### >>> Valores de salida <<<

-> En los valores '200 OK' de esta ruta se retorna un objeto json.

{
id: id,
nombre : varchar,
email :varchar,
rol : 1 ,
token : varchar
}

-> El unico rol que deberia traer es 1 pues es el unico tipo de rol cafeteria.

### >>> Respuesta de error <<<

{
estado :404
message : 'No se ha encontrado la cafeteria'
}
Significado: Se hizo una busqueda por la cafeteria, pero no se encontro.
Acción: Consultar al desarrollador o gestor de la base de datos.

{
estado :500
message : 'Ocurrio un error inesperado en el servidor'
}
Significado: Se intento la busqueda pero debido a fallos internos, no se completo.
Acción: Verificar el estado del servidor, o cunsultar con el desarrollador.

{
estado :500
message : 'Hubo problema registrando la cafeteria'
}
Significado: Se intento realizar la insercion pero no se pudo completar por problemas internos.
Acción: Revisar la integridad del servidor o consular con el desarrollador.