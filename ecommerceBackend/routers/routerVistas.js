import { Router } from "express";
import {json, urlencoded} from "express"
import express from "express"
import { getLogin, getRegister, postRegistered, postLogin, getLogout, getHome, getUser, getCompraRalizada, rutaNoHabilitada, ingresoProductos } from "../controllers/controllerVista.js"
import handlebars from "express-handlebars"
import session from "express-session"
import MongoStore from "connect-mongo"
import passport from "passport"
import initializePassport from "../config/passportConfig.js"
import multer from "multer"
import  {logger} from "../utils/utilsWinston.js"
import dotenv from 'dotenv'
dotenv.config();

const routerVista = Router()
routerVista.use(json())
routerVista.use(urlencoded({ extended: true }))

routerVista.use(session({
    store: MongoStore.create({
        mongoUrl: process.env.DB,
        mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        ttl: 6000
    }),
    secret: "secreto",
    resave: false,
    saveUninitialized: false
}))


initializePassport();
routerVista.use(passport.initialize());
routerVista.use(passport.session());
routerVista.use(logger())
routerVista.use(express.static("./public"));

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/avatar')
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  })
   
  let upload = multer({ storage: storage })


  const Administrador = process.env.ADM  
function validacion(req, res, next) {
  if (Administrador != req.session.user.email) {
      res.status(404).json({ "error": "Habilitada solo para Administradores" })
  } else {
      next()
  }
}

  routerVista.get("/", getLogin)

  routerVista.get('/register', getRegister)
  
  routerVista.post('/registered', upload.single("avatar"),passport.authenticate('registered',{failureRedirect:'/register'}), postRegistered)
  
  routerVista.post('/login',passport.authenticate('login',{failureRedirect:'/register'}), postLogin)
  
  routerVista.get('/logout', getLogout )
  
  routerVista.get("/home", getHome)
  
  routerVista.get("/user", getUser)
  
  routerVista.get("/compraRealizadaExitosamente", getCompraRalizada)

  routerVista.get("/ingresoproductos", validacion, ingresoProductos)
  
  routerVista.get('*', rutaNoHabilitada)

  export default routerVista