/*
database server configuration
*/

const pg = require('pg');
const url = require('url');

let config = {};
require('dotenv').config()

if (process.env.DATABASE_URL) {
  // Heroku gives a url, not a connection object
  // https://github.com/brianc/node-pg-pool

  const params = url.parse(process.env.DATABASE_URL);
  const auth = params.auth.split(':');

  config = {
    user: auth[0],
    password: auth[1],
    host: params.hostname,
    port: params.port,
    database: params.pathname.split('/')[1],
    ssl: { rejectUnauthorized: false },
    max: 10, 
    idleTimeoutMillis: 30000, 
  };
} else {
  config = {  //configure server here
    // password: '5236987410',
    host: 'localhost', 
    port: 5432, 
    database: 'umn_app', // CHANGE THIS LINE if using a local PostgreSQL database
    max: 10, 
    idleTimeoutMillis: 30000, 
  };
}

const pool = new pg.Pool(config);


pool.on('error', (err) => {
  console.log('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = pool;