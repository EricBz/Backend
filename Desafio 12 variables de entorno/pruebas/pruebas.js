/*const limiteMax = ""
 randomNumbers = () => {
    let numeros = []
    if(!limiteMax){
    for (let i = 1; i <= 2; i++){
     
      numeros.push(i*Math.random())
    }}else{
        for (let i = 1; i <= limiteMax; i++){
     
            numeros.push(i*Math.random())
    }
}
    return numeros
}

console.log(randomNumbers())*/

//Ejecuto el Sort para realizar el ordenamiento
numeros = [1,2,3,2,4,5,5,5]

function sortNumber(a,b) {
    return a - b;
  }
numeros.sort(sortNumber());
console.log(numeros)
//console.log(numeros);

//Ciclo donde se evalúa el si el número actual se encuentra dentro del array, en caso de ser así te aumenta +1 en count
    var numActual = null;
    var count = 0;
    for (var i = 0; i < numeros.length; i++) {
        if (numeros[i] != numActual) {
            if (count > 0) {
                console.log("Número " +numActual+ " se repite: "+count+ " veces");
            }
            numActual = numeros[i];
            count = 1;
        } else {
            count++;
        }
    }
    if (count > 0) {
        console.log("Número " +numActual+ " se repite: "+count+ " veces");
    }