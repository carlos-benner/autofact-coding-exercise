# Autofact coding exercise

## Despliegue

Para compilar y desplegar el projecto se debe tener instalado docker y docker-compose en la maquina.

Use `docker-compose up` para desplegar la DB mongo, la API y la aplicacion front en 3 diferentes containers. La aplicacion quedara expuesta en el puerto $PORT declarado en el `.env` file.

Ejemplo de las variables aceptadas:

`
#DB ENVIRONMENT VARIABLES
DB_ROOT_USER=rootuser
DB_ROOT_PASSWORD=securep@ssword1
DB_USER=normaluser
DB_PASSWORD=password1
DB_NAME=development

#API PORT FOR PROFILE dev-api
API_DEV_PORT=3030

#FRONTEND
APP_PORT=80
`

$DB_NAME se creara con un usuario especifico y agregara las preguntas segun lo indicado en `docker-entrypoint-initdb.d/init-mongo.sh`. Se crea la coleccion `questions` y `users`.

## Comentarios/Mejoras sugeridas

El tiempo es insuficiente para realizar el ejercicio completo por lo que se ha priorizado la creacion del projecto de manera BOTTOM-UP, en lo posible.

La BD y la api necesaria para su acceso fueron creadas y son accesibles a traves de la aplicacion front. Los endpoints disponibles son los siguientes:

-   GET http://localhost/api/users/ (no disponible a traves del front)
-   POST http://localhost/api/users/ (durante registro de nuevo usuario en http://localhost/register )
-   DELETE http://localhost/api/users/:id (no disponible a traves del front)
-   GET http://localhost/api/users/:id (no disponible a traves del front)

Se pueden crear usuarios a traves de la url de registro http://localhost/register y verificar las credenciales en la pag de login http://localhost/login2

Un acercamiento a la implementacion del formulario de preguntas se puede encontrar en http://localhost/forms/1 . Las preguntas y sus opciones son recibidas desde la BD.

En terminos de seguridad, no alcance a implementar un sistema de login funcional en el tiempo. Podran ver que empece a implementar Passport para express pero la implementacion quedo inconclusa.

Se han separado las aplicaciones en tres capas para aumentar la seguridad, donde cada contenedor tiene acceso solo a la capa anterior. Idealmente estas aplicaciones estarian hosteadas en servidores distintos con solo acceso dentro de la red local excepto por el front que debiera estar en un server "publico".

No alcance a implementar un endpoint para guardar los resultados de las preguntas. Para cumplir los requerimientos del ejercicio, se debe guardar las respuestas de cada pregunta en una coleccion/tabla nueva y debe incluir como minimo los datos UserId, QuestionId, AnswerId (otra table en DB relacional, o incluida en el objeto si es no relacional), y un timestamp para identificar el momento en que el usuario ha respondido. Se debe identificar el momento de respuesta para poder completar el requerimiento de mostrar la pregunta solo una vez por mes.

Falta todo lo que tenga que ver con la parte visual, incluyendo el grafico con los agregados de las preguntas para el usuario administrador. Para implementar esto se debe utilizar algun tipo de libreria js y generar algun endpoint que retorne el agregado.
