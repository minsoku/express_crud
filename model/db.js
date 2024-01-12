
const mysql = require('mysql2');
const config = require('../config/config');

const pool = mysql.createPool({
    host: config.HOST,
    user: config.USER,
    password: config.PASSWORD,
    port: config.PORT,
    database: config.DATABASE
});

module.exports = pool;