# Ruta de usuario login

## Ruta relativa './api/usuario/login'

## Tipo de peticion 'POST'

### >> Objetivo <<

-> La ruta login es una ruta que tiene como proposito establecer en la session variables para el inicio automatico y para evitar problemas con los datos.

### >> Valores de entrada <<

-> Dentro de esta ruta se busca obtener dos datos principales mediante un objeto.

    {
        "email" : "varchar",
        "password" : "varchar"
    }

-> Estos dos elementos se utilizaran para validar la session y posteriormente establecerla en variables

### >> Proceso <<

-> Dentro de esta ruta se obtiene un acceso a la base de datos en uso, para comprobar que los datos ingresados son correctos, posteriormente se guardan datos importantes en la session, los cuales son, email y rol para finalizar regresando estos datos y una respuesta de tipo '200 OK'.

### >> Valores de salida <<

-> Esta ruta nos mostrara unos valores de salida en un estado '200 OK'.

    {
        "message": "Ingreso correcto"
    }

-> La clave que retorna se denomina 'message' ya sea que haya un error o no, retornara solo el mensaje, pues la informacion ya se habra guardado.

### >> Respuestas de error <<

    {
        estado : 404
        message : 'Usuarios no registrado'
    }
    Significado: El correo electrónico proporcionado no está registrado en el sistema.
    Acción: Verificar que el correo electrónico ingresado sea el correcto o registrarse en el sistema.

    {
        estado : 401
        message : 'Contraseña incorrecta'
    }
    Significado: La contraseña proporcionada no coincide con la registrada para el usuario.
    Acción: Verificar que la contraseña ingresada sea la correcta o restablecerla si es necesario.

    {
        estado : 500
        message : 'Ocurrió un error inesperado en login',
        error: error
    }
    Significado: Se produjo un error interno durante el proceso de inicio de sesión.
    Acción: Verificar el estado del sistema y comunicarse con el soporte técnico si es necesario.
