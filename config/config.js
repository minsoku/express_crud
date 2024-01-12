require('dotenv').config()

module.exports = {
    HOST: process.env.HOST,
    USER: process.env.USER,
    PASSWORD: process.env.DB_PASSWORD,
    PORT: process.env.DB_PORT,
    DATABASE: process.env.DB_NAME,
    HASH_ROUNDS: process.env.HASH_ROUNDS
}