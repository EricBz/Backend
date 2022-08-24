import { generarProducto} from "../productos.js";

export default class Contenedor {
    constructor() {

    }
    getAll(){
        const nuevos = []
        for(let i = 0; i < 5; i++){            
            const nuevosProductos = generarProducto(i)
            nuevos.push(nuevosProductos)
        }
        return nuevos
    }
}

//const prods = new Contenedor()
//console.log(prods.getAll())