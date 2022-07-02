const fs = require("fs");
let producto = {};

class Contenedor {
    constructor() {      
        this.elementos = [
            {
                "title": "Iphone",
                "price": 250,
                "thumbnail": "https://tecnotiendadigital.com/wp-content/uploads/iPHONE-13.jpg",
                "id": 1
              },
              {
                "title": "Samsung",
                "price": 50,
                "thumbnail": "https://images.samsung.com/ar/smartphones/galaxy-s22-ultra/buy/S22Ultra_ColorSelection_Burgundy_MO.jpg",
                "id": 2
              },
              {
                "title": "Motorola",
                "price": 45,
                "thumbnail": "https://s1.eestatic.com/2021/11/18/elandroidelibre/moviles-android/628198853_215362143_1706x960.jpg",
                "id": 3
              },
              {
                "title": "Motorola",
                "price": 45,
                "thumbnail": "https://s1.eestatic.com/2021/11/18/elandroidelibre/moviles-android/628198853_215362143_1706x960.jpg",
                "id": 4
              }
        ];
    }

    save(y) {
        try {
            this.obj = y;
            this.obj.id = this.elementos.length + 1;
            this.elementos.push(this.obj);
            console.log(this.elementos)
        }
        catch (err) {
            console.log(err);
        }
    }

    getById(id) {
        try {
            let productById = this.elementos.find((product) => product.id == id);
            if (!productById) {return {error: "Producto no encontrado."}} else{return productById}
        }
        catch (err) {
            console.log(err);
        }
    }

    getAll() {
        try {
            return this.elementos
        }
        catch (err) {
            console.log(err);
        }
    }

    deleteById(x) {
        try {
            
            let prod2 = this.elementos.find((product) => product.id == x);
           if (prod2 === undefined) {return {error: "Producto no encontrado."}}
            else{let prod = this.elementos.filter((product) => product.id != x)
                return prod;}
        //   return prod
        }
        catch (err) {
            console.log(err);
        }
    }

   deleteAll() {
        productos = [];
        productos
    }

   update(ID, prod) {
    console.log(ID)
    console.log(prod)
    //El index busca el elemento que tenga ese ID
        const index = productos.findIndex(prodt => prodt.id == ID)
        prod.Id = productos[index].id
        productos[index] = prod
        console.log(index)
        console.log(productos)
        return prod
    }
}

//const Productos = new Contenedor();
//Productos.save({title: "TCL", price: 34000, thumbnail: "Foto de telefono"})
//Productos.save({title: "SAMSUNG", price: 3400, thumbnail: "Foto de telefono"})
//Productos.getAll()
//console.log(Productos.getById(1))
//console.log(Productos.deleteById(1))
//Productos.deleteAll()
//Productos.update(4, {title: "TCLm", price: 34000, thumbnail: "Foto de telefono"})

module.exports = Contenedor

