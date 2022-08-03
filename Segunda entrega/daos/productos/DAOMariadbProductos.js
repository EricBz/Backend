import Contenedor from "../../contenedores/contenedorMariaDB.js"
import configMongoose from '../../configMongoose.js'

class ProductosDaoMariaDb extends Contenedor {

    constructor() {
        super(configMongoose.mariadb, 'productos')
    }
}

//const prod = new ProductosDaoMariaDb()
//console.log(prod.getAll())

export default ProductosDaoMariaDb