const fs = require("fs");
const { options } = require("./mariaDB.js");
const knex = require("knex")(options)

class Contenedor {
    constructor(options) {      
        this.tabla = "productos"
    }
//Ingresar un producto
    async save(nuevoProducto) {
        try {
          await knex(this.tabla).insert(nuevoProducto).then(() => {console.log("Informacion agregada")})
        }
        catch (err) {
            console.log(err);
        }
    }
//Mostrar un producto por id
   async getById(id) {
        try {//Notar que cambie por una "," y el parametro esta con comillas para que me lo tome.
            let rows = await knex.from(this.tabla).select("*").where("id" , id)
            for (const row of rows) {console.log (`${row[ "id" ]} ${row[ "title" ]} ${row[ "price" ]} ${row[ "thumbnail" ]}`)}
          
        }
        catch (err) {
            console.log(err);
        }
    }
//Mostrar todos los productos
    async getAll() {
        try {
            
            let rows= await knex.from(this.tabla).select("*")
            for (let row of rows) {
            return rows}
            //{console.log (`${row[ "id" ]} ${row[ "title" ]} ${row[ "price" ]} ${row[ "thumbnail" ]}`)}
            }

        catch (err) {
            console.log(err);
        }
    }
//Borrar un producto por su id
    async deleteById(x) {
        try {
            await knex(this.tabla).del().where("Id", x)
        }
        catch (err) {
            console.log(err);
        }
    }
//Borrar todos los productos
   async deleteAll() {
    await knex(this.tabla).del()
    }
//Modificar un producto teniendo en cuenta su id
    async update(ID, prod) {
    
        await knex(this.tabla).where({id : ID}).update({prod})
    }
}

//const Productos = new Contenedor();
//Productos.save({title: "TCL", price: 34000, thumbnail: "Foto de telefono"})
//Productos.save({title: "SAMSUNG", price: 3400, thumbnail: "Foto de telefono"})
//Productos.getAll().then(data => console.log(data))
//Productos.getById(1)
//console.log(Productos.deleteById(1))
//Productos.deleteAll()
//Productos.update(4, {title: "TCLm", price: 34000, thumbnail: "Foto de telefono"})
//Productos.deleteById(16)
module.exports = Contenedor

