const express = require("express")
const handlebars = require("express-handlebars")
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const Contenedor = require("./cld2.js");
const Mensajes = require("./claseMensaje")


const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);
const Productos1 = new Contenedor();
const mensajes = new Mensajes();

const PORT = 8080
const server = httpServer.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))

app.use(express.static("./public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


//Necesito una ruta de express para que mande el contenido
app.get("/", (req, res) => {
  res.render("index.html")
})

io.on("connection", async (socket) => {
  console.log("Nuevo cliente conectado!")
  //Ni bien se conecta el usuario recibe los productos.
  socket.emit("productos", await Productos1.getAll().then(data => data))

  socket.on('nuevoMensaje', async mensaje => {
    await mensajes.save(mensaje)
    io.sockets.emit('mensajes', await mensajes.getAll().then(data => data));
    mensajes.getAll().then(data => console.log(data))

    //Agrega a la BdD a traves de mos metodos de la clase.
  })
  io.sockets.emit("productos", Productos1.getAll().then(data => data))
  socket.on("ingresar", async prod => {
    await Productos1.save(prod)
  })
})



