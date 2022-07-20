const knexSqLite = require('knex')({
    client: 'sqlite3',
    connection: {
        filename: "./DB/ecommerce"
    },
    useNullAsDefault: true
  })
  
  module.exports = { knexSqLite };