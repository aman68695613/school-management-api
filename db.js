const mysql = require('mysql2');
require('dotenv').config();
const fs = require('fs');
const path = require('path');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: true,
    ca: fs.readFileSync(path.join(__dirname, 'ca.pem')) // Adjust if stored in another folder
  }
});

connection.connect((err) => {
  if (err) throw err;
  console.log('✅ Connected to remote MySQL via SSL');

  // Create the `schools` table if it doesn't exist
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
    console.log('✅ Table `schools` ensured');
  });
});

module.exports = connection;
