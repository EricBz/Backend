//1 importo los datos de conexion de mariadb
const { options } = require("./mariaDB.js");
const knex = require("knex")(options);


    return knex.schema.dropTableIfExists('productos')
      .finally(() => {
        return knex.schema.createTable('productos', table => {
          table.increments('id').primary();
          table.string('title', 50).notNullable();
          table.string('thumbnail');
          table.float('price');
        })
    })
