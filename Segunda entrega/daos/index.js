import dotenv from 'dotenv'
dotenv.config();

let productosDao
let carritosDao

const db = process.env.DBSELECCION

//"mongo" || "filesystem" || "firebase" || "mariadb";

switch(db){
case "mongo":
const { default: ProductosDaoMongo } = await import('./productos/DAOMongoProductos.js')
const { default: CarritosDaoMongo } = await import("./carritos/DAOMongoCarritos.js")
productosDao = ProductosDaoMongo
carritosDao = CarritosDaoMongo
break
case "mariadb":
const {default: ProductosDaoMariaDb} = await  import("./productos/DAOMariadbProductos.js")
const {default: CarritosDaoMariaDb} = await import("./carritos/DAOMariadbCarritos.js")
productosDao = ProductosDaoMariaDb
carritosDao = CarritosDaoMariaDb
break
case "firebase":
const {default: ProductosDaoFirebase} = await import("./productos/DAOFirebaseProductos.js")
const {default: CarritoDaoFirebase} = await import("./carritos/DAOFirebaseCarritos.js")
productosDao = ProductosDaoFirebase
carritosDao = CarritoDaoFirebase
break
case "filesystem":
const {default: ProductosDaoArchivo} = await import("./productos/DAOFilesystemProductos.js")
const {default: CarritosDaoArchivo} = await import("./carritos/DAOFilesystemCarritos.js")
productosDao = ProductosDaoArchivo
carritosDao = CarritosDaoArchivo
break
}

export { productosDao, carritosDao }
