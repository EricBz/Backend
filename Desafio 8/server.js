const express = require("express")
const handlebars = require("express-handlebars")
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const Contenedor = require("./cld2.js");

const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const Productos1 = new Contenedor();

const PORT = 8080
const server = httpServer.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))
//Aca toma el sufijo que le pongamos y hace que arranque todo, por eso debe ser el mismo .x
app.engine('hbs',
 handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'main.hbs',
    layoutsDir: __dirname + '/views', //ruta a la plantilla principal
    partialsDir: __dirname + '/views' //ruta a los parciales
  })
);

app.use(express.static("./views"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//Necesito una ruta de express para que mande algo
app.get("/", (req, res) => {
    res.render("main.hbs")
})


const mensajes = [ ]

io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado!")
    //Ni bien se conecta el usuario recibe los productos.
    socket.emit("productos", Productos1.getAll())

    socket.on('nuevoMensaje', mensaje =>{
        mensajes.push(mensaje);
        io.sockets.emit('mensajes', mensajes);
        console.log(mensajes)
      })
      io.sockets.emit("productos", Productos1.getAll())

      socket.on("ingresar", prod => {
        console.log(prod)
        Productos1.save(prod)})
})



