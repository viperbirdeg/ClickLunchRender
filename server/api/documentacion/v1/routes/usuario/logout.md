# Ruta de 'usuario log out' #

## Ruta relativa './api/usuario/logout' ##

## Tipo de peticion 'POST'

### >>> Objetivo <<< ### 

-> Esta ruta tiene como objetivo eliminar la session creada para evitar que se almacene en un dispositivo indeseado.

### >>> Valores de entrada <<< ###

-> No requiere valores de entrada

### >>> Proceso <<<

-> La session se obtiene y se destruye

### >>> Valores de salida <<<

-> Siempre regresa un estado '200 OK' con un objeto.

  {
    message : 'Sesion finalizada de manera correcta'
  }

### >>> Respuesta de error <<<

-> No hay respuestas de error, en caso de presentarse alguna comunique inmediatamente al desarrollador