import { Router } from "express";
import { getProduct, getIdProduct, deteleIdProduct, putProduct, postProduct, deleteProduct} from "../controllers/controllersProductos.js";
import {json, urlencoded} from "express"
import axios from "axios";
//Para validar adm
import dotenv from 'dotenv'
dotenv.config();

const routerProductos = Router()
routerProductos.use(json())
routerProductos.use(urlencoded({ extended: true }))

const Administrador = process.env.ADM
/*
FUNCION INICIAL DE MODELO DE VALIDACION ADM SIN USO DE DEL MAIL
const Administrador = true
function validacion(req, res, next) {
    if (!Administrador) {
        res.status(404).json({ "error": "Habilitada solo para Administradores" })
    } else {
        next()
    }
}*/
function validacion(req, res, next) {
    if(!req.session.user) { res.status(404).json({ "error": "Por favor registrece o logeese" }) } else {
    if (Administrador != req.session.user.email) {
        res.status(404).json({ "error": "Habilitada solo para Administradores" })
    } else {
        next()
    }}
}

routerProductos.get("/", getProduct)
//a.
routerProductos.get("/:id", getIdProduct)
//d
routerProductos.delete("/:id", validacion, deteleIdProduct)
//c
routerProductos.put("/:id", validacion, putProduct)
//b
routerProductos.post("/", validacion, postProduct)

routerProductos.delete("/", validacion, deleteProduct)

routerProductos.get("/ver/pruebas", async (req, res) => {
    console.log(process.env.ADM, req.session.user.email)
    return res.send("prueba")
})

export default routerProductos    