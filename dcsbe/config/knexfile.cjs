// Update with your config settings.
// import dotenv from 'dotenv';
const dotenv = require('dotenv');
dotenv.config()

module.exports = {

  development: {
    client: 'mysql2',
    connection: {
      host : 
      process.env.DB_HOST,
      // '127.0.0.1',
      port : process.env.DB_PORT,
      user : 
      process.env.DB_USER,
      // 'root',
      password : 
      process.env.DB_PASSWORD,
      // 'root',
      database : 
      process.env.DB_NAME,
      // 'dcs'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'my_db',
      user:     'username',
      password: 'password'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
