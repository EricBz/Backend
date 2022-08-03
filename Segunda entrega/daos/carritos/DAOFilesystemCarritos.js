import Contenedor from "../../contenedores/contenedorFilesystem.js"

class CarritosDaoArchivo extends Contenedor {

    constructor() {
        super('./DbsArchivos/carritos.json')
    }
}


export default CarritosDaoArchivo