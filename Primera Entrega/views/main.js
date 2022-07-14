

function addCart(id){
    let upCart = {
        title: document.getElementById('titleCart').textContent,
        price: document.getElementById('priceCart').textContent,
       
        stock: document.getElementById('stockCart').textContent,
        description: document.getElementById('descriptionCart').textContent,
        timestamp: document.getElementById('timestampCart').textContent,
        thumbnail: document.getElementById('thumbnailCart').src,
        id: id
    }

    fetch('http://localhost:8080/api/carrito/'+id+'/productos', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(upCart)
 })
.then(res => res.json())
.then(res=> {
      console.log(res);
});
}

window.onload = async() => {
    window.alert("Prueba")
    console.log("Prueba")
    const productlist = await fetch("tabla:hbs").then(data => data)
    console.log(productlist)
}

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
         }})