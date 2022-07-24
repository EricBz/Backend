//Para crear la carpeta
mongod --dbpath C:\Users\USUARIO\Documents\ecommerce
//En otra consola
mongo
use ecommerce
//1 y 2- Agrego 10 docs a las 2 colecciones: productos y mensajes.
db.createCollection("productos")
db.createCollection("mensajes")
db.productos.insertMany([{title:"prod1", price:120, thumbnail:"foto"},{title:"prod1", price:580, thumbnail:"foto"},{title:"prod1", price:900, thumbnail:"foto"},{title:"prod1", price:1280, thumbnail:"foto"},{title:"prod1", price:1700, thumbnail:"foto"},{title:"prod1", price:2300, thumbnail:"foto"},{title:"prod1", price:2860, thumbnail:"foto"},{title:"prod1", price:3350, thumbnail:"foto"},{title:"prod1", price:4320, thumbnail:"foto"},{title:"prod1", price:4990, thumbnail:"foto"},])
db.mensajes.insertMany([{name:"1", mensaje:"hola"}, {name:"2", mensaje:"hola"}, {name:"3", mensaje:"hola"}, {name:"4", mensaje:"hola"}, {name:"5", mensaje:"hola"}, {name:"6", mensaje:"hola"}, {name:"7", mensaje:"hola"}, {name:"8", mensaje:"hola"}, {name:"9", mensaje:"hola"}, {name:"10", mensaje:"hola"}, ])
//3 - Listar.
db.productos.find()
db.mensajes.find()
//4 - Cantidad de documentos.
db.productos.estimatedDocumentCount()
db.mensajes.estimatedDocumentCount()

//5 - CRUD en colecciones.
//a - 
db.productos.insertOne({title:"prod11", price:4999, thumbnail:"Foto"})
//b - 
//i -
db.productos.find({price:{$lt:1000}})
//ii -
db.productos.find({$and: [{price: {$gt: 1000}}, {price: {$lt: 3000}}]})
//iii - 
db.productos.find({price:{$gt:3000}})
//iv -
db.productos.find({},{title: 1}).sort({price: 1}).limit(1).skip(2)
/*Con skip estamos diciendo al cursor, que se salte un número de registros concreto
Con limit, queremos que el cursor, devuelva solo el número de registros indicado.*/

//c -
db.productos.updateMany({}, {$set:{stock:100}})

//d - 
db.productos.updateMany({price: {$gt:4000}}, {$set:{stock:0}})

//e - 
db.productos.deleteMany({price:{$lt:1000}})

//6 - Crear usuario Pepe.
db.createUser(
    {
        user:"Pepe", pwd:"asd456",roles:[{role:"read",db:"blog"}]
    }
)


