
const mysql = require('mysql2');
const dbConfig = require('../config/config');

const pool = mysql.createPool({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    port: dbConfig.PORT,
    database: dbConfig.DATABASE
});

module.exports = pool;