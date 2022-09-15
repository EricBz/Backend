const express = require("express")
const router = express.Router();
const routerRandom = require("./routerRandom")
const session = require("express-session")
const MongoStore = require("connect-mongo")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const handlebars = require("express-handlebars")
const passport = require("passport")
const initializePassport = require("./config/passportConfig")
const parseArgs = require("minimist")

const args = parseArgs(process.argv.slice(2))

const app = express()
const PORT = args._[0] || 8080
dotenv.config()

app.engine('handlebars', handlebars.engine());
app.set('views', './views');
app.set('view engine', 'handlebars');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const obj = {
    "Sistema operativo": process.platform,
    "version node": process.version,
    "Memoria total usada": process.memoryUsage(),
    "Path de ejecucion": process.cwd(),
    "Process Id": process.pid,
    "Carpeta del proyecto": process.title
}

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))
const connection = mongoose.connect(process.env.URL);

app.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.URL,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 600
    }),
    // cookie:{expires:1000},
    secret: "secreto",
    resave: false,
    saveUninitialized: false
}))
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/randoms", routerRandom)

app.get("/", (req, res) => {
    console.log(req.body)
    res.render("login")
})

app.get('/register', (req, res) => {
    if (req.session.user) return res.redirect('/');
    return res.render('register');
})

app.post('/registered',passport.authenticate('registered',{failureRedirect:'/register'}),async(req,res)=>{
    console.log(req.user);
    res.redirect("/")
})

app.post('/login',passport.authenticate('login',{failureRedirect:'/register'}),async(req,res)=>{
    console.log("en ruta login", req.body)
    req.session.user ={
        email:req.user.email,
        password:req.user.password,
        id:req.user._id
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



//DEL DESAFIO ACTUAL VARIABLES GLOBALES
app.get("/detalles", (req, res) => {
    return res.send(obj)
})
//Tiene que estar al final para tomar las rutas existentes. Sino luego las desconoce.

app.get('*', async (req, res) => {
    res.status(404).json({ "error": "Ruta no habilitada" })
})