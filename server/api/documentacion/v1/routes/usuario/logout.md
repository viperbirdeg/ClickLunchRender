# Ruta de usuario logout #
## Ruta relativa './api/usuario/logout' ##

### >> Objetivo << ### 
-> La ruta logout tiene como objetivo cerrar la sesión de un usuario autenticado en el sistema.

### >> Valores de entrada << ###

### >> Proceso << ###
-> La ruta simplemente destruye la sesión actual del usuario, lo que equivale a cerrar la sesión.

### >> Valores de salida << ###
-> La ruta devuelve un mensaje indicando que la sesión se ha cerrado correctamente.

json
Copy code
{
    "message": "Sesión finalizada de manera correcta"
}