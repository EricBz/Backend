import { mensajesModel } from "../configuraciones/modelMongoose.js";
import mongoose from "mongoose";
import configMongoose from "../configuraciones/configMongoose.js"
import { denormalize, normalize, schema } from "normalizr";
import fs from "fs"

//mongoose.connect(configMongoose.mongodb.base, configMongoose.mongodb.options)

class ContenedorMensaje {
  constructor() {
    this.collection = mensajesModel
  }
  /*
  async save(mensaje) {
    try {
      let Mostrar = await this.collection.create(mensaje)
      console.log("Guardado")
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
  }*/
  //Metodos para persistencia en archivo json con fs.
  async saveFs(mensaje) {
    const obj = { id: 1, mensajes: [] }
    const read = await JSON.parse(await fs.promises.readFile("./data/chat.json", "utf-8"))
    let arrayMensajes = read.mensajes
    arrayMensajes.push(mensaje)
    obj.mensajes = arrayMensajes
    // console.log(obj)
    await fs.promises.writeFile("./data/chat.json", JSON.stringify(obj, null, 2))
    console.log(await this.getAllFs())
  }
  async getAllFs() {
    const read = await JSON.parse(fs.readFileSync("./data/chat.json", "utf-8"))
    // console.log(read)
    return read.mensajes
  }
  async normalizr() {
    const read = await JSON.parse(fs.readFileSync("./data/chat.json", "utf-8"))
    const autorSchema = new schema.Entity("autor", { idAttribute: 'email' })
    const mensajeSchema = new schema.Entity("mensaje", { autor: autorSchema })
    const chatSchema = new schema.Entity("chat", [mensajeSchema])
    const normalizrChat = normalize(await read, chatSchema)
    fs.promises.writeFile("./data/normalizado.json", JSON.stringify(normalizrChat, null, 2))
    
    console.log(JSON.stringify(normalizrChat, null, "\t"))
    return JSON.stringify(normalizrChat, null, "\t")
  }
  async denormalzr() {
    const read = await JSON.parse(fs.readFileSync("./data/chat.json", "utf-8"))
    const readNormalizr = await fs.promises.readFile("./data/normalizado.json", "utf-8")
    const autorSchema = new schema.Entity("autor", { idAttribute: 'email' })
    const mensajeSchema = new schema.Entity("mensaje", { autor: autorSchema })
    const chatSchema = new schema.Entity("chat", [mensajeSchema])
    const normalizrChat = normalize(await read, chatSchema)
    const denormalizedChat = await denormalize(normalizrChat.result, chatSchema, normalizrChat.entities)
    console.log(JSON.stringify(denormalizedChat, null, "\t"))
    return JSON.stringify(await denormalizedChat, null, "\t")
  }
}

export default ContenedorMensaje

//let mensaje = new ContenedorMensaje()
//mensaje.save({autor:{id:"erwe", nombre:"Mauricia", apellido:"Rodrigo"}, texto: "jkajls"})
//mensaje.getAll().then(data => console.log(data))
//mensaje.normalizr()
/*mensaje.save({
  autor: {
      id: 'mail del usuario',
      nombre: 'nombre del usuario',
      apellido: 'apellido del usuario',
      edad: 99,
      alias: 'alias del usuario',
      avatar: 'url avatar (foto, logo) del usuario'
  },
  texto: 'mensaje del usuario'
}
)*/
//mensaje.getAllFs()
//mensaje.saveFs({title:"papas"})
//mensaje.denormalzr()
//mensaje.arraydenor()