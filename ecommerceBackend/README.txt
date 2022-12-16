Para poder utilizar cada ruta, como tambien la vista hay que loguearse
(en caso de no estar registrado se redireccionará hacia la página de registro),
el admin esta definido en el archivo .env, si coincide con el usuario
ingresado se podran utilizar ademas de las rutas get tambien las que permiten
modificar, borrar o actualizar los productos. En caso de ser adm dando click
en "Ingreso de productos/Adm" aparecerá una página donde a través de un formulario
podrás hacerlo, si no lo sos el ingreso no será accesible.
Para trabajar con thunder o postman se recomienda evitar el uso de adm o simplemente
dejarlo en "true" por defecto.
En caso de que no exista el usuario o contenga algun error sera redirigido a 
la pagina de registro.
El front esta desarrollado de manera muy escueta para los fines practicos solo
con handlebars y javascript puro.
Al entrar y seleccionar un procducto este se acumula en conjunto con los otros hasta
que demos click en comprar, en ese punto nos derivara a otra pagina con algunos datos
y se enviara un mail al adm con los datos de la compra que tambien quedaran guardados 
en la base de datos.
Al registrarse los datos del usuario seran guardados en la base de datos y tambien se enviara
esa informacion al mail predefinido (el responsable, para los fines se uso una cuenta aleatoria
con Ethereal email).
La persistencia esta hecha en Mongo Atlas como base de datos, tambien hay un esbozo con archivo
pero solo es de manera inicial para realizar pruebas de uso, la funcionalidad completa esta
pensada para trabajarse con Mongo.

Para iniciar                            npm run dev         en terminal

Rutas
localhost:8080/                          vista
localhost:8080/api/productos             productos
localhost:8080/api/carrito               carritos

Algunas herramientas usadas:
Express, Passport, Nodemailer, Bcrypt, MongoDb, Handlbars, Nodemon, Winston, Multer.

Los datos que pueden usarse para vulnerar nuestro sistema están en un archivo .env que,
naturalmente, no esta incluido acá, pero puede suplantarse con otro que contenga nuestros
datos.