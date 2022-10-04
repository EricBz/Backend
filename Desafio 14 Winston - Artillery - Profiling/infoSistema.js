export default function info() {
    let info = { 
    Directorio_actual_de_trabajo: process.cwd(),
    Id_del_proceso: process.pid,
    Versión_de_NODE: process.version,
    Titulo_del_proceso: process.title,
    Sistema_operativo: process.platform,
    Uso_de_memoria: process.memoryUsage()
    }
    return info
} 

