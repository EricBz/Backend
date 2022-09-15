const { Router } = require('express');
const routerRandom = Router();
const { fork } = require("child_process")

const subProcess = fork("./calculos.js");
/*
routerRandom.post("/entrada", (req,res)=>{
let entrada = req.body
console.log("en ruta", entrada)
subProcess.send(entrada)
return res.redirect("./salida")
})

routerRandom.get("/salida",async (req,res)=>{
subProcess.on("message", (message) => {
return res.send(`Desde el hijo al padre: ${message}`)
})
})*/

routerRandom.get("/:num", (req, res) => {
    let numero = req.params["num"] || 10000
    console.log(numero)
    subProcess.send(numero)
    subProcess.on("message", (message) => {
        return res.send(`Desde el hijo al padre: ${message}`)
    })
})

/*
routerRandom.get("/salida", (req, res) => {
    //subProcess.send(10)
    subProcess.on('message', async (message) => {
        return res.send(`Esto lo recibo del hijo : ${message}`);
    })

})*/

module.exports = routerRandom