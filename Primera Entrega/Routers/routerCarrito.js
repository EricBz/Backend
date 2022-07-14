//Inicializo
const {Router, application} = require('express');
const routerCarrito = Router();
const express = require("express")
routerCarrito.use(express.json())
routerCarrito.use(express.urlencoded({ extended: true }))

const claseCarrito = require("../claseCarrito")
let carrito = new claseCarrito()
/*
routerCarrito.get("/", async(req, res) => {
  res.render("main.hbs", {Prods: await carrito.MostarTodos()})
})
*/
//1
routerCarrito.post("/", async (req, res) => { 
  res.json(carrito.crear(req.body))
})
  //2
routerCarrito.get( '/:id/productos', async (req, res) => {
  console.log(req.params.id)
  res.json( await carrito.mostrarUnCarrito(req.params.id))

})
//3
routerCarrito.delete('/:id', async (req, res) => {
  res.json( await carrito.borrarUnCarrito(req.params.id))
})
//4
routerCarrito.post('/:id/productos', async (req, res) => {
  console.log(req.params.id, req.body)
  res.json(await carrito.IncorporarProducto(req.params.id, req.body))
})
//5
routerCarrito.delete('/:id/productos/:id_prod', async (req, res) => {
  console.log(req.params.id, req.params.id_prod)
  res.json(await carrito.borrarProducto(req.params.id, req.params.id_prod))
})
//Exporto modulo
module.exports=routerCarrito