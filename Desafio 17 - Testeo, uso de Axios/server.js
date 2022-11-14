import express from "express"
const app = express()
import handlebars from "express-handlebars"
import routerProductos from "./routers/routerProductos.js"
import routerCarrito from "./routers/routerCarrito.js"
import routerAxios from "./axios/routesAxios.js"
import routerVista from "./routers/routerVistas.js"

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

app.engine('handlebars', handlebars.engine());
app.set('views', './views');
app.set('view engine', 'handlebars');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/productos',  routerProductos)
app.use("/api/carrito", routerCarrito)
app.use("/datos/axios", routerAxios)
app.use("/", routerVista)
