const mysql = require('mysql2');

// Create a connection pool
const pool = mysql.createPool({
    host: 'localhost',  // Change if using a different host
    user: 'root',       // Your MySQL username
    password: 'root@19',  // Your MySQL password
    database: 'node_angular_crud', // Your database name
});

// Convert the pool into a promise-based pool
const promisePool = pool.promise();

// Test MySQL connection
promisePool.getConnection()
    .then((connection) => {
        console.log('✅ Connected to MySQL database successfully!');
        connection.release(); // Release the connection back to the pool
    })
    .catch((err) => {
        console.error('❌ Error connecting to MySQL:', err.message);
    });

// Export the promise pool
module.exports = promisePool;