import { Router } from "express";
import { getProduct, getIdProduct, deteleIdProduct, putProduct, postProduct, deleteProduct} from "../controllers/controllersProductos.js";
import {json, urlencoded} from "express"

const routerProductos = Router()
routerProductos.use(json())
routerProductos.use(urlencoded({ extended: true }))

const Administrador = true

function validacion(req, res, next) {
    if (!Administrador) {
        res.status(404).json({ "error": "Habilitada solo para Administradores" })
    } else {
        next()
    }
}

routerProductos.get("/", getProduct)
//a.
routerProductos.get("/:id", validacion, getIdProduct)
//d
routerProductos.delete("/:id", validacion, deteleIdProduct)
//c
routerProductos.put("/:id", validacion, putProduct)
//b
routerProductos.post("/", validacion, postProduct)

routerProductos.delete("/", validacion, deleteProduct)

//routerProductos.get("/cliente/axios", getAxios)

export default routerProductos    