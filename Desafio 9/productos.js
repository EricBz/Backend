import faker from 'faker'
faker.locale = 'es'

function generarProducto(id) {
 return {
   id: id,
   nombre: faker.commerce.product(),
   precio: Number(faker.commerce.price()),
   foto: faker.image.avatar(),
 }
}

export { generarProducto }