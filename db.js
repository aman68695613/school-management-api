const mysql = require('mysql2');
require('dotenv').config();

// Step 1: Connect without specifying the DB
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL');

  // Step 2: Create database if it doesn't exist
  connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\``, (err) => {
    if (err) throw err;
    console.log(`Database '${process.env.DB_NAME}' ensured`);

  // Step 3: Connect again with the database
    connection.changeUser({ database: process.env.DB_NAME }, (err) => {
      if (err) throw err;

      // Step 4: Create the schools table if it doesn't exist
      const createTableQuery = `
        CREATE TABLE IF NOT EXISTS schools (
          id INT AUTO_INCREMENT PRIMARY KEY,
          name VARCHAR(255) NOT NULL,
          address VARCHAR(255) NOT NULL,
          latitude FLOAT NOT NULL,
          longitude FLOAT NOT NULL
        )
      `;

      connection.query(createTableQuery, (err) => {
        if (err) throw err;
        console.log('Table `schools` ensured');
      });
    });
  });
});

module.exports = connection;
