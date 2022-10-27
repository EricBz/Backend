import { carritosDao } from "../service/index.js";

let Carritos = new carritosDao()

const getCarrito = async (req, res) => {
    res.send(await Carritos.getAll())
 }

const postCarrito = async (req, res) => {
    console.log(req.body)
    await Carritos.save(req.body)
       return  res.send(await Carritos.getAll())
}

const getIdCarrito = async (req, res) => {
    let ID = req.params.id
    console.log(ID)
    Carritos.getById(ID).then(data => console.log(data))
    res.json(await Carritos.getById(ID).then(data => data))
}

 export { getCarrito, postCarrito, getIdCarrito }