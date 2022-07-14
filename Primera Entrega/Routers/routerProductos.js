const {Router} = require('express');
const routerProductos = Router();
const express = require("express")
routerProductos.use(express.json())
routerProductos.use(express.urlencoded({ extended: true }))


const Contenedor = require("../cld2.js")
let Productos = new Contenedor()

const Administrador = true

function validacion(req,res,next){
    if(!Administrador){
        res.status(404).json({"error": "Habilitada solo para Administradores"})
    } else {
        next()
    }
}
  
routerProductos.get("/", async (req, res) => {
//res.render("main.hbs", {list: await Productos.getAll(), showList: true})
return res.send(await Productos.getAll())
})
//a.
routerProductos.get("/:id",validacion ,async (req, res) => {
    let ID = req.params.id
    console.log(ID)
    Productos.getById(ID).then(data => console.log(data))
    res.json(await Productos.getById(ID).then(data => data))

})
//d
routerProductos.delete("/:id",validacion, async (req, res) => {
    let ID = req.params.id
    console.log("Delete recibido", ID)
    Productos.deleteById(ID).then(data => console.log(data))
    res.json( await Productos.deleteById(ID).then(data => data))
})
//c
routerProductos.put("/:id", validacion, async (req, res) => {
    let prod = req.body
    console.log(prod)
    let ID = req.params.id;
    console.log(ID)
    return res.json(await Productos.update(ID, prod));
})
//b
routerProductos.post("/", validacion, async (req, res) => {
    console.log(req.body)
    await Productos.save(req.body)
       return  res.send(await Productos.getAll())
   })


module.exports=routerProductos