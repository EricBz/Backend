import express from "express"
const app = express()
import handlebars from "express-handlebars"
import session from "express-session"
import MongoStore from "connect-mongo"
import passport from "passport"
import initializePassport from "./config/passportConfig.js"
import multer from "multer"
import cluster from "cluster"
import os from "os"
import  {logger} from "./utils/utilsWinston.js"
import routerProductos from "./routers/routerProductos.js"
import routerCarrito from "./routers/routerCarrito.js"
import { getLogin, getRegister, postRegistered, postLogin, getLogout, getHome, getUser, getCompraRalizada, rutaNoHabilitada } from "./controllers/controllerVista.js"

//const cantCPUs = os.cpus().length
const PORT = process.env.PORT || 8080
/*if(cluster.isPrimary){

    for(let i=0; i<cantCPUs;i++){
    cluster.fork()
    }

    cluster.on("exit",worker=>{
  
        cluster.fork()
    })
    }
    else{*/

    const server = app.listen(PORT, () => {
        console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
      })
      server.on("error", error => console.log(`Error en servidor ${error}`))
//    }

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

//rutas de vista
app.get("/", getLogin)

app.get('/register', getRegister)

app.post('/registered', upload.single("avatar"),passport.authenticate('registered',{failureRedirect:'/register'}), postRegistered)

app.post('/login',passport.authenticate('login',{failureRedirect:'/register'}), postLogin)

app.get('/logout', getLogout )

app.get("/home", getHome)

app.get("/user", getUser)

app.get("/compraRealizadaExitosamente", getCompraRalizada)

app.get('*', rutaNoHabilitada)