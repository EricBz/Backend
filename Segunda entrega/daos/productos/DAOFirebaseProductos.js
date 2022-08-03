import Contenedor from "../../contenedores/contenedorFirebase.js"

class ProductosDaoFirebase extends Contenedor {

    constructor() {
        super('productos')
    }
}

export default ProductosDaoFirebase