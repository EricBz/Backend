const express = require("express")
const session = require("express-session")
const MongoStore = require("connect-mongo")
const userService = require("./model.js")
const mongoose = require("mongoose")
const handlebars = require("express-handlebars")
const cookieParser = require("cookie-parser")
//MongoStore, conexion para session de mongo.
const app = express()
const PORT = 8080

app.engine('handlebars', handlebars.engine());
app.set('views', './views');
app.set('view engine', 'handlebars');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('./public'))
app.use(cookieParser())

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))
const connection = mongoose.connect('mongodb+srv://eric:123@cluster0.dgvqjit.mongodb.net/?retryWrites=true&w=majority');
app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://eric:123@cluster0.dgvqjit.mongodb.net/?retryWrites=true&w=majority',
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 600
    }),
    secret: "secreto",
    resave: false,
    saveUninitialized: false
}))

app.get("/", (req, res) => {
    console.log(req.body)
    res.render("login")
})

app.get('/register', (req, res) => {
    if (req.session.user) return res.redirect('/');
    return res.render('register');
})


app.post('/registered', async (req, res) => {
    const { name, email, password } = req.body;
    console.log(req.body)
    if (!name || !email || !password) return res.status(400).send({ error: "Incomplete values" })
    let user = {
        name,
        email,
        password
    }
    console.log(user, "ya tomado")
    try {
        await userService.create(user);
        res.redirect("/")
    } catch (error) {
        res.status(500).send({ error: error })
    }
})

app.post('/login', async (req, res) => {
    console.log(req.body);
    try {
        const { email, password } = req.body;
        if (!email || !password) return res.status(400).send({ error: "Incomplete values" })
        const user = await userService.findOne({ $and: [{ email: email }, { password: password }] });
        if (!user) return res.redirect("/register")
        req.session.user = user;
        console.log(user)
        res.redirect("/home")
    } catch (error) {
        res.status(500).send({ error: error })
    }
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
