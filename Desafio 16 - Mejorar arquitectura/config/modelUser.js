import mongoose from "mongoose";

const collection = 'Users';
const schema = mongoose.Schema({
    name:String,
    email:String,
    edad:String,
    direccion:String,
    telefono:String,
    password:String,
    avatar:String,
})

const userService = mongoose.model(collection,schema);

export default userService
