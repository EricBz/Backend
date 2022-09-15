//EL proceso secundario o hijo recibe un mensaje que activa la respuesta, ejecuta la funcion deseada y lo
//retorna al padre.

randomNumbers = (limiteMax) => {
  console.log("En fn random: ", limiteMax)
  //limiteMax = limiteMax.entrada
  let numeros = []
  if (!limiteMax) {
    for (let i = 1; i <= 10000; i++) {

      numeros.push(i * Math.random())
    }
  } else {
    for (let i = 1; i <= limiteMax; i++) {

      numeros.push(i * Math.random())
    }
  }
 // console.log(numeros)
  return numeros
}


const cantRepeticiones = (entrada) => {
  let numeros = entrada  
  numeros.sort();
  
  //Ciclo donde se evalúa el si el número actual se encuentra dentro del array, en caso de ser así te aumenta +1 en count
  let numeroRdo = ""    
  let nuevoArray = []
  let numActual = null;
      let count = 0;
      for (let i = 0; i < numeros.length; i++) {
          if (numeros[i] != numActual) {
              if (count > 0) {
                let valor = `Número ${numActual} se repite:  ${count} veces`;
                nuevoArray.push(valor)
              }
              numActual = numeros[i];
              count = 1;
          } else {
              count++;
          }
      }
      if (count > 0) {
         let valor = `Número ${numActual} se repite: ${count} veces`;
         nuevoArray.push(valor)
      }
      return nuevoArray
  }



process.on("message", msg => {
  console.log(msg)
   console.log()
 // process.send(randomNumbers(msg))
 process.send(cantRepeticiones(randomNumbers(msg)))
})


