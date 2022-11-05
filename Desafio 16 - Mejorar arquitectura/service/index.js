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
    productosDao = ProductosDaoMongo.getInstance()
    carritosDao = CarritosDaoMongo
    break
    case "filesystem":
    const {default: serviceFileProductos} = await import("./productos/DaoFileProductos.js")
    const {default: serviceFileCarritos} = await import("./carritos/DAOFileCarritos.js")
    productosDao = serviceFileProductos.getInstance()
    carritosDao = serviceFileCarritos
    break
    }
    
    export { productosDao, carritosDao }
    

