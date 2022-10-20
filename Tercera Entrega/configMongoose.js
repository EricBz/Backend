import dotenv from 'dotenv'
dotenv.config();
/*1 - Contenedor
2 - ProductosDAOMongo, ya no uso el esquema y la coleccion aparte sino en la clase hija
3 - configMongoose*/
export default {
  mongodb:{
    //base:'mongodb://localhost/ecommerce',
    base: process.env.DB,
    options:{
      useNewUrlParser: true,
      UseUnifiedTopology: true
    }
  }
  
}




 