const socket = io.connect();
const { knexSqLite } = require("../SQLite3")

socket.on("mensajes", (envios) => {
    const html = envios.map((elem, index) => {
      return `<div>
            <b style="color:blue;">${elem.author}</b>:
            <em style="color:brown;">${elem.date}</em>
            <i style="color:green;">${elem.text}<i> </div>`;
    })
    .join(" ");
    document.getElementById("datoos").innerHTML = html
  })
  

function addMessage(e) {
  const fecha = new Date().toLocaleString();
    const mensaje = {
      date: fecha,
      author: document.getElementById("username").value,
      text: document.getElementById("texto").value,
    };
    //Para agregar a la base de datos.
    knex("mensajes").insert(mensaje)
    .then(() => console.log("data inserted"))
    .catch((err) => { console.log(err); throw err })
    .finally(() => {
        knex.destroy()
    })

    socket.emit("nuevoMensaje", mensaje);
    return false;
  }
//Funcion que recibe los productos para la tabla.
  socket.on("productos", (productos) => {
    console.log(productos)
    makeHtmlTable(productos).then(html => {
        document.getElementById('productos').innerHTML = html
    })

    function makeHtmlTable(productos) {
        return fetch('tabla.hbs')
            .then(res => res.text())
            .then(tabla => {
                const template = Handlebars.compile(tabla);
                const html = template({productos})
                return html                
            })          
         }
})


//Igreso de un producto por formulario.
function addProduct(e) {
    const ingresar = {
      title: document.getElementById("title").value,
      price: document.getElementById("price").value,
      thumbnail: document.getElementById("thumbnail").value,
    };
    console.log(ingresar)
    socket.emit("ingresar", ingresar);
    return false;
  }