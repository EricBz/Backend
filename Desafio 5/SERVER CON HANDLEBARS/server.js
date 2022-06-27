const express = require("express")
const handlebars = require("express-handlebars")

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

app.engine('handlebars',
 handlebars.engine({
    extname: '.handlebars',
    defaultLayout: 'index.handlebars',
    layoutsDir: __dirname + '/views/layouts/', //ruta a la plantilla principal
    partialsDir: __dirname + '/views/partials/' //ruta a los parciales
  })
);

app.use(express.static('public'));

app.set('view engine', 'handlebars');
app.set('views', './views');


routerProductos.get("/", (req, res) => {
  res.render("main", {Prods: Productos1.getAll(), Mostrar:true})
})

routerProductos.get("/ingresar", (req, res) => {
  res.render("main",  {Ingresar: true, Mostrar:false})
})

routerProductos.post("/ingresado", (req, res) => {  
  console.log(req.body)
  Productos1.save(req.body)
  res.render("main",  {Ingresar: true, Mostrar:false})
})

routerProductos.use('/', express.static('public'))

// node server.js    