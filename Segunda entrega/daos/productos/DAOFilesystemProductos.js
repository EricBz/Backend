import Contenedor from "../../contenedores/contenedorFilesystem.js"

class ProductosDaoArchivo extends Contenedor {

    constructor() {
        super('./DbsArchivos/productos.json')
    }
}


export default ProductosDaoArchivo

