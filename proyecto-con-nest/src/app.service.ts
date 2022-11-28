import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from "fs/promises"

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  getAll(): object {
    try {
      const leido = readFile("./src/users.json", "utf-8").then(cont => JSON.parse(cont)).catch(err => console.log("ESTO SE ROMPIO", err))
      return leido
    }
    catch (err) {
      console.log(err);
    }
  }
  async getAllById(id): Promise<object> {
    try {
      //let id = 1
      console.log(id)
      let productArray = JSON.parse(await readFile("./src/users.json", "utf8"))
      let productById = productArray.find((product) => product.id == id)
      
      if (!productById) {return {error: "Producto no encontrado."}} else{ 
          return productById}
  }
  catch (err) {
      console.log(err);
  }
  } 

  async save(prod) {
    try {
        let elementos = JSON.parse(await readFile("./src/users.json", "utf8"))
        let id;
        const fecha = new Date().toLocaleString()
        let obj = prod;
        console.log(obj)
        //Si la longitud del array no es cero toma el id del ultimo elemento y le agrega 1.
        elementos.length == 0 ? id = 1 : id = elementos[elementos.length-1].id+1
        obj.id = id
        elementos.push(obj);
        await writeFile("./src/users.json", JSON.stringify(elementos, null, 2)).then(() => console.log("Producto agregado")).catch((err) => console.log("error", err)) 
     //   return this.getAll()
    }
    catch (err) {
        console.log(err);
    }
}
}
