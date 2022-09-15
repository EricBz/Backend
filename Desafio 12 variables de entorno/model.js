const mongoose = require("mongoose")

const collection = 'Users';
const schema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
})

const userService = mongoose.model(collection,schema);

module.exports = userService
