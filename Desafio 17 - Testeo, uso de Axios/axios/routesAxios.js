import { Router } from "express";
import axios from "axios";

const routerAxios = Router()

//Funciones que procesan la solicitud para recibir o enviar datos a traves de axios.
function axiosGet() {
return axios.get("http://localhost:8080/api/productos").then((response) => {
    console.log(response.data)
}).catch((error) => {console.log(error)})
}

function axiosGetId(id) {
    return axios.get("http://localhost:8080/api/productos").then((response) => {
        let productos = response.data
        let mostrar = productos.find(prod => prod.id == id)
        if ( mostrar == undefined) {
            console.log("No existe el id.")
        } else {
            console.log(mostrar)
        }
    }).catch((error) => {console.log(error)})
}

async function axiosPost(data) {
    return axios.post("http://localhost:8080/api/productos", data).then((response) => {
        console.log(response.data)
    }).catch((error) => {console.log(error)})
}

//Rutas que permiten mostrarlo y redirigirlo para la api
routerAxios.get("/", (req, res) => {
    axiosGet()
    return res.send("Hecho")
})

routerAxios.get("/:id", (req, res) => {
    let id = req.params.id
    axiosGetId(id)
    return res.send(`Hecho.`)
})

routerAxios.post("/", async (req, res) => {
    const data = req.body
    await axiosPost(data)
    return res.send("enviado")
})

export default routerAxios
