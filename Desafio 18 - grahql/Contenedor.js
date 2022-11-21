import fs from "fs"

let instance = null

export default class Contenedor {
    async getAll () {
        let traido = await fs.promises.readFile("./productos.json", "utf-8")
        let parseado = JSON.parse(await traido)
        console.log(parseado)
        return parseado
    }
    async getAllById (id) {
        let traido = await fs.promises.readFile("./productos.json", "utf-8")
        let parseado = JSON.parse(await traido)
        let mostrar = parseado.find(prod => prod.id == id)
        console.log(mostrar)
        return await mostrar
    }

    async save (prod) {
            this.elementos = JSON.parse(await fs.promises.readFile(this.archivo, "utf8"))
            let id;
            this.obj = prod;
            console.log(this.obj)
            //Si la longitud del array no es cero toma el id del ultimo elemento y le agrega 1.
            this.elementos.length == 0 ? id = 1 : id = this.elementos[this.elementos.length-1].id+1
            this.obj.id = id
            this.elementos.push(this.obj);
            await fs.promises.writeFile(this.archivo, JSON.stringify(this.elementos, null, 2)).then(() => console.log("Producto agregado")).catch((err) => console.log("error", err)) 
    }

    static getInstance () {
        if (!instance) {
            instance = new Contenedor()
        }
        return instance
    }
}




