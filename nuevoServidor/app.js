//import express from "express"
//import * as dotenv from "dotenv"
//dotenv.config()
const express = require("express")

const app = express()
const PORT = process.env.PORT

app.listen(PORT, ()=> console.log("Listening on "+PORT))

app.get("/saludo", (req, res) => {
    console.log("hola")
    res.send("Hola"+process.pid+"  "+PORT)
})

app.get("/randoms", (req, res) => {
    const randoms = () => {
        let result;
              for(let i=0;i<1000;i++){
                  result = i * i * i
              }
              return result
          } 
    return res.send(randoms() +" " + PORT)
})

//nginx.exe en cmd para ejecutar
// tasklist /fi "imagename eq node.exe" Muestra los procesos que estan corriendo en la pc.
//taskkill /pid 0000 -f mata los procesos.
// taskkill /f /pid numeroDePDI              f es para forzar

//pm2 start ruta del archivo para iniciar.
//pm2 list
//pm2 delete id o name del proceso
//pm2 start ruta --watch
//pm2 monit (se abre usualmente en otra terminal para monitorear procesos)
//pm2 delete all
//pm2 init simple       generara archivo en proyecto un ecosystem que configurara el proceso que queramos sin necesidad de ingresar comandos por terminal.


//Para encender Nginx, desde su carpeta debemos introducir por consola "neginx"
//tasklist /fi "imagename eq nginx.exe"  A traves de este comando veremos si hay procesos corriendo de nginx
//Para cortar con el proceso     nginx -s quit