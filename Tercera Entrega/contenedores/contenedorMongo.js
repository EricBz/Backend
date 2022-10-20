
import mongoose from "mongoose"
import configMongoose from "../configMongoose.js"

//rec si pongo type module siempre poner la exptension, en este caso .js
//Para hacerlo hay que levantar la bdd primedo a traves de la consola, luego se creara segun los parametros indicados.
//Revisar que el modelo o esquema contenga las mismas propiedades que luego guardare.
//hacer el esquema y la conexion sabiendo que para entrar datos necesitare de ambos y ahi se conjura.
mongoose.connect(configMongoose.mongodb.base, configMongoose.mongodb.options)

class Contenedor {
  constructor(collection, schema) {
    this.collection = mongoose.model(collection, schema)
  }
  async save(prod) {
    try {
      let Mostrar = await this.collection.create(prod)
      return Mostrar
    } catch (err) {
      console.log(err)
    }
  }

  async getAll() {
    try {
      let Mostrar = await this.collection.find()
      return Mostrar
    } catch (err) {
      console.log(err)
    }
  }

  async getById(ID) {
    try {
      console.log("contenedor", ID)
      if (mongoose.Types.ObjectId.isValid(ID)) {
        let Mostrar = await this.collection.find({ _id: { $eq: ID } })
        return Mostrar
      } else { return { error: "no valido" } }
    } catch (err) {
      console.log(err)
    }
  }

  async deleteById(ID) {
    console.log("en contenedor", ID)
    try {
      if (mongoose.Types.ObjectId.isValid(ID)) {
        await this.collection.deleteOne({ _id: { $eq: ID } })
        return { Borrado: ID, Alert: "Elemento borrado", Elementos: this.getAll() }
      } else { return { error: "Ingrese id válido." } }
    } catch (err) {
      console.log(err)
    }
  }

  async delete() {
    try {
      this.collection.deleteMany({})
    } catch (err) {
      console.log(err)
    }
  }

  async update(ID, prod) {
    try {
      if (mongoose.Types.ObjectId.isValid(ID)) {
        const Mostrar = await this.collection.updateOne({ _id: ID }, { $set: prod })
        return this.getById(ID)
      } else { return { error: "Ingrese id válido." } }
    } catch (err) {
      console.log(err)
    }
  }
}

export default Contenedor

