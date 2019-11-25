/* Busca el archivo .env con las variables de entorno
y las trae, funciona en cualquier archivo */
require('dotenv').config();

const database = {
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
};

module.exports = { database };