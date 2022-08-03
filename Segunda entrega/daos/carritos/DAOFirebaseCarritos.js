import Contenedor from "../../contenedores/contenedorFirebase.js"

class CarritosDaoFirebase extends Contenedor {

    constructor() {
        super('carritos')
    }

    async save(carrito = { productos: [] }) {
        return super.save(carrito)
    }
}

export default CarritosDaoFirebase