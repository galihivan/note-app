// db/connection.js
const mysql = require('mysql2');

// Create a connection pool or a single connection
const connection = mysql.createPool({
    host: process.env.HOST, // Defined in .env
    user: process.env.USER, // Defined in .env
    password: process.env.PASSWORD, // Defined in .env
    database: process.env.DATABASE, // Defined in .env
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = connection;
