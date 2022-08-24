import mongoose from "mongoose";

const mensajesColeccion = "mensajes"

const mensajeSchema = new mongoose.Schema({
    autor: {
        id: String,
        nombre: String,
        apellido: String,
        edad: Number,
        alias: String,
        avatar: String,
    },
    texto: String
}) 


export const mensajesModel = mongoose.model(mensajesColeccion, mensajeSchema)