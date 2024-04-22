# Ruta de usuario register #
## Ruta relativa './api/usuario/register' ##
## Tipo de peticion 'POST'

###  >> Objetivo << ####
->  La ruta register es una ruta que tiene como proposito registrar a un usuario nuevo 
    dentro de la base de datos.

### >> Valores de entrada << ###
->  Dentro de esta ruta se busca obtener tres datos principales mediante un objeto.

    {
        "email" : "varchar",
        "name" : "varchar",
        "password" : "varchar"
    }

->  Estos tres elementos deberian ser pasados a travez de una expresion regular (regex) 
    que define a cada una con una forma especifica ["Revisar regex.md para mas informacion"].

### >> Proceso << ###
->  Dentro de esta ruta se obtiene un acceso a la base de datos en uso, para iniciar una
    nueva transaccion que en caso de haber un problema se realizara un 'rollback' y en caso
    de tener exito un 'commit'. Se utiliza bcrypt para crear una contraseña con un hash, 
    y se realizan dos inserciones la contraseña y posteriormente los datos del usuario para
    finalizar regresando estos datos y una respuesta de tipo '200 OK'.

### >> Valores de salida << ###
->  Esta ruta nos mostrara unos valores de salida en un estado '200 OK'.

    {
        "message": {
            "id":integer,
            "nombre": "varchar",
            "saldo": 0,
            "email": "varchar",
            "token": "varchar",
            "rol": "varchar"
        }   
    }
    
->  La clave que retorna se denomina 'message' ya sea que haya un error o no, retornara 
    esta; los elementos que contiene en un caso '200 OK' seran el nombre que se introdujo;
    el saldo, que por defecto se generara un saldo 0 para todos los usuarios; el correo que 
    se introdujo; un token ya con el hash realizado; y finalmente un rol, que por defecto 
    retorna un rol de tipo 0 denominado 'Cliente'.

### >> Respuestas de error << ###
->  Dentro de esta ruta se utiliza una funcion interna para realizar la busqueda posterior 
    a la insercion, por lo tango tiene dos tipos de respuesta, las respuestas relacionadas
    a la insercion y las respuestas relacionadas a la busqueda.
    
    <-Relacionadas a la insercion->
        {
            estado : 409
            message : 'Usuario ya registrado'
        }
        Significado: El correo ingresado en el formulario ya a sido registrado dentro de la 
            base de datos.
        Accion: Debera ingresarse un correo electronico diferente.

        {
            estado : 500
            message : 'Hubo problema registrando al usuario'
        }
        Significado: Los datos de ingreso se intentaron ingresar en la base de datos sin exito,
            podria deberse a problemas con las bases de datos o problemas con los datos, como 
            que el tipo de datos sean incorrectos.
        Accion: Revisar conexiones con la base de datos y que esta se encuentre en operacion,
            revisar los datos de insercion.

    <-Relacionados a la busqueda->
        {
            estado : 404
            message : 'Hubo problemas encontrando el usuario'
        }
        Significado: El usuario se ingreso correctamente, pero al momento de hacer la busqueda 
            la cantidad de columnas que se retornan como afectadas es nula.
        Accion: Revisar los datos de ingreso, en caso de estar seguro que los datos son correctos
            comunicarse con el creador de la v1 'Hi-Stern Victor Perez'.

        {
            estado : 500
            message : 'Ocurrio un error inesperado en el servidor'
        }
        Significado: Los datos se intentaron buscar, sin embargo, no se ha podido por problemas de
            conexion o de la base de datos.
        Accion: Revisar conexiones con la base de datos y que esta se encuentre en operacion.