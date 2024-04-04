const express = require('express');
const mysql = require('mysql');
const app = express();

app.use(express.json());

let secretKey ="freelogii"
const connection = mysql.createConnection({
  host: 'b4dfwk59zduraz1tloo6-mysql.services.clever-cloud.com',
  user: 'uxkg4t8mhop341my',
  password: 'gzucUtkPqaX72hl6dGn3',
  database: 'b4dfwk59zduraz1tloo6',
  port: 3306
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database: ' + err.stack);
    return;
  }
  console.log('Connected to database as id ' + connection.threadId);
});

app.post('/api/register', (req, res) => {
  const { username, email } = req.body;
  
  connection.query('INSERT INTO users (username, email, secret) VALUES (?, ?, ?)', [username, email, secretKey], (error, results) => {
    if (error) {
      res.status(500).json({ error: 'Internal Server Error' });
      return;
    }
    res.json({ message: 'User registered successfully' });
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
