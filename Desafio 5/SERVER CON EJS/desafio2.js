const fs = require("fs");
let productos = [
 /*   {
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
        "thumbnail": "https://cdn4.iconfinder.com/data/icons/basic-user-interface-elements/700/calendar-calender-schedule-month-agenda-timetable-512.png",
        "id": 4
      }*/
  ];
let producto = {};

class Contenedor {
    constructor() {      
    }

    save(y) {
        try {
            producto = y;
            producto.id = productos.length + 1;
            productos.push(producto);
            console.log(productos)
        }
        catch (err) {
            console.log(err);
        }
    }

    getById(id) {
        try {
            let productById = productos.find((product) => product.id == id);
            if (productById === undefined) {return {error: "Producto no encontrado."}} else{return productById}
        }
        catch (err) {
            console.log(err);
        }
    }

    getAll() {
        try {
            return productos
        }
        catch (err) {
            console.log(err);
        }
    }

    deleteById(x) {
        try {
            let prod = productos.filter((product) => product.id != x);
            let prod2 = productos.find((product) => product.id == x);
           if (prod2 === undefined) {return {error: "Producto no encontrado."}} else{return prod}
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
//Productos.getAll()
//Productos.getById(1)
//console.log(Productos.deleteById(1))
//Productos.deleteAll()
//Productos.update(4, {title: "TCLm", price: 34000, thumbnail: "Foto de telefono"})

module.exports = Contenedor

