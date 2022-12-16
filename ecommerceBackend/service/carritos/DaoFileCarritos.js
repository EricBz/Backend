import Contenedor from "../../dao/contenedorFilesystem.js";

//let Producto = new Contenedor()

class serviceFileCarritos extends Contenedor {
    constructor(){
        super('./config/DbsArchivos/carritos.json')
        //this.producto = Producto
    }
   /* async saveProduct (prod) {
        return await Producto.save(prod)
    }

    async getAllProduct () {
        return await Producto.getAll()
    }

    async getIdProduct (id) {
        return await Producto.deleteById(id)
    }

    async updateProduct (ID, prod) {
        return await Producto.update(ID, prod)
    }

    async deleteAllProduct () {
        return await Producto.deleteAll()
    }

    async deleteByIdProduct (id) {
        return await Producto.deleteById(id)
    }*/
}

export default serviceFileCarritos