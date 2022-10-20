import express from "express"
const app = express()
import { productosDao, carritosDao } from "./daos/index.js"
import handlebars from "express-handlebars"
import session from "express-session"
import MongoStore from "connect-mongo"
//import userService from "./modelUser.js" ya no es necesario ahora lo hace desde passportconfig, comp con bdd
import passport from "passport"
import initializePassport from "./config/passportConfig.js"
import multer from "multer"
import cluster from "cluster"
import os from "os"
import  {logger} from "./utils/utilsWinston.js"

let Productos = new productosDao()
let Carritos = new carritosDao()

const cantCPUs = os.cpus().length
const PORT = process.env.PORT || 8080
if(cluster.isPrimary){
    console.log("Proceso primario: "+process.pid)
    //Generara tantos procesos hijos como cpus tenga
    for(let i=0; i<cantCPUs;i++){
    cluster.fork()
    }
    //cluster.on("message", message=>{console.log(message)})
    cluster.on("exit",worker=>{
        console.log("El proceso hijo "+worker.process.pid+" murio")
        //Como el proceso hijos anterior ya hizo su trabajo levanto otro en la siguiente linea
        cluster.fork()
    })
    }
    else{
    console.log("Worker hijo con pid: "+process.pid)
    const server = app.listen(PORT, () => {
        console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
      })
      server.on("error", error => console.log(`Error en servidor ${error}`))
    }

app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.DB,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 6000
    }),
    secret: "secreto",
    resave: false,
    saveUninitialized: false
}))


app.engine('handlebars', handlebars.engine());
app.set('views', './views');
app.set('view engine', 'handlebars');

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

initializePassport();
app.use(passport.initialize());
app.use(passport.session());
app.use(logger())
app.use(express.static("./public"));

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/avatar')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  })
   
  let upload = multer({ storage: storage })


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

//rutas de vista
app.get("/", (req, res) => {
//   console.log("En login vista ",req.body)
    res.render("login")
})

app.get('/register', (req, res) => {
    if (req.session.user) return res.redirect('/');
    return res.render('register');
})


app.post('/registered', upload.single("avatar"),passport.authenticate('registered',{failureRedirect:'/register'}),async(req,res)=>{
    console.log("Datos de arch subido", req.file)
    console.log(req.user);
    res.redirect("/")
})

app.post('/login',passport.authenticate('login',{failureRedirect:'/register'}),async(req,res)=>{
    console.log("en ruta login", req.body)
    req.session.user ={
        email:req.user.email,
        edad:req.user.edad,
        direccion:req.user.direccion,
        telefono:req.user.telefono,
        password:req.user.password,
        id:req.user._id,
        avatar: req.user.avatar
    }
    res.redirect("/home")
})

app.get('/logout', async (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send("error");
        res.redirect("/")
    })
})

app.get("/home", async (req, res) => {
    console.log(req.session.user)
    if (!req.session.user) return res.redirect("/")
    return res.render("home",{ user:await req.session.user })
})

app.get("/pruebas", async (req, res) => {
    res.render("tabla")
})

app.get("/user", async(req, res) => {
    return res.send(req.session.user)
})

app.get("/compraRealizadaExitosamente", async(req, res) => {
    return res.render("compraRealizada",{ user:await req.session.user })
})

app.get('*',async(req, res)=>{
    res.status(404).json({"error": "Ruta no habilitada"})
  })