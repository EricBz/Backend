import Contenedor from "../../contenedores/contenedorMongo.js"
//clase hija, hereda de contenedor

class CarritosDaoMongo extends Contenedor {

    constructor() {
        super('carritos', {
            timestamp: { type: String},
            email: { type: String},
            idUsuario: { type: String},
            productos: { type: []},          
        })
    }
}

export default CarritosDaoMongo

