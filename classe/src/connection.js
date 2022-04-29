const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'cubos2412',
        database: 'newsletter'
    }
});


module.exports = knex;