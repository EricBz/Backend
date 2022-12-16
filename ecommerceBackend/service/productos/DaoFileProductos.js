import Contenedor from "../../dao/contenedorFilesystem.js";
//import axiosFn from "../../axios/index.js"

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
/*
    axiosFnService() {
        return axiosFn()
    }
*/
}

export default serviceFileProductos
