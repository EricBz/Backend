import admin from "firebase-admin"
import configMongoose from '../configMongoose.js'
//importo las credenciales para modificar la BdD
admin.initializeApp({
    credential: admin.credential.cert(configMongoose.firebase)
})
//luego de importar admin con sus metodos inicializo con la constdb para poder usarla.
const db = admin.firestore();

class Contenedor {

    constructor(nombreColeccion) {
        this.coleccion = db.collection(nombreColeccion)
    }

    async getById(id) {
        try {
            const doc = await this.coleccion.doc(id).get();
            if (!doc.exists) {
               return {error: "Ingrese id válido."}
            } else {
                const data = doc.data();
                return { ...data, id }
            }
        } catch (error) {
            console.log(error)
        }
    }

    async getAll() {
        try {
            const result = []
            const snapshot = await this.coleccion.get();
            snapshot.forEach(doc => {
                result.push({ id: doc.id, ...doc.data() })
            })
            return result
        } catch (error) {
            throw new Error(`Error al listar todo: ${error}`)
        }
    }

    async save(nuevoElem) {
        try {
            const guardado = await this.coleccion.add(nuevoElem);
            return { ...nuevoElem, id: guardado.id }
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }

    async update(nuevoElem) {
        try {
            const actualizado = await this.coleccion.doc(nuevoElem.id).set(nuevoElem);
            return actualizado
        } catch (error) {
            throw new Error(`Error al actualizar: ${error}`)
        }
    }

    async deleteById(id) {
        try {
            const item = await this.coleccion.doc(id).delete();
            return item
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }

    async delete() {
        // Hay que borrar doc por doc
        try {
            const docs = await this.getAll()
            const ids = docs.map(d => d.id)
            const promesas = ids.map(id => this.deleteById(id))
            const resultados = await Promise.allSettled(promesas)
            const errores = resultados.filter(r => r.status == 'rejected')
            if (errores.length > 0) {
                throw new Error('no se borró todo. volver a intentarlo')
            }
        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }
    }
}

export default Contenedor