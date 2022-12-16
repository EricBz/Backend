//const fs = require("fs");
import fs from "fs"
import DtoFileProductos from "../dto/DtoFile.js"

class Contenedor {
    constructor(archivo) {      
        this.archivo = archivo
    }
   
//b.
    async save(y) {
        try {
            this.elementos = JSON.parse(await fs.promises.readFile(this.archivo, "utf8"))
            let id;
            const fecha = new Date().toLocaleString()
            this.obj = y;
            console.log(this.obj)
            //Si la longitud del array no es cero toma el id del ultimo elemento y le agrega 1.
            this.elementos.length == 0 ? id = 1 : id = this.elementos[this.elementos.length-1].id+1
            this.obj.id = id
            this.obj.timestamp = fecha
            this.elementos.push(this.obj);
            await fs.promises.writeFile(this.archivo, JSON.stringify(this.elementos, null, 2)).then(() => console.log("Producto agregado")).catch((err) => console.log("error", err)) 
         //   return this.getAll()
        }
        catch (err) {
            console.log(err);
        }
    }
//a.
    async getById(id) {
        try {
            let productArray = JSON.parse(await fs.promises.readFile(this.archivo, "utf8"))
            let productById = await productArray.find((product) => product.id == id)
            
            if (!productById) {return {error: "Producto no encontrado."}} else{ 
                let productByIdDto = new DtoFileProductos(productById)
                return await productByIdDto}
        }
        catch (err) {
            console.log(err);
        }
    }

 async   getAll() {
        try {
           // return this.elementos
            const leido = await fs.promises.readFile(this.archivo, "utf-8").then(cont => JSON.parse(cont)).catch(err => console.log("ESTO SE ROMPIO",err)) 
            let nuevo = leido.map(prod => new DtoFileProductos(prod))
            //return leido
            return nuevo   
        }
        catch (err) {
            console.log(err);
        }
    }
//d.
    async deleteById(id) {
        try {           
            const productos = JSON.parse(await fs.promises.readFile(this.archivo, "utf8"))
            let filtrado = productos.filter((product) => product.id != id)         
            let prod2 = productos.find((product) => product.id == id);
            console.log(prod2)
           if (!prod2) {return {error: "Producto no encontrado."}}
            else{
                await fs.writeFileSync(this.archivo, JSON.stringify(filtrado))
                return this.getAll()
            }
        //   return prod
        //fs.writeFileSync("productos.json", JSON.stringify(JSON.parse(await fs.promises.readFile("productos.json", "utf8")).filter((product) => product.id != id), null, 2));
        }
        catch (err) {
            console.log(err);
        }
    }

   async deleteAll() {
        this.elementos = [];
        await fs.promises.writeFile(this.archivo, this.elementos).then(() => console.log("Borrado exitosamente")).catch((err) => console.log("No se ha borrado correctamente",err));
    }
//c
   async update(ID, prod) {
    //El index busca el elemento que tenga ese ID
    const leido =  JSON.parse(await fs.promises.readFile(this.archivo, "utf-8"))
    //Index muestra la posicion donde se encuantra
    const index = leido.findIndex(prodt => prodt.id == ID)
     //prod.Id muestra el index deseado
        if ( index == -1) {return {error:"Producto no encontrado"}} else {
            prod.id = leido[index].id 
            leido[index] = prod
         await fs.promises.writeFile(this.archivo, JSON.stringify(leido)).then(data => data)
      return this.getAll()}
        
    }
}

export default Contenedor