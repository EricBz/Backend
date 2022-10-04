import express from "express"
import winston from "winston"
import { logger } from "./utils.js"
import info from "./infoSistema.js"
import compression from "compression"
import cluster from "cluster"
import os from "os"

const cantCPUs = os.cpus().length
const app = express()
//Winston podria usarse desde cada ruta o como en este caso en un archivo utils y pasado como middleware, despues se llama a traves del req como una funcion ingresado el mensaje o tratamiento del error o nivel que queramos manipula.
app.use(logger())
/*
const logger = winston.createLogger({
    level: "debug",
    transports:[
        new winston.transports.Console({
            level:"debug"
        }),
        new winston.transports.File({level:"info", filename:"./error.log"})
       ]
})*/
//Mostrara del nivel elegido hasta los niveles superiores.


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//Usando la funcion como middleword comprime la info.
app.use(compression())

if (cluster.isPrimary) {
    console.log(`Primary ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < cantCPUs; i++) {
        cluster.fork();
    }
    cluster.on("exit", worker => {
        console.log("El proceso hijo " + worker.process.pid + " murio")
        //Como el proceso hijos anterior ya hizo su trabajo levanto otro en la siguiente linea
        cluster.fork()
    }
    )
} else {
    const PORT = 8080
    app.listen(PORT, () => console.log("Listening in " + PORT + " Worker " + process.pid + " started "))
}




app.get("/", (req, res) => {
    req.logger.error("hola")
    /*    logger.log('silly', "127.0.0.1 - log silly")
        logger.log('debug', "127.0.0.1 - log debug")
        logger.log('verbose', "127.0.0.1 - log verbose")
        logger.log('info', "127.0.0.1 - log info")
        logger.log('warn', "127.0.0.1 - log warn")
        logger.log('error', "127.0.0.1 - log error")*/
    return res.send("holas " + process.pid)
})

app.get("/suma/:num1/:num2", (req, res) => {
    const { num1, num2 } = req.params
    console.log(num1, num2)
    if (!num1 || !num2) {
        req.logger.error("Parametro insuficiente")
        return res.sendStatus(400).send("Parametro Insuficiente")
    }
    let result = num1 + num2
    return res.send(result + "      " + process.pid)
})

app.get("/info", (req, res) => {
    req.logger.debug("funciona bien")
    // logger.log('info',"Todo funciona correctamente en ruta /info")
    console.log(process.pid)
    return res.send(info())
})
//localhost:8080/suma/1/2


/*PROCEDIMIENTO CON ARTILLETY
Para test de performance (test de carga).
1 - Lo instalamos de manera global: npm install -g artillery
2 - Predemos el server.
3 - En otra terminal ejecutamos las opciones deseadas: artillery quick --count 50 -n 40 http://localhost:8080... > archivoConRdo.txt
Nos generara un informe en el archivo solicitado luego de ">".
--count  = pedidos
-n       = usuarios
RESULTADO: Podremos ver la eficiencia del servidos, sus respuestas por segundo.

PROCEDIMIENTO CON PROFILING
Para un analisis de rendimiento. Es de node por lo que no habra que descargar nada.
1 - Encendemos nuestro server en modo profiler: node --prof app.js
2 - En otra terminal hacemos un test de carga con artillery de la misma manera que en el procedimiento anterior.
3 - Como resultado arrojara un archivo encriptado, para poder hacerlo legible ingresamos el siguiente comando:
node --prof-process nombreDelArchivo.log > nombreDelArchivoLegible.txt
Con los datos recibidos podremos analizar el rendimiento de nuestro server.


*/