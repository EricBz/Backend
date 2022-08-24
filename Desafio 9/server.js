import express from "express"
import Contenedor from "./contenedores/contenedor.js"
import ContenedorMensaje from "./contenedores/contenedorMensajes.js"
import { createServer } from "http";
import { Server } from "socket.io";

const app = express()
const httpServer = createServer(app);
const io = new Server(httpServer);

const productos = new Contenedor()
const mensajes = new ContenedorMensaje()

app.use(express.static("./public"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/api/productos-test', (req, res) => {
    res.send(productos.getAll())
 })

app.get("/", (req, res) => {
    res.sendFile("index.html")
})

app.get("/normalizados", async (req, res) => {
    res.send( await mensajes.normalizr())
})


io.on("connection", async (socket) => {
    console.log("Nuevo cliente conectado!")
 //   console.log(await mensajes.getAllFs())
  socket.emit("mensajes", await mensajes.getAllFs().then(data => data))
  
    socket.on('nuevoMensaje', async mensaje => {
      await mensajes.saveFs(mensaje)
      io.sockets.emit('mensajes', await mensajes.getAllFs().then(data => data));
 //     mensajes.getAllFs().then(data => console.log(data))
    })
})

const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))