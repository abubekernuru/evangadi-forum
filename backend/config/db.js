const mysql = require('mysql2');
require('dotenv').config();

// Create connectiondbConnection to database
const dbConnection = mysql.createPool({
    host: 'localhost',
    user: 'evangadi_forum',
    // password: process.env.DB_PASSWORD || 'your_mysql_password_here',
    password: 'abuki123456@?',
    database: 'evangadi_forum',
    waitForConnections: true,
    connectionLimit: 10, 
    queueLimit: 0,
    acquireTimeout: 60000,
    timeout: 60000,
    reconnect: true
});

dbConnection.execute('SELECT "test" AS connection_test', (err, results) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Database connection successful:', results);    
    }
});

// module.exports = dbConnection;