const { knexSqLite } = require("./SQLite3")

class Mensajes {
    constructor() {      

    }

    async save(mensaje) {
        try {
            await knexSqLite("mensajes").insert(mensaje).then(() => {console.log("Informacion agregada")})
              
          }
          catch (err) {
              console.log(err);
          }
    }

    async getAll() {
        try {           
            let rows= await knexSqLite.from("mensajes").select("*")
            for (const row of rows) {return rows
                //console.log (`${row[ "id" ]} ${row[ "date" ]} ${row[ "autor" ]} ${row[ "text" ]}`)
            }   
            
            }

        catch (err) {
            console.log(err);
        }
    }
}

//let mensaje = new Mensajes()
//mensaje.save({date: 23/05/1985, autor: "Steven", text:"holanda"})
//mensaje.getAll().then(data => console.log(data))


// node claseMensaje.js 
module.exports = Mensajes