import Contenedor from "../../contenedores/contenedorMongo.js"
//clase hija, hereda de contenedor

class ProductosDaoMongo extends Contenedor {

    constructor() {
        super('productos', {
            date: { type: String},
            title: { type: String, required: true },
            price: { type: Number, required: true },
            thumbnail: { type: String, required: true },
        })
    }
}

export default ProductosDaoMongo

