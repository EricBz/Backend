
import userService from "../config/modelUser.js"
import Contenedor from "../dao/contenedorFilesystem.js"


export default class DtoFileProductos {
    constructor (Productos) {
        this.title = Productos.title,
        this.price = Productos.price,
        this.thumbnail = Productos.thumbnail
    }
    
}
