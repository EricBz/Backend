import Contenedor from "../../dao/contenedorMongo.js"
//clase hija, hereda de contenedor
let instance = null

class ProductosDaoMongo extends Contenedor {

    constructor() {
        super('productos', {
            date: { type: String},
            title: { type: String, required: true },
            price: { type: Number, required: true },
            thumbnail: { type: String, required: true },
        })
    }
    static getInstance() {
        if (!instance) {
            instance = new ProductosDaoMongo()
        }
        return instance
    }
}

export default ProductosDaoMongo

