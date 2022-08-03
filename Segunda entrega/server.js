import express from "express"
const app = express()
import { productosDao, carritosDao } from "./daos/index.js"

let Productos = new productosDao()
let Carritos = new carritosDao()


const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
  console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))

const routerProductos = express.Router()
const routerCarrito = express.Router()
routerProductos.use(express.json())
routerProductos.use(express.urlencoded({ extended: true }))
routerCarrito.use(express.json())
routerCarrito.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/productos',  routerProductos)
app.use("/api/carrito", routerCarrito)

app.use(express.static("./views"));

app.get('*',async(req, res)=>{
  res.status(404).json({"error": "Ruta no habilitada"})
})



const Administrador = true

function validacion(req,res,next){
    if(!Administrador){
        res.status(404).json({"error": "Habilitada solo para Administradores"})
    } else {
        next()
    }
}


//Ruta productos
routerProductos.get("/", async (req, res) => {

return res.send(await Productos.getAll())
})
//a.
routerProductos.get("/:id",validacion ,async (req, res) => {
    let ID = req.params.id
    console.log(ID)
    Productos.getById(ID).then(data => console.log(data))
    res.json(await Productos.getById(ID).then(data => data))

})
//d
routerProductos.delete("/:id",validacion, async (req, res) => {
    let ID = req.params.id
    console.log("Delete recibido", ID)
 //   Productos.deleteById(ID).then(data => console.log(data))
    res.json( await Productos.deleteById(ID).then(data => data))
})
//c
routerProductos.put("/:id", validacion, async (req, res) => {
    let prod = req.body
    console.log(prod)
    let ID = req.params.id;
    console.log(ID)
    return res.json(await Productos.update(ID, prod));
})
//b
routerProductos.post("/", validacion, async (req, res) => {
    console.log(req.body)
    await Productos.save(req.body)
       return  res.send(await Productos.getAll())
})

routerProductos.delete("/", validacion, async (req, res) => {
       return  res.send(await Productos.delete())
})

 //Ruta carritos
 routerCarrito.get("/", async (req, res) => {
    res.send(await Carritos.getAll())
 })  

 routerCarrito.post("/", async (req, res) => {
    console.log(req.body)
    await Carritos.save(req.body)
       return  res.send(await Carritos.getAll())
})

routerCarrito.get("/:id", async (req, res) => {
    let ID = req.params.id
    console.log(ID)
    Carritos.getById(ID).then(data => console.log(data))
    res.json(await Carritos.getById(ID).then(data => data))

})
