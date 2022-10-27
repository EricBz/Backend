import { Router } from "express";
import { getCarrito, postCarrito, getIdCarrito } from "../controllers/controllerCarrito.js";
import {json, urlencoded} from "express"

const routerCarrito = Router()
routerCarrito.use(json())
routerCarrito.use(urlencoded({ extended: true }))

routerCarrito.get("/", getCarrito)  

 routerCarrito.post("/", postCarrito)

routerCarrito.get("/:id", getIdCarrito)

export default routerCarrito