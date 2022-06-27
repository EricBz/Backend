const express = require("express")


const Contenedor = require("./cld2.js")
let Productos1 = new Contenedor()

const app = express()
const PORT = 8080
const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))

app.use(express.urlencoded({extended: true}))

const routerProductos = express.Router()
app.use('/api/productos', routerProductos)
//view va ser el directorio de plantillas
app.set('views', './views');
app.set('view engine', 'pug');

app.use(express.static('public'));


routerProductos.get("/", (req, res) => {
  res.render("tabla.pug", {Prods: Productos1.getAll()})
})

routerProductos.get("/ingresar", (req, res) => {
  res.render("formulario.pug")
})

routerProductos.post("/ingresado", (req, res) => {  
  console.log(req.body)
  Productos1.save(req.body)
  res.render("formulario.pug")
})

routerProductos.use('/', express.static('public'))

// node server.js    