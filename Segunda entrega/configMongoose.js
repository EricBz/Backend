import dotenv from 'dotenv'
dotenv.config();
/*1 - Contenedor
2 - ProductosDAOMongo, ya no uso el esquema y la coleccion aparte sino en la clase hija
3 - configMongoose*/
export default {
  mongodb:{
    base:'mongodb://localhost/ecommerce',
    options:{
      useNewUrlParser: true,
      UseUnifiedTopology: true
    }
  },
  mariadb:{
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        database: 'productos',
    }
  },
  firebase:
  {
    type: "service_account",
    project_id: "ecommercemmxxii",
    private_key_id: process.env.private_key_id,
    private_key: process.env.private_key,
    client_email: "firebase-adminsdk-lge0u@ecommercemmxxii.iam.gserviceaccount.com",
    client_id: "112260153846526910593",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-lge0u%40ecommercemmxxii.iam.gserviceaccount.com"
  }
  
}




 