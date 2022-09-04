const express = require("express")
const session = require("express-session")
const MongoStore = require("connect-mongo")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const handlebars = require("express-handlebars")
const passport = require("passport")
const initializePassport = require("./config/passportConfig")

//MongoStore, conexion para session de mongo.
const app = express()
const PORT = 8080
dotenv.config()

app.engine('handlebars', handlebars.engine());
app.set('views', './views');
app.set('view engine', 'handlebars');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))

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

app.get('*', async (req, res) => {
    res.status(404).json({ "error": "Ruta no habilitada" })
})
