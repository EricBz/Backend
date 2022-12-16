import express from "express"
const app = express()
import handlebars from "express-handlebars"
import routerProductos from "./routers/routerProductos.js"
import routerCarrito from "./routers/routerCarrito.js"
import routerVista from "./routers/routerVistas.js"

import session from "express-session"
import MongoStore from "connect-mongo"

const PORT = process.env.PORT || 8080

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

    const server = app.listen(PORT, () => {
        console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
      })
      server.on("error", error => console.log(`Error en servidor ${error}`))


app.engine('handlebars', handlebars.engine());
app.set('views', './views');
app.set('view engine', 'handlebars');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/productos',  routerProductos)
app.use("/api/carrito", routerCarrito)
app.use("/", routerVista)
