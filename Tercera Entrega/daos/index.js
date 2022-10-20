import dotenv from 'dotenv'
dotenv.config();

let productosDao
let carritosDao

//const db = process.env.DBSELECCION

//"mongo" || "filesystem" || "firebase" || "mariadb";



const { default: ProductosDaoMongo } = await import('./productos/DAOMongoProductos.js')
const { default: CarritosDaoMongo } = await import("./carritos/DAOMongoCarritos.js")
productosDao = ProductosDaoMongo
carritosDao = CarritosDaoMongo



export { productosDao, carritosDao }
