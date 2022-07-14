const { knexSqLite } = require("./SQLite3")

return knexSqLite.schema.dropTableIfExists('Mensajes')
.finally(() => {
  return knexSqLite.schema.createTable('mensajes', table => {
    table.increments('id').primary();
    table.float('date');
    table.string('autor');
    table.string('text'); 
  })
})

