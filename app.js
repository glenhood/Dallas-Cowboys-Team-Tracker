const express = require('express');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3009;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // TODO: Add MySQL password here
    password: '',
    database: 'employees_db'
  },
  console.log(`Connected to the employees_db database.`)
);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
  