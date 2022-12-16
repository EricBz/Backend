import enviarUserRegistrado from "../config/nodemailer.js";
import dotenv from 'dotenv'
dotenv.config();


const getLogin = (req, res) => {
    //   console.log("En login vista ",req.body)
        res.render("login")
    }

const getRegister = (req, res) => {
    if (req.session.user) return res.redirect('/');
    return res.render('register');
}

const postRegistered = async(req,res)=>{
    console.log("Datos de arch subido", req.file)
    enviarUserRegistrado(req.user)
    console.log(req.user);
    res.redirect("/")
}

const postLogin = async(req,res)=>{
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
}

const getLogout = async (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send("error");
        res.redirect("/")
    })
}

const getHome = async (req, res) => {
    console.log(req.session.user)
    if (!req.session.user) return res.redirect("/")
    return res.render("home",{ user: req.session.user})
}

const getUser = async(req, res) => {
    return res.send(req.session.user)
}

const getCompraRalizada = async(req, res) => {
    return res.render("compraRealizada",{ user:await req.session.user })
}

const ingresoProductos = async(req, res) => {
    return res.render("homeAdm")
}

const rutaNoHabilitada = async(req, res)=>{
    res.status(404).json({"error": "Ruta no habilitada"})
  }

export { getLogin, getRegister, postRegistered, postLogin, getLogout, getHome, getUser, getCompraRalizada,ingresoProductos ,rutaNoHabilitada }    