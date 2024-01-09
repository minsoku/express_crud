require('dotenv').config()


module.exports = {
    development: {
        user: process.env.USER,
        host: process.env.HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
    }
}