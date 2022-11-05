import Contenedor from "../../dao/contenedorFilesystem.js";
//import DtoFileProductos from "../../dto/DtoFile.js";
//let dtoProductos = new DtoFileProductos()
//let Producto = new Contenedor()
let instance = null
class serviceFileProductos extends Contenedor{
    constructor(prod){
        super('./config/DbsArchivos/productos.json')

    }
    static getInstance() {
        if (!instance) {
            instance = new serviceFileProductos()
        }
        return instance
    }

}

export default serviceFileProductos
