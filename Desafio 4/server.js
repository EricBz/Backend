const express = require("express")

const Contenedor = require("./desafio2.js")
let Productos1 = new Contenedor()

const app = express()
const PORT = 8080
const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))

const routerProductos = express.Router()
app.use('/api/productos', routerProductos)
//Para que tome json por url sin problemas. Ahora en vez de  usar app usare router.
routerProductos.use(express.json())
routerProductos.use(express.urlencoded({ extended: true }))


 routerProductos.get('/bienvenido', (req, res) => {
  res.send(`<h1 style='color:blue;'>Bienvenidos a Express</h1>`)
})

 routerProductos.get("/", (req, res) => {
  return res.json( Productos1.getAll())})

routerProductos.get("/:id", async (req, res) => {
  let ID = req.params.id
  console.log(ID)
  res.json(Productos1.getById(ID))})

routerProductos.post("/",  (req, res) => {
 Productos1.save(req.body)
 //   res.send(`<h1 style='color:red;'>Agregado. Id:</h1>`)
    return  res.send(Productos1.getAll())
})

routerProductos.delete("/:id", (req, res) => {
  let ID = req.params.id
  console.log("Delete recibido", ID)
  res.json(Productos1.deleteById(ID))
})

routerProductos.put("/:id" , async (req, res) => {
let prod = req.body
console.log(prod)
let ID = req.params.id;
return res.json(Productos1.update(ID, prod));
})

 routerProductos.use('/', express.static('public'))

 //Parar el server con ctrl + c.      node server.js