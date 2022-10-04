import winston from "winston"

export const debugLogger = winston.createLogger({
    //level:"debug",
    transports:[
        new winston.transports.File({level:"debug", filename:"debug.log"}),
        new winston.transports.File({level:"error", filename:"errors.log"})
    ]
})

export const logger = () => (req,res,next) => {
    req.logger = debugLogger
    next() 
}