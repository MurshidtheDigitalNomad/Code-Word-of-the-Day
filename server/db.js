const {Pool} = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'code-word-of-the-day',
  password: 'murshid',
  port: 5432
})

module.exports = pool;