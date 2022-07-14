const express = require("express")
const app = express()
const routerProductos = require('./Routers/routerProductos');
const routerCarrito = require("./Routers/routerCarrito")
//const handlebars = require("express-handlebars")

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))

//const routerProductos = express.Router()
app.use('/api/productos',  routerProductos)
app.use("/api/carrito", routerCarrito)

app.use(express.static("./views"));

app.get('*',async(req, res)=>{
  res.status(404).json({"error": "Ruta no habilitada"})
})

routerProductos.use(express.json())
routerProductos.use(express.urlencoded({ extended: true }))
routerCarrito.use(express.json())
routerCarrito.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/*
app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: 'main.hbs',
    layoutsDir: __dirname + "/views",
    partialsDir: __dirname + "/views",
  })
)

app.set("views", "./views");
app.set("views engine", "hbs");
*/