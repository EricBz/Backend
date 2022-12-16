import dotenv from 'dotenv'
dotenv.config();

export default {
  mongodb:{
    base: process.env.DB,
    options:{
      useNewUrlParser: true,
      UseUnifiedTopology: true
    }
  }
  
}




 