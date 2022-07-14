const fs = require("fs");
//cada carrito es un objeto dentro del array, este objeto contrendra otros objs que son los productos.
class claseCarrito {
    constructor() {      
        this.elementos = [ ];
    }
//a.
    async crear(carrito) {
        try {
        this.elementos = JSON.parse(await fs.promises.readFile("carritos.json", "utf8"))
            const fecha = new Date().toLocaleString();
            let id;
            //De esta manera si el array esta vacio el id del carrito sera 1 sino el siguiente al que ya existe
            this.elementos.length === 0 ? id = 1 : id = this.elementos[this.elementos.length-1].id+1
            this.obj = carrito;
            console.log(this.obj)
            this.obj.timestamp = fecha
            this.obj.productos = []
            this.obj.id = id
            //this.obj.id = this.elementos.length + 1
            this.elementos.push(this.obj);
            await fs.promises.writeFile("carritos.json", JSON.stringify(this.elementos)).then(() => {return this.obj.id}).catch((err) => console.log("error", err)) 
        }
        catch(err) {
            console.log(err)
        } 
        }
//b.
    async borrarUnCarrito(id) {
        try {
            const carritos = JSON.parse(await fs.promises.readFile("carritos.json", "utf8"))
            const ubicar = carritos.find(x => x.id == id)
            let filtrado = carritos.filter((product) => product.id != id)
            
            if (!ubicar) { return {error: "Carrito no encontrado."}} else {
                fs.writeFileSync("carritos.json", JSON.stringify(filtrado))
                return this.MostarTodos()
            }
            //return await this.MostarTodos()
        }
        catch(err) {
            console.log(err)
        }
    }

    async MostarTodos() {
        try {
           // return this.elementos
            const leido = await fs.promises.readFile("carritos.json", "utf-8").then(cont => JSON.parse(cont)).catch(err => console.log("ESTO SE ROMPIO",err)) 
            return leido   
        }
        catch (err) {
            console.log(err);
        }
    }
//c
    async mostrarUnCarrito(id) {
        try {
            const carritos = JSON.parse(await fs.promises.readFile("carritos.json", "utf8"))
            const carritoSeleccionado = carritos.find(x => x.id == id)
          
            if (carritoSeleccionado == undefined)  {return {error:"Carrito seleccionado no existe"}} else {
                console.log(carritoSeleccionado)
                return carritoSeleccionado.productos}
            
        }
        catch(err) {
            console.log(err)
        }
    }
//e
    async borrarProducto(idCart, idProduct) {
        const carritos = JSON.parse(await fs.promises.readFile("carritos.json", "utf8"))
        if (carritos !== []) {
          const index = carritos.findIndex(objT => objT.id == idCart);
          //recorre todos los productos de ese objeto carrito y devuelve los que no son de ese id.
          if (index == -1) {return {error:"Carrito no encontrado."}} else{
          carritos[index].productos  = carritos[index].productos.filter(x => x.id !== idProduct);
          return `El producto fue eliminado`;}
        } else {
          return {error: `No hay carritos`}
        }
        //return result;
      }
//d.
    async IncorporarProducto(x, y) {
        try{
            const carritos = JSON.parse(await fs.promises.readFile("carritos.json", "utf8"))
            const fecha = new Date().toLocaleString();
            y.timestamp = fecha
            //const productos = JSON.parse(await fs.promises.readFile("productos.json", "utf8"))
            //Busca el producto que contiene el x (id) señalado.
            //const prodEncontrado = productos.find(prod => prod.id === x)
            //Index muestra la posicion donde se encuantra el objeto que tiene el id = y
            const index = carritos.findIndex(prodt => prodt.id == x)
            //carritos[index].productos = prodEncontrado
            if (index == -1) {return {error: "Carrito no encontrado."}} else {
            y.id = carritos[index].productos.length +1
           
            carritos[index].productos.push(await y)
            fs.writeFileSync("carritos.json", JSON.stringify(carritos))      
            return carritos[index].productos}
        }
        catch(err) {
            console.log(err)
        }
    }


}

//const carrito = new claseCarrito()
//carrito.crear({nombre:"carrito", detalle:"Es un carrito"})
//carrito.borrarUnCarrito(30)
//carrito.MostarTodos().then(data =>console.log(data))
//carrito.IncorporarProducto(5, {Producto:"algo"})
//carrito.borrarProducto(29, 2)
//carrito.deleteProductsCart(2, 2)
//carrito.EliminarUnProducto(2, 2)
//carrito.mostrarUnCarrito(3)

module.exports = claseCarrito