# Ruta de 'usuario autenticacion'

## Ruta relativa './api/usuario/authUser'

## Tipo de peticion 'GET'

### >>> Objetivo <<<

-> La ruta auth es una ruta que tiene como proposito revisar que un usuario
se encuentre registrado en la aplicacion web para evitar fallos de sistema.

### >>> Valores de entrada <<<

-> Dentro de esta ruta a diferencia de otras solo se necesita hacer la peticion y los datos se obtendran de la session iniciada.

{
session : session
}

-> Los valores se corroboran y posteriormente se entrega una respuesta.

### >>> Proceso <<<

-> Dentro de esta ruta se obtiene la session que posteriormente se pasa a travez de una query hacia la base de datos y revisa entre otras cosas el rol que estando logueado devolvera 0 o 1.

### >>> Valores de salida <<<

-> En los valores '200 OK' de esta ruta se retorna un objeto json

{
idUsuario : id,
email : "email",
token : "token",
rol : integer
}

-> _!El valor positivo es 1 o 2 el resto no corresponde a un rol valido_

### >>> Respuesta de error <<<

{
estado : 401
message : 'Error on data'
rol : 999
}
Significado: Los datos ingresados son incorrectos y no se a podido corroborar el usuario.
Acción: Verificar los datos ingresados y reintentar posteriormente.
{
  estado : 500
  message : 'Error on server'
  rol : 999
  error: mensaje de error
}
Significado: Hubo problema en el servidor al momenot de corroborar los datos.
Acción: Verificar que los datos esten bien, en caso de susitarse con datos corroborador contactar con el desarrollador.
