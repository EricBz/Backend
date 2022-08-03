import Contenedor from "../../contenedores/contenedorMariaDB.js"
import configMongoose from '../../configMongoose.js'

class CarritosDaoMariaDb extends Contenedor {

    constructor() {
        super(configMongoose.mariadb, "carritos")
    }
}

export default CarritosDaoMariaDb