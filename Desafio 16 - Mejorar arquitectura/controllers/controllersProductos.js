import { productosDao } from "../service/index.js";

//let Productos = new productosDao() cambiado por patron SINGLETON
let Productos = productosDao
const getProduct = async (req, res) => {
    return res.send(await Productos.getAll())
} 

const getIdProduct = async (req, res) => {
    let ID = req.params.id
    console.log(ID)
    Productos.getById(ID).then(data => console.log(data))
    res.json(await Productos.getById(ID).then(data => data))

}

const deteleIdProduct = async (req, res) => {
    let ID = req.params.id
    console.log("Delete recibido", ID)
    //   Productos.deleteById(ID).then(data => console.log(data))
    res.json(await Productos.deleteById(ID).then(data => data))
}

const putProduct = async (req, res) => {
    let prod = req.body
    console.log(prod)
    let ID = req.params.id;
    console.log(ID)
    return res.json(await Productos.update(ID, prod));
}

const postProduct = async (req, res) => {
    console.log(req.body)
    await Productos.save(req.body)
    return res.send(await Productos.getAll())
}

const deleteProduct = async (req, res) => {
    return res.send(await Productos.delete())
}

export {getProduct, getIdProduct, deteleIdProduct, putProduct, postProduct, deleteProduct}