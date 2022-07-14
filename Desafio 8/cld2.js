const fs = require("fs");
const { options } = require("./mariaDB.js");
const knex = require("knex")(options);


class Contenedor {
    constructor() {      

    }
//Ingresar un producto
    async save(y) {
        try {
          await knex("productos").insert(y).then(() => {console.log("Informacion agregada")}).catch(err => console(err)).finally(() => {
                knex.destroy()
            })
        }
        catch (err) {
            console.log(err);
        }
    }
//Mostrar un producto por id
   async getById(id) {
        try {
            await knex.from("productos").select("*").where(Id = id)
            for (const row of rows) console.log (`${row[ "id" ]} ${row[ "name" ]} ${row[ "price" ]}`)
          
        }
        catch (err) {
            console.log(err);
        }
    }
//Mostrar todos los productos
    async getAll() {
        try {
            await knex.from("productos").select("*")
            for (const row of rows) console.log (`${row[ "id" ]} ${row[ "name" ]} ${row[ "price" ]}`)
            }

        catch (err) {
            console.log(err);
        }
    }
//Borrar un producto por su id
    async deleteById(x) {
        try {
            await knex('productos').del().where(Id = x)
        }
        catch (err) {
            console.log(err);
        }
    }
//Borrar todos los productos
   async deleteAll() {
    await knex('productos').del()
    }
//Modificar un producto teniendo en cuenta su id
    async update(ID, prod) {
    
        await knex('productos').where({id : ID}).update({prod})
    }
}

const Productos = new Contenedor();
//Productos.save({title: "TCL", price: 34000, thumbnail: "Foto de telefono"})
//Productos.save({title: "SAMSUNG", price: 3400, thumbnail: "Foto de telefono"})
//Productos.getAll()
//console.log(Productos.getById(1))
//console.log(Productos.deleteById(1))
//Productos.deleteAll()
//Productos.update(4, {title: "TCLm", price: 34000, thumbnail: "Foto de telefono"})

module.exports = Contenedor

